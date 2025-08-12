import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Spinner = () => (
  <div className="flex flex-col justify-center items-center py-20 min-h-[60vh] bg-white">
    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin">
    </div>
    <p className="mt-4 text-lg text-gray-700 font-medium">
      Checking authentication...
    </p>
  </div>
);

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/login');
      return;
    }
    if (!authentication && authStatus) {
      navigate('/');
      return;
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <Spinner /> : <>{children}</>;
}
