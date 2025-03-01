"use client";

import Link from "next/link";
import SearchBar from "@/components/Navigation/SearchBar";
import { PawPrintIcon } from "@/components/ui/Icons";
import { ModeToggle } from "@/components/Navigation/DarkMode";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // For hamburger and close icons

const Navbar: FC = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 inset-x-0 h-fit bg-background dark:bg-[#030711] dark:text-white border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo - Styled like nav links */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary"
        >
          <PawPrintIcon className="h-5 w-5 text-primary" /> {/* Reduced size for consistency */}
          <span>Paws for Hope</span>
        </Link>

        {/* Search Bar and Mobile Menu - Responsive */}
        <div className="flex items-center gap-2 w-full max-w-md sm:max-w-lg md:max-w-xl">
          {/* Search Bar - Hidden on Mobile, Shown on Small+ */}
          <div className="relative w-full hidden sm:block">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-1"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </div>

        {/* Links and Actions - Hidden on Mobile, Shown on Medium+ */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <Link
            href="/r/donate"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary"
          >
            Donate
          </Link>
          <Link
            href="/f/find-pet"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary"
          >
            Find Pet
          </Link>
          <Link
            href="/m/marketplace"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary"
          >
            Market Place
          </Link>
          {address ? (
            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary border border-gray-300"
            >
              Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
            </Button>
          ) : (
            <ConnectWallet
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary border border-gray-300"
            />
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu - Hidden by default, shown on click */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background dark:bg-[#030711] border-t border-zinc-300 p-4">
            <div className="flex flex-col gap-4">
              <SearchBar />
              <Link
                href="/r/donate"
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary"
                onClick={toggleMenu}
              >
                Donate
              </Link>
              <Link
                href="/f/find-pet"
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary"
                onClick={toggleMenu}
              >
                Find Pet
              </Link>
              <Link
                href="/m/marketplace"
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary"
                onClick={toggleMenu}
              >
                Market Place
              </Link>
              {address ? (
                <Button
                  onClick={() => {
                    handleDisconnect();
                    toggleMenu();
                  }}
                  variant="outline"
                  className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary border border-gray-300"
                >
                  Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
                </Button>
              ) : (
                <ConnectWallet
                  className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-all text-foreground hover:text-primary border border-gray-300"
                  onConnect={toggleMenu}
                />
              )}
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;