import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';

export const StockSectionWizardComponent = () => {
   return (
      <Card width={10} mxAuto="mx-auto">
         <h1 className="text-xl">Apakah Komponen ini memiliki Satuan atau Kuantitas?</h1>
         <p className="text-sm font-bold text-info">Jika tidak, silahkan melewati tahap ini</p>
         <div className="mt-5 flex w-full items-center justify-center gap-5">
            <InputForm label="Tipe Satuan" name="typePieces" type="text" placeholder="Masukan Tipe Satuan Komponen" />
            <InputForm label="Stok" name="qtyPieces" type="number" placeholder="Masukan Stok Komponen" />
         </div>
      </Card>
   );
};
