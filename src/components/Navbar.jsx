
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';
import { Button } from './ui/Button';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();

    return (
        <nav className="glass-morphism sticky top-0 z-30 border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 focus:outline-none lg:hidden transition-colors"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0 gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                                H
                            </div>
                            <span className="text-xl font-bold text-gradient">
                                HostelSaarthi
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-sm font-semibold text-slate-800">{user?.name || 'Guest'}</span>
                            <span className="text-xs text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full">{user?.role}</span>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-white flex items-center justify-center text-blue-600 shadow-sm">
                            <User className="h-5 w-5" />
                        </div>
                        <Button variant="secondary" onClick={logout} className="p-2 rounded-full h-9 w-9 flex items-center justify-center bg-slate-100 hover:bg-red-50 hover:text-red-600 border-none shadow-none">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
