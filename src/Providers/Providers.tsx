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
  }, []);

  if (!mounted) {
    return (
      <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID} activeChain={activeChain}>
        {children}
      </ThirdwebProvider>
    );
  }

  return (
    <ThirdwebProvider clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID} activeChain={activeChain}>
      <WalletProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
      </WalletProvider>
    </ThirdwebProvider>
  );
};

export default Providers;
