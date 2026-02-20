
import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Users, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const RoomCard = ({ room, onBook, isWarden, onToggleStatus }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50';
            case 'Full': return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-900/50';
            case 'Maintenance': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50';
            default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
        }
    };

    const getProgressColor = (status) => {
        if (status === 'Full') return 'bg-rose-500';
        if (status === 'Maintenance') return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    return (
        <Card hover className="h-full flex flex-col">
            <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider dark:text-slate-500">Room No.</span>
                        <h3 className="text-2xl font-bold text-slate-800 font-display dark:text-white">{room.number}</h3>
                    </div>
                    <span className={clsx(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
                        getStatusColor(room.status)
                    )}>
                        {room.status}
                    </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Occupancy</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-200">{room.occupied} <span className="text-slate-400 font-normal dark:text-slate-600">/ {room.capacity}</span></span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden dark:bg-slate-800">
                    <div
                        className={clsx("h-full rounded-full transition-all duration-500 ease-out shadow-sm", getProgressColor(room.status))}
                        style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                    />
                </div>

                <div className="flex gap-2 mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                    {isWarden ? (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="w-full"
                            onClick={() => onToggleStatus(room.id)}
                        >
                            {room.status === 'Maintenance' ? 'Mark Available' : 'Mark Maintenance'}
                        </Button>
                    ) : (
                        <Button
                            variant={room.status === 'Available' ? 'primary' : 'secondary'}
                            size="sm"
                            className="w-full"
                            disabled={room.status !== 'Available'}
                            onClick={() => onBook(room.id)}
                        >
                            {room.status === 'Available' ? 'Book Now' : 'Unavailable'}
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default RoomCard;
