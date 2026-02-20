
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { getRooms, bookRoom, getComplaints, addComplaint, getGatePasses, requestGatePass } from '../utils/localStorage';
import { toast, Toaster } from 'sonner';
import { BedDouble, Utensils, MessageSquare, DoorOpen, Plus, Calendar } from 'lucide-react';

const StudentDashboard = () => {
    const [searchParams] = useSearchParams();
    const currentTab = searchParams.get('tab') || 'dashboard';
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [gatePasses, setGatePasses] = useState([]);

    // Modal states
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
    const [ComplaintForm, setComplaintForm] = useState({ title: '', description: '', roomNumber: '' });

    const [isGatePassModalOpen, setIsGatePassModalOpen] = useState(false);
    const [gatePassForm, setGatePassForm] = useState({ reason: '', departureDate: '', returnDate: '' });

    useEffect(() => {
        refreshData();
    }, [currentTab]);

    const refreshData = () => {
        setRooms(getRooms());
        setComplaints(getComplaints());
        setGatePasses(getGatePasses());
    };

    const handleBookRoom = (roomId) => {
        if (bookRoom(roomId)) {
            toast.success('Room booked successfully!');
            refreshData();
        } else {
            toast.error('Failed to book room. It might be full.');
        }
    };

    const handleSubmitComplaint = (e) => {
        e.preventDefault();
        addComplaint(ComplaintForm);
        toast.success('Complaint submitted successfully!');
        setIsComplaintModalOpen(false);
        refreshData();
        setComplaintForm({ title: '', description: '', roomNumber: '' });
    };

    const handleSubmitGatePass = (e) => {
        e.preventDefault();
        requestGatePass(gatePassForm);
        toast.success('Gate pass requested successfully!');
        setIsGatePassModalOpen(false);
        refreshData();
        setGatePassForm({ reason: '', departureDate: '', returnDate: '' });
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
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
                <p className="text-xs text-slate-400 mt-2">{subtext}</p>
            </CardContent>
        </Card>
    );

    const renderContent = () => {
        switch (currentTab) {
            case 'rooms':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold font-display text-slate-800">Available Rooms</h2>
                                <p className="text-slate-500">Find and book your perfect room</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {rooms.map(room => (
                                <RoomCard key={room.id} room={room} onBook={handleBookRoom} />
                            ))}
                        </div>
                    </div>
                );
            case 'mess':
                return (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Mess Bill</CardTitle>
                                    <p className="text-sm text-slate-500">Invoice for October 2023</p>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <Utensils className="w-6 h-6 text-blue-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                                        <span className="font-medium text-slate-700">Breakfast (25 days)</span>
                                        <span className="font-bold text-slate-900">₹ 1,250</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                                        <span className="font-medium text-slate-700">Lunch (28 days)</span>
                                        <span className="font-bold text-slate-900">₹ 2,100</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                                        <span className="font-medium text-slate-700">Dinner (28 days)</span>
                                        <span className="font-bold text-slate-900">₹ 2,100</span>
                                    </div>
                                    <div className="my-6 border-t border-dashed border-slate-200"></div>
                                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                        <span className="text-lg font-bold text-blue-900">Total Amount Due</span>
                                        <span className="text-2xl font-bold text-blue-900">₹ 5,450</span>
                                    </div>
                                    <Button className="w-full h-12 text-lg">Pay Now via UPI</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
            case 'complaints':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold font-display text-slate-800">Complaints</h2>
                                <p className="text-slate-500">Report issues and track status</p>
                            </div>
                            <Button onClick={() => setIsComplaintModalOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" /> New Complaint
                            </Button>
                        </div>
                        <div className="grid gap-4">
                            {complaints.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                                    <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500">No complaints registered yet.</p>
                                </div>
                            ) : complaints.map(c => (
                                <Card key={c.id} className="hover:border-slate-300 transition-colors">
                                    <CardContent className="flex flex-col md:flex-row justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-bold text-slate-800">{c.title}</h4>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {c.status}
                                                </span>
                                            </div>
                                            <p className="text-slate-600">{c.description}</p>
                                        </div>
                                        <div className="text-right text-xs text-slate-400">
                                            <p>Room: {c.roomNumber}</p>
                                            <p>{new Date(c.date).toLocaleDateString()}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case 'gatepass':
                return (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold font-display text-slate-800">Gate Passes</h2>
                                <p className="text-slate-500">Request permission for leave</p>
                            </div>
                            <Button onClick={() => setIsGatePassModalOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" /> Request Pass
                            </Button>
                        </div>
                        <div className="grid gap-4">
                            {gatePasses.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                                    <DoorOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500">No gate pass requests found.</p>
                                </div>
                            ) : gatePasses.map(p => (
                                <Card key={p.id}>
                                    <CardContent className="flex flex-col md:flex-row justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-bold text-slate-800">{p.reason}</h4>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : p.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {p.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-6 text-sm text-slate-500">
                                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> From: {p.departureDate}</span>
                                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> To: {p.returnDate}</span>
                                            </div>
                                        </div>
                                        <div className="text-right text-xs text-slate-400 mt-auto">
                                            <p>Requested: {new Date(p.requestedAt).toLocaleDateString()}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                title="Available Rooms"
                                value={rooms.filter(r => r.occupied < r.capacity).length}
                                subtext="Out of 20 total rooms"
                                icon={BedDouble}
                                color="bg-emerald-500"
                            />
                            <StatCard
                                title="Mess Due"
                                value="₹ 5,450"
                                subtext="Due date: 5th Nov"
                                icon={Utensils}
                                color="bg-rose-500"
                            />
                            <StatCard
                                title="Active Complaints"
                                value={complaints.filter(c => c.status === 'Pending').length}
                                subtext="Updates in 24hrs"
                                icon={MessageSquare}
                                color="bg-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold font-display text-slate-800 mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setIsComplaintModalOpen(true)}
                                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-800">Raise Complaint</h4>
                                        <p className="text-xs text-slate-500 mt-1">Report issues instantly</p>
                                    </div>
                                    <div
                                        onClick={() => setIsGatePassModalOpen(true)}
                                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                                            <DoorOpen className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-800">Gate Pass</h4>
                                        <p className="text-xs text-slate-500 mt-1">Apply for leave</p>
                                    </div>
                                </div>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">Mess bill generated</p>
                                                    <p className="text-xs text-slate-500">2 hours ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Toaster position="top-right" richColors />
                        {renderContent()}
                    </div>
                </main>
            </div>

            {/* Complaint Modal */}
            <Modal isOpen={isComplaintModalOpen} onClose={() => setIsComplaintModalOpen(false)} title="Submit Complaint">
                <form onSubmit={handleSubmitComplaint} className="space-y-4">
                    <Input label="Room Number" value={ComplaintForm.roomNumber} onChange={e => setComplaintForm({ ...ComplaintForm, roomNumber: e.target.value })} required placeholder="e.g. 101" />
                    <Input label="Title" value={ComplaintForm.title} onChange={e => setComplaintForm({ ...ComplaintForm, title: e.target.value })} required placeholder="Brief description of issue" />
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700 ml-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 min-h-[100px]"
                            value={ComplaintForm.description}
                            onChange={e => setComplaintForm({ ...ComplaintForm, description: e.target.value })}
                            required
                            placeholder="Provide more details..."
                        />
                    </div>
                    <Button type="submit" className="w-full h-11">Submit Complaint</Button>
                </form>
            </Modal>

            {/* Gate Pass Modal */}
            <Modal isOpen={isGatePassModalOpen} onClose={() => setIsGatePassModalOpen(false)} title="Request Gate Pass">
                <form onSubmit={handleSubmitGatePass} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Departure" type="date" value={gatePassForm.departureDate} onChange={e => setGatePassForm({ ...gatePassForm, departureDate: e.target.value })} required />
                        <Input label="Return" type="date" value={gatePassForm.returnDate} onChange={e => setGatePassForm({ ...gatePassForm, returnDate: e.target.value })} required />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700 ml-1">Reason</label>
                        <textarea
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 min-h-[80px]"
                            value={gatePassForm.reason}
                            onChange={e => setGatePassForm({ ...gatePassForm, reason: e.target.value })}
                            required
                            placeholder="Why do you need leave?"
                        />
                    </div>
                    <Button type="submit" className="w-full h-11">Submit Request</Button>
                </form>
            </Modal>
        </div>
    );
};

export default StudentDashboard;
