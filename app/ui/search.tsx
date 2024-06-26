'use client'; // - This is a Client Component, which means you can use event listeners and hooks. You can also import other components and client-side libraries. You can also use the `fetch` function to make HTTP requests.
//https://react.dev/reference/react/use-client  


import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { CustomerField } from '../lib/definitions';

export default function Search({ placeholder, customers }: { placeholder: string, customers: CustomerField[]}) {
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
    <div className="flex flex-col md:flex-row gap-4 pr-8 w-full" >
      {pathname === "/dashboard/invoices" ? 
      <div className="w-full">
        <select className="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-500"
          onChange={(e) => {
            handleSelect(e.target.value);
          }}
          >
          <option value="" >All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      : 
      <div className="w-full relative">
      <select
        id="customer"
        name="customerId"
        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={searchParams.get('query')?.toString()}
        aria-describedby="customer-error"
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
      >
         <option value="" >
            Select a customer
          </option>
        {customers?.map((customer) => (   
          <option key={customer.id} value={customer.name}>
            {customer.name}
          </option>
        ))}
      </select>
      <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
    </div>
      }
      <div className="relative flex w-full">
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


