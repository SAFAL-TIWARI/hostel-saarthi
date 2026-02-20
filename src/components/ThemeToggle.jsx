import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="secondary"
            onClick={toggleTheme}
            className="p-2 rounded-full h-9 w-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border-none shadow-none transition-colors"
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
            {theme === 'light' ? (
                <Moon className="h-4 w-4 text-slate-700" />
            ) : (
                <Sun className="h-4 w-4 text-yellow-400" />
            )}
        </Button>
    );
};

export default ThemeToggle;
