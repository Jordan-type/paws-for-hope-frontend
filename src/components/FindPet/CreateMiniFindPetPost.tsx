'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { toast } from '@/hooks/use-toast';

const CreateMiniFindPetPost: FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const { walletAddress } = useWallet(); // Get the connected wallet address from context

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: 'Missing Title',
        description: 'Please enter a title for the lost pet post.',
        variant: 'destructive',
      });
      return;
    }

    if (!walletAddress) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to proceed.',
        variant: 'destructive',
      });
      return;
    }

    // Navigate to the create post page with the title as a query param
    router.push(`/f/find-pet/create?title=${encodeURIComponent(title)}&wallet=${walletAddress}`);
  };

  return (
    <div className="overflow-hidden rounded-md dark:bg-[#030711] dark:text-slate-50 dark:border dark:border-slate-500 bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Create a Lost Pet Post</h2>
      <div className="flex items-center gap-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title of your lost pet post"
          className="flex-1"
        />
        <Button onClick={handleSubmit} variant="default">
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default CreateMiniFindPetPost;
