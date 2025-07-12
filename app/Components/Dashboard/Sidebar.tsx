"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, HomeIcon } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
           label: "Manage Users",
      path: "/dashboard/manage-users",
      icon: <Users className="w-5 h-5" />,
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-gray-800 fixed top-0 left-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-screen`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)} // close on mobile nav click
                className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition ${
                  pathname === item.path ? "bg-gray-700" : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
