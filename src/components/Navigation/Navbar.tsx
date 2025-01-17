"use client";

import Link from "next/link";
import SearchBar from "@/components/Navigation/SearchBar";
import { PawPrintIcon } from "@/components/ui/Icons";
import { ModeToggle } from "@/components/Navigation/DarkMode";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";

const Navbar = () => {
  const address = useAddress();
  const disconnect = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
    }
  };

  return (
    <div className="fixed dark:bg-[#030711] dark:text-white top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <PawPrintIcon className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold text-foreground">
            Paws for Hope
          </span>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Links and Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="r/donate"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          >
            Donate
          </Link>
          <Link
            href="r/find-pet"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          >
            Find Pet
          </Link>
          <Link
            href="r/products"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
          >
            Market Place
          </Link>
          {address ? (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 border text-sm font-medium transition-all"
            >
              Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
            </button>
          ) : (
            <ConnectWallet className="btn-sm px-4 py-2 border border-gray-300 text-sm font-medium transition-all" />
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;



// beavis and butt-head cartoon
