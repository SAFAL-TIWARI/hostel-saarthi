import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Search, MapPin, Phone, Tag, Trash2, CheckCircle, Clock } from 'lucide-react';
import { getLostFoundItems, addLostFoundItem, updateLostFoundStatus, deleteLostFoundItem, getCurrentUser } from '../utils/localStorage';
import { toast, Toaster } from 'sonner';

const LostFound = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('All'); // All, Lost, Found
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', description: '', location: '', contact: '', status: 'Lost' });

    const user = getCurrentUser();
    const isWarden = user?.role === 'warden';

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setItems(getLostFoundItems());
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        addLostFoundItem(newItem);
        toast.success('Item reported successfully!');
        setIsModalOpen(false);
        setNewItem({ title: '', description: '', location: '', contact: '', status: 'Lost' });
        refreshData();
    };

    const handleStatusUpdate = (id, newStatus) => {
        if (updateLostFoundStatus(id, newStatus)) {
            toast.success(`Marked as ${newStatus}`);
            refreshData();
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            deleteLostFoundItem(id);
            toast.success('Post deleted');
            refreshData();
        }
    };

    const filteredItems = items.filter(item => {
        const matchesFilter = filter === 'All' || item.status === filter || (filter === 'Resolved' && (item.status === 'Claimed' || item.status === 'Returned'));
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 lg:p-8">
                    <Toaster position="top-right" richColors />
                    <div className="max-w-7xl mx-auto space-y-6">

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold font-display text-slate-800">Lost & Found Hub 🕵️‍♂️</h2>
                                <p className="text-slate-500">Report lost items or help others find theirs.</p>
                            </div>
                            <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
                                <Tag className="w-4 h-4 mr-2" /> Report Item
                            </Button>
                        </div>

                        {/* Filters & Search */}
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                                {['All', 'Lost', 'Found', 'Resolved'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${filter === f
                                                ? 'bg-slate-900 text-white shadow-md'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search items..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-slate-500">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <p>No items found matching your criteria.</p>
                                </div>
                            ) : filteredItems.map(item => (
                                <Card key={item.id} hover className="overflow-hidden group">
                                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                                <Tag className="w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${item.status === 'Lost' ? 'bg-rose-500 text-white' :
                                                    item.status === 'Found' ? 'bg-emerald-500 text-white' :
                                                        'bg-slate-500 text-white'
                                                }`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{item.title}</h3>
                                            <span className="text-xs text-slate-400 whitespace-nowrap flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {new Date(item.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 line-clamp-2 mb-4 h-10">{item.description}</p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-xs text-slate-500">
                                                <MapPin className="w-3.5 h-3.5 mr-2 text-indigo-500" />
                                                {item.location}
                                            </div>
                                            <div className="flex items-center text-xs text-slate-500">
                                                <Phone className="w-3.5 h-3.5 mr-2 text-indigo-500" />
                                                {item.contact}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2 border-t border-slate-100">
                                            {isWarden ? (
                                                <Button size="sm" variant="danger" onClick={() => handleDelete(item.id)} className="w-full flex items-center justify-center gap-2">
                                                    <Trash2 className="w-4 h-4" /> Delete
                                                </Button>
                                            ) : (
                                                <>
                                                    {item.status === 'Found' && (
                                                        <Button size="sm" onClick={() => handleStatusUpdate(item.id, 'Claimed')} className="w-full bg-emerald-600 hover:bg-emerald-700">
                                                            Claim Item
                                                        </Button>
                                                    )}
                                                    {item.status === 'Lost' && (
                                                        <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(item.id, 'Found')} className="w-full">
                                                            I Found This
                                                        </Button>
                                                    )}
                                                    {(item.status === 'Claimed' || item.status === 'Returned') && (
                                                        <div className="w-full text-center py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg flex items-center justify-center gap-1">
                                                            <CheckCircle className="w-3.5 h-3.5" /> Resolved
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Report an Item">
                <form onSubmit={handleAddItem} className="space-y-4">
                    <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                className="hidden peer"
                                checked={newItem.status === 'Lost'}
                                onChange={() => setNewItem({ ...newItem, status: 'Lost' })}
                            />
                            <div className="p-3 text-center rounded-xl border-2 border-slate-100 peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700 font-bold text-slate-500 transition-all">
                                LOST
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                className="hidden peer"
                                checked={newItem.status === 'Found'}
                                onChange={() => setNewItem({ ...newItem, status: 'Found' })}
                            />
                            <div className="p-3 text-center rounded-xl border-2 border-slate-100 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 font-bold text-slate-500 transition-all">
                                FOUND
                            </div>
                        </label>
                    </div>

                    <Input
                        label="Item Name"
                        placeholder="e.g. Blue Umbrella"
                        value={newItem.title}
                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                        required
                    />

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700 ml-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 min-h-[80px]"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            required
                            placeholder="Describe color, brand, or specific marks..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Location"
                            placeholder="Where?"
                            value={newItem.location}
                            onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                            required
                        />
                        <Input
                            label="Contact Info"
                            placeholder="Phone / Room No"
                            value={newItem.contact}
                            onChange={(e) => setNewItem({ ...newItem, contact: e.target.value })}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full h-11">Submit Report</Button>
                </form>
            </Modal>
        </div>
    );
};

export default LostFound;
