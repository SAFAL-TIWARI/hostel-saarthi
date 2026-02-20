
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (role) => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            login(role);
            navigate(role === 'student' ? '/student' : '/warden');
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Left Side - Hero */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>

                <div className="relative z-10 max-w-lg">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/30">
                        <span className="text-3xl font-bold">H</span>
                    </div>
                    <h1 className="text-5xl font-bold font-display mb-6">Welcome to HostelSaarthi</h1>
                    <p className="text-blue-100 text-lg leading-relaxed mb-8">
                        Your complete digital companion for hostel management. Streamline requests, book rooms, and manage complaints with ease.
                    </p>
                    <div className="flex gap-4">
                        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                            <h3 className="text-2xl font-bold">200+</h3>
                            <p className="text-sm text-blue-200">Rooms Managed</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                            <h3 className="text-2xl font-bold">Zero</h3>
                            <p className="text-sm text-blue-200">Paperwork</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 font-display">Sign In</h2>
                        <p className="text-slate-500 mt-2">Choose your portal to continue</p>
                    </div>

                    <div className="grid gap-4">
                        <button
                            onClick={() => handleLogin('student')}
                            disabled={loading}
                            className="group relative flex items-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 text-left"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Student Portal</h3>
                                <p className="text-sm text-slate-500">Access room booking & requests</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                        </button>

                        <button
                            onClick={() => handleLogin('warden')}
                            disabled={loading}
                            className="group relative flex items-center p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 text-left"
                        >
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="ml-4 flex-1">
                                <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">Warden Portal</h3>
                                <p className="text-sm text-slate-500">Manage hostel operations</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-50 px-2 text-slate-400">Trusted by 50+ Institutions</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
