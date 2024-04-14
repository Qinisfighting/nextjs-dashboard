import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';

export const metadata: Metadata = {
    title: 'Customers',
  };
 


export default function Page() {
    return (
        <CustomersTable customers={[]} />
        
    )
    
  }