// useAuthForm.js
import { useState } from 'react';

export const useAuthForm = (onBack) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminRole, setIsAdminRole] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your original submit logic goes here
    console.log('Submit triggered', { isLogin, name, email, password, isAdminRole });
  };

  const handleQuickLogin = (role) => {
    // Your original quick login logic
    console.log(`Quick login as ${role}`);
    setError('');
    setSuccess(`Logged in as ${role}`);
  };

  const toggleMode = () => {
    setError('');
    setIsLogin(!isLogin);
  };

  return {
    isLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isAdminRole,
    setIsAdminRole,
    error,
    setError,
    success,
    setSuccess,
    handleSubmit,
    handleQuickLogin,
    toggleMode,
    onBack,
  };
};