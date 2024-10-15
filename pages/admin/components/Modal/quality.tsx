import { Dialog, Transition } from '@headlessui/react';
import { IconEdit } from '@tabler/icons-react';
import { useState, Fragment } from 'react';

export const ModalQuality = ({ componentId, qualityId }: { componentId: string | undefined; qualityId: number }) => {
   const [modal2, setModal2] = useState(false);
   const [loading, setLoading] = useState(false);
   return (
      <>
         <button type="button" onClick={() => setModal2(true)}>
            <IconEdit size={14} stroke={2} className="text-info" />
         </button>

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
                              <h5 className="text-lg font-bold">Modal Title</h5>
                              <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal2(false)}>
                                 <svg>...</svg>
                              </button>
                           </div>
                           <div className="p-5">
                              <p>
                                 Mauris mi tellus, pharetra vel mattis sed, tempus ultrices eros. Phasellus egestas sit amet velit sed luctus. Orci
                                 varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Vivamus
                                 ultrices sed urna ac pulvinar. Ut sit amet ullamcorper mi.
                              </p>
                              <div className="mt-8 flex items-center justify-end">
                                 <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                    Discard
                                 </button>
                                 <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal2(false)}>
                                    Save
                                 </button>
                              </div>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};
