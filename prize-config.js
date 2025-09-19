// Prize Configuration for PickerWheel Contest App - Updated with Full Inventory System
const PRIZE_CONFIG = {
    // Contest period settings
    contestPeriod: {
        startDate: "2025-09-22", // Contest start date
        endDate: "2025-10-31"    // Contest end date
    },
    
    // Scooty Lucky Draw Configuration (separate from main wheel)
    scoodyLuckyDraw: {
        enabled: true,
        startDate: "2025-10-01",
        endDate: "2025-10-31",
        maxEntriesPerDay: 1,
        prize: {
            id: "scooty-bumper",
            name: "Scooty",
            emoji: "🛵",
            category: "bumper",
            description: "Win an amazing Scooty!"
        }
    },
    
    // Complete inventory with 22 prizes (as shown to users) + quantities and availability
    prizes: [
        // VERY RARE ITEMS (Ultra Limited)
        {
            id: "fridge",
            name: "Refrigerator",
            emoji: "🧊",
            icon: "icons/fridge.png",
            category: "very_rare",
            initialQuantity: 1,
            availableDates: ["2025-10-02"],
            weight: 50
        },
        {
            id: "smart_tv",
            name: "Smart TV 32\"",
            emoji: "📺",
            icon: "icons/smart-tv.png",
            category: "very_rare",
            initialQuantity: 1,
            availableDates: ["2025-10-20"],
            weight: 50
        },
        
        // RARE ITEMS (Scheduled Dates)
        {
            id: "washing_machine",
            name: "Washing Machine",
            emoji: "🫧",
            icon: "icons/washing-machine.png",
            category: "rare",
            initialQuantity: 2,
            availableDates: ["2025-09-28", "2025-10-20"],
            weight: 30
        },
        {
            id: "air_cooler",
            name: "Air Cooler",
            emoji: "🌬️",
            icon: "icons/washer.png",
            category: "rare",
            initialQuantity: 2,
            availableDates: ["2025-10-01", "2025-10-21"],
            weight: 30
        },
        {
            id: "mixer_grinder",
            name: "Mixer Grinder",
            emoji: "🥛",
            icon: "icons/mixer-grinder.png",
            category: "rare",
            initialQuantity: 6,
            availableDates: ["2025-09-22", "2025-09-29", "2025-10-01", "2025-10-02", "2025-10-18", "2025-10-20"],
            weight: 30
        },
        {
            id: "gas_stove",
            name: "Gas Stove",
            emoji: "🔥",
            icon: "icons/gas-stove.png",
            category: "rare",
            initialQuantity: 3,
            availableDates: ["2025-09-23", "2025-10-02", "2025-10-18"],
            weight: 30
        },
        {
            id: "soundbar",
            name: "Boult Soundbar",
            emoji: "🔈",
            icon: "icons/boult-soundbar.png",
            category: "rare",
            initialQuantity: 6,
            availableDates: ["2025-09-30", "2025-10-02", "2025-10-19", "2025-10-20", "2025-10-21", "2025-10-22"],
            weight: 30
        },
        {
            id: "jio_tab",
            name: "Jio Tab",
            emoji: "📟",
            icon: "icons/jio-tab.png",
            category: "rare",
            initialQuantity: 7,
            availableDates: ["2025-10-07", "2025-10-14", "2025-10-19", "2025-10-20", "2025-10-21", "2025-10-22", "2025-10-28"],
            weight: 30
        },
        {
            id: "home_theatre",
            name: "Home Theatre",
            emoji: "🎬",
            icon: "icons/home-theatre.png",
            category: "rare",
            initialQuantity: 5,
            availableDates: ["2025-09-24", "2025-10-04", "2025-10-20", "2025-10-21", "2025-10-23"],
            weight: 30
        },
        
        // MOBILE ACCESSORIES (Always Available - Unlimited)
        {
            id: "power_bank",
            name: "Power Bank",
            emoji: "🔋",
            icon: "icons/powerbank.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [], // Empty means always available
            weight: 10
        },
        {
            id: "neckband",
            name: "Neckband",
            emoji: "🎧",
            icon: "icons/wireless-neckband.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "airbuds",
            name: "Defy Airbuds",
            emoji: "🎵",
            icon: "icons/defy-earbuds.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "smartwatch",
            name: "Noise Smart Watch",
            emoji: "⌚",
            icon: "icons/smartwatch.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "earphones",
            name: "Skullcandy Earphones",
            emoji: "🎤",
            icon: "icons/skullcandy-earphones.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "trimmer",
            name: "Trimmer",
            emoji: "💇",
            icon: "icons/trimmer.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "luggage_bag",
            name: "Luggage Bags",
            emoji: "🧳",
            icon: "icons/luggage-bag.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "g_speaker",
            name: "G Speaker",
            emoji: "🔊",
            icon: "icons/g-speaker.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "selfie_stick",
            name: "Selfie Stick",
            emoji: "📸",
            icon: "icons/selfie-stick.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "screen_guard",
            name: "Pouch & Screen Guard",
            emoji: "📱",
            icon: "icons/screen-guard.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        },
        {
            id: "pressure_cooker",
            name: "Pressure Cooker",
            emoji: "🍲",
            icon: "icons/pressure-cooker.png",
            category: "accessory",
            initialQuantity: 999,
            availableDates: [],
            weight: 10
        }
    ]
};

// Advanced Prize Management System with Inventory Tracking
const PrizeManager = {
    // Get current date in YYYY-MM-DD format
    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    },
    
    // Initialize inventory database (localStorage simulation)
    initializeInventory() {
        const existingInventory = localStorage.getItem('contest_inventory');
        if (!existingInventory) {
            const inventory = {};
            PRIZE_CONFIG.prizes.forEach(prize => {
                // Calculate per-date quantities for rare items
                const perDateQuantities = {};
                if (prize.category === 'rare' && prize.availableDates.length > 0) {
                    // Distribute total quantity evenly across available dates
                    const quantityPerDate = Math.ceil(prize.initialQuantity / prize.availableDates.length);
                    prize.availableDates.forEach(date => {
                        perDateQuantities[date] = quantityPerDate;
                    });
                    
                    // Adjust if we over-allocated (e.g., 6 items across 6 dates = 1 each)
                    let totalAllocated = Object.values(perDateQuantities).reduce((sum, qty) => sum + qty, 0);
                    if (totalAllocated > prize.initialQuantity) {
                        // Remove excess from last dates
                        const dates = prize.availableDates.slice().reverse();
                        for (const date of dates) {
                            if (totalAllocated <= prize.initialQuantity) break;
                            if (perDateQuantities[date] > 1) {
                                perDateQuantities[date]--;
                                totalAllocated--;
                            }
                        }
                    }
                }
                
                inventory[prize.id] = {
                    id: prize.id,
                    name: prize.name,
                    emoji: prize.emoji,
                    icon: prize.icon,
                    category: prize.category,
                    initialQuantity: prize.initialQuantity,
                    remainingQuantity: prize.initialQuantity,
                    availableDates: [...prize.availableDates],
                    perDateQuantities: perDateQuantities, // NEW: Track quantities per date
                    weight: prize.weight
                };
            });
            localStorage.setItem('contest_inventory', JSON.stringify(inventory));
            console.log('🗄️ Inventory initialized with per-date tracking for rare items');
        } else {
            console.log('🗄️ Existing inventory loaded');
        }
    },
    
    // Get current inventory
    getInventory() {
        this.initializeInventory();
        return JSON.parse(localStorage.getItem('contest_inventory') || '{}');
    },
    
    // Enhanced prize availability check (date + quantity + per-date validation)
    isPrizeAvailable(prizeId) {
        const inventory = this.getInventory();
        const prize = inventory[prizeId];
        
        if (!prize) {
            console.warn(`⚠️ Prize not found in inventory: ${prizeId}`);
            return false;
        }
        
        // CRITICAL: Check total quantity first - must have stock
        if (prize.remainingQuantity <= 0) {
            console.log(`❌ ${prize.name}: Out of stock (${prize.remainingQuantity} remaining)`);
            return false;
        }
        
        // Accessories are always available (empty availableDates array)
        if (prize.availableDates.length === 0) {
            console.log(`✅ ${prize.name}: Always available (accessory) - ${prize.remainingQuantity} remaining`);
            return true;
        }
        
        // Check if today is in the available dates
        const currentDate = this.getCurrentDate();
        const isDateAvailable = prize.availableDates.includes(currentDate);
        
        if (!isDateAvailable) {
            console.log(`❌ ${prize.name}: Not available today (${currentDate}). Available on: [${prize.availableDates.join(', ')}]`);
            return false;
        }
        
        // NEW: For rare items, check per-date quantity
        if (prize.category === 'rare' && prize.perDateQuantities) {
            const quantityForToday = prize.perDateQuantities[currentDate] || 0;
            if (quantityForToday <= 0) {
                console.log(`❌ ${prize.name}: No more available today (${currentDate}) - ${quantityForToday} remaining for this date`);
                return false;
            }
            console.log(`✅ ${prize.name}: Available today (${currentDate}) - ${quantityForToday} remaining for this date, ${prize.remainingQuantity} total`);
        } else {
            console.log(`✅ ${prize.name}: Available today (${currentDate}) - ${prize.remainingQuantity} remaining`);
        }
        
        return true;
    },
    
    // Enhanced availability check with detailed reasons
    getPrizeAvailabilityDetails(prizeId) {
        const inventory = this.getInventory();
        const prize = inventory[prizeId];
        const currentDate = this.getCurrentDate();
        
        if (!prize) {
            return {
                available: false,
                reason: 'Prize not found',
                details: `Prize ID "${prizeId}" does not exist in inventory`
            };
        }
        
        const hasQuantity = prize.remainingQuantity > 0;
        const isDateAvailable = prize.availableDates.length === 0 || 
                               prize.availableDates.includes(currentDate);
        
        if (!hasQuantity) {
            return {
                available: false,
                reason: 'Out of stock',
                details: `${prize.name} has 0 remaining quantity`,
                prize: prize
            };
        }
        
        if (!isDateAvailable) {
            return {
                available: false,
                reason: 'Date not available',
                details: `${prize.name} not available on ${currentDate}. Available dates: [${prize.availableDates.join(', ')}]`,
                prize: prize
            };
        }
        
        return {
            available: true,
            reason: 'Available',
            details: `${prize.name} is available - ${prize.remainingQuantity} remaining`,
            prize: prize
        };
    },
    
    // Get all prizes available for winning today (backend logic)
    getAvailablePrizesForWinning() {
        const inventory = this.getInventory();
        const availablePrizes = [];
        
        Object.values(inventory).forEach(prize => {
            if (this.isPrizeAvailable(prize.id)) {
                availablePrizes.push(prize);
            }
        });
        
        return availablePrizes;
    },
    
    // Get all prizes for wheel display (UI - always shows all 22 prizes)
    getAllPrizes() {
        return PRIZE_CONFIG.prizes;
    },
    
    // Smart redirection algorithm
    findBestAlternative(originalPrizeId) {
        const inventory = this.getInventory();
        const originalPrize = inventory[originalPrizeId];
        const availablePrizes = this.getAvailablePrizesForWinning();
        
        if (availablePrizes.length === 0) {
            console.warn('⚠️ No prizes available - this should not happen!');
            return null;
        }
        
        // Priority 1: Same category available
        const sameCategory = availablePrizes.filter(p => p.category === originalPrize.category);
        if (sameCategory.length > 0) {
            return this.weightedRandomSelection(sameCategory);
        }
        
        // Priority 2: Similar value category
        let similarCategory = [];
        if (originalPrize.category === 'very_rare') {
            similarCategory = availablePrizes.filter(p => p.category === 'rare');
        } else if (originalPrize.category === 'rare') {
            similarCategory = availablePrizes.filter(p => p.category === 'rare' && p.id !== originalPrizeId);
        }
        
        if (similarCategory.length > 0) {
            return this.weightedRandomSelection(similarCategory);
        }
        
        // Priority 3: Weighted random from all available
        return this.weightedRandomSelection(availablePrizes);
    },
    
    // Weighted random selection based on prize weights
    weightedRandomSelection(prizes) {
        const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const prize of prizes) {
            random -= prize.weight;
            if (random <= 0) {
                return prize;
            }
        }
        
        // Fallback to first prize
        return prizes[0];
    },
    
    // Award a prize directly (for pre-selected available prizes)
    awardPrizeDirectly(prizeId) {
        const inventory = this.getInventory();
        const prize = inventory[prizeId];
        
        if (!prize) {
            console.error('❌ Prize not found in inventory:', prizeId);
            return Promise.resolve(null);
        }
        
        // Check if prize is available (both quantity and date)
        if (!this.isPrizeAvailable(prizeId)) {
            console.error('❌ Prize not available:', prize.name, 'Date:', this.getCurrentDate());
            return Promise.resolve(null);
        }
        
        // Reduce inventory - both total and per-date quantities
        const currentDate = this.getCurrentDate();
        prize.remainingQuantity -= 1;
        
        // NEW: For rare items, also reduce per-date quantity
        if (prize.category === 'rare' && prize.perDateQuantities && prize.perDateQuantities[currentDate]) {
            prize.perDateQuantities[currentDate] -= 1;
            console.log(`📅 Reduced ${prize.name} quantity for ${currentDate}: ${prize.perDateQuantities[currentDate]} remaining for this date`);
        }
        
        localStorage.setItem('contest_inventory', JSON.stringify(inventory));
        
        // Log the win
        this.logWin(prize, prize, 'direct_win');
        
        console.log(`✅ Direct win: ${prize.name} (${prize.remainingQuantity} remaining)`);
        const result = {
            prize: prize,
            redirected: false,
            originalPrize: prize
        };
        return Promise.resolve(result);
    },

    // Award a prize (main function called by spin logic with redirection)
    async awardPrize(landedPrizeId) {
        const inventory = this.getInventory();
        
        // Try to award the original prize first
        if (this.isPrizeAvailable(landedPrizeId)) {
            const prize = inventory[landedPrizeId];
            
            // Reduce inventory - both total and per-date quantities
            const currentDate = this.getCurrentDate();
            prize.remainingQuantity -= 1;
            
            // NEW: For rare items, also reduce per-date quantity
            if (prize.category === 'rare' && prize.perDateQuantities && prize.perDateQuantities[currentDate]) {
                prize.perDateQuantities[currentDate] -= 1;
                console.log(`📅 Reduced ${prize.name} quantity for ${currentDate}: ${prize.perDateQuantities[currentDate]} remaining for this date`);
            }
            
            localStorage.setItem('contest_inventory', JSON.stringify(inventory));
            
            // Log the win
            this.logWin(prize, prize, 'direct_win');
            
            console.log(`✅ Direct win: ${prize.name} (${prize.remainingQuantity} remaining)`);
            return {
                prize: prize,
                redirected: false,
                originalPrize: prize
            };
        }
        
        // Smart redirection
        const alternativePrize = this.findBestAlternative(landedPrizeId);
        if (!alternativePrize) {
            console.error('❌ No alternative prize found!');
            return null;
        }
        
        // Award alternative prize - both total and per-date quantities
        const currentDate = this.getCurrentDate();
        alternativePrize.remainingQuantity -= 1;
        
        // NEW: For rare items, also reduce per-date quantity
        if (alternativePrize.category === 'rare' && alternativePrize.perDateQuantities && alternativePrize.perDateQuantities[currentDate]) {
            alternativePrize.perDateQuantities[currentDate] -= 1;
            console.log(`📅 Reduced ${alternativePrize.name} quantity for ${currentDate}: ${alternativePrize.perDateQuantities[currentDate]} remaining for this date`);
        }
        
        localStorage.setItem('contest_inventory', JSON.stringify(inventory));
        
        // Log the redirection
        const originalPrize = inventory[landedPrizeId];
        this.logWin(alternativePrize, originalPrize, 'redirected');
        this.logRedirection(landedPrizeId, alternativePrize.id, this.getRedirectionReason(landedPrizeId));
        
        console.log(`🔄 Redirected: ${originalPrize.name} → ${alternativePrize.name} (${alternativePrize.remainingQuantity} remaining)`);
        return {
            prize: alternativePrize,
            redirected: true,
            originalPrize: originalPrize
        };
    },
    
    // Get redirection reason
    getRedirectionReason(prizeId) {
        const inventory = this.getInventory();
        const prize = inventory[prizeId];
        
        if (prize.remainingQuantity <= 0) return 'out_of_stock';
        if (prize.availableDates.length > 0 && !prize.availableDates.includes(this.getCurrentDate())) {
            return 'unavailable_date';
        }
        return 'unknown';
    },
    
    // Log wins to database
    logWin(awardedPrize, originalPrize, winType) {
        const wins = JSON.parse(localStorage.getItem('contest_wins') || '[]');
        const win = {
            id: 'win_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            awardedPrizeId: awardedPrize.id,
            awardedPrizeName: awardedPrize.name,
            originalPrizeId: originalPrize.id,
            originalPrizeName: originalPrize.name,
            winType: winType, // 'direct_win' or 'redirected'
            winDate: this.getCurrentDate(),
            winTimestamp: new Date().toISOString(),
            deviceId: this.getDeviceId()
        };
        
        wins.push(win);
        localStorage.setItem('contest_wins', JSON.stringify(wins));
    },
    
    // Log redirections for analytics
    logRedirection(originalPrizeId, awardedPrizeId, reason) {
        const redirections = JSON.parse(localStorage.getItem('contest_redirections') || '[]');
        const redirection = {
            id: 'redirect_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            originalPrizeId: originalPrizeId,
            awardedPrizeId: awardedPrizeId,
            reason: reason,
            redirectDate: this.getCurrentDate(),
            redirectTimestamp: new Date().toISOString(),
            deviceId: this.getDeviceId()
        };
        
        redirections.push(redirection);
        localStorage.setItem('contest_redirections', JSON.stringify(redirections));
    },
    
    // Get or create device ID for tracking
    getDeviceId() {
        let deviceId = localStorage.getItem('contest_device_id');
        if (!deviceId) {
            deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('contest_device_id', deviceId);
        }
        return deviceId;
    },
    
    // Get user statistics
    getUserStats() {
        const wins = JSON.parse(localStorage.getItem('contest_wins') || '[]');
        const redirections = JSON.parse(localStorage.getItem('contest_redirections') || '[]');
        const deviceId = this.getDeviceId();
        
        const userWins = wins.filter(win => win.deviceId === deviceId);
        const userRedirections = redirections.filter(r => r.deviceId === deviceId);
        
        return {
            totalWins: userWins.length,
            directWins: userWins.filter(w => w.winType === 'direct_win').length,
            redirectedWins: userWins.filter(w => w.winType === 'redirected').length,
            totalRedirections: userRedirections.length,
            winHistory: userWins.slice(-10) // Last 10 wins
        };
    },
    
    // Admin functions
    getInventoryStatus() {
        const inventory = this.getInventory();
        const status = {
            totalPrizes: Object.keys(inventory).length,
            availableToday: 0,
            outOfStock: 0,
            byCategory: {
                very_rare: { total: 0, available: 0, remaining: 0 },
                rare: { total: 0, available: 0, remaining: 0 },
                accessory: { total: 0, available: 0, remaining: 0 }
            }
        };
        
        Object.values(inventory).forEach(prize => {
            const category = status.byCategory[prize.category];
            category.total += 1;
            category.remaining += prize.remainingQuantity;
            
            if (this.isPrizeAvailable(prize.id)) {
                status.availableToday += 1;
                category.available += 1;
            }
            
            if (prize.remainingQuantity <= 0) {
                status.outOfStock += 1;
            }
        });
        
        return status;
    },
    
    // Reset inventory (admin function)
    resetInventory() {
        localStorage.removeItem('contest_inventory');
        localStorage.removeItem('contest_wins');
        localStorage.removeItem('contest_redirections');
        this.initializeInventory();
        console.log('🔄 Inventory reset successfully');
    }
};

