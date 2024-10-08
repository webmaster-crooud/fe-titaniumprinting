import { Card } from '@/components/Card';
import { IconFileUpload, IconLoaderQuarter } from '@tabler/icons-react';
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

export const PricingSectionWizardComponent = ({
   onChangePrice,
   onChangeCogs,
   onClickSubmit,
   onClickSubmitToQuality,
   loading,
}: {
   onChangePrice: any;
   onChangeCogs: any;
   onClickSubmitToQuality: any;
   onClickSubmit: any;
   loading: any;
}) => {
   const [cardHidden, setCardHidden] = useState(true);
   const [questionHidden, setQuestionHidden] = useState(false);

   return (
      <>
         <div className={`${questionHidden ? 'hidden' : 'block'}`}>
            <Card width={8} mxAuto="mx-auto">
               <h1 className="text-xl">Apakah Komponen ini memiliki Kualitas Spesifikasi?</h1>
               <p className="text-sm text-slate-600">Seperti: Jenis, ukuran hingga berat</p>

               <div className={`mx-auto mt-5 flex w-8/12 items-center justify-center gap-10 `}>
                  <button className="btn btn-dark gap-2 uppercase" type="submit" onClick={onClickSubmitToQuality}>
                     Ya
                  </button>
                  <button
                     type="button"
                     className="btn btn-outline-dark gap-2 uppercase"
                     onClick={() => {
                        setCardHidden(false);
                        setQuestionHidden(true);
                     }}
                  >
                     Tidak
                  </button>
               </div>
            </Card>
         </div>

         <div className={`${cardHidden ? 'hidden' : 'block'}`}>
            <Card width={10} mxAuto="mx-auto">
               <div className="flex w-full items-center justify-center gap-5">
                  <div className="w-full">
                     <label htmlFor="price">Harga Jual</label>
                     <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="Masukan Harga Jual"
                        className="form-input"
                        intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                        decimalsLimit={2}
                        onValueChange={(value, name, values) => {
                           onChangePrice(values?.float);
                        }}
                     />
                  </div>

                  <div className="w-full">
                     <label htmlFor="price">Harga Beli/HPP</label>
                     <CurrencyInput
                        id="input-example"
                        name="input-name"
                        placeholder="Masukan Harga Beli"
                        className="form-input"
                        intlConfig={{ locale: 'id-ID', currency: 'IDR' }}
                        decimalsLimit={2}
                        onValueChange={(value, name, values) => onChangeCogs(values?.float)}
                     />
                  </div>
               </div>

               <div className="ml-auto mt-5 w-6/12">
                  <button type="submit" onClick={onClickSubmit} className="btn btn-primary ml-auto" disabled={loading}>
                     {loading ? (
                        <>
                           <IconLoaderQuarter size={20} stroke={2} className="animate-spin" /> <span>Loading</span>
                        </>
                     ) : (
                        <>
                           <IconFileUpload size={20} stroke={2} /> Simpan
                        </>
                     )}
                  </button>
               </div>
            </Card>
         </div>
      </>
   );
};
