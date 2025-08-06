import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './Store/Store.js';
import './index.css';
import App from './App.jsx';

import { AuthLayout, Login } from "./Components/index.js";
import Home from "./Pages/Home.jsx";
import AddPost from "./Pages/AddPost.jsx";
import Signup from './Pages/Signup.jsx';
import EditPost from './Pages/EditPost.jsx';
import AllPosts from './Pages/AllPosts.jsx';
import Post from './Pages/Post.jsx';

import { SpeedInsights } from "@vercel/speed-insights/next"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthLayout authentication={false}>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout authentication={false}>
                  <Signup />
                </AuthLayout>
              }
            />
            <Route
              path="/all-posts"
              element={
                <AuthLayout authentication>
                  <AllPosts />
                </AuthLayout>
              }
            />
            <Route
              path="/add-post"
              element={
                <AuthLayout authentication>
                  <AddPost />
                </AuthLayout>
              }
            />
            <Route
              path="/edit-post/:slug"
              element={
                <AuthLayout authentication>
                  <EditPost />
                </AuthLayout>
              }
            />
            <Route path="/post/:slug" element={<Post />} />
          </Routes>
        </App>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
