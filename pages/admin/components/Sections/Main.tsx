import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';

import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import React, { useState } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { Props as SelectProps } from 'react-select';
import dynamic from 'next/dynamic';
import { Option } from '../create';

interface HandlerOption {
   onChangeName: any;
   onChangeTypeComponent: any;
   onChangeImage: any;
   valueName: any;
   valueTypeComponent: any;
   valueImage: any;
}

const options = [
   { value: 'MATERIAL', label: 'Material' },
   { value: 'ADDON', label: 'Addon' },
   { value: 'FINISHING', label: 'Finishing' },
   { value: 'PROCESSING', label: 'Processing' },
   { value: 'CONSUMING', label: 'Consuming' },
];

const Select = dynamic<SelectProps<Option, true>>(() => import('react-select'), {
   ssr: false,
}) as React.ComponentType<SelectProps<Option, true>>;
export const MainSectionWizardComponent: React.FC<HandlerOption> = ({
   onChangeName,
   valueName,
   valueTypeComponent,
   onChangeTypeComponent,
   valueImage,
   onChangeImage,
}) => {
   const maxNumber = 69;

   return (
      <Card width={10} mxAuto="mx-auto">
         <div className="flex w-full items-center justify-center gap-5">
            <InputForm
               label="Nama Komponen*"
               value={valueName}
               onChange={onChangeName}
               name="name"
               isRequired
               type="text"
               placeholder="Nama Komponen Material"
            />
            <div className="w-full">
               <label htmlFor="typeComponent">Tipe Komponen*</label>
               <Select defaultValue={valueTypeComponent} options={options} isSearchable={false} onChange={onChangeTypeComponent} />
            </div>
         </div>

         <div className="mt-5">
            <label htmlFor="">Image</label>
            <ImageUploading multiple value={valueImage} onChange={onChangeImage} maxNumber={maxNumber} dataURLKey="data_url">
               {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                  <div className="w-full rounded-lg border border-slate-200 p-5">
                     <button
                        type="button"
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        className={`flex h-20 w-full items-center justify-center rounded-lg border border-slate-300 shadow-inner ${
                           isDragging ? 'scale-105 text-info transition-all duration-200 ease-in-out' : 'text-sm text-slate-500'
                        }`}
                     >
                        <span className={isDragging ? 'text-info' : 'text-sm text-slate-500'}>Clik or Drag Image Here</span>
                     </button>

                     <div className="my-3 flex items-center justify-end">
                        <button
                           type="button"
                           onClick={onImageRemoveAll}
                           className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-danger-dark-light p-2 text-danger"
                        >
                           <IconTrash size={20} stroke={2.5} className="text-danger" />
                           <p>Hapus Semua</p>
                        </button>
                     </div>
                     <div className="grid grid-cols-5 items-start gap-2">
                        {imageList.map((image, index) => (
                           <div key={index} className="relative w-full border border-slate-800">
                              <Image src={image['data_url']} alt="" width={100} height={100} className="h-full w-full" />
                              <div className="absolute right-0 top-0 flex items-center justify-center gap-1 bg-white/80 px-2 py-1">
                                 <button className="text-sm font-semibold text-info" onClick={() => onImageUpdate(index)}>
                                    <IconEdit size={20} stroke={1.5} />
                                 </button>
                                 <button className="text-sm font-semibold text-danger" onClick={() => onImageRemove(index)}>
                                    <IconTrash size={20} stroke={1.5} className="text-danger" />
                                 </button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </ImageUploading>
         </div>
      </Card>
   );
};
