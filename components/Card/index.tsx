import React from 'react';

export const Card = ({ children, width, colSpan }: { children: React.ReactNode; width: number; colSpan?: string }) => {
   return <div className={`rounded-lg bg-white p-5 pb-8 shadow-lg dark:bg-black w-${width}/12 ${colSpan}`}>{children}</div>;
};
