import { IconAlertHexagonFilled, IconArrowLeft, IconCheckbox, IconChecklist, IconEyeCheck, IconLoader } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type DataCategories = {
   data: [
      {
         id: number;
         name: string;
         slug: string;
         flag: string;
      }
   ];
};

export default function CategoriesDisabledPage() {
   const [categories, setCategories] = useState<DataCategories>({ data: [{ id: 0, name: '', slug: '', flag: '' }] });
   const [loading, setLoading] = useState(false);
   const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

   const fetchDataCategories = async () => {
      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1000));
         const response = await fetch('http://localhost:3001/api/v1/categories/disabled');
         const result = await response.json();
         if (!result.data || result.data.length === 0) {
            setAlert({ type: 'warning', message: 'Data tidak ditemukan atau masih kosong' });
         } else {
            setCategories(result);
         }
      } catch (error) {
         setAlert({ type: 'error', message: 'Terjadi kesalahan dalam database' });
      } finally {
         setLoading(false);
      }
   };
   useEffect(() => {
      fetchDataCategories();
   }, []);

   const handleDisabledOnClick = async (categoryId: number) => {
      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1000));
         const response = await fetch(`http://localhost:3001/api/v1/categories/${categoryId}`, { method: 'PATCH' });
         const result = await response.json();
         if (response.status !== 200) {
            setAlert({ type: 'error', message: result.message });
            return;
         }
         setAlert({ type: 'success', message: result.message });
         fetchDataCategories(); // Ambil ulang data kategori setelah berhasil
      } catch (error) {
         setAlert({ type: 'error', message: 'Terjadi kesalahan saat memperbarui kategori' });
      }
   };

   const Alert = ({ type, message }: { type: string; message: string }) => (
      <>
         <div
            className={`relative mb-5 flex items-center justify-center gap-3 rounded border p-3 dark:bg-primary-dark-light ${
               type === 'error' ? '!border-danger bg-dark-light text-danger' : '!border-primary bg-dark-light text-primary'
            }`}
         >
            <span className={`${type === 'error' ? 'text-danger' : 'text-primary'}`}>
               {type === 'error' ? <IconAlertHexagonFilled size={23} stroke={2} /> : <IconChecklist size={23} stroke={2} />}
            </span>
            <span className="">
               <strong className="font-bold">{type === 'error' ? 'Warning' : 'Success'}!</strong> {message}
            </span>
         </div>
      </>
   );
   return (
      <section className="relative">
         {loading && (
            <div className="fixed right-5 top-5">
               <div className="flex w-full items-center justify-center">
                  <span className="m-auto mb-10 mt-20 inline-block h-8 w-8 animate-[spin_1s_linear_infinite] rounded-full border-8 border-b-success border-l-primary border-r-warning border-t-danger align-middle"></span>
               </div>
            </div>
         )}
         {alert && ( // Tampilkan alert jika ada
            <Alert type={alert.type} message={alert.message} />
         )}
         <Link href={'/panel/admin/categories'} className="flex items-center justify-start gap-1 font-semibold">
            <IconArrowLeft size={16} stroke={2} />
            Kembali
         </Link>

         <div className="mt-5 rounded-xl bg-white p-5 shadow-lg dark:bg-dark-dark-light">
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th className="text-center">Status</th>
                     <th className="text-center">Action</th>
                     <th className=""></th>
                  </tr>
               </thead>
               <tbody>
                  {categories.data.map((data) => (
                     <tr key={data.id}>
                        <td>{data.name}</td>
                        <td className="text-center">
                           <span className="rounded-full bg-danger px-3 py-1.5 font-semibold lowercase text-white">{data.flag}</span>
                        </td>
                        <td className="text-center">
                           {loading === true ? (
                              <button type="button" onClick={() => handleDisabledOnClick(data.id)} disabled>
                                 <IconLoader className="animate-spin" />
                              </button>
                           ) : (
                              <button type="button" onClick={() => handleDisabledOnClick(data.id)}>
                                 <IconEyeCheck />
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   );
}
