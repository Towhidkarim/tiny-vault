import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function SearchBar() {
  return (
    <form action='/search' className='flex flex-row gap-0 w-full'>
      <Input
        name='query'
        type='text'
        minLength={3}
        required
        placeholder='Search vaults by name/user'
        className='peer placeholder:opacity-55 border-r-0 rounded-r-none'
      />
      <Button
        type='submit'
        variant='outline'
        className='border-l-0 rounded-l-none peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-focus:ring-1'
      >
        <Search className='size-5' />
      </Button>
    </form>
  );
}
