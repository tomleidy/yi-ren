import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useVisibility } from '../context/VisibilityContext';
import { UserInfo } from '../types/context';
import ChangePasswordModal from './ChangePasswordModal';

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
}

const UserProfileModal: React.FC = () => {
    const { userInfo, setUserInfo } = useUser();
    const { visibility, hide, show } = useVisibility();
    const isModalOpen = visibility['profileModal'];
    const [error, setError] = useState<string>('');

    const [formData, setFormData] = useState<ProfileFormData>({
        firstName: userInfo?.firstName || '',
        lastName: userInfo?.lastName || '',
        email: userInfo?.email || '',
        phoneNumber: userInfo?.phoneNumber || '',
        address: userInfo?.address || '',
        dateOfBirth: userInfo?.dateOfBirth ? new Date(userInfo.dateOfBirth).toISOString().split('T')[0] : '',
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                firstName: userInfo.firstName || '',
                lastName: userInfo.lastName || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.phoneNumber || '',
                address: userInfo.address || '',
                dateOfBirth: userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth).toISOString().split('T')[0] : '',
            });
        }
    }, [userInfo]);


    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") hide('profileModal');
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [hide]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            console.log('Sending profile update:', formData);  // Debug log
            const response = await fetch('/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Update successful:', data);  // Debug log

            if (!response.ok) {
                throw new Error(data.message || 'Update failed');
            }

            // Update the user context with new information
            setUserInfo({
                ...userInfo!,
                ...formData
            } as UserInfo);

            hide('profileModal');
        } catch (err) {
            console.error('Profile update error:', err);  // Debug log
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    if (!isModalOpen || !userInfo) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={() => hide('profileModal')}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white mt-2">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    <div className="flex justify-end mb-4">
                        <button
                            type="button"
                            onClick={() => show('passwordModal')}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Change Password
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </form>
                <ChangePasswordModal />
            </div>
        </div>
    );
};

export default UserProfileModal;