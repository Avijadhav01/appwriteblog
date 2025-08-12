import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';

import { login, logout } from './Store/authSlice';
import { Header, Footer } from './Components/index';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 text-xl font-medium">
        ◯ Loading BlogZone...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* ToastContainer should be here */}
      <ToastContainer position="top-center" autoClose={2000} />
      <Header />
      <main className="flex-grow border-[1px] border-[#ddd] ">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default App;
