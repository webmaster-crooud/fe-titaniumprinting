'use client';
import { CreateButton } from '@/components/Button/Create.button';
import IconHome from '@/components/Icon/IconHome';
import { IconDetails, IconEye, IconFilePlus, IconHome2, IconPlus, IconRocket, IconSearch, IconStar, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type propsProducts = {
   data: [
      {
         barcode: string;
         name: string;
         category: {
            name: string;
         };
         flag: string;
         createdAt: string;
         updatedAt: string;
      }
   ];
};

export default function ProductsPage() {
   const [products, setProducts] = useState<propsProducts>({
      data: [{ barcode: '', name: '', category: { name: '' }, flag: '', createdAt: '', updatedAt: '' }],
   });
   const [loading, setLoading] = useState(false);
   const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

   const fetchProducts = async () => {
      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 2000));
         const response = await fetch('http://localhost:3001/api/v1/products');
         const result = await response.json();

         if (!result.data || result.data.length === 0) {
            showAlert('warning', 'Data Produk masih kosong atau tidak ditemukan');
         } else {
            setProducts(result);
         }

         showAlert('success', 'Berhasil Mendapatkan Data Produk');
      } catch (error) {
         showAlert('error', 'Terjadi kesalahan pengambilan data');
      } finally {
         setLoading(false);
      }
   };
   const showAlert = async (type: string | undefined, message: string) => {
      if (type === 'success') {
         const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            width: '35%',
            background: 'rgba(67,97,238,1)',
         });
         toast.fire({
            icon: 'success',
            title: message,
            padding: '10px 20px',
         });
      } else if (type === 'warning') {
         const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            width: '35%',
            backdrop: '#eab308',
         });
         toast.fire({
            icon: 'warning',
            title: message,
            padding: '10px 20px',
         });
      } else {
         const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            width: '35%',
            background: '#e7515a',
         });
         toast.fire({
            icon: 'error',
            title: message,
            padding: '10px 20px',
         });
      }
   };
   useEffect(() => {
      fetchProducts();
   }, []);

   return (
      <section className="relative">
         <ol className="mb-3 flex border-b border-gray-500/30 pb-1 font-semibold text-gray-500 dark:border-white-dark/30 dark:text-white-dark">
            <li>
               <a href="javascript:;" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  <IconHome2 size={18} stroke={2.5} />
               </a>
            </li>
            <li className="before:px-1.5 before:content-['/']">
               <a href="javascript:;" className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70">
                  Produk
               </a>
            </li>
         </ol>

         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Manajemen Produk</h1>
            {loading && (
               <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-l-primary align-middle"></span>
            )}
         </div>
         <div className="table-responsive rounded-lg bg-white p-5 pb-8 shadow-lg dark:bg-black">
            <div className="mb-3 flex w-full items-center justify-between">
               <CreateButton text="Produk" url="/products/create" />
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
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-light dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-light dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-light dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-light dark:bg-slate-500"></div>
                              <div className="h-5 w-full animate-pulse rounded-md bg-white-light dark:bg-slate-500"></div>
                           </div>
                        </td>
                     </tr>
                  ) : (
                     products.data.map((data) => (
                        <tr key={data.barcode}>
                           <td className="">
                              <div className="flex w-full items-center justify-start gap-3">
                                 <Link href={'/detail'}>
                                    <IconStar size={14} stroke={2} className="text-orange-500" />
                                 </Link>
                                 {data.name}
                              </div>
                           </td>
                           <td>{data.category.name}</td>
                           {data.flag === 'ACTIVED' ? (
                              <td className="bg-primary-dark-light text-center"> Aktif</td>
                           ) : (
                              <td className="bg-fuchsia-500 text-center"> Favorit</td>
                           )}
                           <td className="text-center">
                              <div className="flex w-full items-center justify-center gap-2">
                                 <Link href={'/detail'} className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500 p-1 text-white">
                                    <IconEye size={20} stroke={2.5} />
                                 </Link>
                                 <Link href={'/detail'} className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 p-1 text-white">
                                    <IconTrash size={20} stroke={2.5} />
                                 </Link>
                              </div>
                           </td>
                           {data.createdAt != data.updatedAt ? (
                              <td className="text-end">{dayjs(data.updatedAt).format('MMMM, D YYYY HH:mm:ss')} (updated)</td>
                           ) : (
                              <td className="text-end">{dayjs(data.createdAt).format('MMMM, D YYYY HH:mm:ss')}</td>
                           )}
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>
      </section>
   );
}
