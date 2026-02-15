'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {useTheme} from './ThemeProvider';
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  MessageSquare,
  LineChart,
  User2,
  FolderGit,
  Phone,
  Bot, 
  Gamepad2
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isDarkMode,toggle} = useTheme();
  const handleDarkMode = () => {
    toggle();
  };


  const router = useRouter();
  return (
    <nav className="fixed top-0 bg-gray-50  Navbar left-0 w-full p-4 z-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-[30px] font-bold cursor-pointer" onClick={() => router.push("/")}>Butt 
          <span className='text-blue-600'> Networks</span></h1>

        {/* Desktop links - visible only after 1021px */}
        <ul className="hidden min-[1021px]:flex space-x-8 items-center">
          <li>
            <Link
              href="/#About"
              className="flex items-center gap-2 hover:text-yellow-300 hover:bg-gray-500 dark:hover:bg-gray-700 px-4 py-2 rounded font-semibold"
            >
              <MessageSquare size={18} /> About
            </Link>
          </li>
          <li>
            <Link
              href="/Projects"
              className="flex items-center gap-2 hover:text-yellow-300 hover:bg-gray-500 dark:hover:bg-gray-700 px-4 py-2 rounded font-semibold"
            >
              <FolderGit size={18} /> Projects
            </Link>
          </li>
          <li>
            <Link
              href="/#founder"
              className="flex items-center gap-2 hover:text-yellow-300 hover:bg-gray-500 dark:hover:bg-gray-700 px-4 py-2 rounded font-semibold"
            >
              <User2 size={18} /> Founders
            </Link>
          </li>
            <li>
            <Link
              href="#challenge"
              className="flex items-center gap-2 hover:text-yellow-300 hover:bg-gray-500 dark:hover:bg-gray-700 px-4 py-2 rounded font-semibold"
            >
              <Gamepad2 size={18} /> Challenge
            </Link>
          </li>
          <li>
            <Link
              href="/Contact"
              className="flex items-center gap-2 hover:text-yellow-300 hover:bg-gray-500 dark:hover:bg-gray-700 px-4 py-2 rounded font-semibold"
            >
              <Phone size={18} /> Contact
            </Link>
          </li>
          <li>
            <button onClick={handleDarkMode} className="text-2xl mt-2">
              {isDarkMode ? <Moon size={22} /> : <Sun size={22} />}
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger - visible only up to 1020px */}
        <button
          className="min-[1021px]:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown - visible only on small screens */}
      {isOpen && (
        <ul className="min-[1021px]:hidden mt-4 space-y-4 w-40 mx-auto text-center rounded-lg py-4 shadow-lg">
          <li>
            <Link
              href="/#About"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded active:bg-gray-400 dark:active:bg-gray-700"
            >
              <MessageSquare size={18} /> About
            </Link>
          </li>
          <li>
            <Link
              href="/Projects"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded active:bg-gray-400 dark:active:bg-gray-700"
            >
              <LineChart size={18} /> Projects
            </Link>
          </li>
          <li>
            <Link
              href="/#founder"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded active:bg-gray-400 dark:active:bg-gray-700"
            >
              <User2 size={18} /> Founders
            </Link>
          </li>
              <li>
              <Link
              href="#challenge"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded active:bg-gray-400 dark:active:bg-gray-700"
            >
              <Gamepad2 size={18} /> Challenge
            </Link>
          </li>
          <li>
              <Link
              href="/Contact"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded active:bg-gray-400 dark:active:bg-gray-700"
            >
              <Phone size={18} /> Contact
            </Link>
          </li>
          <li>
            <button
              onClick={handleDarkMode}
              className="flex items-center ml-5 justify-center gap-2 px-3 py-2 rounded active:bg-gray-400 dark:active:bg-gray-700"
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