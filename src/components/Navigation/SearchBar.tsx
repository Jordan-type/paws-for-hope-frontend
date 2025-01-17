'use client';

import { FC, useRef, useState } from 'react';
import { Command, CommandInput } from '@/components/ui/Command';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

const SearchBar: FC = () => {
  const [input, setInput] = useState<string>('');
  const commandRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(commandRef as React.RefObject<HTMLElement>, () => {
    setInput('');
  });

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text: string) => setInput(text)}
        value={input}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search posts..."
      />
    </Command>
  );
};

export default SearchBar;
