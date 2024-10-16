import { showAlert } from '@/components/Alert';
import { BACKEND_URL } from '@/utils/conf.backend';
import { Dialog, Transition } from '@headlessui/react';
import { IconFileUpload, IconLoaderQuarter, IconTrash, IconX } from '@tabler/icons-react';

import { useRouter } from 'next/router';
import { useState, Fragment } from 'react';

type DataProps = {
   data: any;
   loading: any;
   modal: any;
   setLoading: any;
   setModal: any;
};

export const ModalUploadedQualities = ({ data, loading, setLoading, modal, setModal }: DataProps) => {
   const router = useRouter();
   const { componentId } = router.query;

   const handlerRedirect = async () => {
      setLoading(true);
      try {
         await new Promise((resolver) => setTimeout(resolver, 1500));
         router.push('/admin/components');
         showAlert('success', 'Berhasil menyimpan data Komponen');
      } catch (error) {
         showAlert('warning', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
      }
   };

   const handlerBack = async () => {
      setLoading(true);
      try {
         await new Promise((resolver) => setTimeout(resolver, 1500));
         router.push(`/admin/qualities/create/${componentId}`);
         showAlert('success', 'Berhasil menyimpan data Komponen');
      } catch (error) {
         showAlert('warning', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
         setModal(false);
      }
   };
   return (
      <>
         <button type="submit" className="btn btn-info w-full gap-1" disabled={loading}>
            {!loading ? (
               <>
                  <IconFileUpload size={20} stroke={2} />
                  Simpan
               </>
            ) : (
               <>
                  <IconLoaderQuarter size={20} stroke={2} className="animate-spin" />
                  Menyimpan...
               </>
            )}
         </button>
         <div className="mb-5">
            <Transition appear show={modal} as={Fragment}>
               <Dialog as="div" open={modal} onClose={() => setModal(false)}>
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
                              className="panel my-8 w-full max-w-xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                           >
                              <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                 <h5 className="text-lg font-bold">Kualitas {data.componentName} </h5>
                                 <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal(false)}>
                                    <IconX size={25} stroke={2} />
                                 </button>
                              </div>
                              <div className="p-5">
                                 {loading ? (
                                    <div className="flex h-full w-full items-center justify-center">
                                       <div className="text-center">
                                          <div className="m-auto mb-10 inline-block h-14 w-14 animate-spin rounded-full border-8 border-[#f1f2f3] border-l-primary align-middle"></div>

                                          <p className="text-sm">Sedang mengalihkan halaman...</p>
                                       </div>
                                    </div>
                                 ) : (
                                    <p>
                                       Apakah anda ingin menambahkan kualitas dan ukuran pada komponen <b>{data.componentName} </b>kembali?
                                    </p>
                                 )}

                                 <div className="mt-8 flex items-center justify-end">
                                    <button type="submit" onClick={handlerBack} className="btn btn-dark ltr:ml-4 rtl:mr-4" disabled={loading}>
                                       {loading ? (
                                          <>
                                             <IconLoaderQuarter size={20} stroke={2} className="animate-spin" /> <span>Loading</span>
                                          </>
                                       ) : (
                                          <>Iya</>
                                       )}
                                    </button>
                                    <button type="submit" onClick={handlerRedirect} className="btn btn-outline-dark ltr:ml-4 rtl:mr-4">
                                       Tidak
                                    </button>
                                 </div>
                              </div>
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
