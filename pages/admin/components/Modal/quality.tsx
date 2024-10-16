import { showAlert } from '@/components/Alert';
import { BACKEND_URL } from '@/utils/conf.backend';
import { Dialog, Input, Transition } from '@headlessui/react';
import { IconEdit, IconLoaderQuarter, IconX } from '@tabler/icons-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useRouter } from 'next/router';
import React, { useState, Fragment, useEffect } from 'react';
import { InputForm } from '@/components/Form/input.form';

type propsModalQuality = {
   qualityId: number;
   name: string;
   orientation: boolean;
   flag: string;
   component: any;
};

export const ModalQualityEdit: React.FC<propsModalQuality> = ({ qualityId, name, orientation, flag, component }) => {
   const router = useRouter();
   const { componentId } = router.query;
   const [modal2, setModal2] = useState(false);
   const [loading, setLoading] = useState(false);
   const [nameQuality, setNameQuality] = useState(name);
   const [orientationQuality, setOrientationQuality] = useState(orientation);
   const [flagQuality] = useState(flag);

   const handlerOnChangeNameQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameQuality(e.target.value);
   };

   const handlerOnChangeOrientation = () => {
      setOrientationQuality((orientationQuality) => !orientationQuality);
   };

   const submitUpdateQuality = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!qualityId && !componentId) {
         showAlert('error', 'Terjadi kesalahan yang cukup fatal');
      }

      if (!nameQuality) {
         showAlert('error', 'Nama kualitas tidak boleh kosong');
      }

      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 2000));
         const response = await fetch(`${BACKEND_URL}/components/qualities/${componentId}/${qualityId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameQuality, orientation: orientationQuality }),
         });

         const result = await response.json();
         if (result.error === true) {
            showAlert('error', result.message);
         }

         showAlert('success', result.message);
         setModal2(false);
         component();
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
                                 <h5 className="text-lg font-bold">
                                    Update {name}
                                    <span className="ml-5 rounded-lg bg-primary-dark-light px-3 py-1 text-xs text-primary">{flagQuality}</span>
                                 </h5>
                                 <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal2(false)}>
                                    <IconX size={25} stroke={2} />
                                 </button>
                              </div>
                              <form onSubmit={submitUpdateQuality}>
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
                                             <td>Kualitas</td>
                                             <td>
                                                <InputForm
                                                   name="name"
                                                   isRequired
                                                   value={nameQuality}
                                                   onChange={handlerOnChangeNameQuality}
                                                   type="text"
                                                   placeholder="Nama kualitas..."
                                                />
                                             </td>
                                          </tr>
                                          <tr>
                                             <td>Orientasi</td>
                                             <td>
                                                <div className="flex items-center justify-start gap-1">
                                                   <input
                                                      type="checkbox"
                                                      name="orientation"
                                                      onChange={handlerOnChangeOrientation}
                                                      checked={orientationQuality}
                                                   />
                                                   <p>Ya</p>
                                                </div>
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
