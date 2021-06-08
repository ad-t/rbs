import React, { ErrorInfo } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default class ErrorToast extends React.PureComponent {
  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.log('Caught error');
    console.log(error);
    toast(`${error} ${errorInfo}`);
  };

  render() {
    const { children } = this.props;
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }
}
