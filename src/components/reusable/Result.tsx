import Image from 'next/image';
import { Button } from './Button';

import ErrorIcon from '../../../public/error.svg';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

const Error: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image className="dark:invert" width={120} src={ErrorIcon} alt="" />
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Ouch!</h1>
        <p className="text-md font-medium">
          Something wrong happens in our side, please try again later
        </p>
        <br />
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    </div>
  );
};

const Info: React.FC<{
  title?: string;
  message: string;
  icon?: React.ReactElement;
  children?: React.ReactNode;
}> = ({ title, message, icon, children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      {icon || <InformationCircleIcon className="h-20 w-20" />}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">{title || 'Info'}</h1>
        <p className="text-md font-medium">{message}</p>
        {children && <br />}
        {children}
      </div>
    </div>
  );
};

export { Error, Info };
