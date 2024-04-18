'use client'; // - This is a Client Component, which means you can use event listeners and hooks. You can also import other components and client-side libraries. You can also use the `fetch` function to make HTTP requests.
//https://react.dev/reference/react/use-client  


import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // This function below will wrap the contents of handleSearch, and only run the code after a specific time once the user has stopped typing (300ms).
  const handleSearch = useDebouncedCallback((term) => {
    // console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
   }, 300); 
  

  const handleSelect = (value: string) => {
    // console.log(`Selected value: ${value}`);
    // Perform any additional logic or actions based on the selected value
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 pr-8" >
      <div className="w-full md:w-1/2 ">
        <select className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-500"
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          >
          <option value="All" >All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <div className="relative flex w-full md:w-1/2 ">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div> 
    
    </div>
    
  );
}


