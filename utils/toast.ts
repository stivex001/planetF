import { toast } from 'react-toastify';

export const toastNotification = ({
  status,
  message,
}: {
  status: 'success' | 'error';
  message: string;
}) => {
  const toastFunction = status === 'success' ? toast.success : toast.error;

  toastFunction(message, {
    className: 'w-full',
    bodyClassName: 'px-40',
    position: toast.POSITION.TOP_CENTER,
    style: { minWidth: 300, top: 60 },
  });

  return;
};
