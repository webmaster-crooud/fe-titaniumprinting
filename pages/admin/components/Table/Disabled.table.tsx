import React, { useEffect, useState } from 'react';
import { showAlert } from '@/components/Alert';
import { CreateButton } from '@/components/Button/Create.button';
import { StoneLoader } from '@/components/StoneLoader';
import { BACKEND_URL } from '@/utils/conf.backend';
import {
   IconActivity,
   IconArrowRightToArc,
   IconCalendar,
   IconCapture,
   IconCaptureOff,
   IconLoadBalancer,
   IconLoaderQuarter,
   IconSearch,
   IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { DeleteComponentModal } from '../Modal';

interface DataComponent {
   data: [
      {
         id: string;
         name: string;
         price: number;
         cogs: number;
         createdAt: string;
         updatedAt: string;
         flag: string;
      }
   ];
}

export const DisabledComponentsTable = () => {
   const [loading, setLoading] = useState(false);
   const [loadingDisabled, setLoadingDisabled] = useState(false);
   const [components, setComponents] = useState<DataComponent | null>(null);

   const fetchComponents = async () => {
      setLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1500));
         const response = await fetch(`${BACKEND_URL}/components/disabled`);
         const result = await response.json();

         if (result.error === true) {
            showAlert('warning', result.message);
            setComponents(null);
         } else {
            setComponents(result);
            setLoading(false);
         }
      } catch (error) {
         showAlert('error', 'Terjadi kesalahan');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchComponents();
   }, []);

   const handlerActivedComponets = async (componentId: string, flag: string) => {
      setLoadingDisabled(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1500));
         const response = await fetch(`${BACKEND_URL}/components/${componentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flag: flag }),
         });

         const result = await response.json();
         if (result.error === true) {
            showAlert('error', result.message);
            setLoadingDisabled(false);
            return;
         }
         fetchComponents();
         setLoadingDisabled(false);
         showAlert('success', result.message);
      } catch (error) {
         showAlert('error', 'Terjadi Kesalahan');
         setLoadingDisabled(false);
      } finally {
         setLoadingDisabled(false);
      }
   };

   const formatCurrency = (number: number) => {
      return new Intl.NumberFormat('id-ID', {
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
         style: 'currency',
         currency: 'IDR',
      }).format(number);
   };

   return (
      <>
         <div className="mb-3 flex w-full items-center justify-between">
            <form>
               <div className="relative flex rounded-lg border border-white-dark/20">
                  <button type="submit" placeholder="Cari Komponen" className="m-auto flex items-center justify-center p-3 text-primary">
                     <IconSearch size={16} stroke={2.5} />
                  </button>
                  <input
                     type="text"
                     placeholder="Cari Komponen"
                     className="form-input rounded-lg border-0 border-l bg-white py-3 placeholder:tracking-wider focus:shadow-[0_0_5px_2px_rgb(194_213_255_/_62%)] focus:outline-none dark:shadow-[#1b2e4b]"
                  />
               </div>
            </form>
         </div>

         {/* Table */}
         <table>
            <thead>
               <tr>
                  <th>Nama Komponen</th>
                  <th>Harga Komponen</th>
                  <th>HPP Komponen</th>
                  <th className="text-center">
                     <div className="flex items-center justify-center">
                        <IconActivity size={20} stroke={2} />
                     </div>
                  </th>
                  <th className="text-end">
                     <div className="flex items-center justify-end gap-1">
                        Tanggal <IconCalendar size={20} stroke={2} />
                     </div>
                  </th>
               </tr>
            </thead>
            {loading ? (
               <tbody>
                  <tr>
                     <StoneLoader />
                  </tr>
               </tbody>
            ) : (
               <tbody>
                  {components?.data.map((component) => (
                     <tr key={component.id}>
                        <td>{component.name}</td>
                        <td>{!component.price ? 0 : formatCurrency(component.price)},-</td>
                        <td>{!component.cogs ? 0 : formatCurrency(component.cogs)},-</td>
                        <td className="bg-info-dark-light">
                           <div className="flex items-center justify-center gap-2">
                              <Tippy content="Aktifasi">
                                 <button type="button" onClick={() => handlerActivedComponets(component.id, component.flag)}>
                                    {loadingDisabled ? (
                                       <IconLoaderQuarter className="animate-spin" size={20} stroke={2} />
                                    ) : (
                                       <IconCapture className="text-info" size={20} stroke={2} />
                                    )}
                                 </button>
                              </Tippy>
                              <DeleteComponentModal component={fetchComponents} componentId={component.id} name={component.name} />
                           </div>
                        </td>
                        {component.createdAt != component.updatedAt ? (
                           <td className="text-end">{dayjs(component.updatedAt).locale('id').format('MMMM, D YYYY')}</td>
                        ) : (
                           <td className="text-end">{dayjs(component.createdAt).locale('id').format('MMMM, D YYYY')}</td>
                        )}
                     </tr>
                  ))}
               </tbody>
            )}
         </table>
      </>
   );
};
