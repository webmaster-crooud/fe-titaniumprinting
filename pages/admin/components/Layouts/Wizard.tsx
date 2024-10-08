import { IconComponents, IconPackageExport, IconReceipt2 } from '@tabler/icons-react';
import React, { useState } from 'react';
import { MainSectionWizardComponent } from '../Sections/Main';
import { StockSectionWizardComponent } from '../Sections/Stock';
import { PricingSectionWizardComponent } from '../Sections/Pricing';

interface HandlerOption {
   onChangeName: any;
   onChangeTypeComponent: any;
   onChangeImage: any;
   onChangeTypePieces: any;
   onChangeQtyPieces: any;
   onChangePrice: any;
   onChangeCogs: any;
   valueName: any;
   valueTypeComponent: any;
   valueImage: any;
   valueTypePieces: any;
   valueQtyPieces: any;
   onClickSubmit: any;
   onClickSubmitToQuality: any;
   loading: any;
}
export const Wizard: React.FC<HandlerOption> = ({
   onChangeName,
   onChangeImage,
   onChangeTypeComponent,
   onChangeTypePieces,
   onChangeQtyPieces,
   onChangePrice,
   onChangeCogs,
   valueName,
   valueImage,
   valueTypeComponent,
   valueTypePieces,
   valueQtyPieces,
   onClickSubmit,
   onClickSubmitToQuality,
   loading,
}) => {
   const [activeTab3, setActiveTab3] = useState<any>(1);
   return (
      <div className="inline-block w-full">
         <div className="relative z-[1]">
            <div
               className={`${activeTab3 === 1 ? 'w-[15%]' : activeTab3 === 2 ? 'w-[48%]' : activeTab3 === 3 ? 'w-[81%]' : ''}
                absolute top-[20px] -z-[1] m-auto h-1 w-[15%] bg-primary transition-[width] ltr:left-0 rtl:right-0`}
            ></div>
            <ul className="mb-5 grid grid-cols-3">
               <li className="mx-auto">
                  <button
                     type="button"
                     className={`${activeTab3 === 1 ? '!border-primary !bg-primary text-white' : ''}
                flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                     onClick={() => setActiveTab3(1)}
                  >
                     <IconComponents size={30} stroke={1.5} />
                  </button>
               </li>
               <li className="mx-auto">
                  <button
                     type="button"
                     className={`${activeTab3 === 2 ? '!border-primary !bg-primary text-white' : ''}
                flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                     onClick={() => setActiveTab3(2)}
                  >
                     <IconPackageExport size={30} stroke={1.5} />
                  </button>
               </li>
               <li className="mx-auto">
                  <button
                     type="button"
                     className={`${activeTab3 === 3 ? '!border-primary !bg-primary text-white' : ''}
                flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                     onClick={() => setActiveTab3(3)}
                  >
                     <IconReceipt2 size={30} stroke={1.5} />
                  </button>
               </li>
            </ul>
         </div>
         <div>
            <section className="mb-5">
               {activeTab3 === 1 && (
                  <MainSectionWizardComponent
                     onChangeName={onChangeName}
                     valueName={valueName}
                     onChangeTypeComponent={onChangeTypeComponent}
                     valueTypeComponent={valueTypeComponent}
                     onChangeImage={onChangeImage}
                     valueImage={valueImage}
                  />
               )}
            </section>

            <section className="mb-5">
               {activeTab3 === 2 && (
                  <StockSectionWizardComponent
                     valueTypePieces={valueTypePieces}
                     onChangeTypePieces={onChangeTypePieces}
                     valueQtyPieces={valueQtyPieces}
                     onChangeQtyPieces={onChangeQtyPieces}
                     setActiveTab={setActiveTab3}
                     activeTab={activeTab3}
                  />
               )}
            </section>

            <section className="mb-5">
               {activeTab3 === 3 && (
                  <PricingSectionWizardComponent
                     onChangePrice={onChangePrice}
                     onChangeCogs={onChangeCogs}
                     onClickSubmit={onClickSubmit}
                     onClickSubmitToQuality={onClickSubmitToQuality}
                     loading={loading}
                  />
               )}
            </section>
         </div>
         <div className="flex justify-between">
            <button
               type="button"
               className={`btn btn-primary ${activeTab3 === 1 ? 'hidden' : ''}`}
               onClick={() => setActiveTab3(activeTab3 === 3 ? 2 : 1)}
            >
               Kembali
            </button>
            <button
               type="button"
               className={`btn btn-primary ml-auto ${activeTab3 === 3 ? 'hidden' : ''}`}
               onClick={() => setActiveTab3(activeTab3 === 1 ? 2 : 3)}
            >
               Selanjutnya
            </button>
         </div>
      </div>
   );
};
