"use client";

import { FC, useRef, useState } from "react";
import { Command, CommandInput } from "@/components/ui/command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

import { cn } from "@/lib/utils"

const SearchBar: FC = () => {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Add state for loading if needed
  const commandRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(commandRef as React.RefObject<HTMLElement>, () => {
    setInput("");
    setIsLoading(false); // Reset loading state
  });

  // Simulate a search that might set isLoading (example)
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulate search completion
    }, 1000);
  };

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text: string) => {
          setInput(text);
          if (text.length > 0) handleSearch(); // Trigger search on input
        }}
        value={input}
        disabled={isLoading} // Use disabled instead of isLoading prop
        className={cn(
          "outline-none border-none focus:border-none focus:outline-none ring-0",
          isLoading && "cursor-wait opacity-50" // Optional: Add loading style
        )}
        placeholder="Search posts..."
      />
    </Command>
  );
};

export default SearchBar;