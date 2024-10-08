import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IconCaretsDown from '@/components/Icon/IconCaretsDown';
import IconMenuDashboard from '@/components/Icon/Menu/IconMenuDashboard';
import IconCaretDown from '@/components/Icon/IconCaretDown';
import IconMinus from '@/components/Icon/IconMinus';
import IconMenuScrumboard from '@/components/Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '@/components/Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '@/components/Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '@/components/Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '@/components/Icon/Menu/IconMenuComponents';
import IconMenuElements from '@/components/Icon/Menu/IconMenuElements';
import IconMenuCharts from '@/components/Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '@/components/Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '@/components/Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '@/components/Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '@/components/Icon/Menu/IconMenuTables';
import IconMenuDatatables from '@/components/Icon/Menu/IconMenuDatatables';
import IconMenuForms from '@/components/Icon/Menu/IconMenuForms';
import IconMenuUsers from '@/components/Icon/Menu/IconMenuUsers';
import IconMenuPages from '@/components/Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '@/components/Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '@/components/Icon/Menu/IconMenuDocumentation';
import Image from 'next/image';

const Sidebar = () => {
   const router = useRouter();
   const [currentMenu, setCurrentMenu] = useState<string>('');
   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
   const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
   const toggleMenu = (value: string) => {
      setCurrentMenu((oldValue) => {
         return oldValue === value ? '' : value;
      });
   };

   useEffect(() => {
      const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
      if (selector) {
         selector.classList.add('active');
         const ul: any = selector.closest('ul.sub-menu');
         if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
            if (ele.length) {
               ele = ele[0];
               setTimeout(() => {
                  ele.click();
               });
            }
         }
      }
   }, []);

   useEffect(() => {
      setActiveRoute();
      if (window.innerWidth < 1024 && themeConfig.sidebar) {
         dispatch(toggleSidebar());
      }
   }, [router.pathname]);

   const setActiveRoute = () => {
      let allLinks = document.querySelectorAll('.sidebar ul a.active');
      for (let i = 0; i < allLinks.length; i++) {
         const element = allLinks[i];
         element?.classList.remove('active');
      }
      const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
      selector?.classList.add('active');
   };

   const dispatch = useDispatch();

   return (
      <div className={semidark ? 'dark' : ''}>
         <nav
            className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
               semidark ? 'text-white-dark' : ''
            }`}
         >
            <div className="h-full bg-white dark:bg-black">
               <div className="flex items-center justify-between px-4 py-3">
                  <Link href="/" className="main-logo flex shrink-0 items-center">
                     <Image
                        className="ml-[5px] flex-none"
                        style={{ width: 'auto', height: 'auto' }}
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={100}
                        height={100}
                     />
                     <span className="sr-only align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5">
                        {'VRISTO'}
                     </span>
                  </Link>

                  <button
                     type="button"
                     className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
                     onClick={() => dispatch(toggleSidebar())}
                  >
                     <IconCaretsDown className="m-auto rotate-90" />
                  </button>
               </div>
               <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                  <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                     <li className="menu nav-item">
                        <button
                           type="button"
                           className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`}
                           onClick={() => toggleMenu('dashboard')}
                        >
                           <div className="flex items-center">
                              <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{'dashboard'}</span>
                           </div>

                           <div className={currentMenu !== 'dashboard' ? '-rotate-90 rtl:rotate-90' : ''}>
                              <IconCaretDown />
                           </div>
                        </button>

                        <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                           <ul className="sub-menu text-gray-500">
                              <li>
                                 <Link href="/">{'sales'}</Link>
                              </li>
                              <li>
                                 <Link href="/analytics">{'analytics'}</Link>
                              </li>
                              <li>
                                 <Link href="/finance">{'finance'}</Link>
                              </li>
                              <li>
                                 <Link href="/crypto">{'crypto'}</Link>
                              </li>
                           </ul>
                        </AnimateHeight>
                     </li>

                     <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                        <IconMinus className="hidden h-5 w-4 flex-none" />
                        <span>{'Produk'}</span>
                     </h2>

                     {/* Producst */}
                     <li className="menu nav-item">
                        <button
                           type="button"
                           className={`${currentMenu === 'panel/admin/products' ? 'active' : ''} nav-link group w-full`}
                           onClick={() => toggleMenu('panel/admin/products')}
                        >
                           <div className="flex items-center">
                              <IconMenuComponents className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{'Produk'}</span>
                           </div>

                           <div className={currentMenu !== 'panel/admin/products' ? '-rotate-90 rtl:rotate-90' : ''}>
                              <IconCaretDown />
                           </div>
                        </button>

                        <AnimateHeight duration={300} height={currentMenu === 'panel/admin/products' ? 'auto' : 0}>
                           <ul className="sub-menu text-gray-500">
                              <li>
                                 <Link href="/panel/admin/products">{'List Produk'}</Link>
                              </li>
                              <li>
                                 <Link href="/panel/admin/products/create">{'Tambah Produk'}</Link>
                              </li>
                              <li>
                                 <Link href="/panel/admin/products/disabled">{'List Produk Disable'}</Link>
                              </li>
                           </ul>
                        </AnimateHeight>
                     </li>

                     {/* components */}
                     <li className="menu nav-item">
                        <button
                           type="button"
                           className={`${currentMenu === 'panel/admin/components' ? 'active' : ''} nav-link group w-full`}
                           onClick={() => toggleMenu('panel/admin/components')}
                        >
                           <div className="flex items-center">
                              <IconMenuDatatables className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{'Komponen'}</span>
                           </div>

                           <div className={currentMenu !== 'panel/admin/components' ? '-rotate-90 rtl:rotate-90' : ''}>
                              <IconCaretDown />
                           </div>
                        </button>

                        <AnimateHeight duration={300} height={currentMenu === 'panel/admin/components' ? 'auto' : 0}>
                           <ul className="sub-menu text-gray-500">
                              <li>
                                 <Link href="/panel/admin/components">{'Komponen Material'}</Link>
                              </li>
                              <li>
                                 <Link href="/panel/admin/components/create">{'Kalitas Material'}</Link>
                              </li>
                              <li>
                                 <Link href="/panel/admin/components/disabled">{'Ukuran'}</Link>
                              </li>
                           </ul>
                        </AnimateHeight>
                     </li>

                     {/* Categories */}
                     <li className="menu nav-item">
                        <button
                           type="button"
                           className={`${currentMenu === 'panel/admin/categories' ? 'active' : ''} nav-link group w-full`}
                           onClick={() => toggleMenu('panel/admin/categories')}
                        >
                           <div className="flex items-center">
                              <IconMenuScrumboard className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{'Kategori'}</span>
                           </div>

                           <div className={currentMenu !== 'panel/admin/categories' ? '-rotate-90 rtl:rotate-90' : ''}>
                              <IconCaretDown />
                           </div>
                        </button>

                        <AnimateHeight duration={300} height={currentMenu === 'panel/admin/categories' ? 'auto' : 0}>
                           <ul className="sub-menu text-gray-500">
                              <li>
                                 <Link href="/panel/admin/categories">{'List Kategori'}</Link>
                              </li>
                              <li>
                                 <Link href="/panel/admin/categories/disabled">{'List Kategori Disable'}</Link>
                              </li>
                           </ul>
                        </AnimateHeight>
                     </li>

                     <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                        <IconMinus className="hidden h-5 w-4 flex-none" />
                        <span>{'Akun'}</span>
                     </h2>

                     {/* Accounts */}
                     <li className="menu nav-item">
                        <button
                           type="button"
                           className={`${currentMenu === 'accounts' ? 'active' : ''} nav-link group w-full`}
                           onClick={() => toggleMenu('accounts')}
                        >
                           <div className="flex items-center">
                              <IconMenuUsers className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{'Akun'}</span>
                           </div>

                           <div className={currentMenu !== 'accounts' ? '-rotate-90 rtl:rotate-90' : ''}>
                              <IconCaretDown />
                           </div>
                        </button>

                        <AnimateHeight duration={300} height={currentMenu === 'accounts' ? 'auto' : 0}>
                           <ul className="sub-menu text-gray-500">
                              <li>
                                 <Link href="/accounts">{'List Member'}</Link>
                              </li>
                              <li>
                                 <Link href="/accounts/create">{'Tambah Member'}</Link>
                              </li>
                              <li>
                                 <Link href="/accounts/disabled">{'List Suspend Member'}</Link>
                              </li>
                           </ul>
                        </AnimateHeight>
                     </li>

                     {/* Role */}
                     <li className="menu nav-item">
                        <button
                           type="button"
                           className={`${currentMenu === 'role' ? 'active' : ''} nav-link group w-full`}
                           onClick={() => toggleMenu('role')}
                        >
                           <div className="flex items-center">
                              <IconMenuFontIcons className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{'Role User'}</span>
                           </div>

                           <div className={currentMenu !== 'role' ? '-rotate-90 rtl:rotate-90' : ''}>
                              <IconCaretDown />
                           </div>
                        </button>

                        <AnimateHeight duration={300} height={currentMenu === 'role' ? 'auto' : 0}>
                           <ul className="sub-menu text-gray-500">
                              <li>
                                 <Link href="/role">{'List Role Level'}</Link>
                              </li>
                              <li>
                                 <Link href="/role/create">{'Tambah Role'}</Link>
                              </li>
                              <li>
                                 <Link href="/role/disabled">{'List Suspend Role'}</Link>
                              </li>
                           </ul>
                        </AnimateHeight>
                     </li>
                  </ul>
               </PerfectScrollbar>
            </div>
         </nav>
      </div>
   );
};

export default Sidebar;