// Scooty Lucky Draw Manager
const ScoodyManager = {
    // Check if Scooty lucky draw is currently active
    isLuckyDrawActive() {
        const currentDate = this.getCurrentDate();
        const config = PRIZE_CONFIG.scoodyLuckyDraw;
        
        return config.enabled && 
               currentDate >= config.startDate && 
               currentDate <= config.endDate;
    },
    
    // Get current date
    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    },
    
    // Get remaining time for lucky draw
    getTimeRemaining() {
        const now = new Date().getTime();
        const endDate = new Date(PRIZE_CONFIG.scoodyLuckyDraw.endDate + 'T23:59:59').getTime();
        const timeLeft = endDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            return { days, hours, minutes, active: true };
        }
        
        return { days: 0, hours: 0, minutes: 0, active: false };
    },
    
    // Check if user can enter today (based on daily limit)
    canEnterToday() {
        const today = this.getCurrentDate();
        const entries = JSON.parse(localStorage.getItem('scoodyEntries') || '[]');
        const todayEntries = entries.filter(entry => entry.date === today);
        
        return todayEntries.length < PRIZE_CONFIG.scoodyLuckyDraw.maxEntriesPerDay;
    },
    
    // Submit lucky draw entry
    submitEntry(userData) {
        const today = this.getCurrentDate();
        const entries = JSON.parse(localStorage.getItem('scoodyEntries') || '[]');
        
        const newEntry = {
            ...userData,
            date: today,
            timestamp: new Date().toISOString(),
            id: 'entry_' + Date.now()
        };
        
        entries.push(newEntry);
        localStorage.setItem('scoodyEntries', JSON.stringify(entries));
        
        // Track analytics
        this.trackEntry(newEntry);
        
        return newEntry;
    },
    
    // Get user's entry history
    getUserEntries() {
        return JSON.parse(localStorage.getItem('scoodyEntries') || '[]');
    },
    
    // Track entry for analytics
    trackEntry(entry) {
        console.log('Scooty Lucky Draw Entry:', entry);
        
        // Could integrate with analytics service here
        const analytics = JSON.parse(localStorage.getItem('scoodyAnalytics') || '{"totalEntries": 0}');
        analytics.totalEntries++;
        analytics.lastEntry = entry.timestamp;
        localStorage.setItem('scoodyAnalytics', JSON.stringify(analytics));
    }
};

