
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <div
            className={twMerge(clsx(
                'bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden',
                hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
                className
            ))}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className }) => (
    <div className={twMerge(clsx('px-6 py-5 border-b border-slate-50', className))}>
        {children}
    </div>
);

export const CardTitle = ({ children, className }) => (
    <h3 className={twMerge(clsx('text-lg font-bold text-slate-800 font-display', className))}>
        {children}
    </h3>
);

export const CardContent = ({ children, className }) => (
    <div className={twMerge(clsx('p-6', className))}>
        {children}
    </div>
);
