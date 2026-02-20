import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Hash, Building, MapPin, Edit, ShieldCheck, Key, Save, X, Camera, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [verificationSent, setVerificationSent] = useState(false);
    const [twoFAEnabled, setTwoFAEnabled] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // In a real app, we might fetch more detailed info here.
        // For now, we'll simulate some extra details based on the role.
        if (user) {
            const initialData = {
                ...user,
                email: user.role === 'student' ? 'aditya.student@college.edu' : 'warden.sir@college.edu',
                phone: user.role === 'student' ? '+91 98765 43210' : '+91 12345 67890',
                rollNo: user.role === 'student' ? '2023CS101' : 'EMP005',
                department: user.role === 'student' ? 'Computer Science' : 'Hostel Administration',
                roomNumber: user.role === 'student' ? '302' : 'Office 101',
                hostelBlock: 'Block A',
                joinDate: 'Aug 2023',
            };
            setUserInfo(initialData);
            setEditForm(initialData);
        }
    }, [user]);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel edit
            setEditForm(userInfo);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        // Simulate API call to save
        setUserInfo(editForm);
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Mock image upload
            alert(`File "${file.name}" selected for upload.`);
        }
    };

    const handleVerify = () => {
        setVerificationSent(true);
        alert(`Verification email sent to ${userInfo.email}`);
    };

    const handleChangePassword = () => {
        alert("Password reset link sent to your email.");
    };

    const toggleTwoFA = () => {
        setTwoFAEnabled(!twoFAEnabled);
        alert(twoFAEnabled ? "2FA Disabled" : "2FA Enabled");
    };

    if (!userInfo) {
        return <div className="p-8 text-center animate-pulse">Loading profile...</div>;
    }

    return (
        <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900">
                <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-colors z-10"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="px-8 pb-8 flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-12 gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center overflow-hidden dark:border-slate-900 dark:bg-slate-800">
                            <User className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-1 right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform hover:scale-105 group-hover:ring-4 ring-blue-500/30"
                            title="Change Profile Picture"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1 mb-2">
                        {isEditing ? (
                            <div className="mb-2">
                                <Input
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleChange}
                                    className="text-2xl font-bold h-10 w-full md:w-auto"
                                    placeholder="Full Name"
                                />
                            </div>
                        ) : (
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{userInfo.name}</h1>
                        )}

                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200 capitalize dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                                {userInfo.role}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                                {userInfo.department}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {!isEditing && (
                            <button
                                onClick={handleVerify}
                                disabled={verificationSent}
                                className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-medium transition-colors shadow-sm ${verificationSent ? 'bg-green-50 text-green-700 border-green-200 cursor-default dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                            >
                                {verificationSent ? <CheckCircle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                <span>{verificationSent ? 'Sent' : 'Verify'}</span>
                            </button>
                        )}

                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleEditToggle}
                                    variant="secondary"
                                    className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
                                >
                                    <X className="w-4 h-4 mr-2" /> Cancel
                                </Button>
                                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Save className="w-4 h-4 mr-2" /> Save
                                </Button>
                            </div>
                        ) : (
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium transition-colors shadow-lg shadow-slate-900/20"
                            >
                                <Edit className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Contact Info */}
                <div className="glass-morphism p-6 rounded-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 dark:text-slate-200">
                            <User className="w-5 h-5 text-blue-600" />
                            Personal Details
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl dark:bg-blue-900/20 dark:text-blue-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</p>
                                <p className="text-slate-700 font-medium mt-0.5 dark:text-slate-200">{userInfo.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-indigo-900/20 dark:text-indigo-400">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Phone Number</p>
                                {isEditing ? (
                                    <Input
                                        name="phone"
                                        value={editForm.phone}
                                        onChange={handleChange}
                                        className="mt-1 h-8 text-sm"
                                    />
                                ) : (
                                    <p className="text-slate-700 font-medium mt-0.5 dark:text-slate-200">{userInfo.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic/Hostel Info */}
                <div className="glass-morphism p-6 rounded-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 dark:text-slate-200">
                            <Building className="w-5 h-5 text-indigo-600" />
                            {userInfo.role === 'student' ? 'Hostel Details' : 'Office Details'}
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50">
                            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl dark:bg-purple-900/20 dark:text-purple-400">
                                <Hash className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{userInfo.role === 'student' ? 'Roll Number' : 'Employee ID'}</p>
                                <p className="text-slate-700 font-medium mt-0.5 dark:text-slate-200">{userInfo.rollNo}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50">
                            <div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl dark:bg-pink-900/20 dark:text-pink-400">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{userInfo.role === 'student' ? 'Room Number' : 'Office Location'}</p>
                                <p className="text-slate-700 font-medium mt-0.5 dark:text-slate-200">{userInfo.roomNumber} <span className="text-slate-400 text-sm font-normal">({userInfo.hostelBlock})</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Security */}
                <div className="glass-morphism p-6 rounded-3xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 dark:text-slate-200">
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                            Security
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-green-50 text-green-600 rounded-xl dark:bg-green-900/20 dark:text-green-400">
                                    <Key className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Password</p>
                                    <p className="text-xs text-slate-500">Last changed 2 months ago</p>
                                </div>
                            </div>
                            <button
                                onClick={handleChangePassword}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Change
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors dark:hover:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl dark:bg-orange-900/20 dark:text-orange-400">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">2FA</p>
                                    <p className="text-xs text-slate-500">{twoFAEnabled ? 'Enabled' : 'Not enabled'}</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTwoFA}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                {twoFAEnabled ? 'Disable' : 'Enable'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
