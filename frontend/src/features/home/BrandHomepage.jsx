import { motion } from 'motion/react';
import { Sparkles, Clock, ArrowRight, ChefHat, Truck, Lock, Star, Heart, MapPin, ShieldCheck } from 'lucide-react';

const SIGNATURE_PREVIEWS = [
    {
        name: 'Glow-Up Truffle Cheeseburger',
        tagline: 'Artisanal brioche, golden-seared Wagyu, glowing garlic aioli',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        rating: '4.9',
        prep: '15'
    },
    {
        name: 'Neon Basil Pesto Pizza',
        tagline: 'Pink sourdough base, wood-fired burrata, neon green basil drizzle',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        rating: '4.8',
        prep: '18'
    },
    {
        name: 'Rosé Velvet Berry Cupcake',
        tagline: 'Glowing sugar crystals, white chocolate cream, raspberry infusion',
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
        rating: '5.0',
        prep: '10'
    }
];

const TESTIMONIALS = [
    {
        name: 'Aria Sterling',
        role: 'Food Blogger',
        quote: 'The Pink Bite app is an absolute masterpiece. The customizer let me perfect my spice levels, and the delivery was so fast it arrived piping hot!',
        stars: 5
    },
    {
        name: 'Marcus Chen',
        role: 'Tech Lead & Burger Enthusiast',
        quote: 'Usually delivery means soggy buns, but Pink Bite uses special insulated glowing box tech that keeps the Wagyu perfectly tender. A game changer.',
        stars: 5
    },
    {
        name: 'Chloe Laurent',
        role: 'Pastry Sommelier',
        quote: 'The Rosé Velvet series is pure aesthetic and tastes heavenly. Signing up took 10 seconds and opened up a portal of gourmet customization!',
        stars: 5
    }
];

