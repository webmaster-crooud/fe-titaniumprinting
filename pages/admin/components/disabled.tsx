import { Card } from '@/components/Card';
import { IconHome2 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { ComponentsTable } from './Table/Component.table';
import { DisabledComponentsTable } from './Table/Disabled.table';

const DisabledComponentPage = () => {
   const [loading, setLoading] = useState(false);

   return (
      <section>
         <ol className="mb-3 flex border-b border-gray-500/30 pb-1 font-semibold text-gray-500 dark:border-white-dark/30 dark:text-white-dark">
            <li>
               <Link href="/admin" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  <IconHome2 size={18} stroke={2.5} />
               </Link>
            </li>
            <li className="before:px-1.5 before:content-['/']">
               <Link href="/admin/components" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  Komponen
               </Link>
            </li>
            <li className="before:px-1.5 before:content-['/']">
               <Link
                  href="/admin/components/disabled"
                  className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70"
               >
                  <i>Disabled</i> Komponen
               </Link>
            </li>
         </ol>
         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
               Manajemen <i>Disabled</i> Komponen{' '}
            </h1>
            {loading && (
               <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-l-primary align-middle"></span>
            )}
         </div>
         <Card width={12}>
            <DisabledComponentsTable />
         </Card>
      </section>
   );
};

export default DisabledComponentPage;

// return
