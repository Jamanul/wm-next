'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' }, 
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname()
  const session =useSession();
  // console.log(session)
  return (
    <nav className="bg-gray-900 shadow-lg p-4 text-white fixed w-full" >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-400">
          <Link href="/">WM Next</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            {session.data?.user?.email ? <Link
                href={"/dashboard"}
                className={`hover:text-blue-400 transition-colors duration-300 `}
              >
                Dashboard
              </Link> : ''}
          </li>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`${pathName ==link.path ? 'text-blue-400 transition-colors duration-300' : 'hover:text-blue-400 transition-colors duration-300' } `}
              >
                {link.name}
              </Link>
            </li>
            
          ))}
            <li>
    {session.status === "authenticated" ? (
      <button
        onClick={() => signOut()}
        className="hover:text-red-500 transition-colors duration-300"
      >
        Logout
      </button>
    ) : (
      <Link href='/login'>
      <button
        
        className="hover:text-blue-400 transition-colors duration-300 cursor-pointer"
      >
        Login
      </button></Link>
    )}
  </li>
        </ul>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 px-4 font-medium text-white">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="block py-2 hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
