
import React from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Card, CardContent } from './Card';

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg animate-in fade-in zoom-in duration-200">
                <Card className="relative w-full max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    </div>
                    <CardContent>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>,
        document.body
    );
};
