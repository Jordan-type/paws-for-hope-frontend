"use client";

import { FC, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { WalletProvider } from "@/context/WalletContext";

const activeChain = "sepolia";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

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
