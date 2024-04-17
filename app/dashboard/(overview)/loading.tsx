import DashboardSkeleton from '@/app/ui/skeletons';
 

//two ways you implement streaming in Next.js: 1. At the page level, with the loading.tsx file. 2. At the component level, with the Suspense component.

export default function Loading() {
    return <DashboardSkeleton />;
  }