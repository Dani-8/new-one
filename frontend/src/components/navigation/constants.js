import {
    Compass,
    Sparkles,
    HelpCircle,
    LayoutDashboard,
    Building2,
    CalendarRange,
    BarChart3,
    Users,
    Settings,
    User
} from 'lucide-react';

export const publicLinks = [
    { label: 'Explore Destinies', icon: Compass, id: 'explore' },
    { label: 'AI Concierge Desk', icon: Sparkles, id: 'planner', premium: true },
    { label: 'Dynamic Support', icon: HelpCircle, id: 'help' }
];

export const adminLinks = [
    { label: 'Admin Terminal', icon: LayoutDashboard, id: 'admin-dashboard' },
    { label: 'Hotels Directory', icon: Building2, id: 'admin-hotels' },
    { label: 'User Verification', icon: Users, id: 'admin-users' },
    { label: 'App Settings', icon: Settings, id: 'admin-settings' }
];

export const ownerLinks = [
    { label: 'Owner Terminal', icon: LayoutDashboard, id: 'owner-dashboard' },
    { label: 'Listed Hotels', icon: Building2, id: 'owner-hotels' },
    { label: 'Guest Reserves', icon: CalendarRange, id: 'owner-bookings' },
    { label: 'Yield Analytics', icon: BarChart3, id: 'owner-analytics' }
];

export const customerLinks = [
    { label: 'My Bookings', icon: CalendarRange, id: 'customer-bookings' },
    { label: 'AI Concierge Planner', icon: Sparkles, id: 'customer-planner', premium: true },
    { label: 'Settings & Security', icon: User, id: 'customer-profile' }
];

export const directoryColumns = [
    {
        title: 'Explore Portals',
        links: [
            { label: 'Penthouse Collection', id: 'explore-penthouses' },
            { label: 'Overwater Villas', id: 'explore-villas' },
            { label: 'Alpine Carbon Lodges', id: 'explore-lodges' },
            { label: 'Private Islands', id: 'explore-islands' }
        ]
    },
    {
        title: 'Owner Assets',
        links: [
            { label: 'List Properties', id: 'list-assets' },
            { label: 'Management Suite', id: 'list-management' },
            { label: 'Dynamic Yield Tools', id: 'list-yield' },
            { label: 'Operational Support', id: 'list-support' }
        ]
    },
    {
        title: 'SaaS Platform',
        links: [
            { label: 'Continuous AI Roadmap', id: 'platform-ai' },
            { label: 'Enterprise Pricing', id: 'platform-pricing' },
            { label: 'Developer API Logs', id: 'platform-api' },
            { label: 'Secured Infrastructure', id: 'platform-security' }
        ]
    }
]