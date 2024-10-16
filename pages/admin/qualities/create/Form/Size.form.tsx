import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';
import IconPlusCircle from '@/components/Icon/IconPlusCircle';
import { IconX } from '@tabler/icons-react';
import React, { useCallback, useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';

interface DataSize {
   width?: number;
   height?: number;
   weight?: number;
   price?: number;
   cogs?: number;
}

interface SizeFormProps {
   handlerGetInput: (inputs: DataSize[]) => void;
   resetForm: boolean;
}

export const SizeForm: React.FC<SizeFormProps> = ({ handlerGetInput, resetForm }) => {
   const [inputs, setInputs] = useState<DataSize[]>([]);

   useEffect(() => {
      if (resetForm) {
         setInputs([]);
      }
   }, [resetForm]);

   const handleAdd = () => {
      setInputs([...inputs, {}]);
   };

   const handleRemove = (index: number) => {
      const updatedInputs = inputs.filter((_, i) => i !== index);
      setInputs(updatedInputs);
   };

   const handleChange = (index: number, field: keyof DataSize, value: number | undefined) => {
      const updatedInputs = [...inputs];
      updatedInputs[index] = { ...updatedInputs[index], [field]: value };
      setInputs(updatedInputs);
      handlerGetInput(updatedInputs);
   };

   const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: keyof DataSize) => {
      const value = e.target.value === '' ? undefined : Number(e.target.value);
      handleChange(index, field, value);
   };

   const handleCurrencyChange = (value: string | undefined, index: number, field: 'price' | 'cogs') => {
      const numValue = value === '' ? undefined : Number(value);
      handleChange(index, field, numValue);
   };

   return (
      <>
         {inputs.map((value, index) => (
            <div key={index} className="relative mb-5">
               <Card width={12}>
                  <div className="flex items-center justify-center gap-5">
                     <InputForm
                        label="Panjang (meter)"
                        isRequired
                        name="width"
                        type="number"
                        placeholder="10 Meter"
                        value={value.width === undefined ? '' : value.width}
                        onChange={(e) => handleNumberChange(e, index, 'width')}
                     />
                     <InputForm
                        label="Lebar (meter)"
                        isRequired
                        name="height"
                        type="number"
                        placeholder="10 Meter"
                        value={value.height === undefined ? '' : value.height}
                        onChange={(e) => handleNumberChange(e, index, 'height')}
                     />
                  </div>

                  <div className="mt-5">
                     <InputForm
                        label="Berat (Kilogram)"
                        isRequired
                        name="weight"
                        type="number"
                        placeholder="10 Kilogram"
                        value={value.weight === undefined ? '' : value.weight}
                        onChange={(e) => handleNumberChange(e, index, 'weight')}
                     />
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-5">
                     <div className="w-full">
                        <label htmlFor="price">Harga Jual</label>
                        <CurrencyInput
                           id={`price-${index}`}
                           name="price"
                           placeholder="Masukan Harga Jual"
                           className="form-input"
                           intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                           decimalsLimit={2}
                           autoComplete="off"
                           required
                           value={value.price === undefined ? '' : value.price}
                           onValueChange={(value) => handleCurrencyChange(value, index, 'price')}
                        />
                     </div>

                     <div className="w-full">
                        <label htmlFor="cogs">Harga Beli/HPP</label>
                        <CurrencyInput
                           id={`cogs-${index}`}
                           name="cogs"
                           placeholder="Masukan Harga Beli"
                           className="form-input"
                           intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                           decimalsLimit={2}
                           autoComplete="off"
                           required
                           value={value.cogs === undefined ? '' : value.cogs}
                           onValueChange={(value) => handleCurrencyChange(value, index, 'cogs')}
                        />
                     </div>
                  </div>
               </Card>
               <button type="button" onClick={() => handleRemove(index)} className="absolute right-3 top-3">
                  <IconX size={20} stroke={2} className="text-danger" />
               </button>
            </div>
         ))}

         <button type="button" onClick={handleAdd} className="btn btn-info w-full gap-1 text-center">
            <IconPlusCircle /> Ukuran
         </button>
      </>
   );
};
