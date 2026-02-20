import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Search, MapPin, ArrowRight, Calendar, Filter } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Events = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [yearFilter, setYearFilter] = useState('All Time');

    // Random events data
    const eventsData = [
        {
            id: 1,
            title: "Hostel Premier League 2026",
            organization: "Sports Committee",
            subOrg: "Hostel Ground",
            date: "Mar 15",
            fullDate: "2026, 4:00 PM – 7:00 PM",
            location: "MAIN PLAYGROUND",
            description: "The biggest inter-hostel cricket tournament is back! Gather your team and fight for the glory. Registration open now.",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2667&auto=format&fit=crop",
            type: "SPORTS",
            year: "2026"
        },
        {
            id: 2,
            title: "Cultural Night: Tarang '26",
            organization: "Cultural Club",
            subOrg: "Open Air Theatre",
            date: "Feb 28",
            fullDate: "2026, 6:00 PM – 10:00 PM",
            location: "AMPHITHEATRE",
            description: "A night filled with music, dance, and drama. showcase your talent or just come to enjoy the vibrant performances by your peers.",
            image: "https://imgs.search.brave.com/-bk3LkjVcQWxvFtNaeuO1m34tEDlqH8o2AUVnQss5gw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9uaXJt/YXdlYnNpdGUuczMu/YXAtc291dGgtMS5h/bWF6b25hd3MuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy9zaXRl/cy8yMi8yMDE5LzA1/L2N1bHR1cmFsLWFj/dGl2aXRpZXNfNi0y/LmpwZw",
            type: "CULTURAL",
            year: "2026"
        },
        {
            id: 3,
            title: "Tech Talk: Future of AI",
            organization: "Tech Society",
            subOrg: "Seminar Hall",
            date: "Feb 10",
            fullDate: "2026, 11:00 AM – 1:00 PM",
            location: "SEMINAR HALL",
            description: "An insightful session with industry experts discussing the roadmap of Artificial Intelligence and its impact on future jobs.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop",
            type: "SEMINAR",
            year: "2026"
        },
        {
            id: 4,
            title: "Fresher's Party 2025",
            organization: "Student Council",
            subOrg: "Main Auditorium",
            date: "Nov 15",
            fullDate: "2025, 5:00 PM - 9:00 PM",
            location: "AUDITORIUM",
            description: "Welcoming the new batch with style! DJ, food, and lots of fun activities to break the ice.",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop",
            type: "SOCIAL",
            year: "2025"
        },
        {
            id: 5,
            title: "Yoga & Wellness Camp",
            organization: "Health Club",
            subOrg: "Gymkhana",
            date: "Oct 02",
            fullDate: "2025, 6:00 AM - 8:00 AM",
            location: "GYM HALL",
            description: "Start your day with peace and energy. Join us for a guided yoga session on Gandhi Jayanti.",
            image: "https://imgs.search.brave.com/oyPWkqdwpj8IhLQ47N3mz3jFX2ux-iMimeP1-7jFZXE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdC5k/ZXBvc2l0cGhvdG9z/LmNvbS8xMDAwMTY1/LzM3MzQvaS80NTAv/ZGVwb3NpdHBob3Rv/c18zNzM0OTE5My1z/dG9jay1waG90by1n/eW0taGFsbC5qcGc",
            type: "WELLNESS",
            year: "2025"
        }
    ];

    const filteredEvents = eventsData.filter(event =>
        (yearFilter === 'All Time' || event.year === yearFilter) &&
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 lg:p-8 dark:bg-slate-950">
                    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Campus Events</h2>
                                <p className="text-slate-500 dark:text-slate-400">Stay updated with upcoming activities</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-shadow dark:bg-slate-900 dark:border-slate-800 dark:text-white dark:placeholder-slate-500"
                                        placeholder="Search events..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <select
                                        className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                    >
                                        <option>All Time</option>
                                        <option>2026</option>
                                        <option>2025</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                        <Filter className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Content */}
                        <div className="relative mt-8 pl-4 md:pl-8">
                            {/* Vertical Line */}
                            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-slate-200 ml-[-0.5px] dark:bg-slate-800"></div>

                            <div className="space-y-8 pb-10">
                                {filteredEvents.map((event, index) => (
                                    <div key={event.id} className="relative pl-8 md:pl-12 group">

                                        {/* Timeline Dot */}
                                        <div className="absolute left-4 md:left-8 top-6 w-3 h-3 rounded-full bg-white border-2 border-blue-500 transform -translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-300 shadow-sm dark:bg-slate-950"></div>

                                        {/* Date Label */}
                                        <div className="absolute -left-2 md:-left-24 top-5 w-20 text-right pr-4 hidden md:block">
                                            <span className="text-sm font-bold text-slate-400 font-display dark:text-slate-500">{event.date}</span>
                                        </div>

                                        <Card className="hover:border-blue-200 transition-colors duration-300 overflow-hidden">
                                            <div className="flex flex-col md:flex-row">
                                                {/* Image */}
                                                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                                                    <div className="absolute top-3 left-3 z-10">
                                                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-slate-800 shadow-sm border border-slate-100 dark:bg-slate-900/90 dark:text-white dark:border-slate-800">
                                                            {event.type}
                                                        </span>
                                                    </div>
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 md:w-2/3 flex flex-col">
                                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-blue-600 uppercase tracking-wide">
                                                        <span className="md:hidden text-slate-500 font-normal mr-2 dark:text-slate-400">{event.date} •</span>
                                                        <MapPin className="w-3 h-3" />
                                                        <span>{event.location}</span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors font-display dark:text-white">
                                                        {event.title}
                                                    </h3>

                                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow dark:text-slate-400">
                                                        {event.description}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto dark:border-slate-800">
                                                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                            <Calendar className="w-3 h-3 inline mr-1" />
                                                            {event.fullDate}
                                                        </div>
                                                        <Button size="sm" variant="outline" className="h-8 text-xs group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200">
                                                            View Details <ArrowRight className="w-3 h-3 ml-1" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Events;
