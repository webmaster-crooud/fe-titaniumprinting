import { BackButton } from '@/components/Button/Back.button';
import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';

import { IconCircle, IconFileUpload, IconHome2 } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { MultiValue, ActionMeta, Props as SelectProps } from 'react-select';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import ImageUploading from 'react-images-uploading';

import 'react-quill/dist/quill.snow.css';

interface DataCategoreis {
   data: [
      {
         name: string;
         id: number;
      }
   ];
}
interface Option {
   value: string;
   label: string;
}
const Select = dynamic<SelectProps<Option, true>>(() => import('react-select'), {
   ssr: false,
}) as React.ComponentType<SelectProps<Option, true>>;

export default function CreateProductPage() {
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
   const [loading, setLoading] = useState(false);
   const [name, setName] = useState('');
   const [price, setPrice] = useState(2000);
   const [categoryId, setCategoryId] = useState<Option[] | null>(null);
   const [image, setImage] = useState<File[]>([]);
   const [description, setDescription] = useState('');
   const [categories, setCategories] = useState<DataCategoreis>({ data: [{ name: '', id: 0 }] });
   const [alert, setAlert] = useState<{ type: string; message: string }>({ type: '', message: '' });
   const [isMounted, setIsMounted] = useState(false);

   const maxNumber = 69;

   const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
   };
   const onChangeImage = (imageList: any, addUpdateIndex: any) => {
      setImage(imageList);
   };

   // Get Categories
   const fetchCategories = async () => {
      try {
         const response = await fetch('http://localhost:3001/api/v1/categories');
         const result = await response.json();

         setCategories(result);
      } catch (error) {
         setAlert({ type: 'error', message: 'Terjadi kesalahan dalam mengambil data Kategori' });
      } finally {
         setLoading(false);
      }
   };
   useEffect(() => {
      fetchCategories();
      setIsMounted(true);
   }, []);
   function transformCategoriesToOptions(categories: DataCategoreis): Option[] {
      return categories.data.map((category: any) => ({
         value: category.id,
         label: category.name,
      }));
   }
   const options = transformCategoriesToOptions(categories);
   const handleCategoryChange = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
      setCategoryId(newValue as Option[]);
   };

   if (!isMounted) {
      return null;
   }

   //    console.log(name);
   //    console.log(categoryId);
   //    console.log(image);
   //    console.log(description);

   return (
      <section className="relative">
         <ol className="mb-3 flex border-b border-gray-500/30 pb-1 font-semibold text-gray-500 dark:border-white-dark/30 dark:text-white-dark">
            <li>
               <Link href="/panel/admin" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  <IconHome2 size={18} stroke={2.5} />
               </Link>
            </li>
            <li className="before:px-1.5 before:content-['/']">
               <Link href="/panel/admin/products" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  Produk
               </Link>
            </li>

            <li className="before:px-1.5 before:content-['/']">
               <Link
                  href="/panel/admin/products/create"
                  className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70"
               >
                  Create
               </Link>
            </li>
         </ol>

         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Formulir Data Produk</h1>
            <BackButton text="Kembali" url="products" />
         </div>

         <form>
            <div className="grid w-full grid-cols-3 items-start justify-center gap-5">
               <Card width={12} colSpan="col-span-2">
                  <InputForm label="Nama Produk" name="name" placeholder="Nama Produk" value={name} onChange={handlerChangeName} isRequired />

                  <div className="mt-3">
                     <label htmlFor="Categories">Kategori</label>
                     <Select
                        placeholder="Pilih Kategori"
                        isMulti
                        isSearchable={false}
                        options={options}
                        instanceId="categories-select"
                        onChange={handleCategoryChange}
                     />
                  </div>

                  <div className="mt-5">
                     <label htmlFor="">Image</label>
                     <ImageUploading multiple value={image} onChange={onChangeImage} maxNumber={maxNumber} dataURLKey="data_url">
                        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                           <div className="w-full rounded-lg border border-slate-200 p-5">
                              <button
                                 type="button"
                                 style={isDragging ? { color: 'red' } : undefined}
                                 onClick={onImageUpload}
                                 {...dragProps}
                                 className={`flex h-20 w-full items-center justify-center rounded-lg border border-slate-300 shadow-inner ${
                                    isDragging ? 'scale-105 text-info transition-all duration-200 ease-in-out' : 'text-sm text-slate-500'
                                 }`}
                              >
                                 <span className={isDragging ? 'text-info' : 'text-sm text-slate-500'}>Clik or Drag Image Here</span>
                              </button>

                              <div className="my-3 flex items-center justify-end">
                                 <button
                                    type="button"
                                    onClick={onImageRemoveAll}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-danger-dark-light p-2 text-danger"
                                 >
                                    <IconTrash size={20} stroke={2.5} className="text-danger" />
                                    <p>Hapus Semua</p>
                                 </button>
                              </div>
                              <div className="grid grid-cols-5 items-start gap-2">
                                 {imageList.map((image, index) => (
                                    <div key={index} className="relative w-full border border-slate-800">
                                       <Image src={image['data_url']} alt="" width={100} height={100} className="h-full w-full" />
                                       <div className="absolute right-0 top-0 flex items-center justify-center gap-1 bg-white/80 px-2 py-1">
                                          <button className="text-sm font-semibold text-info" onClick={() => onImageUpdate(index)}>
                                             <IconEdit size={20} stroke={1.5} />
                                          </button>
                                          <button className="text-sm font-semibold text-danger" onClick={() => onImageRemove(index)}>
                                             <IconTrash size={20} stroke={1.5} className="text-danger" />
                                          </button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </ImageUploading>
                  </div>

                  <section className="mt-5">
                     <label htmlFor="">Deskripsi</label>
                     <ReactQuill theme="snow" value={description} onChange={setDescription} />
                  </section>
               </Card>

               <div>
                  <div className="mb-5">
                     <Card width={12}>
                        <p className="text-center text-2xl font-bold text-info">Harga: Rp {price.toLocaleString('id-ID')}</p>
                     </Card>
                  </div>
                  <Card width={12}>
                     <h1 className="text-lg font-semibold">Komponen Produk</h1>
                  </Card>

                  <button type="submit" className="btn btn-info mt-5 h-32 w-full hover:scale-95" disabled={loading}>
                     {loading ? (
                        <div className="flex items-center justify-center gap-2">
                           <IconCircle className="animate-ping" size={30} stroke={1.5} />
                           <span className="text-xl font-semibold">Mengungah</span>
                        </div>
                     ) : (
                        <div className="flex items-center justify-center gap-2">
                           <IconFileUpload size={30} stroke={1.5} />
                           <span className="text-xl font-semibold">Simpan</span>
                        </div>
                     )}
                  </button>
               </div>
            </div>
         </form>
      </section>
   );
}
