import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { BarChart, Users, Plus, CheckCircle2, Circle } from 'lucide-react';
import { getPolls, createPoll, votePoll, closePoll, getCurrentUser } from '../utils/localStorage';
import { toast, Toaster } from 'sonner';

const Polls = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [polls, setPolls] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Poll Creation State
    const [newPollQuestion, setNewPollQuestion] = useState('');
    const [newPollOptions, setNewPollOptions] = useState(['', '']);

    const user = getCurrentUser();
    const isWarden = user?.role === 'warden';

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setPolls(getPolls());
    };

    const handleAddOption = () => {
        setNewPollOptions([...newPollOptions, '']);
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newPollOptions];
        updatedOptions[index] = value;
        setNewPollOptions(updatedOptions);
    };

    const handleCreatePoll = (e) => {
        e.preventDefault();
        const validOptions = newPollOptions.filter(opt => opt.trim() !== '');
        if (validOptions.length < 2) {
            toast.error('Please provide at least 2 options');
            return;
        }
        createPoll({ question: newPollQuestion, options: validOptions });
        toast.success('Poll created successfully!');
        setIsModalOpen(false);
        setNewPollQuestion('');
        setNewPollOptions(['', '']);
        refreshData();
    };

    const handleVote = (pollId, optionId) => {
        if (!user) {
            toast.error('Please login to vote');
            return;
        }
        if (votePoll(pollId, optionId, user.id)) {
            toast.success('Vote recorded!');
            refreshData();
        } else {
            toast.error('You have already voted on this poll');
        }
    };

    const handleClosePoll = (pollId) => {
        closePoll(pollId);
        toast.info('Poll closed');
        refreshData();
    };

    const getTotalVotes = (poll) => {
        return poll.options.reduce((acc, curr) => acc + curr.votes, 0);
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 lg:p-8 dark:bg-slate-950">
                    <Toaster position="top-right" richColors />
                    <div className="max-w-4xl mx-auto space-y-6">

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-white">Community Polls 📊</h2>
                                <p className="text-slate-500 dark:text-slate-400">Your voice matters. Vote on hostel decisions.</p>
                            </div>
                            {isWarden && (
                                <Button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
                                    <Plus className="w-4 h-4 mr-2" /> Create Poll
                                </Button>
                            )}
                        </div>

                        <div className="space-y-6">
                            {polls.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                                    <BarChart className="w-12 h-12 text-slate-300 mx-auto mb-3 dark:text-slate-600" />
                                    <p className="text-slate-500 dark:text-slate-400">No active polls at the moment.</p>
                                </div>
                            ) : polls.map(poll => {
                                const totalVotes = getTotalVotes(poll);
                                const hasVoted = poll.votedBy.includes(user?.id) || isWarden; // Warden sees results immediately

                                return (
                                    <Card key={poll.id} className="overflow-hidden">
                                        <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between pb-4 dark:bg-slate-800/50 dark:border-slate-800">
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800 dark:text-white">{poll.question}</h3>
                                                <div className="flex items-center gap-3 text-sm text-slate-500 mt-1 dark:text-slate-400">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${poll.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                                                        {poll.status}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Users className="w-3.5 h-3.5 mr-1" /> {totalVotes} votes
                                                    </span>
                                                </div>
                                            </div>
                                            {isWarden && poll.status === 'Active' && (
                                                <Button size="sm" variant="outline" onClick={() => handleClosePoll(poll.id)}>
                                                    End Poll
                                                </Button>
                                            )}
                                        </CardHeader>
                                        <CardContent className="p-6 space-y-4">
                                            {poll.options.map(option => {
                                                const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

                                                return (
                                                    <div key={option.id} className="relative">
                                                        {hasVoted || poll.status === 'Closed' ? (
                                                            // Result View
                                                            <div className="relative pt-1">
                                                                <div className="flex items-center justify-between text-sm mb-1">
                                                                    <span className="font-medium text-slate-700 dark:text-slate-300">{option.text}</span>
                                                                    <span className="font-bold text-slate-900 dark:text-white">{percentage}%</span>
                                                                </div>
                                                                <div className="overflow-hidden h-2.5 mb-2 text-xs flex rounded-full bg-slate-100 dark:bg-slate-800">
                                                                    <div
                                                                        style={{ width: `${percentage}%` }}
                                                                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${percentage > 50 ? 'bg-indigo-500' : 'bg-indigo-300'}`}
                                                                    ></div>
                                                                </div>
                                                                {poll.votedBy.includes(user?.id) && option.votes > 0 && (
                                                                    <p className="text-xs text-indigo-600 font-medium absolute -bottom-3 left-0">You voted for this</p>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            // Voting View
                                                            <button
                                                                onClick={() => handleVote(poll.id, option.id)}
                                                                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-slate-50 transition-all flex items-center group dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:border-indigo-500"
                                                            >
                                                                <Circle className="w-5 h-5 text-slate-300 mr-3 group-hover:text-indigo-500 dark:text-slate-600" />
                                                                <span className="text-slate-700 font-medium group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">{option.text}</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Poll">
                <form onSubmit={handleCreatePoll} className="space-y-4">
                    <Input
                        label="Question"
                        placeholder="e.g. What movie should we screen?"
                        value={newPollQuestion}
                        onChange={(e) => setNewPollQuestion(e.target.value)}
                        required
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 ml-1 dark:text-slate-300">Options</label>
                        {newPollOptions.map((opt, idx) => (
                            <Input
                                key={idx}
                                placeholder={`Option ${idx + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                required={idx < 2}
                            />
                        ))}
                    </div>

                    <Button type="button" variant="outline" onClick={handleAddOption} className="w-full border-dashed">
                        + Add Another Option
                    </Button>

                    <Button type="submit" className="w-full h-11">Launch Poll</Button>
                </form>
            </Modal>
        </div>
    );
};

export default Polls;
