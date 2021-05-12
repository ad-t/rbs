import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorToast({
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  useEffect(() => {
    window.onerror = (message, _, __, ___, error) => {
      toast(error?.message);
      return true;
    };
  }, []);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