// Admin Utilities for Easy Testing and Verification
const AdminUtilities = {
    // Easy date simulation for testing
    simulateDate(dateString) {
        if (!dateString) {
            console.log('📅 Usage: AdminUtilities.simulateDate("2025-10-02")');
            return;
        }
        
        // Override PrizeManager.getCurrentDate() temporarily
        PrizeManager.getCurrentDate = () => dateString;
        console.log(`📅 Date simulated: ${dateString}`);
        console.log('🔍 Current available prizes:');
        this.showAvailablePrizes();
    },
    
    // Reset date simulation
    resetDate() {
        PrizeManager.getCurrentDate = function() {
            return new Date().toISOString().split('T')[0];
        };
        console.log('📅 Date simulation reset to current date');
        this.showAvailablePrizes();
    },
    
    // Show current availability with detailed info
    showAvailablePrizes() {
        const available = PrizeManager.getAvailablePrizesForWinning();
        const currentDate = PrizeManager.getCurrentDate();
        
        console.log(`\n🎯 Prize Availability for ${currentDate}`);
        console.log(`📊 ${available.length} prizes available for winning\n`);
        
        if (available.length === 0) {
            console.log('❌ No prizes available today!');
            return;
        }
        
        // Group by category
        const categories = {
            very_rare: [],
            rare: [],
            accessory: []
        };
        
        available.forEach(prize => {
            categories[prize.category].push(prize);
        });
        
        Object.entries(categories).forEach(([category, prizes]) => {
            if (prizes.length === 0) return;
            
            const categoryName = category.replace('_', ' ').toUpperCase();
            console.log(`\n🏷️ ${categoryName} (${prizes.length} available):`);
            
            prizes.forEach(prize => {
                const dateInfo = prize.availableDates.length === 0 ? 
                    'Always' : 
                    prize.availableDates.join(', ');
                    
                console.log(`  ✅ ${prize.emoji} ${prize.name}`);
                console.log(`     Quantity: ${prize.remainingQuantity} | Dates: ${dateInfo}`);
            });
        });
        
        console.log('\n💡 Use AdminUtilities.verifyPrize("prize_id") for detailed info');
    },
    
    // Verify specific prize availability
    verifyPrize(prizeId) {
        if (!prizeId) {
            console.log('🔍 Usage: AdminUtilities.verifyPrize("fridge")');
            console.log('📋 Available prize IDs:', Object.keys(PrizeManager.getInventory()).join(', '));
            return;
        }
        
        const details = PrizeManager.getPrizeAvailabilityDetails(prizeId);
        const currentDate = PrizeManager.getCurrentDate();
        
        console.log(`\n🔍 Prize Verification: ${prizeId}`);
        console.log(`📅 Current Date: ${currentDate}`);
        console.log(`📊 Status: ${details.available ? '✅ AVAILABLE' : '❌ UNAVAILABLE'}`);
        console.log(`📝 Reason: ${details.reason}`);
        console.log(`📋 Details: ${details.details}`);
        
        if (details.prize) {
            console.log(`\n📦 Prize Information:`);
            console.log(`  Name: ${details.prize.emoji} ${details.prize.name}`);
            console.log(`  Category: ${details.prize.category}`);
            console.log(`  Quantity: ${details.prize.remainingQuantity}/${details.prize.initialQuantity}`);
            console.log(`  Available Dates: ${details.prize.availableDates.length === 0 ? 'Always' : details.prize.availableDates.join(', ')}`);
        }
    },
    
    // Modify prize dates easily
    updatePrizeDates(prizeId, newDates) {
        if (!prizeId || !newDates) {
            console.log('📅 Usage: AdminUtilities.updatePrizeDates("fridge", ["2025-10-02", "2025-10-03"])');
            return;
        }
        
        const inventory = PrizeManager.getInventory();
        if (!inventory[prizeId]) {
            console.log(`❌ Prize not found: ${prizeId}`);
            return;
        }
        
        const datesArray = Array.isArray(newDates) ? newDates : [newDates];
        inventory[prizeId].availableDates = datesArray;
        localStorage.setItem('contest_inventory', JSON.stringify(inventory));
        
        console.log(`✅ Updated ${inventory[prizeId].name} dates:`, datesArray);
        this.verifyPrize(prizeId);
    },
    
    // Add date to prize
    addPrizeDate(prizeId, newDate) {
        if (!prizeId || !newDate) {
            console.log('📅 Usage: AdminUtilities.addPrizeDate("fridge", "2025-10-03")');
            return;
        }
        
        const inventory = PrizeManager.getInventory();
        if (!inventory[prizeId]) {
            console.log(`❌ Prize not found: ${prizeId}`);
            return;
        }
        
        if (!inventory[prizeId].availableDates.includes(newDate)) {
            inventory[prizeId].availableDates.push(newDate);
            inventory[prizeId].availableDates.sort();
            localStorage.setItem('contest_inventory', JSON.stringify(inventory));
            console.log(`✅ Added date ${newDate} to ${inventory[prizeId].name}`);
        } else {
            console.log(`⚠️ Date ${newDate} already exists for ${inventory[prizeId].name}`);
        }
        
        this.verifyPrize(prizeId);
    },
    
    // Set prize quantity
    setPrizeQuantity(prizeId, newQuantity) {
        if (!prizeId || newQuantity === undefined) {
            console.log('📦 Usage: AdminUtilities.setPrizeQuantity("fridge", 5)');
            return;
        }
        
        const inventory = PrizeManager.getInventory();
        if (!inventory[prizeId]) {
            console.log(`❌ Prize not found: ${prizeId}`);
            return;
        }
        
        const quantity = Math.max(0, parseInt(newQuantity) || 0);
        const oldQuantity = inventory[prizeId].remainingQuantity;
        inventory[prizeId].remainingQuantity = quantity;
        
        localStorage.setItem('contest_inventory', JSON.stringify(inventory));
        
        console.log(`✅ Updated ${inventory[prizeId].name} quantity: ${oldQuantity} → ${quantity}`);
        this.verifyPrize(prizeId);
    },
    
    // Force win specific prize (testing)
    async forceWinPrize(prizeId) {
        if (!prizeId) {
            console.log('🎯 Usage: AdminUtilities.forceWinPrize("fridge")');
            return;
        }
        
        console.log(`🎯 Attempting to force win: ${prizeId}`);
        
        try {
            const result = await PrizeManager.awardPrizeDirectly(prizeId);
            if (result) {
                console.log(`🏆 Force win successful!`);
                console.log(`  Prize: ${result.prize.emoji} ${result.prize.name}`);
                console.log(`  Remaining: ${result.prize.remainingQuantity}`);
                console.log(`  Redirected: ${result.redirected ? 'Yes' : 'No'}`);
            } else {
                console.log(`❌ Force win failed - prize not available`);
                this.verifyPrize(prizeId);
            }
        } catch (error) {
            console.error('❌ Error during force win:', error);
        }
    },
    
    // Get comprehensive stats
    getStats() {
        const inventory = PrizeManager.getInventory();
        const status = PrizeManager.getInventoryStatus();
        const wins = JSON.parse(localStorage.getItem('contest_wins') || '[]');
        const redirections = JSON.parse(localStorage.getItem('contest_redirections') || '[]');
        
        console.log('\n📊 Contest Statistics');
        console.log('='.repeat(50));
        
        console.log(`\n📦 Inventory Overview:`);
        console.log(`  Total Prizes: ${status.totalPrizes}`);
        console.log(`  Available Today: ${status.availableToday}`);
        console.log(`  Out of Stock: ${status.outOfStock}`);
        
        console.log(`\n🏆 Win Statistics:`);
        console.log(`  Total Wins: ${wins.length}`);
        console.log(`  Direct Wins: ${wins.filter(w => w.winType === 'direct_win').length}`);
        console.log(`  Redirected Wins: ${wins.filter(w => w.winType === 'redirected').length}`);
        
        console.log(`\n🔄 Redirection Analysis:`);
        console.log(`  Total Redirections: ${redirections.length}`);
        console.log(`  Out of Stock: ${redirections.filter(r => r.reason === 'out_of_stock').length}`);
        console.log(`  Date Unavailable: ${redirections.filter(r => r.reason === 'unavailable_date').length}`);
        
        console.log(`\n📊 By Category:`);
        Object.entries(status.byCategory).forEach(([category, data]) => {
            const categoryName = category.replace('_', ' ').toUpperCase();
            console.log(`  ${categoryName}:`);
            console.log(`    Available: ${data.available}/${data.total}`);
            console.log(`    Remaining: ${data.remaining} units`);
        });
        
        console.log('\n💡 Available Commands:');
        console.log('  AdminUtilities.showAvailablePrizes() - Show current availability');
        console.log('  AdminUtilities.simulateDate("2025-10-02") - Test specific date');
        console.log('  AdminUtilities.verifyPrize("fridge") - Check specific prize');
        console.log('  AdminUtilities.setPrizeQuantity("fridge", 5) - Set quantity');
        console.log('  AdminUtilities.updatePrizeDates("fridge", ["2025-10-02"]) - Set dates');
    },
    
    // Reset everything
    resetAll() {
        if (confirm('⚠️ Reset all contest data? This cannot be undone!')) {
            PrizeManager.resetInventory();
            console.log('🔄 All contest data reset successfully');
            this.showAvailablePrizes();
        }
    },
    
    // Show help
    help() {
        console.log('\n🔧 Admin Utilities Help');
        console.log('='.repeat(50));
        console.log('\n📊 Information Commands:');
        console.log('  AdminUtilities.showAvailablePrizes() - Show current availability');
        console.log('  AdminUtilities.verifyPrize("prize_id") - Check specific prize');
        console.log('  AdminUtilities.getStats() - Show comprehensive statistics');
        
        console.log('\n📅 Date Management:');
        console.log('  AdminUtilities.simulateDate("2025-10-02") - Test specific date');
        console.log('  AdminUtilities.resetDate() - Reset to current date');
        console.log('  AdminUtilities.updatePrizeDates("prize_id", ["date1", "date2"]) - Set dates');
        console.log('  AdminUtilities.addPrizeDate("prize_id", "2025-10-02") - Add single date');
        
        console.log('\n📦 Quantity Management:');
        console.log('  AdminUtilities.setPrizeQuantity("prize_id", 5) - Set quantity');
        
        console.log('\n🎯 Testing:');
        console.log('  AdminUtilities.forceWinPrize("prize_id") - Force win for testing');
        
        console.log('\n🔄 Reset:');
        console.log('  AdminUtilities.resetAll() - Reset all data (with confirmation)');
        
        console.log('\n📋 Available Prize IDs:');
        const inventory = PrizeManager.getInventory();
        Object.entries(inventory).forEach(([id, prize]) => {
            console.log(`  ${id} - ${prize.emoji} ${prize.name} (${prize.category})`);
        });
    }
};

// Compatibility export for analysis tool - creates a simplified PRIZES array
if (typeof window !== 'undefined') {
    // Create simplified PRIZES array for compatibility with analysis tool
    window.PRIZES = PRIZE_CONFIG.prizes.map(prize => ({
        ...prize,
        availableFrom: prize.category === 'rare' ? PRIZE_CONFIG.rarePrizeDates?.defaultLaunchDate : undefined
    }));
    
    // Make everything globally available
    window.PRIZE_CONFIG = PRIZE_CONFIG;
    window.PrizeManager = PrizeManager;
    window.ScoodyManager = ScoodyManager;
    window.AdminUtilities = AdminUtilities;
    
    // Quick access aliases
    window.showPrizes = () => AdminUtilities.showAvailablePrizes();
    window.verifyPrize = (id) => AdminUtilities.verifyPrize(id);
    window.simulateDate = (date) => AdminUtilities.simulateDate(date);
    window.getStats = () => AdminUtilities.getStats();
    window.adminHelp = () => AdminUtilities.help();
    
    console.log('🔧 Admin utilities loaded! Type "adminHelp()" for commands');
}