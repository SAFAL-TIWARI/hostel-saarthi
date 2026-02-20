
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <div
            className={twMerge(clsx(
                'bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800',
                hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:hover:shadow-slate-900/50',
                className
            ))}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className }) => (
    <div className={twMerge(clsx('px-6 py-5 border-b border-slate-50 dark:border-slate-800', className))}>
        {children}
    </div>
);

export const CardTitle = ({ children, className }) => (
    <h3 className={twMerge(clsx('text-lg font-bold text-slate-800 font-display dark:text-slate-100', className))}>
        {children}
    </h3>
);

export const CardContent = ({ children, className }) => (
    <div className={twMerge(clsx('p-6', className))}>
        {children}
    </div>
);
