import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useVisibility } from '../context/VisibilityContext';

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface UserResponse {
    username: string;
    userId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string | null;
    profilePicture?: string | null;
    address?: string;
    phoneNumber?: string | null;
}


const AuthModal: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string>('');
    const { setUserInfo } = useUser();
    const { visibility, hide } = useVisibility();
    const isModalOpen = visibility['userModal'];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") hide('userModal'); };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [hide]);

    const handleLoginAndRegisterPOST = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    ...(isLogin ? {} : { email: formData.email })
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }
            const user: UserResponse = data.user;
            localStorage.setItem('user', JSON.stringify(user));
            setUserInfo(data.user);

            // Reset form data
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            hide('userModal');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative">
                <button
                    onClick={() => hide('userModal')}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-white mt-2">
                    {isLogin ? 'Login' : 'Register'}
                </h2>

                <form onSubmit={handleLoginAndRegisterPOST} className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-base"
                            required
                            autoComplete="username"
                            autoFocus={isLogin}
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-base"
                                required
                                autoComplete="email"
                                autoFocus={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-base"
                            required
                            autoComplete={isLogin ? "current-password" : "new-password"}
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-base"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-h-[44px]"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;