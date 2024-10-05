import { Icon360View, IconArrowLeft, IconCircle, IconDatabaseEdit, IconFileUpload } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type CategoryData = {
   data: { id: number; name: string; slug: string; description: string };
};

export default function DetailCategory() {
   const router = useRouter();
   const { categoryId } = router.query;

   const [category, setCategory] = useState<CategoryData | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState({ name: '' });
   const [name, setName] = useState(category?.data.name);
   const [slug, setSlug] = useState<string | undefined>(category?.data.slug);
   const [description, setDescription] = useState<string | undefined>(category?.data.description);
   const [alertMessage, setAlertMessage] = useState<{ type: string; message: string } | null>(null);

   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value); // Update state name saat input berubah
   };

   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value); // Update state description saat textarea berubah
   };

   useEffect(() => {
      if (!categoryId) return; // Pastikan categoryId terdefinisi

      async function fetchCategory() {
         try {
            const response = await fetch(`http://localhost:3001/api/v1/categories/${categoryId}`);

            if (!response.ok) {
               throw new Error('Gagal mengambil data kategori');
            }
            const result = await response.json();

            // Tambahkan delay 3 detik sebelum mengubah status loading
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setCategory(result);
            setName(result.data.name); // Update state name
            setSlug(result.data.slug); // Update state slug
            setDescription(result.data.description); // Update state description
         } catch (error) {
            setError({ name: 'Gagal mengambil data' });
         } finally {
            setLoading(false);
         }
      }
      fetchCategory();
   }, [categoryId]);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1800));

      if (!name) {
         setError({
            name: 'Input Name tidak boleh kosong',
         });
         setLoading(false);
         return;
      }

      const response = await fetch(`http://localhost:3001/api/v1/categories/${categoryId}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name, description }),
      });

      const result = await response.json();
      if (response.status !== 200 && response.status !== 201) {
         setLoading(false);
         return;
      } // Tambahkan alert sukses
      setLoading(false); // Hentikan loading setelah berhasil
      router.push('/panel/admin/categories');
   };

   if (loading)
      return (
         <div className="flex w-full items-center justify-center">
            <span className="m-auto mb-10 mt-20 inline-block h-14 w-14 animate-[spin_1s_linear_infinite] rounded-full border-8 border-b-success border-l-primary border-r-warning border-t-danger align-middle"></span>
         </div>
      );
   if (!category) return <p>Kategori tidak ditemukan.</p>;
   return (
      <section>
         <Link href={'/panel/admin/categories'} className="flex items-center justify-start gap-1 font-semibold">
            <IconArrowLeft size={16} stroke={2} />
            Kembali
         </Link>
         <div className="table-responsive mb-5 mt-5 w-10/12 rounded-xl bg-white p-8 shadow-lg shadow-white-light dark:bg-black dark:shadow-black-dark-light">
            <form onSubmit={handleSubmit}>
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
                        value={name} // Pastikan value diisi dengan state name
                        onChange={handleNameChange} // Tambahkan event handler
                     />
                     {error.name && <span className="text-red-500">{error.name}</span>}
                  </div>
                  <div>
                     <label htmlFor="slug" className="text-sm font-semibold">
                        Slug
                     </label>
                     <div>
                        <input
                           id="addonsRight"
                           type="text"
                           placeholder="slug-kategori"
                           name="slug"
                           disabled
                           className="form-input  disabled:cursor-not-allowed disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b]"
                           value={slug} // Pastikan value diisi dengan state slug
                        />
                        <small className="text-xs text-danger">*Slug tidak dapat diubah</small>
                     </div>
                  </div>
               </div>
               <label className="description mt-5">Deskripsi Kategori</label>
               <div className="grid grid-cols-3 gap-5">
                  <div className="col-span-2">
                     <textarea
                        name="description"
                        className="form-textarea"
                        placeholder="Teks Deskripsi"
                        rows={4}
                        value={description} // Pastikan value diisi dengan state description
                        onChange={handleDescriptionChange} // Tambahkan event handler
                     ></textarea>
                  </div>
                  <button type="submit" className="btn btn-info hover:scale-95" disabled={loading}>
                     {loading ? (
                        <span>
                           <span className="m-auto mb-10 inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-success border-l-transparent align-middle"></span>
                           Loading
                        </span>
                     ) : (
                        <IconFileUpload size={30} stroke={2} />
                     )}
                  </button>
               </div>
            </form>
         </div>

         <div className="table-responsive mb-5 w-10/12 rounded-xl bg-white p-8 shadow-lg shadow-white-light dark:bg-black dark:shadow-black-dark-light">
            <h1 className="text-xl font-bold">Produk berdasarkan Kategori</h1>
         </div>
      </section>
   );
}
