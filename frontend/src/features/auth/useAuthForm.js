import { useState } from 'react';
import { getStoredUsers, saveStoredUsers, setCurrentUser } from '../../data/data';

export const useAuthForm = (onAuthSuccess) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isAdminRole, setIsAdminRole] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isLogin && !name) {
            setError('Please enter your name');
            return;
        }

        const users = getStoredUsers();

        if (isLogin) {
            // Login flow
            const foundUser = users.find(
                (u) => u.email.toLowerCase() === email.toLowerCase()
            );

            if (foundUser) {
                if (foundUser.password !== password) {
                    setError('Incorrect password. Please try again.');
                    return;
                }
                // Success
                const loggedUser = {
                    id: foundUser.id,
                    email: foundUser.email,
                    name: foundUser.name,
                    role: foundUser.role
                };
                setCurrentUser(loggedUser);
                setSuccess(`Welcome back, ${loggedUser.name}!`);
                setTimeout(() => {
                    onAuthSuccess(loggedUser);
                }, 800);
            } else {
                setError('User not found. Try Guest Login or Sign Up!');
            }
        } else {
            // Sign up flow
            const userExists = users.some(
                (u) => u.email.toLowerCase() === email.toLowerCase()
            );

            if (userExists) {
                setError('This email is already registered.');
                return;
            }

            const newUser = {
                id: `usr_${Date.now()}`,
                email: email.toLowerCase(),
                name,
                role: isAdminRole ? 'admin' : 'customer'
            };

            const updatedUsers = [...users, { ...newUser, password }];
            saveStoredUsers(updatedUsers);
            setCurrentUser(newUser);
            setSuccess('Account created successfully!');
            setTimeout(() => {
                onAuthSuccess(newUser);
            }, 800);
        }
    };

    const handleQuickLogin = (role) => {
        setError('');
        if (role === 'admin') {
            const adminUser = {
                id: 'usr_admin',
                email: 'admin@restaurant.com',
                name: 'Admin Host',
                role: 'admin'
            };
            setCurrentUser(adminUser);
            setSuccess('Store Admin Bypass Activated!');
            setTimeout(() => {
                onAuthSuccess(adminUser);
            }, 600);
        } else {
            const guestUser = {
                id: 'usr_customer',
                email: 'guest@eats.com',
                name: 'Gourmet Lover',
                role: 'customer'
            };
            setCurrentUser(guestUser);
            setSuccess('Guest Customer Bypass Activated!');
            setTimeout(() => {
                onAuthSuccess(guestUser);
            }, 600);
        }
    };

    const toggleMode = () => {
        setError('');
        setIsLogin(!isLogin);
    };

    return {
        isLogin,
        email,
        password,
        name,
        isAdminRole,
        error,
        success,
        setEmail,
        setPassword,
        setName,
        setIsAdminRole,
        handleSubmit,
        handleQuickLogin,
        toggleMode,
    };
};