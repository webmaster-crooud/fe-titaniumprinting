import { BackButton } from '@/components/Button/Back.button';
import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';
import { IconEdit, IconHome2, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Wizard } from './Layouts/Wizard';
import { showAlert } from '@/components/Alert';
import { useRouter } from 'next/router';
export interface Option {
   value: string;
   label: string;
}
const CreateComponentsPage = () => {
   const [name, setName] = useState('');
   const [typeComponent, setTypeComponent] = useState('');
   const [image, setImage] = useState<File[]>([]);
   const [typePieces, setTypePieces] = useState('');
   const [qtyPieces, setQtyPieces] = useState(0);
   const [price, setPrice] = useState(0);
   const [cogs, setCogs] = useState(0);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handlerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
   };

   const handlerTypeComponentChange = (values: any) => {
      setTypeComponent(values.value);
   };

   const onChangeImage = (imageList: any, addUpdateIndex: any) => {
      setImage(imageList);
   };

   const handlerTypePiecesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTypePieces(e.target.value);
   };

   const handlerQtyPiecesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQtyPieces(Number(e.target.value) as number);
   };

   const handlerPriceChange = (value: number) => {
      setPrice(value);
   };

   const handlerCogsChange = (value: number) => {
      setCogs(value);
   };

   const handlerSubmitComponents = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1800));

      try {
         console.log(name, typeComponent, image, typePieces, qtyPieces, price, cogs);
         const response = await fetch('http://localhost:3001/api/v1/components', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name,
               typeComponent,
               typePieces,
               qtyPieces,
               price,
               cogs,
            }),
         });

         const result = await response.json();
         if (response.status !== 201) {
            showAlert('error', result.message);
            return;
         }

         resetForm();
         showAlert('success', result.message);
         router.push('/admin/components');
      } catch (error) {
         showAlert('error', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
      }
   };

   const handlerSubmitComponentsToQuality = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1800));

      try {
         const response = await fetch('http://localhost:3001/api/v1/components', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name,
               typeComponent,
               typePieces,
               qtyPieces,
               price,
               cogs,
            }),
         });

         const result = await response.json();
         if (response.status !== 201) {
            showAlert('error', result.message);
            return;
         }

         resetForm();
         router.push(`/admin/qualities/create/${result.data.id}`);
         showAlert('success', result.message);
      } catch (error) {
         showAlert('error', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
      }
   };

   const resetForm = () => {
      setName('');
      setTypeComponent('');
      setImage([]);
      setTypePieces('');
      setQtyPieces(0);
      setPrice(0);
      setCogs(0);
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
               <Link href="/admin/products/create" className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70">
                  Create
               </Link>
            </li>
         </ol>

         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Formulir Data Komponen</h1>
            <BackButton text="Kembali" url="components" />
         </div>

         <form>
            <Wizard
               onChangeName={handlerNameChange}
               valueName={name}
               onChangeTypeComponent={handlerTypeComponentChange}
               valueTypeComponent={typeComponent}
               onChangeImage={onChangeImage}
               valueImage={image}
               onChangeTypePieces={handlerTypePiecesChange}
               valueTypePieces={typePieces}
               onChangeQtyPieces={handlerQtyPiecesChange}
               valueQtyPieces={qtyPieces}
               onChangePrice={handlerPriceChange}
               onChangeCogs={handlerCogsChange}
               onClickSubmit={handlerSubmitComponents}
               onClickSubmitToQuality={handlerSubmitComponentsToQuality}
               loading={loading}
            />
         </form>
      </section>
   );
};

export default CreateComponentsPage;
