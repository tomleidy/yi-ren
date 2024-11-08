import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { UserCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/16/solid';
import { ArrowRightStartOnRectangleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/16/solid';
import { useVisibility } from '../VisibilityContext';

const Navbar: React.FC = () => {
    const { userInfo, setUserInfo } = useUser();
    const { visibility, toggle, show, hide } = useVisibility();
    const isNavbarOpen = visibility['navDropdown'];

    const handleLogoutGET = async () => {
        const response = await fetch('/auth/logout', {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            setUserInfo(null);
        localStorage.removeItem('user');
        }
    };

    useEffect(() => {
        const checkLocalStorage = () => {
            if (!userInfo) {
                const user = localStorage.getItem('user');
                if (user) setUserInfo(JSON.parse(user));
            }
        }
        const checkSession = async () => {
            try {
                const response = await fetch('/auth/check-session');
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
            } catch (err) {
                // Session expired or invalid
                localStorage.removeItem('user');
            }
        };


        checkLocalStorage();
    }, []);
    const toggleDropdown = () => setIsNavbarOpen(!isNavbarOpen);
    const closeDropdown = () => setIsNavbarOpen(false)
    return (
        <div className="relative">
            <button onClick={() => toggle('navDropdown')}
                className="px-4 py-1 w-20 h-20 text-sm font-medium text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {userInfo ? <UserKnownIcon /> : <UserUnknownIcon />}
            </button>

            {isNavbarOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                    <ul className="py-1">
                        {!userInfo ? (
                            <li className='py-1'>
                                <button className="w-full text-left px-4 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { show('userModal'); hide('navDropdown'); }}>
                                    <UserLoginIcon />Login/Register
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { }}>
                                        Edit Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => {
                                            handleLogout();
                                            hide('navDropdown');
                                        }}
                                    >
                                        <UserLogoutIcon />Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
