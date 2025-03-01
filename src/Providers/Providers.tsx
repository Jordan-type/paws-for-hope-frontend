"use client";

import { FC, ReactNode, useState, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { WalletProvider } from "@/context/WalletContext";

const activeChain = "sepolia"; // add more networks 

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    setMounted(true);
    // Suppress Radix UI DialogTitle warning (temporary)
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0].includes("DialogContent requires a DialogTitle")) return;
      originalWarn(...args);
    };
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""} activeChain={activeChain}>
        {children}
      </ThirdwebProvider>
    );
  }

  if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
    console.error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set in .env");
    return <div>Error: Thirdweb client ID is missing</div>;
  }

  return (
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID} activeChain={activeChain}>
      <WalletProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
      </WalletProvider>
    </ThirdwebProvider>
  );
};

export default Providers;
