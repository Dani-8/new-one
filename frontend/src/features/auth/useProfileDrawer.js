import { useState, useEffect } from 'react';

export const useProfileDrawer = (currentUser, onLogout, onOpenOrdersHistory, orders,
    favorites, foods, onToggleFavorite, onAddToCart, onSelectFood, onClose) => {

    const [currentPanel, setCurrentPanel] = useState(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // Profile form state
    const [name, setName] = useState(currentUser?.name || '');
    const [phone, setPhone] = useState(currentUser?.phone || '');
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    // Saved addresses state
    const [addresses, setAddresses] = useState([]);
    const [newAddressLabel, setNewAddressLabel] = useState('Home');
    const [newAddressText, setNewAddressText] = useState('');


    // Load addresses from local storage
    useEffect(() => {
        if (currentUser) {
            const stored = localStorage.getItem(`addresses_${currentUser.id}`);
            if (stored) {
                setAddresses(JSON.parse(stored));
            } else {
                const defaults = [
                    { id: '1', label: 'Home', text: '128 Neon Boulevard, Apt 4B' },
                    { id: '2', label: 'Office', text: '500 Tech Plaza, Floor 12' }
                ];
                setAddresses(defaults);
                localStorage.setItem(`addresses_${currentUser.id}`, JSON.stringify(defaults));
            }
            setName(currentUser.name || '');
            setPhone(currentUser.phone || '');
        }
    }, [currentUser]);


    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const users = JSON.parse(localStorage.getItem('restaurant_users') || '[]');
        const updatedUsers = users.map(u => {
            if (u.id === currentUser.id) {
                return { ...u, name: name.trim(), phone: phone.trim() };
            }
            return u;
        });
        localStorage.setItem('restaurant_users', JSON.stringify(updatedUsers));

        const updatedUser = { ...currentUser, name: name.trim(), phone: phone.trim() };
        localStorage.setItem('restaurant_curr_user', JSON.stringify(updatedUser));

        currentUser.name = name.trim();
        currentUser.phone = phone.trim();

        setIsEditingProfile(false);
    };


    const handleAddAddress = (e) => {
        e.preventDefault();
        if (!newAddressText.trim()) return;

        const newAddr = {
            id: `addr_${Date.now()}`,
            label: newAddressLabel,
            text: newAddressText.trim()
        };
        const updated = [...addresses, newAddr];
        setAddresses(updated);
        localStorage.setItem(`addresses_${currentUser.id}`, JSON.stringify(updated));
        setNewAddressText('');
    };


    const handleDeleteAddress = (id) => {
        const updated = addresses.filter(a => a.id !== id);
        setAddresses(updated);
        localStorage.setItem(`addresses_${currentUser.id}`, JSON.stringify(updated));
    };

    const favoriteFoods = foods.filter(f => favorites.includes(f.id));

    const initials = currentUser?.name
        ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    const togglePanel = (panel) => setCurrentPanel(panel);


    return {
        currentPanel,
        showLogoutConfirm,
        name,
        phone,
        isEditingProfile,
        addresses,
        newAddressLabel,
        newAddressText,
        favoriteFoods,
        initials,
        setCurrentPanel,
        setShowLogoutConfirm,
        setName,
        setPhone,
        setIsEditingProfile,
        setAddresses,
        setNewAddressLabel,
        setNewAddressText,
        handleSaveProfile,
        handleAddAddress,
        handleDeleteAddress,
        togglePanel,
    };
};