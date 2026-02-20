
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bed, Utensils, ClipboardList, DoorOpen, X, Search, BarChart } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const location = useLocation();

    const studentLinks = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/student' },
        { name: 'Rooms', icon: Bed, path: '/student?tab=rooms' },
        { name: 'Mess', icon: Utensils, path: '/student?tab=mess' },
        { name: 'Complaints', icon: ClipboardList, path: '/student?tab=complaints' },
        { name: 'Gate Pass', icon: DoorOpen, path: '/student?tab=gatepass' },
        { name: 'Lost & Found', icon: Search, path: '/lost-found' },
        { name: 'Polls', icon: BarChart, path: '/polls' },
    ];

    const wardenLinks = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/warden' },
        { name: 'Rooms', icon: Bed, path: '/warden?tab=rooms' },
        { name: 'Complaints', icon: ClipboardList, path: '/warden?tab=complaints' },
        { name: 'Gate Requests', icon: DoorOpen, path: '/warden?tab=gatepass' },
        { name: 'Lost & Found', icon: Search, path: '/lost-found' },
        { name: 'Polls', icon: BarChart, path: '/polls' },
    ];

    const links = user?.role === 'warden' ? wardenLinks : studentLinks;

    return (
        <>
            {/* Mobile overlay */}
            <div
                className={clsx(
                    "fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity lg:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar component */}
            <div
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl lg:shadow-none transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100 lg:hidden">
                    <span className="text-xl font-bold text-slate-800 font-display">Menu</span>
                    <button onClick={onClose} className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="mb-8 px-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Main Menu</p>
                        <nav className="space-y-1">
                            {links.map((link) => {
                                const Icon = link.icon;
                                const isActive = location.pathname === link.path.split('?')[0] && (link.path.includes('?') ? location.search.includes(link.path.split('?')[1]) : location.search === '');
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => window.innerWidth < 1024 && onClose()}
                                        className={twMerge(clsx(
                                            "group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200",
                                            isActive
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        ))}
                                    >
                                        <Icon className={clsx("mr-3 h-5 w-5 flex-shrink-0 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto px-6 py-6 bg-slate-50 rounded-2xl mx-2">
                        <h4 className="text-sm font-semibold text-slate-900">Need Help?</h4>
                        <p className="text-xs text-slate-500 mt-1 mb-3">Contact the administration for support.</p>
                        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Contact Support &rarr;</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
