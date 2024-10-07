import { IconArrowBack } from '@tabler/icons-react';
import Link from 'next/link';

export const BackButton = ({ text, url }: { text: string; url: string }) => {
   return (
      <Link href={`/panel/admin/${url}`} className="btn btn-danger btn-sm gap-2 uppercase" type="reset">
         <IconArrowBack size={17} stroke={2.2} />
         <span className="mt-0.5 font-bold">{text}</span>
      </Link>
   );
};
