import React from 'react';

export const Card = ({ children, width, colSpan, mxAuto }: { children: React.ReactNode; width: number; colSpan?: string; mxAuto?: string }) => {
   return <div className={`rounded-lg bg-white p-5 pb-8 shadow-lg dark:bg-black w-${width}/12 ${colSpan} ${mxAuto}`}>{children}</div>;
};
