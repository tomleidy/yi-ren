import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { UserCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/16/solid';
import { ArrowRightStartOnRectangleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/16/solid';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import { useVisibility } from '../context/VisibilityContext';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const UserLoginIcon: React.FC = () => (<ArrowRightEndOnRectangleIcon className="h-4 w-4" />)
const UserLogoutIcon: React.FC = () => (<ArrowRightStartOnRectangleIcon className="h-4 w-4" />)
const UserUnknownIcon: React.FC = () => (<QuestionMarkCircleIcon className="h-14 w-14" />)
const UserKnownIcon: React.FC = () => (<UserCircleIcon className="h-14 w-14" />)
const EditProfileIcon: React.FC = () => (<PencilSquareIcon className="h-4 w-4" />)

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
                } else {
                    localStorage.removeItem('user');
                    setUserInfo(null);
                }
            } catch (err) {
                // Session expired or invalid
                localStorage.removeItem('user');
                setUserInfo(null);
            }
        };

        checkSession();
        checkLocalStorage();
    }, []);

    const handleLogoutClick = () => {
        console.log('Logout button clicked');  // First see if this fires
        handleLogoutGET();
        hide('navDropdown');
    };


    return (
        <div className="relative z-50">
            <button onClick={() => toggle('navDropdown')}
                className="px-4 py-1 w-20 h-20 text-sm font-medium text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {userInfo ? <UserKnownIcon /> : <UserUnknownIcon />}
            </button>

            {isNavbarOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                        {!userInfo ? (
                            <li className='py-1'>
                                <button className="flex items-center gap-2 w-full text-left px-4 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { show('userModal'); hide('navDropdown'); }}>
                                    <UserLoginIcon />Login/Register
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { show('profileModal'); hide('navDropdown'); }}>
                                        <EditProfileIcon />Edit Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => { show('uploadModal'); hide('navDropdown'); }}
                                    >
                                        <BookOpenIcon className="h-4 w-4" />
                                        Upload Text
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={handleLogoutClick}
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
