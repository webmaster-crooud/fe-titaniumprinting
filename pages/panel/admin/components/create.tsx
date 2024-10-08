import { BackButton } from '@/components/Button/Back.button';
import { Card } from '@/components/Card';
import { InputForm } from '@/components/Form/input.form';
import { IconEdit, IconHome2, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Wizard } from './Layouts/Wizard';

const CreateComponentsPage = () => {
   return (
      <section className="relative">
         <ol className="mb-3 flex border-b border-gray-500/30 pb-1 font-semibold text-gray-500 dark:border-white-dark/30 dark:text-white-dark">
            <li>
               <Link href="/panel/admin" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  <IconHome2 size={18} stroke={2.5} />
               </Link>
            </li>
            <li className="before:px-1.5 before:content-['/']">
               <Link href="/panel/admin/components" className="hover:text-gray-500/70 dark:hover:text-white-dark/70">
                  Komponen
               </Link>
            </li>

            <li className="before:px-1.5 before:content-['/']">
               <Link
                  href="/panel/admin/products/create"
                  className="text-black hover:text-black/70 dark:text-white-light dark:hover:text-white-light/70"
               >
                  Create
               </Link>
            </li>
         </ol>

         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Formulir Data Komponen</h1>
            <BackButton text="Kembali" url="components" />
         </div>

         <Wizard />
      </section>
   );
};

export default CreateComponentsPage;