export default function BrandHomepage({ isDarkMode, onOpenAuth }) {
    // Animation presets
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <div className="space-y-24 py-6">
            {/* 1. HERO HERO SECTION */}
            <section className="relative rounded-3xl overflow-hidden border border-zinc-800/40 dark:border-white/[0.04] shadow-xl">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                        alt="Delicious gourmet platter in moody lighting"
                        className="w-full h-full object-cover filter brightness-[0.35]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0812] via-[#0a0812]/75 to-transparent" />
                </div>

                <div className="relative z-10 px-6 sm:px-12 py-20 sm:py-28 max-w-2xl text-white space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold"
                    >
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                        <span>Exquisite Gastronomy Delivered Live</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-sans text-4xl sm:text-6xl font-black tracking-tight leading-none"
                    >
                        Savor the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 font-extrabold animate-pulse">
                            Glow
                        </span>
                        ,<br />Taste the Art.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm sm:text-lg text-gray-300 leading-relaxed font-light"
                    >
                        Welcome to <span className="font-semibold text-amber-400">Golden Bite</span>. We combine warm gourmet luxury aesthetics with premium, customizable gourmet cuisine. Every order is prepared live and delivered with absolute precision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="pt-4 flex flex-wrap gap-4"
                    >
                        <button
                            onClick={onOpenAuth}
                            className="px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer hover:scale-102 transition-transform duration-150"
                        >
                            <span>Join Gourmet Club</span>
                            <ArrowRight className="h-4.5 w-4.5" />
                        </button>

                        <button
                            onClick={onOpenAuth}
                            className="px-7 py-4 rounded-xl text-sm font-semibold border border-white/25 hover:border-white/50 hover:bg-white/5 transition-all text-white cursor-pointer"
                        >
                            Log In to View Menu
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* 2. THE BRAND STORY & CRAFTSMANSHIP */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-2">
                        <ChefHat className="h-5 w-5 text-amber-500" />
                        <span className="text-xs font-bold tracking-widest uppercase text-amber-500">The Gastronomy Promise</span>
                    </div>

                    <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        We Don't Just Cook.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">We Design Flavors.</span>
                    </h2>

                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        At Golden Bite, every meal is an immersive sensory journey. We select only sustainable Wagyu, hand-tossed cold-fermented sourdoughs, and locally sourced organic greens.
                    </p>

                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        But the real magic lies in our interactive customizer dashboard. Once you enter the club, you have complete control over spice intensity, cheese melts, signature infusions, and customized notes to our chef team.
                    </p>

                    <div className="pt-4 grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/40 border-white/[0.04] shadow-sm' : 'bg-white border-slate-100 shadow-sm'}`}>
                            <span className="text-2xl font-black text-amber-500">100%</span>
                            <p className={`text-xs mt-1 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Premium Ingredients</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Grass-fed meats, pristine produce.</p>
                        </div>
                        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-zinc-900/40 border-white/[0.04] shadow-sm' : 'bg-white border-slate-100 shadow-sm'}`}>
                            <span className="text-2xl font-black text-amber-500">Chef</span>
                            <p className={`text-xs mt-1 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Custom Recipes</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Custom spice, toppings, and doughs.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative rounded-3xl overflow-hidden border border-zinc-800/40 dark:border-white/[0.05] shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
                            alt="Artisanal burgers being crafted"
                            className="w-full h-[380px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                            <div className="text-white space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Our Signature Craft</span>
                                <h4 className="text-lg font-bold">Artisanal Brioche Seared in Grass-fed Butter</h4>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 3. EXQUISITE ON-TIME DELIVERY ASSURANCE */}
            <section className={`rounded-3xl border p-8 sm:p-12 relative overflow-hidden ${isDarkMode ? 'bg-zinc-900/40 border-white/[0.04] shadow-lg' : 'bg-slate-50/50 border-slate-100 shadow-sm'
                }`}>
                {/* Glow in the background */}
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-amber-500/10 filter blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-500 text-xs font-semibold">
                            <Truck className="h-4 w-4" />
                            <span>Real-Time Express Dispatch</span>
                        </div>

                        <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            Hot & Fresh on Your Doorstep,<br />
                            <span className="text-amber-500">Every Single Time.</span>
                        </h2>

                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Nobody likes lukewarm food or long waits. That’s why we’ve completely reimagined gourmet home delivery. Our smart thermal dispatch system and optimized routing algorithms ensure your order leaves the grill and reaches your hands in absolute minimum time.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 mt-0.5">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <div>
                                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Guaranteed On Time</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">If we are late, your next custom-built hamburger is fully on us.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500 mt-0.5">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Live Order Trackers</h4>
                                    <p className="text-[11px] text-gray-400 mt-1">Watch your meal progress from preparation to kitchen, to driver dispatch, live.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative p-6 rounded-2xl border bg-zinc-950/40 border-white/[0.05] max-w-sm w-full space-y-4 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Delivery Status</span>
                                </div>
                                <span className="text-[10px] font-mono text-gray-400">Order #4289</span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">✓</div>
                                    <span className="text-xs font-bold text-white">12:02 PM - Chef Seared Wagyu</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">✓</div>
                                    <span className="text-xs font-bold text-white">12:08 PM - Thermo Sealed Packaging</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold animate-pulse">🚴</div>
                                    <span className="text-xs font-bold text-amber-400 font-mono">12:12 PM - Out for Delivery (Near You)</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-dashed border-white/10 text-center">
                                <p className="text-[10px] text-gray-400">Average Delivery Time: <strong className="text-white">22 mins</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SIGNATURE GLOWING DISH PREVIEWS (LOCKED HOOK) */}
            <section className="space-y-10">
                <div className="text-center space-y-3 max-w-lg mx-auto">
                    <div className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Exclusively for Club Members</span>
                    </div>
                    <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Preview Our Signature Recipes
                    </h2>
                    <p className="text-xs text-gray-400">
                        Sign up to custom-build toppings, select spice intensities, and check local calorie and prep times.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SIGNATURE_PREVIEWS.map((recipe, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl border overflow-hidden transition-all duration-300 relative group flex flex-col h-full ${isDarkMode
                                    ? 'bg-zinc-900/40 border-white/[0.04] hover:border-amber-500/25 hover:bg-zinc-900/60 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                                    : 'bg-white border-slate-100 shadow-sm hover:border-amber-200/50 hover:shadow-md'
                                }`}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={recipe.image}
                                    alt={recipe.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                    <span>{recipe.rating}</span>
                                </div>

                                <div className="absolute bottom-3 left-3 text-white text-[10px] font-mono flex items-center gap-1 bg-amber-500/80 px-2 py-0.5 rounded-md">
                                    <Clock className="h-3 w-3" />
                                    <span>{recipe.prep} mins prep</span>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className={`font-sans text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {recipe.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-light">
                                        {recipe.tagline}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-dashed border-gray-500/10">
                                    <button
                                        onClick={onOpenAuth}
                                        className="w-full py-2 rounded-xl text-xs font-bold text-center border border-amber-500/20 text-amber-500 bg-amber-500/5 hover:bg-amber-500 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                                    >
                                        <Lock className="h-3.5 w-3.5" />
                                        <span>Unlock & Custom Build</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. USER TESTIMONIALS */}
            <section className="space-y-10">
                <div className="text-center space-y-3">
                    <span className="text-xs font-bold tracking-widest uppercase text-amber-500">Gourmet Endorsements</span>
                    <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Loved By Serious Food Lovers
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl border ${isDarkMode
                                    ? 'bg-zinc-900/40 border-white/[0.04] text-white shadow-md'
                                    : 'bg-white border-slate-100 shadow-sm text-gray-800'
                                } flex flex-col justify-between space-y-4`}
                        >
                            <div className="space-y-3">
                                <div className="flex gap-0.5">
                                    {[...Array(t.stars)].map((_, i) => (
                                        <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xs leading-relaxed font-light italic opacity-90">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="pt-4 border-t border-dashed border-gray-500/10 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs font-bold">{t.name}</h4>
                                    <p className="text-[10px] text-amber-500 mt-0.5">{t.role}</p>
                                </div>
                                <Heart className="h-4 w-4 text-amber-500 fill-amber-500/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. CALL TO ACTION REGISTER */}
            <section className="relative rounded-3xl overflow-hidden border border-white/[0.04] py-16 px-6 sm:px-12 text-center bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-xl">
                {/* Dynamic decorative particles and glow */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full filter blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full filter blur-2xl pointer-events-none" />

                <div className="relative z-10 max-w-xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mx-auto">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Guaranteed Secure Sign Up</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Ready to Begin Your Culinary Journey?
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                        Create an account in less than 10 seconds to unlock the full interactive menu, customized recipe builds, instant checkout options, and live order status tracking with on-time delivery guarantees.
                    </p>

                    <div className="pt-2">
                        <button
                            onClick={onOpenAuth}
                            className="px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 shadow-lg shadow-amber-500/25 cursor-pointer hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
                        >
                            <span>Create Account / Log In Now</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
