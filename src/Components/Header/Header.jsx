import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation(); // ⬅️ Get current route

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-2 bg-sky-600 shadow-md sticky top-0 z-10 ">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo and Blog Title */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Logo width={50} />
            </Link>
            <h1 className="text-white text-lg sm:text-xl font-semibold">BlogZone</h1>
          </div>

          {/* Navigation Menu */}
          <ul className="flex gap-2 items-center mt-3 sm:mt-0">
            {navItems.map((item) => {
              const isActive = location.pathname === item.slug;

              return (
                item.active && (
                  <li key={item.name} className="md:text-[14px] text-[10px]">
                    <Link
                      to={item.slug}
                      className={`px-4 py-2 rounded-lg transition duration-300 ${isActive
                        ? "bg-white text-sky-700 font-semibold"
                        : "text-white hover:text-sky-100 hover:bg-sky-500"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              );
            })}
            {authStatus && (
              <li className="ml-2 sm:ml-6">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
