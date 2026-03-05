'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import {
  Sun,
  Moon,
  Menu,
  X,
  MessageSquare,
  User2,
  FolderGit,
  Phone,
  HomeIcon,
  MessageSquareQuote
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggle } = useTheme();
  const router = useRouter();

  const linkBase =
    "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-md transform hover:scale-105";

  const linkStyle = isDarkMode
    ? "hover:text-blue-400 hover:bg-gray-800 text-gray-200"
    : "hover:text-blue-600 hover:bg-blue-50 text-gray-700";

  return (
    <nav
      className={`fixed top-0 Navbar left-0 w-full p-4 z-10 border-b transition-colors duration-200 ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-gray-50 border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo */}
        <h1
          className="text-2xl md:text-3xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => router.push("/")}
        >
          Butt{" "}
          <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>
            Networks
          </span>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden min-[1021px]:flex space-x-1 items-center">
          <li>
            <Link href="/" className={`${linkBase} ${linkStyle}`}>
              <HomeIcon size={18} /> Home
            </Link>
          </li>

          <li>
            <Link href="/#About" className={`${linkBase} ${linkStyle}`}>
              <MessageSquare size={18} /> About
            </Link>
          </li>

          <li>
            <Link href="/projects" className={`${linkBase} ${linkStyle}`}>
              <FolderGit size={18} /> Projects
            </Link>
          </li>

          <li>
            <Link href="/#testimonials" className={`${linkBase} ${linkStyle}`}>
              <MessageSquareQuote size={18} /> Testimonials
            </Link>
          </li>

          <li>
            <Link href="/#founder" className={`${linkBase} ${linkStyle}`}>
              <User2 size={18} /> Team
            </Link>
          </li>

          <li>
            <Link href="/Contact" className={`${linkBase} ${linkStyle}`}>
              <Phone size={18} /> Contact
            </Link>
          </li>

          {/* Dark Mode Toggle */}
          <li>
            <button
              onClick={toggle}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:text-yellow-500"
            >
              {isDarkMode ? <Moon size={22} /> : <Sun size={22} />}
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`min-[1021px]:hidden text-2xl transition-all duration-200 hover:scale-110 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul
          className={`min-[1021px]:hidden mt-4 space-y-2 rounded-lg py-4 shadow-lg border transition-all duration-200 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <li>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                linkStyle
              }`}
            >
              <HomeIcon size={18} /> Home
            </Link>
          </li>

          <li>
            <Link
              href="/#About"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${linkStyle}`}
            >
              <MessageSquare size={18} /> About
            </Link>
          </li>

          <li>
            <Link
              href="/Projects"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${linkStyle}`}
            >
              <FolderGit size={18} /> Projects
            </Link>
          </li>

          <li>
            <Link
              href="#testimonials"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${linkStyle}`}
            >
              <MessageSquareQuote size={18} /> Testimonials
            </Link>
          </li>

          <li>
            <Link
              href="/#founder"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${linkStyle}`}
            >
              <User2 size={18} /> Team
            </Link>
          </li>

          <li>
            <Link
              href="/Contact"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${linkStyle}`}
            >
              <Phone size={18} /> Contact
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                toggle();
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 w-full hover:scale-105"
            >
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />} Theme
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;