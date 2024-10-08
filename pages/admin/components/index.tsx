import { CreateButton } from '@/components/Button/Create.button';
import { Card } from '@/components/Card';
import { IconEye, IconHome2, IconRocket, IconSearch, IconStar, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

const ComponentsPage = () => {
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
               <Link href="/admin/components" className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70">
                  Komponen
               </Link>
            </li>
         </ol>
         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Manajemen Produk</h1>
            {loading && (
               <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-l-primary align-middle"></span>
            )}
         </div>
         <Card width={12}>
            <div className="mb-3 flex w-full items-center justify-between">
               <CreateButton text="Komponen" url="components/create" />
               <form>
                  <div className="relative flex rounded-lg border border-white-dark/20">
                     <button
                        type="submit"
                        placeholder="Let's find your question in fast way"
                        className="m-auto flex items-center justify-center p-3 text-primary"
                     >
                        <IconSearch size={16} stroke={2.5} />
                     </button>
                     <input
                        type="text"
                        placeholder="Let's find your question in fast way"
                        className="form-input rounded-lg border-0 border-l bg-white py-3 placeholder:tracking-wider focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] focus:outline-none dark:shadow-[#1b2e4b]"
                     />
                  </div>
               </form>
            </div>
         </Card>
      </section>
   );
};

export default ComponentsPage;
