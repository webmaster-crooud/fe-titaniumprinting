import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

export const CreateButton = ({ text, url }: { text: string; url: string }) => {
   return (
      <Link href={`/admin/${url}`} className="btn btn-primary gap-2 uppercase">
         <IconPlus size={15} stroke={2.2} />
         <span className="mt-0.5 font-bold">{text}</span>
      </Link>
   );
};
