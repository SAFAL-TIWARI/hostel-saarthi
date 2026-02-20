
import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = ({ label, id, className, error, ...props }) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5 ml-1 dark:text-slate-300">{label}</label>}
            <input
                id={id}
                className={twMerge(clsx(
                    'w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 transition-all duration-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500',
                    'focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20',
                    error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'hover:border-slate-300',
                    className
                ))}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
};
