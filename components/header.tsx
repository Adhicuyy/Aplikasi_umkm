'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Menu, X, ChefHat, LoaderCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from './button';
import { logoutAccount } from '@/actions/logout';

interface IProps {
  scrolledEffect?: boolean;
  token?: string;
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Stores', path: '/stores' },
  { label: 'Products', path: '/products' },
];

function Header({ scrolledEffect = true, token }: IProps) {
  const [loading, startServer] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    if (!loading) {
      startServer(() => {
        logoutAccount();
      });
    }
  }

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    if (scrolledEffect) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [scrolledEffect]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const headerClass = isScrolled ? 'bg-white shadow-md' : 'bg-transparent';
  const textClass = isScrolled ? 'text-gray-800' : 'text-white drop-shadow-md';

  const navLinkClass = (path: string) => `
    ${textClass} font-medium transition-colors duration-200 px-4 py-2 rounded-lg
    ${pathname === path ? 'bg-orange-500/90 text-white' : `hover:text-orange-500 ${isScrolled ? 'hover:bg-orange-50' : 'hover:bg-white/10'}`}
  `;

  return (
    <header className={`${headerClass} fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <ChefHat className={`${textClass} w-8 h-8 md:w-10 md:h-10`} />
            <span className={`${textClass} ml-2 text-xl md:text-2xl font-bold`}>
              FoodStreet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              if (link.path === '/dashboard' && !token) return null;

              return (
                <Link key={link.path} href={link.path} className={navLinkClass(link.path)}>
                  {link.label}
                </Link>
              )
            })}
            <div className="ml-10 flex space-x-3">
              {!token ? (
                <Link href="/login">
                  <Button
                    variant={isScrolled ? "outline" : "text"}
                    className={!isScrolled ? 'text-white hover:bg-white/10 border-2 border-transparent' : ''}
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <Button onClick={handleLogout} disabled={loading} className="gap-2">
                  {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                  Logout
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} className={textClass} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden bg-white mt-8 p-6 rounded-lg shadow-lg absolute left-4 right-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                if (link.path === '/dashboard' && !token) return null;

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={closeMenu}
                    className={`
                      font-medium transition-colors duration-200 py-2 px-4 rounded-lg
                      ${isActive ? 'text-orange-500 bg-orange-50' : 'text-gray-800 hover:text-orange-500 hover:bg-orange-50'}
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-4 pt-2">
                {!token ? (
                  <>
                    <Link href="/login" onClick={closeMenu}>
                      <Button variant="outline" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={closeMenu}>
                      <Button fullWidth>
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button fullWidth onClick={handleLogout} disabled={loading} className="gap-2">
                    {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
