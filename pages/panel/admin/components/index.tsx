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
               <a href="javascript:;" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  <IconHome2 size={18} stroke={2.5} />
               </a>
            </li>
            <li className="before:px-1.5 before:content-['/']">
               <a href="javascript:;" className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70">
                  Komponen
               </a>
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
               <CreateButton text="Komponen" url="/components/create" />
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
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Kategori</th>
                     <th className="text-center">Status</th>
                     <th className="flex items-center justify-center text-center">
                        <IconRocket size={20} stroke={2.5} />
                     </th>
                     <th className="text-end">Date</th>
                  </tr>
               </thead>
               <tbody>
                  {loading ? (
                     <tr>
                        <td colSpan={5}>
                           <div className="grid w-full animate-pulse grid-rows-4 gap-5 rounded-lg bg-white-light p-5 dark:bg-slate-800">
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-dark dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-dark dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-dark dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-dark dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-dark dark:bg-slate-500"></div>
                           </div>
                        </td>
                     </tr>
                  ) : (
                     <p>Kosong</p>
                  )}
               </tbody>
            </table>
         </Card>
      </section>
   );
};

export default ComponentsPage;
