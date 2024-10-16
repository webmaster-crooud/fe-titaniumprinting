import { showAlert } from '@/components/Alert';
import { BACKEND_URL } from '@/utils/conf.backend';
import { Dialog, Transition } from '@headlessui/react';
import { IconLoaderQuarter, IconTrash, IconX } from '@tabler/icons-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useRouter } from 'next/router';
import { useState, Fragment } from 'react';

export const DeleteComponentModal = ({ component, componentId, name }: { component: any; componentId: string; name: string }) => {
   const [modal2, setModal2] = useState(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handlerDeleteComponents = async () => {
      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 3000));
         const response = await fetch(`${BACKEND_URL}/components/${componentId}`, {
            method: 'DELETE',
         });
         console.log(response);

         const result = await response.json();
         if (result.error === true) {
            showAlert('error', result.message);
            setLoading(false);
         } else {
            setLoading(false);
            router.push('/admin/components');
            showAlert('success', result.message);
            component();
         }
      } catch (error) {
         showAlert('warning', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <Tippy content="Hapus">
            <button type="button" onClick={() => setModal2(true)}>
               <IconTrash className="text-danger" size={20} stroke={2} />
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
                                 <h5 className="text-lg font-bold">Hapus Data {name}</h5>
                                 <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal2(false)}>
                                    <IconX size={25} stroke={2} />
                                 </button>
                              </div>
                              <div className="p-5">
                                 {loading ? (
                                    <div className="flex h-full w-full items-center justify-center">
                                       <div className="text-center">
                                          <div className="m-auto mb-10 inline-block h-14 w-14 animate-spin rounded-full border-8 border-[#f1f2f3] border-l-primary align-middle"></div>

                                          <p className="text-sm">Sedang menghapus data-data komponen...</p>
                                       </div>
                                    </div>
                                 ) : (
                                    <div>
                                       <p>
                                          Apakah anda yakin ingin menghapus Komponen ini? <br />
                                          Jika anda menghapus data ini, assets yang dimiliki komponen ini akan ikut terhapus:
                                       </p>
                                       <table>
                                          <tbody className="text-sm">
                                             <tr>
                                                <td>Nama</td>
                                                <td>{name}</td>
                                             </tr>
                                             <tr>
                                                <td>Identify</td>
                                                <td>{componentId}</td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 )}
                                 <div className="mt-8 flex items-center justify-end">
                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                       Batal
                                    </button>
                                    <button
                                       type="button"
                                       className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                       disabled={loading}
                                       onClick={handlerDeleteComponents}
                                    >
                                       {loading ? (
                                          <>
                                             <IconLoaderQuarter size={20} stroke={2} className="animate-spin" /> <span>Loading</span>
                                          </>
                                       ) : (
                                          <>Yakin</>
                                       )}
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
