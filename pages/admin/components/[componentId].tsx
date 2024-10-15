import { showAlert } from '@/components/Alert';
import { CreateButton } from '@/components/Button/Create.button';
import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';
import { StoneLoader } from '@/components/StoneLoader';
import { BACKEND_URL } from '@/utils/conf.backend';
import { formatCurrency } from '@/utils/formatCurrency';
import { IconEdit, IconHome2, IconLoaderQuarter, IconRocket, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

import { options } from './Sections/Main';
import dynamic from 'next/dynamic';
import { Option } from './create';
import { Props as SelectProps } from 'react-select';
import { ModalQuality } from './Modal/quality';

interface Component {
   id: string;
   name: string;
   image?: string;
   flag: string;
   price?: number;
   cogs?: number;
   typeComponent: string;
   typePieces: string;
   qtyPieces: number;
   canIncrise: boolean;
   qualities: [
      {
         id: number;
         name: string;
         image?: string;
         orientation: string;
         flag: string;
         sizes: [
            {
               id: number;
               width: number;
               height: number;
               weight: number;
               price: number;
               cogs?: number;
               image: string;
            }
         ];
      }
   ];
}
const DetailComponentPage = () => {
   const router = useRouter();
   const { componentId } = router.query;
   const [component, setComponent] = useState<Component | null>(null);
   const [loading, setLoading] = useState(false);
   const [loadingDelete, setLoadingDelete] = useState(false);
   const [update, setUpdate] = useState(false);
   const Select = dynamic<SelectProps<Option, true>>(() => import('react-select'), {
      ssr: false,
   }) as React.ComponentType<SelectProps<Option, true>>;

   const fetchComponent = useCallback(async () => {
      if (!componentId) return;

      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1800));
         const response = await fetch(`${BACKEND_URL}/components/${componentId}`);
         const result = await response.json();

         if (result.error === true) {
            showAlert('warning', result.message);
            router.push('/admin/components');
            return;
         }

         setComponent(result.data);
         setLoading(false);
      } catch (error) {
         console.error('Error fetching component:', error);
         showAlert('error', 'Terjadi Kesalahan');
      } finally {
         setLoading(false);
      }
   }, [componentId, router]);

   useEffect(() => {
      fetchComponent();
   }, [fetchComponent]);

   const [name, setName] = useState<string>('');
   const [priceComponent, setPriceComponent] = useState<number | null>(null);
   const [cogsComponent, setCogsComponent] = useState<number | null>(null);
   const [type, setType] = useState<string>('');
   const [typePieces, setTypePieces] = useState<string>('');
   const [qtyPieces, setQtyPieces] = useState<number>(0);
   const [hpp, setHpp] = useState(0);

   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
   };

   const handlePriceChange = (value: any) => {
      setPriceComponent(value.float);
   };

   const handleCogsChange = (value: any) => {
      setCogsComponent(value.float);
   };

   const handleTypeComponentChange = (values: any) => {
      setType(values.value);
   };

   const handleTypePiecesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTypePieces(e.target.value);
   };

   const handleQtyPiecesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQtyPieces(parseInt(e.target.value));
   };

   useEffect(() => {
      if (component) {
         setName(component.name || '');
         setPriceComponent(component.price || null);
         setCogsComponent(component.cogs || null);
         setType(component.typeComponent || '');
         setTypePieces(component.typePieces || '');
         setQtyPieces(component.qtyPieces || 0);
      }
   }, [component]);

   useEffect(() => {
      if (priceComponent !== undefined && cogsComponent !== undefined) {
         setHpp(Number(priceComponent) - Number(cogsComponent));
      }
   }, [priceComponent, cogsComponent]);

   const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if (!componentId) {
         showAlert('error', 'Terjadi kesalahan dalam penginputan');
      }
      try {
         await new Promise((resolve) => setTimeout(resolve, 2000));
         const response = await fetch(`${BACKEND_URL}/components/${componentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price: priceComponent, cogs: cogsComponent, typeComponent: type, typePieces, qtyPieces }),
         });

         const result = await response.json();
         if (result.error === true) {
            showAlert('error', result.message);
            return;
         }

         fetchComponent();
         showAlert('success', result.message);
         setUpdate(false);
      } catch (error) {
         showAlert('warning', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
      }
   };

   const handleDeletedQuality = async (qualityId: number, e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingDelete(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(`${BACKEND_URL}/components/qualities/${componentId}/${qualityId}`, {
         method: 'DELETE',
      });

      console.log(response);
      const result = await response.json();
      if (result.error === true) {
         showAlert('error', result.message);
         setLoadingDelete(false);
      }

      showAlert('success', result.message);
      setLoadingDelete(false);
      fetchComponent();
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
               <Link
                  href={`/admin/components/${componentId}`}
                  className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70"
               >
                  {component?.name}
               </Link>
            </li>
         </ol>
         <div className="mb-5">
            <h1 className="text-lg font-bold">{component?.name}</h1>
         </div>

         <div className="grid grid-cols-3 items-end gap-5">
            <div className="col-span-2">
               <Card width={12}>
                  <form onSubmit={handleSubmitUpdate}>
                     <table>
                        <thead>
                           <tr>
                              <th>Keterangan</th>
                              <th>Value</th>
                           </tr>
                        </thead>
                        <tbody>
                           {loading ? (
                              <tr>
                                 <StoneLoader />
                              </tr>
                           ) : (
                              <>
                                 <tr key="id">
                                    <td>id</td>
                                    <td>{component?.id}</td>
                                 </tr>
                                 {update && (
                                    <tr key="name">
                                       <td>Nama Komponen</td>
                                       <td>
                                          <InputForm name="name" isRequired placeholder="" value={name} type="text" onChange={handleNameChange} />
                                       </td>
                                    </tr>
                                 )}
                                 <tr key="harga-jual">
                                    <td>Harga Jual</td>
                                    <td>
                                       {update ? (
                                          <CurrencyInput
                                             name="price"
                                             placeholder="Masukkan harga jual"
                                             className="form-input"
                                             intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                                             decimalsLimit={2}
                                             autoComplete="off"
                                             value={priceComponent?.toString()}
                                             onValueChange={(value, name, values) => {
                                                if (values) {
                                                   handlePriceChange(values);
                                                }
                                             }}
                                          />
                                       ) : Number(component?.price) === 0 ? null : (
                                          formatCurrency(Number(component?.price)) + ',-'
                                       )}
                                    </td>
                                 </tr>
                                 <tr key="harga-beli">
                                    <td>Harga Beli</td>
                                    <td>
                                       {update ? (
                                          <CurrencyInput
                                             name="cogs"
                                             placeholder="Masukkan harga beli"
                                             className="form-input"
                                             intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                                             decimalsLimit={2}
                                             autoComplete="off"
                                             value={cogsComponent?.toString()}
                                             onValueChange={(value, name, values) => {
                                                if (values) {
                                                   handleCogsChange(values);
                                                }
                                             }}
                                          />
                                       ) : Number(component?.cogs) === 0 ? null : (
                                          formatCurrency(Number(component?.cogs)) + ',-'
                                       )}
                                    </td>
                                 </tr>
                                 <tr key="hpp">
                                    <td>HPP</td>
                                    <td>{formatCurrency(hpp)},-</td>
                                 </tr>
                                 <tr key="type">
                                    <td>Tipe</td>
                                    <td>
                                       {update ? (
                                          <Select
                                             defaultValue={options.find((option) => option.value === type)}
                                             options={options}
                                             isSearchable={false}
                                             onChange={handleTypeComponentChange}
                                          />
                                       ) : (
                                          <span className="rounded-lg bg-black-light p-1 px-3 font-semibold">{component?.typeComponent}</span>
                                       )}
                                    </td>
                                 </tr>
                                 <tr key="stok">
                                    <td>Stok</td>
                                    <td>
                                       {update ? (
                                          <div className="flex items-center justify-center gap-3">
                                             <InputForm
                                                name="qtyPieces"
                                                isRequired
                                                placeholder="ok"
                                                value={qtyPieces}
                                                type="number"
                                                onChange={handleQtyPiecesChange}
                                             />
                                             <InputForm
                                                name="typePieces"
                                                isRequired
                                                placeholder="ok"
                                                value={typePieces.toString()}
                                                type="text"
                                                onChange={handleTypePiecesChange}
                                             />
                                          </div>
                                       ) : (
                                          <>
                                             {component?.qtyPieces} {component?.typePieces}
                                          </>
                                       )}
                                    </td>
                                 </tr>
                              </>
                           )}
                        </tbody>
                     </table>

                     {update && (
                        <div className="ml-auto mt-5 flex w-6/12 items-center justify-center gap-5">
                           <button
                              type="reset"
                              disabled={loading}
                              className="btn btn-danger w-full text-xs font-bold uppercase"
                              onClick={() => setUpdate(false)}
                           >
                              Batal
                           </button>
                           <button type={update ? 'submit' : 'button'} disabled={loading} className="btn btn-info w-full text-xs font-bold uppercase">
                              {loading ? (
                                 <>
                                    <IconLoaderQuarter size={18} stroke={2} className="animate-spin" /> Menyimpan...
                                 </>
                              ) : (
                                 'Simpan'
                              )}
                           </button>
                        </div>
                     )}
                  </form>
                  <button
                     type="button"
                     className={`btn btn-info w-full text-xs font-bold uppercase ${update && 'hidden'}`}
                     onClick={() => setUpdate(true)}
                  >
                     Update
                  </button>
               </Card>
            </div>

            <Link href={`/admin/qualities/create/${componentId}`} className="btn btn-primary font-bold">
               Tambah Data Kualitas
            </Link>
         </div>
         {loading ? (
            <>
               <div className="relative mt-5 h-full w-full animate-pulse rounded-2xl bg-white-light">
                  <div className="flex flex-col gap-5 p-5">
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                     <div className="h-4 w-full rounded-full bg-white-dark"></div>
                  </div>
               </div>
            </>
         ) : (
            component?.qualities.map((quality) => (
               <div className="mt-5 flex items-start justify-center gap-5" key={quality.id}>
                  <div className="w-7/12">
                     <Card width={12}>
                        <h1 className="mb-4 font-bold"> {quality.name}</h1>
                        <table>
                           <thead>
                              <tr>
                                 <th>Orientasi</th>
                                 <th className="text-center">Status</th>
                                 <th className="flex items-center justify-center text-center">
                                    <IconRocket size={16} stroke={2} />
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr key={quality.id}>
                                 <td>{quality.orientation ? 'Ya' : 'Tidak'}</td>
                                 <td className="text-center">
                                    <span className="rounded-lg bg-primary-dark-light px-4 py-1 text-xs font-bold text-primary">
                                       {quality.flag === 'ACTIVED' ? 'Aktif' : ''}
                                    </span>
                                 </td>
                                 <td className="flex items-center justify-center gap-2 bg-primary-dark-light text-center">
                                    <ModalQuality componentId={componentId?.toString()} qualityId={quality.id} />
                                    <form onSubmit={(e) => handleDeletedQuality(quality.id, e)}>
                                       <button type="submit">
                                          {loadingDelete ? (
                                             <IconLoaderQuarter size={14} stroke={2} className="animate-spin" />
                                          ) : (
                                             <IconTrash size={14} stroke={2} className="mt-1.5 text-danger" />
                                          )}
                                       </button>
                                    </form>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </Card>
                  </div>
                  <div className="w-full">
                     <Card width={12}>
                        <table>
                           <thead>
                              <tr className="text-center">
                                 <th className="flex items-center justify-center">
                                    <IconRocket size={16} stroke={2} />
                                 </th>
                                 <th className="text-center">Lebar</th>
                                 <th className="text-center">Tinggin</th>
                                 <th className="text-center">Berat</th>
                                 <th className="text-end">Jual</th>
                                 <th className="text-end">Beli</th>
                              </tr>
                           </thead>

                           <tbody>
                              {quality.sizes.map((size) => (
                                 <tr key={size.id}>
                                    <td className="flex items-center justify-center gap-2">
                                       <Link href={'/'}>
                                          <IconEdit size={16} stroke={2} />
                                       </Link>
                                       <Link href={'/'}>
                                          <IconTrash size={16} stroke={2} />
                                       </Link>
                                    </td>
                                    <td className="text-center">{size.width} meter</td>
                                    <td className="text-center">{size.height} meter</td>
                                    <td className="text-center">{size.weight} kilo</td>
                                    <td className="text-end">{formatCurrency(size.price)},-</td>
                                    <td className="text-end">{formatCurrency(Number(size.cogs))},-</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </Card>
                  </div>
               </div>
            ))
         )}
      </section>
   );
};

export default DetailComponentPage;
