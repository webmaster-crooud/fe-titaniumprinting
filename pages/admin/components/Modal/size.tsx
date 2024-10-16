import { showAlert } from '@/components/Alert';
import { BACKEND_URL } from '@/utils/conf.backend';
import { Dialog, Input, Transition } from '@headlessui/react';
import { IconEdit, IconLoaderQuarter, IconX } from '@tabler/icons-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useRouter } from 'next/router';
import React, { useState, Fragment, useEffect } from 'react';
import { InputForm } from '@/components/Form/input.form';
import CurrencyInput from 'react-currency-input-field';

type propsModalSize = {
   qualityId: number;
   sizeId: number;
   qualityName: string;
   width: number;
   height: number;
   weight: number;
   price: number;
   cogs: number | undefined;
   components: any;
};

export const ModalSizeEdit: React.FC<propsModalSize> = ({ qualityId, sizeId, qualityName, width, height, weight, price, cogs, components }) => {
   const [modal2, setModal2] = useState(false);
   const [loading, setLoading] = useState(false);
   const [widthSize, setWidthSize] = useState(width);
   const [heightSize, setHeightSize] = useState(height);
   const [weightSize, setWeightSize] = useState(weight);
   const [priceSize, setPriceSize] = useState(price);
   const [cogsSize, setCogsSize] = useState(cogs);

   const handlerWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
      setWidthSize(Number(e.target.value));
   };

   const handlerHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHeightSize(Number(e.target.value));
   };

   const handlerWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
      setWeightSize(Number(e.target.value));
   };

   const handlerPrice = (value: any) => {
      setPriceSize(value.float);
   };

   const handlerCogs = (value: any) => {
      setCogsSize(value.float);
   };

   const onSubmitSizeUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!qualityId && !sizeId) {
         showAlert('error', 'Terjadi kesalahan yang cukup fatal');
      }

      if (!price && cogs) {
         showAlert('error', 'Uang tidak boleh kosong');
      }

      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 2000));
         const response = await fetch(`${BACKEND_URL}/components/sizes/${qualityId}/${sizeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ width: widthSize, weight: weightSize, height: heightSize, price: priceSize, cogs: cogsSize }),
         });

         const result = await response.json();
         if (result.error === true) {
            showAlert('error', result.message);
         }

         showAlert('success', result.message);
         setModal2(false);
         components();
      } catch (error) {
         showAlert('warning', 'Terjadi kesalahan');
         setModal2(false);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <Tippy content="Edit">
            <button type="button" onClick={() => setModal2(true)}>
               <IconEdit className="text-primary" size={14} stroke={2} />
            </button>
         </Tippy>
         <div className="mb-5">
            <Transition appear show={modal2} as={Fragment}>
               <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0"
                     enterTo="opacity-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <div className="fixed inset-0" />
                  </Transition.Child>
                  <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                     <div className="flex min-h-screen items-center justify-center px-4">
                        <Transition.Child
                           as={Fragment}
                           enter="ease-out duration-300"
                           enterFrom="opacity-0 scale-95"
                           enterTo="opacity-100 scale-100"
                           leave="ease-in duration-200"
                           leaveFrom="opacity-100 scale-100"
                           leaveTo="opacity-0 scale-95"
                        >
                           <Dialog.Panel
                              as="div"
                              className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                           >
                              <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                 <h5 className="text-lg font-bold">Update {qualityName}</h5>
                                 <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal2(false)}>
                                    <IconX size={25} stroke={2} />
                                 </button>
                              </div>
                              <form onSubmit={onSubmitSizeUpdate}>
                                 <div className="p-5">
                                    <table>
                                       <thead>
                                          <tr>
                                             <th>Keterangan</th>
                                             <th>Data</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td>Panjang</td>
                                             <td>
                                                <InputForm
                                                   name="width"
                                                   isRequired
                                                   value={widthSize}
                                                   onChange={handlerWidth}
                                                   type="number"
                                                   placeholder="Nama kualitas..."
                                                />
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>Tinggi</td>
                                             <td>
                                                <InputForm
                                                   name="height"
                                                   isRequired
                                                   value={heightSize}
                                                   onChange={handlerHeight}
                                                   type="number"
                                                   placeholder="Nama kualitas..."
                                                />
                                             </td>
                                          </tr>

                                          <tr>
                                             <td>Berat</td>
                                             <td>
                                                <InputForm
                                                   name="weight"
                                                   isRequired
                                                   value={weightSize}
                                                   onChange={handlerWeight}
                                                   type="number"
                                                   placeholder="Nama kualitas..."
                                                />
                                             </td>
                                          </tr>

                                          <tr>
                                             <td>Harga Jual</td>
                                             <td>
                                                <CurrencyInput
                                                   name="price"
                                                   placeholder="Masukkan harga jual"
                                                   className="form-input"
                                                   intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                                                   decimalsLimit={2}
                                                   autoComplete="off"
                                                   value={priceSize?.toString()}
                                                   onValueChange={(value, name, values) => {
                                                      if (values) {
                                                         handlerPrice(values);
                                                      }
                                                   }}
                                                />
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>Harga Beli</td>
                                             <td>
                                                <CurrencyInput
                                                   name="cogs"
                                                   placeholder="Masukkan harga Beli"
                                                   className="form-input"
                                                   intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                                                   decimalsLimit={2}
                                                   autoComplete="off"
                                                   value={cogsSize?.toString()}
                                                   onValueChange={(value, name, values) => {
                                                      if (values) {
                                                         handlerCogs(values);
                                                      }
                                                   }}
                                                />
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <div className="mt-8 flex items-center justify-end">
                                       <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                          Batal
                                       </button>
                                       <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={loading}>
                                          {loading ? (
                                             <>
                                                <IconLoaderQuarter size={20} stroke={2} className="animate-spin" /> <span>Menyimpan...</span>
                                             </>
                                          ) : (
                                             <>Yakin</>
                                          )}
                                       </button>
                                    </div>
                                 </div>
                              </form>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         </div>
      </>
   );
};
