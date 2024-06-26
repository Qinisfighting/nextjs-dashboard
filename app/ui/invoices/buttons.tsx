"use client";

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 md:w-48 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <button className="hidden md:block text-nowrap">Create Invoice</button>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {

// const deleteInvoiceWithId = deleteInvoice.bind(null, id)

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (window.confirm("Are you sure you want to delete this invoice?")) {
    // since i don´t use form action attribute, i´ll call the deleteInvoice function here with id parameter directly, instead of using the deleteInvoiceWithId function with bind() method
    deleteInvoice(id);
  }
}

return (
  <form onSubmit={handleSubmit}>
    <button className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-4" />
    </button>
  </form>
);

}
