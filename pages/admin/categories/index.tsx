import React, { useEffect, useState } from 'react';
import {
   IconAlertHexagon,
   IconAlertHexagonFilled,
   IconArrowBigRightLine,
   IconChecklist,
   IconCircle,
   IconDatabaseEdit,
   IconEye,
   IconEyeMinus,
   IconFileUpload,
   IconLoader,
   IconStar,
   IconStarFilled,
   IconTrash,
} from '@tabler/icons-react';

import Link from 'next/link';

type propsCategoriesData = {
   data: [
      {
         id: number;
         name: string;
         slug: string;
         flag: string;
      }
   ];
};

export default function ListCategoriesPage() {
   const [categories, setCategories] = useState<propsCategoriesData>({
      data: [{ id: 0, name: '', slug: '', flag: '' }],
   });
   const [loading, setLoading] = useState(true);
   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [description, setDescription] = useState('');
   const [disabled, setDisabled] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [errors, setErrors] = useState({ name: '', slug: '' });
   const [alertMessage, setAlertMessage] = useState<{ type: string; message: string } | null>(null); // State untuk alert

   const fetchCategories = async () => {
      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1000));
         const res = await fetch('http://localhost:3001/api/v1/categories');
         const categories = await res.json();
         if (!categories.data || categories.data.length === 0) {
            setAlertMessage({ type: 'error', message: 'Data kategori kosong' });
         } else {
            setCategories(categories);
         }
      } catch (error) {
         setAlertMessage({ type: 'error', message: 'Terjadi kesalahan saat mengambil data' });
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCategories();
   }, []);

   const handlerDisabled = () => {
      setDisabled(!disabled);
   };

   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      setSlug(slugify(e.target.value));
   };

   const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSlug(e.target.value);
   };

   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
   };

   const slugify = (text: string) => {
      return text
         .toString()
         .toLowerCase()
         .replace(/\s+/g, '-') // Ganti spasi dengan -
         .replace(/[^\w\-]+/g, '') // Hapus karakter non-word
         .replace(/\-\-+/g, '-') // Ganti beberapa - dengan satu -
         .replace(/^-+/, '') // Hapus - di awal
         .replace(/-+$/, ''); // Hapus - di akhir
   };

   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      // Tambahkan delay sebelum mengirim data
      await new Promise((resolve) => setTimeout(resolve, 1800)); // Delay 1 detik

      if (!name || !slug) {
         setErrors({
            name: !name ? 'Nama diperlukan' : '',
            slug: !slug ? 'Slug diperlukan' : '',
         });
         setIsLoading(false);
         return;
      }

      try {
         const response = await fetch('http://localhost:3001/api/v1/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, slug, description }),
         });

         const result = await response.json();
         if (response.status !== 201) {
            setAlertMessage({ type: 'error', message: result.message });
            return;
         }

         setAlertMessage({ type: 'success', message: result.message });
         resetForm();
         fetchCategories(); // Ambil ulang data kategori setelah berhasil
      } catch (error) {
         setAlertMessage({ type: 'error', message: 'Terjadi kesalahan saat menyimpan data' });
      } finally {
         setIsLoading(false);
      }
   };

   const resetForm = () => {
      setName('');
      setSlug('');
      setDescription('');
      setErrors({ name: '', slug: '' });
   };

   const handleDisabledOnClick = async (categoryId: number) => {
      const activeCount = categories.data.filter((category) => category.flag === 'ACTIVED').length;

      if (activeCount === 1 && categories.data.find((category) => category.id === categoryId)?.flag === 'ACTIVED') {
         setAlertMessage({ type: 'error', message: 'Tidak dapat menonaktifkan kategori aktif terakhir.' });
         return;
      }

      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1000));
         const response = await fetch(`http://localhost:3001/api/v1/categories/${categoryId}`, { method: 'PATCH' });
         const result = await response.json();
         if (response.status !== 200) {
            setAlertMessage({ type: 'error', message: result.message });
            return;
         }
         setAlertMessage({ type: 'success', message: result.message });
         fetchCategories(); // Ambil ulang data kategori setelah berhasil
      } catch (error) {
         setAlertMessage({ type: 'error', message: 'Terjadi kesalahan saat memperbarui kategori' });
      }
   };

   const handleUpdateFlag = async (categoryId: number) => {
      const response = await fetch(`http://localhost:3001/api/v1/categories/${categoryId}/fav`, {
         method: 'PATCH',
      });

      const result = await response.json();

      // Cek jika ada error dari API
      if (response.status !== 201 && response.status !== 200) {
         setAlertMessage({ type: 'error', message: result.message }); // Set alert error
         setIsLoading(false); // Set loading false jika ada error
         return;
      }

      setAlertMessage({ type: 'success', message: result.message }); // Set alert success

      fetch('http://localhost:3001/api/v1/categories')
         .then((res) => res.json())
         .then((categories) => {
            setCategories(categories);
            setLoading(false); // Set loading false setelah selesai
         });
      setIsLoading(false); // Set loading false setelah selesai
   };

   // Komponen Alert
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
      <section>
         {loading && (
            <div className="fixed right-5 top-5">
               <div className="flex w-full items-center justify-center">
                  <span className="m-auto mb-10 mt-20 inline-block h-8 w-8 animate-[spin_1s_linear_infinite] rounded-full border-8 border-b-success border-l-primary border-r-warning border-t-danger align-middle"></span>
               </div>
            </div>
         )}
         <div className="mb-5 w-8/12 rounded-xl bg-white px-8 py-5 shadow-lg shadow-white-light dark:bg-black dark:shadow-black-dark-light">
            <h1 className="mb-3 text-xl font-bold">Data Kategori</h1>

            <form onSubmit={handleFormSubmit}>
               <div className="grid grid-cols-2 gap-5">
                  <div>
                     <label htmlFor="name" className="text-sm font-semibold">
                        Nama
                     </label>
                     <input
                        autoComplete="off"
                        type="text"
                        placeholder="Nama Kategori Produk"
                        name="name"
                        className="form-input"
                        required
                        value={name}
                        onChange={handleNameChange}
                     />
                     {errors.name && <span className="text-red-500">{errors.name}</span>}
                  </div>
                  <div>
                     <label htmlFor="slug" className="text-sm font-semibold">
                        Slug
                     </label>
                     <div className="flex">
                        <input
                           id="addonsRight"
                           type="text"
                           placeholder="slug-kategori"
                           name="slug"
                           value={slug}
                           onChange={handleSlugChange}
                           className="form-input  disabled:cursor-not-allowed disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] ltr:rounded-r-none rtl:rounded-l-none"
                           disabled={disabled}
                        />
                        <button type="button" className="btn btn-info ltr:rounded-l-none rtl:rounded-r-none" onClick={handlerDisabled}>
                           <IconDatabaseEdit size={18} stroke={2} />
                        </button>
                     </div>
                     {errors.slug && <span className="text-red-500">{errors.slug}</span>}
                  </div>
               </div>
               <label className="description mt-5">Deskripsi Kategori</label>
               <div className="grid grid-cols-3 gap-5">
                  <div className="col-span-2">
                     <textarea
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="form-textarea"
                        placeholder="Teks Deskripsi"
                        rows={4}
                     ></textarea>
                  </div>
                  <button type="submit" className="btn btn-info hover:scale-95" disabled={isLoading}>
                     {isLoading ? <IconCircle className="animate-ping" size={30} stroke={2} /> : <IconFileUpload size={30} stroke={2} />}
                  </button>
               </div>
            </form>
         </div>

         <div className="table-responsive mb-5 w-10/12 rounded-xl bg-white p-8 shadow-lg shadow-white-light dark:bg-black dark:shadow-black-dark-light">
            {!categories && <h1>DATA MASIH KOSONG!</h1>}

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
                  {!categories.data?.length
                     ? 'Data Kosong'
                     : categories.data.map((data) => {
                          return (
                             <tr key={data.id}>
                                <td>
                                   <div className="whitespace-nowrap">{data.name}</div>
                                </td>
                                <td>
                                   <div
                                      className={`whitespace-nowrap ${
                                         data.flag === 'ACTIVED' ? 'bg-success' : data.flag === 'FAVOURITE' ? 'bg-secondary' : 'bg-success'
                                      } mx-auto w-7/12 rounded-full px-3 py-1.5 text-center text-xs font-semibold text-white`}
                                   >
                                      {data.flag === 'ACTIVED' ? 'Aktif' : 'Favorit'}
                                   </div>
                                </td>
                                <td className="flex items-center justify-center gap-2 text-center">
                                   <form
                                      onSubmit={(e) => {
                                         e.preventDefault();
                                         handleUpdateFlag(data.id);
                                      }}
                                   >
                                      <button type="submit" className="mt-1">
                                         {data.flag === 'FAVOURITE' ? (
                                            <IconStarFilled className="text-yellow-500 " size={20} stroke={2} />
                                         ) : (
                                            <IconStar className="text-yellow-500 " size={20} stroke={2} />
                                         )}
                                      </button>
                                   </form>

                                   {loading === true ? (
                                      <button type="button" onClick={() => handleDisabledOnClick(data.id)} disabled>
                                         <IconLoader className="animate-spin" size={20} stroke={2} />
                                      </button>
                                   ) : (
                                      <button type="button" onClick={() => handleDisabledOnClick(data.id)}>
                                         <IconEyeMinus size={20} stroke={2} />
                                      </button>
                                   )}
                                </td>
                                <td className="ml-auto text-end">
                                   <Link href={`/panel/admin/categories/${data.id}`}>
                                      <IconArrowBigRightLine className="text-teal-500 " size={20} stroke={2} />
                                   </Link>
                                </td>
                             </tr>
                          );
                       })}
               </tbody>
            </table>
         </div>
      </section>
   );
}
