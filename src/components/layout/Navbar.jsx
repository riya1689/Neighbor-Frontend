"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-amber">Neighbo</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="text-gray-900 dark:text-gray-100 hover:text-amber dark:hover:text-amber px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link href="/explore" className="text-gray-500 dark:text-gray-400 hover:text-amber dark:hover:text-amber px-3 py-2 rounded-md text-sm font-medium transition-colors">Explore</Link>
              <Link href="/categories" className="text-gray-500 dark:text-gray-400 hover:text-amber dark:hover:text-amber px-3 py-2 rounded-md text-sm font-medium transition-colors">Categories</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end px-2 max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search posts..."
              />
            </div>
          </div>
          <div className="hidden md:flex items-center ml-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                <button onClick={logout} className="text-sm font-medium text-gray-500 hover:text-amber transition-colors">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber transition-colors">Log in</Link>
                <Link href="/register" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-amber hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber transition-colors">
                  Sign up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block pl-3 pr-4 py-2 border-l-4 border-amber text-base font-medium text-amber bg-amber-50 dark:bg-gray-800">Home</Link>
            <Link href="/explore" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-amber hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-amber transition-all">Explore</Link>
            <Link href="/categories" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:text-amber hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-amber transition-all">Categories</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            {isAuthenticated ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full p-2" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email}</div>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Log in</Link>
                <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-amber hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
