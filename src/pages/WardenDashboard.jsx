
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getRooms, updateRoomStatus, getComplaints, resolveComplaint, getGatePasses, updateGatePassStatus } from '../utils/localStorage';
import { toast, Toaster } from 'sonner';
import { BedDouble, AlertTriangle, FileText, Check, X as XIcon } from 'lucide-react';

const WardenDashboard = () => {
    const [searchParams] = useSearchParams();
    const currentTab = searchParams.get('tab') || 'dashboard';
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [gatePasses, setGatePasses] = useState([]);

    useEffect(() => {
        refreshData();
    }, [currentTab]);

    const refreshData = () => {
        setRooms(getRooms());
        setComplaints(getComplaints());
        setGatePasses(getGatePasses());
    };

    const handleToggleRoomStatus = (roomId) => {
        const room = rooms.find(r => r.id === roomId);
        const newStatus = room.status === 'Maintenance' ? 'Available' : 'Maintenance';
        if (updateRoomStatus(roomId, newStatus)) {
            toast.success(`Room ${room.number} mark as ${newStatus}`);
            refreshData();
        } else {
            toast.error('Failed to update room status');
        }
    };

    const handleResolveComplaint = (id) => {
        if (resolveComplaint(id)) {
            toast.success('Complaint resolved');
            refreshData();
        }
    };

    const handleGatePassAction = (id, status) => {
        if (updateGatePassStatus(id, status)) {
            toast.success(`Gate pass ${status.toLowerCase()}`);
            refreshData();
        }
    };

    const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
        <Card hover className="relative overflow-hidden">
            <div className={`absolute right-0 top-0 p-4 opacity-10 ${color}`}>
                <Icon className="w-24 h-24" />
            </div>
            <CardContent>
                <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1 dark:text-slate-100">{value}</h3>
                <p className="text-xs text-slate-400 mt-2 dark:text-slate-500">{subtext}</p>
            </CardContent>
        </Card>
    );

    const renderContent = () => {
        switch (currentTab) {
            case 'rooms':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Room Management</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {rooms.map(room => (
                                <RoomCard key={room.id} room={room} isWarden onToggleStatus={handleToggleRoomStatus} />
                            ))}
                        </div>
                    </div>
                );
            case 'complaints':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Complaints Overview</h2>
                        <div className="space-y-3">
                            {complaints.length === 0 ? <p className="text-slate-500 text-center py-10 dark:text-slate-400">No complaints found.</p> : complaints.map(c => (
                                <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4 transition-all hover:shadow-md dark:bg-slate-900 dark:border-slate-800 text-left">
                                    <div className="p-3 bg-slate-50 rounded-lg dark:bg-slate-800">
                                        <AlertTriangle className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-100">{c.title}</h4>
                                            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 rounded dark:bg-slate-800 dark:text-slate-400">Room {c.roomNumber}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mt-1 dark:text-slate-400">{c.description}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                            {c.status}
                                        </span>
                                        {c.status === 'Pending' && (
                                            <Button size="sm" onClick={() => handleResolveComplaint(c.id)}>Mock Resolve</Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'gatepass':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Gate Pass Requests</h2>
                        <div className="space-y-3">
                            {gatePasses.length === 0 ? <p className="text-slate-500 text-center py-10 dark:text-slate-400">No requests found.</p> : gatePasses.map(p => (
                                <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-md dark:bg-slate-900 dark:border-slate-800 text-left">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-lg dark:text-slate-100">{p.reason}</h4>
                                        <div className="flex gap-6 mt-2 text-sm text-slate-600 dark:text-slate-400">
                                            <span><strong className='text-slate-900 dark:text-slate-200'>From:</strong> {p.departureDate}</span>
                                            <span><strong className='text-slate-900 dark:text-slate-200'>To:</strong> {p.returnDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {p.status === 'Pending' ? (
                                            <div className="flex gap-2">
                                                <Button variant="danger" size="sm" onClick={() => handleGatePassAction(p.id, 'Rejected')} className="h-9 w-9 p-0 rounded-full flex items-center justify-center">
                                                    <XIcon className="w-4 h-4" />
                                                </Button>
                                                <Button size="sm" onClick={() => handleGatePassAction(p.id, 'Approved')} className="h-9 w-9 p-0 rounded-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700">
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                                                {p.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                title="Total Rooms"
                                value={rooms.length}
                                subtext="4 rooms empty"
                                icon={BedDouble}
                                color="bg-blue-500"
                            />
                            <StatCard
                                title="Pending Complaints"
                                value={complaints.filter(c => c.status === 'Pending').length}
                                subtext="Action required"
                                icon={AlertTriangle}
                                color="bg-amber-500"
                            />
                            <StatCard
                                title="Gate Requests"
                                value={gatePasses.filter(p => p.status === 'Pending').length}
                                subtext="Approvals needed"
                                icon={FileText}
                                color="bg-violet-500"
                            />
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 lg:p-8 dark:bg-slate-950">
                    <Toaster position="top-right" richColors />
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WardenDashboard;
