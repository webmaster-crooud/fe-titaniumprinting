import { PropsWithChildren } from 'react';
import App from '../../App';

const BlankLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <div className="min-h-screen text-black dark:text-white-dark">{children} </div>
        </App>
    );
};

export default BlankLayout;
