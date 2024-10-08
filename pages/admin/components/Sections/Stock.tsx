import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';
import React, { useState } from 'react';

interface HandlerOption {
   onChangeTypePieces: any;
   valueTypePieces: any;
   onChangeQtyPieces: any;
   valueQtyPieces: any;
   setActiveTab: any;
   activeTab: any;
}

export const StockSectionWizardComponent: React.FC<HandlerOption> = ({
   onChangeQtyPieces,
   valueQtyPieces,
   onChangeTypePieces,
   valueTypePieces,

   setActiveTab,
   activeTab,
}) => {
   const [inputHidden, setInputHidden] = useState(true);
   const [buttonHidden, setButtonHidden] = useState(false);
   return (
      <Card width={10} mxAuto="mx-auto">
         <h1 className="text-xl">Apakah Komponen ini memiliki Satuan atau Kuantitas?</h1>
         <p className="text-sm font-bold text-info">Jika tidak, silahkan melewati tahap ini</p>
         <div className={`mx-auto mt-5 flex w-8/12 items-center justify-center gap-10 ${buttonHidden ? 'hidden' : ''}`}>
            <button
               type="button"
               className="btn btn-dark gap-2 uppercase"
               onClick={() => {
                  setInputHidden(false);
                  setButtonHidden(true);
               }}
            >
               Ya
            </button>
            <button className="btn btn-outline-dark gap-2 uppercase" type="button" onClick={() => setActiveTab(activeTab === 2 && 3)}>
               Tidak
            </button>
         </div>
         <div className={`mt-5 flex w-full items-center justify-center gap-5 ${inputHidden ? 'hidden' : ''}`}>
            <InputForm
               label="Tipe Satuan"
               name="typePieces"
               type="text"
               onChange={onChangeTypePieces}
               value={valueTypePieces}
               placeholder="Masukan Tipe Satuan Komponen"
            />
            <InputForm
               label="Stok"
               name="qtyPieces"
               type="number"
               onChange={onChangeQtyPieces}
               value={valueQtyPieces}
               placeholder="Masukan Stok Komponen"
            />
         </div>
      </Card>
   );
};
