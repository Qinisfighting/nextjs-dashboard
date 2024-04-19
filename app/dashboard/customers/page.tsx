import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { fetchCustomersPages } from '@/app/lib/data';
import Pagination from '@/app/ui/customers/pagination';
import {  CustomersTableSkeleton } from '@/app/ui/skeletons';





export const metadata: Metadata = {
    title: 'Customers',
  };
 


  export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCustomersPages(query);
   
    return (
      <div className="w-full">
      <Suspense key={query + currentPage} fallback={< CustomersTableSkeleton />} >
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
       
  // <p>Costomers Page</p>
    )
    
  }