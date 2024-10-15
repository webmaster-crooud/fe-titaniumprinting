'use client';

import { showAlert } from '@/components/Alert';
import { BackButton } from '@/components/Button/Back.button';
import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';
import { BACKEND_URL } from '@/utils/conf.backend';
import { IconEdit, IconFileUpload, IconHome2, IconLoaderQuarter, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { SizeForm } from './Form/Size.form';
import IconSave from '@/components/Icon/IconSave';
import { ModalUploadedQualities } from '../Modal';

// Tambahkan definisi tipe DataSize jika belum ada
type DataSize = {
   // Definisikan properti yang sesuai dengan struktur DataSize Anda
   // Contoh:
   // size: string;
   // price: number;
};

export default function CreateQualityAndSizePage() {
   const router = useRouter();
   const { componentId } = router.query;
   const [componentName, setComponentName] = useState('');
   const [name, setName] = useState('');
   const [orientation, setOrientation] = useState(false);
   const [sizes, setSizes] = useState<DataSize[] | null>(null);
   const [loading, setLoading] = useState(false);
   const [modal, setModal] = useState(false);
   const [resetForm, setResetForm] = useState(false);

   const [image, setImage] = useState<File[]>([]);
   const maxNumber = 69;

   const onChangeImage = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
      setImage(imageList as never[]);
   };

   useEffect(() => {
      if (!componentId) return;
      const fetchComponentName = async () => {
         try {
            const response = await fetch(`${BACKEND_URL}/components/${componentId}`);

            const result = await response.json();

            if (result.error === true) {
               router.push('/admin/components');
               showAlert('warning', 'Komponen data tidak valid');
            }
            setComponentName(result.data.name);
         } catch (err) {
            router.push('/admin/components');
            showAlert('error', 'Terjadi kesalahan');
         }
      };

      fetchComponentName();
   }, [componentId, router]);

   const handlerGetSizes = (inputs: DataSize[]) => {
      setSizes(inputs);
   };

   const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
   };

   const data = {
      componentName,
      name,
      orientation,
      sizes,
   };

   const handlerSubmitQualitySize = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
         const response = await fetch(`${BACKEND_URL}/components/qualities/${componentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([
               {
                  name: data.name,
                  orientation: data.orientation,
                  sizes: data.sizes,
               },
            ]),
         });

         const result = await response.json();
         if (result.error === true) {
            showAlert('error', result.message);
            setLoading(false);
            return;
         }

         setModal(true);
         // Membersihkan semua inputan
         setName('');
         setOrientation(false);
         setImage([]);
         setResetForm(true); // Aktifkan reset form

         // Tambahkan timeout untuk mereset kembali state resetForm
         setTimeout(() => {
            setResetForm(false);
         }, 100);
      } catch (err) {
         showAlert('warning', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className="relative">
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
               <Link href="/admin/component" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  Kualitas
               </Link>
            </li>

            <li className="before:px-1.5 before:content-['/']">
               <Link href="/admin/products/create" className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70">
                  Create
               </Link>
            </li>
         </ol>

         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Formulir {componentName}</h1>
            <BackButton text="Kembali" url="components" />
         </div>

         <form className="grid grid-cols-2 gap-5" onSubmit={handlerSubmitQualitySize}>
            <div className="w-full">
               <Card width={12}>
                  <div className="relative">
                     <InputForm
                        label="Kualitas"
                        isRequired
                        name="name"
                        type="text"
                        placeholder="Masukan nama kualitas.."
                        value={name}
                        onChange={handlerChangeName}
                     />

                     <div className="mt-5">
                        <label htmlFor="">Image</label>
                        <ImageUploading multiple value={image} onChange={onChangeImage} maxNumber={maxNumber} dataURLKey="data_url">
                           {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                              <div className="w-full rounded-lg border border-slate-200 p-5">
                                 <button
                                    disabled={imageList.length === 0 ? false : true}
                                    type="button"
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className={`flex h-20 w-full items-center justify-center rounded-lg border border-slate-300 shadow-inner ${
                                       isDragging ? 'scale-105 text-info transition-all duration-200 ease-in-out' : 'text-sm text-slate-500'
                                    }`}
                                 >
                                    <span className={isDragging ? 'text-info' : 'text-sm text-slate-500'}>
                                       {imageList.length === 0 ? 'Klik atau Drag Image disini' : 'Berhasil Upload Image'}
                                    </span>
                                 </button>

                                 <div className="flex items-start justify-center gap-2">
                                    {imageList.map((image, index) => (
                                       <div key={index} className="relative mx-auto mt-6 w-6/12">
                                          <Image src={image['data_url']} alt="" width={100} height={100} className="h-full w-full" />
                                          <div className="absolute right-0 top-0 flex items-center justify-center gap-1 bg-white/80 px-2 py-1">
                                             <button type="button" className="text-sm font-semibold text-info" onClick={() => onImageUpdate(index)}>
                                                <IconEdit size={20} stroke={1.5} />
                                             </button>
                                             <button type="button" className="text-sm font-semibold text-danger" onClick={() => onImageRemove(index)}>
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

                     <div className="mt-5">
                        <label htmlFor="orientation">Apakah kualitas ini memiliki orientasi Landscape dan Portrait?</label>
                        <div className="flex items-center justify-start gap-5">
                           <div className="flex items-center justify-start gap-1">
                              <input type="checkbox" name="orientation" onChange={() => setOrientation(false)} checked={!orientation} />
                              <p>Tidak</p>
                           </div>
                           <div className="flex items-center justify-start gap-1">
                              <input type="checkbox" name="orientation" onChange={() => setOrientation(true)} checked={orientation} />
                              <p>Ya</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </Card>

               <div className="mt-5">
                  <ModalUploadedQualities data={data} loading={loading} setLoading={setLoading} modal={modal} setModal={setModal} />
               </div>
            </div>
            <div className="w-full">
               <SizeForm handlerGetInput={handlerGetSizes} resetForm={resetForm} />
            </div>
         </form>
      </section>
   );
}
