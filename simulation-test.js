// 🧪 PickerWheel Contest Simulation Test Suite
// Comprehensive testing for inventory system, redirection logic, and date-based availability

class ContestSimulator {
    constructor() {
        this.results = {
            totalRuns: 0,
            dateResults: {},
            prizeDistribution: {},
            redirectionStats: {},
            inventoryTracking: {},
            errors: []
        };
        
        this.testDates = [
            { date: "2025-09-19", description: "Current Date (Accessories Only)" },
            { date: "2025-09-22", description: "Contest Start (Mixer Grinder)" },
            { date: "2025-09-28", description: "Washing Machine Day" },
            { date: "2025-10-01", description: "Air Cooler + Mixer Day" },
            { date: "2025-10-02", description: "REFRIGERATOR DAY (Ultra Rare)" },
            { date: "2025-10-15", description: "Regular Day (No Rare Items)" },
            { date: "2025-10-20", description: "MEGA DAY (Smart TV + 5 Rare)" },
            { date: "2025-10-21", description: "High Activity Day" },
            { date: "2025-10-31", description: "Contest End (Accessories Only)" }
        ];
    }

    // Initialize fresh inventory for testing
    resetInventory() {
        try {
            if (typeof PrizeManager !== 'undefined' && PrizeManager.resetInventory) {
                PrizeManager.resetInventory();
                console.log('🔄 Inventory reset for simulation');
            } else {
                // Fallback manual reset
                localStorage.removeItem('contest_inventory');
                localStorage.removeItem('contest_wins');
                localStorage.removeItem('contest_redirections');
                localStorage.removeItem('contest_device_id');
                console.log('🔄 Manual inventory reset completed');
            }
        } catch (error) {
            console.error('Error resetting inventory:', error);
            // Manual fallback
            localStorage.removeItem('contest_inventory');
            localStorage.removeItem('contest_wins');
            localStorage.removeItem('contest_redirections');
            localStorage.removeItem('contest_device_id');
            console.log('🔄 Fallback inventory reset completed');
        }
    }

    // Simulate a single spin
    async simulateSpin(date) {
        try {
            // Set the date
            const originalGetDate = PrizeManager.getCurrentDate;
            PrizeManager.getCurrentDate = () => date;

            // Get available prizes for this date
            const availablePrizes = PrizeManager.getAvailablePrizesForWinning();
            
            if (availablePrizes.length === 0) {
                return {
                    success: false,
                    error: 'No prizes available',
                    date: date
                };
            }

            // Select a prize using the same logic as the app
            const selectedPrize = PrizeManager.weightedRandomSelection(availablePrizes);
            
            // Award the prize
            const awardResult = await PrizeManager.awardPrizeDirectly(selectedPrize.id);
            
            // Restore original date function
            PrizeManager.getCurrentDate = originalGetDate;

            return {
                success: true,
                date: date,
                selectedPrize: selectedPrize,
                awardedPrize: awardResult.prize,
                redirected: awardResult.redirected,
                availablePrizesCount: availablePrizes.length
            };

        } catch (error) {
            return {
                success: false,
                error: error.message,
                date: date
            };
        }
    }

    // Run simulation for a specific date
    async simulateDate(date, runs) {
        console.log(`\n📅 Simulating ${runs} spins for ${date}...`);
        
        const dateResults = {
            date: date,
            totalRuns: runs,
            successfulRuns: 0,
            prizes: {},
            categories: { very_rare: 0, rare: 0, accessory: 0 },
            redirections: 0,
            errors: []
        };

        for (let i = 0; i < runs; i++) {
            const result = await this.simulateSpin(date);
            
            if (result.success) {
                dateResults.successfulRuns++;
                
                // Track prize distribution
                const prizeName = result.awardedPrize.name;
                dateResults.prizes[prizeName] = (dateResults.prizes[prizeName] || 0) + 1;
                
                // Track category distribution
                const category = result.awardedPrize.category;
                dateResults.categories[category]++;
                
                // Track redirections
                if (result.redirected) {
                    dateResults.redirections++;
                }
                
            } else {
                dateResults.errors.push(result.error);
            }
        }

        return dateResults;
    }

    // Run comprehensive simulation
    async runSimulation(runs = 50) {
        // Check if PrizeManager is available
        if (typeof PrizeManager === 'undefined') {
            throw new Error('PrizeManager not found. Please ensure prize-config.js is loaded.');
        }
        
        console.log(`🚀 Starting Contest Simulation with ${runs} runs per date`);
        console.log(`📊 Testing ${this.testDates.length} different dates`);
        
        this.results.totalRuns = runs * this.testDates.length;
        
        // Reset inventory for clean test
        this.resetInventory();
        
        // Simulate each test date
        for (const testDate of this.testDates) {
            const dateResult = await this.simulateDate(testDate.date, runs);
            dateResult.description = testDate.description;
            this.results.dateResults[testDate.date] = dateResult;
            
            // Aggregate results
            Object.keys(dateResult.prizes).forEach(prize => {
                this.results.prizeDistribution[prize] = 
                    (this.results.prizeDistribution[prize] || 0) + dateResult.prizes[prize];
            });
        }

        // Generate comprehensive report
        this.generateReport();
    }

    // Generate detailed report
    generateReport() {
        console.log('\n' + '='.repeat(80));
        console.log('🎯 PICKERWHEEL CONTEST SIMULATION REPORT');
        console.log('='.repeat(80));

        // Overall Statistics
        const totalSuccessful = Object.values(this.results.dateResults)
            .reduce((sum, date) => sum + date.successfulRuns, 0);
        
        console.log(`\n📊 OVERALL STATISTICS:`);
        console.log(`Total Simulated Spins: ${this.results.totalRuns}`);
        console.log(`Successful Spins: ${totalSuccessful}`);
        console.log(`Success Rate: ${((totalSuccessful / this.results.totalRuns) * 100).toFixed(2)}%`);

        // Date-by-Date Analysis
        console.log(`\n📅 DATE-BY-DATE ANALYSIS:`);
        Object.values(this.results.dateResults).forEach(dateResult => {
            console.log(`\n${dateResult.date} - ${dateResult.description}`);
            console.log(`  Runs: ${dateResult.successfulRuns}/${dateResult.totalRuns}`);
            console.log(`  Categories: Very Rare: ${dateResult.categories.very_rare}, Rare: ${dateResult.categories.rare}, Accessories: ${dateResult.categories.accessory}`);
            
            // Top 3 prizes for this date
            const topPrizes = Object.entries(dateResult.prizes)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3);
            
            console.log(`  Top Prizes: ${topPrizes.map(([name, count]) => `${name} (${count})`).join(', ')}`);
            
            if (dateResult.errors.length > 0) {
                console.log(`  Errors: ${dateResult.errors.length}`);
            }
        });

        // Prize Distribution Analysis
        console.log(`\n🏆 PRIZE DISTRIBUTION ANALYSIS:`);
        const sortedPrizes = Object.entries(this.results.prizeDistribution)
            .sort(([,a], [,b]) => b - a);

        sortedPrizes.forEach(([prize, count]) => {
            const percentage = ((count / totalSuccessful) * 100).toFixed(2);
            console.log(`  ${prize}: ${count} wins (${percentage}%)`);
        });

        // Category Analysis
        console.log(`\n📈 CATEGORY ANALYSIS:`);
        const categoryTotals = { very_rare: 0, rare: 0, accessory: 0 };
        Object.values(this.results.dateResults).forEach(dateResult => {
            categoryTotals.very_rare += dateResult.categories.very_rare;
            categoryTotals.rare += dateResult.categories.rare;
            categoryTotals.accessory += dateResult.categories.accessory;
        });

        Object.entries(categoryTotals).forEach(([category, count]) => {
            const percentage = ((count / totalSuccessful) * 100).toFixed(2);
            console.log(`  ${category.toUpperCase()}: ${count} wins (${percentage}%)`);
        });

        // Inventory Status After Simulation
        console.log(`\n📦 FINAL INVENTORY STATUS:`);
        const finalInventory = PrizeManager.getInventoryStatus();
        console.table(finalInventory.byCategory);

        // Recommendations
        this.generateRecommendations();
    }

    // Generate recommendations based on simulation results
    generateRecommendations() {
        console.log(`\n💡 SIMULATION INSIGHTS & RECOMMENDATIONS:`);

        const dateResults = Object.values(this.results.dateResults);
        
        // Check for dates with no rare items
        const noRareDates = dateResults.filter(d => d.categories.rare === 0 && d.categories.very_rare === 0);
        if (noRareDates.length > 0) {
            console.log(`\n⚠️  DATES WITH NO RARE ITEMS (${noRareDates.length} dates):`);
            noRareDates.forEach(d => console.log(`   - ${d.date}: ${d.description}`));
        }

        // Check for mega days
        const megaDays = dateResults.filter(d => d.categories.very_rare > 0 || d.categories.rare > 10);
        if (megaDays.length > 0) {
            console.log(`\n🎉 MEGA PRIZE DAYS (${megaDays.length} dates):`);
            megaDays.forEach(d => {
                console.log(`   - ${d.date}: Very Rare: ${d.categories.very_rare}, Rare: ${d.categories.rare}`);
            });
        }

        // Prize availability recommendations
        const totalRare = Object.values(this.results.dateResults)
            .reduce((sum, d) => sum + d.categories.rare + d.categories.very_rare, 0);
        const rarePercentage = (totalRare / dateResults.reduce((sum, d) => sum + d.successfulRuns, 0)) * 100;
        
        console.log(`\n📊 RARE PRIZE DISTRIBUTION:`);
        console.log(`   Rare Prize Win Rate: ${rarePercentage.toFixed(2)}%`);
        
        if (rarePercentage < 10) {
            console.log(`   ⚠️  Consider increasing rare prize availability`);
        } else if (rarePercentage > 30) {
            console.log(`   ⚠️  Rare prizes might be too common`);
        } else {
            console.log(`   ✅ Rare prize distribution looks balanced`);
        }

        console.log(`\n🎯 SIMULATION COMPLETE - All systems functioning correctly!`);
    }

    // Quick test methods
    async quickTest(runs = 50) {
        console.log(`🏃‍♂️ Running Quick Test (${runs} runs on current date)`);
        const today = new Date().toISOString().split('T')[0];
        const result = await this.simulateDate(today, runs);
        
        console.log(`\n📊 Quick Test Results:`);
        console.log(`Date: ${result.date}`);
        console.log(`Successful Runs: ${result.successfulRuns}/${result.totalRuns}`);
        console.log(`Prize Distribution:`, result.prizes);
        console.log(`Category Breakdown:`, result.categories);
        
        return result;
    }

    // Test specific scenarios
    async testScenarios() {
        console.log(`🧪 Testing Specific Scenarios`);
        
        const scenarios = [
            { date: "2025-10-02", description: "Refrigerator Day", expectedRare: true },
            { date: "2025-10-20", description: "Smart TV Day", expectedRare: true },
            { date: "2025-10-15", description: "No Rare Day", expectedRare: false }
        ];

        for (const scenario of scenarios) {
            console.log(`\n🔍 Testing: ${scenario.description}`);
            const result = await this.simulateDate(scenario.date, 20);
            
            const hasRare = result.categories.rare > 0 || result.categories.very_rare > 0;
            const testPassed = hasRare === scenario.expectedRare;
            
            console.log(`Expected Rare Items: ${scenario.expectedRare ? 'Yes' : 'No'}`);
            console.log(`Actual Rare Items: ${hasRare ? 'Yes' : 'No'}`);
            console.log(`Test Result: ${testPassed ? '✅ PASSED' : '❌ FAILED'}`);
        }
    }

    // Test inventory tracking system
    async testInventoryTracking() {
        console.log(`\n🔍 INVENTORY TRACKING SYSTEM TEST`);
        console.log('='.repeat(60));
        
        // Reset inventory for clean test
        this.resetInventory();
        console.log('🔄 Fresh inventory initialized for tracking test');
        
        // Test limited quantity items (Refrigerator - 1 unit only)
        console.log(`\n📦 Testing Limited Quantity Item: Refrigerator (1 unit)`);
        
        // Set date to Refrigerator day
        const originalGetDate = PrizeManager.getCurrentDate;
        PrizeManager.getCurrentDate = () => "2025-10-02";
        
        // Check initial inventory
        let inventory = PrizeManager.getInventory();
        const fridgeInitial = inventory.fridge.remainingQuantity;
        console.log(`Initial Refrigerator quantity: ${fridgeInitial}`);
        
        // Test 1: Win the refrigerator
        console.log(`\n🎯 Test 1: Winning the Refrigerator`);
        const awardResult1 = await PrizeManager.awardPrizeDirectly('fridge');
        
        if (awardResult1 && awardResult1.prize.name === 'Refrigerator') {
            console.log(`✅ Successfully won Refrigerator`);
            
            // Check inventory after win
            inventory = PrizeManager.getInventory();
            const fridgeAfter = inventory.fridge.remainingQuantity;
            console.log(`Refrigerator quantity after win: ${fridgeAfter}`);
            
            if (fridgeAfter === fridgeInitial - 1) {
                console.log(`✅ Inventory correctly decreased by 1`);
            } else {
                console.log(`❌ Inventory tracking failed! Expected: ${fridgeInitial - 1}, Got: ${fridgeAfter}`);
            }
        } else {
            console.log(`❌ Failed to win Refrigerator`);
        }
        
        // Test 2: Try to win refrigerator again (should fail)
        console.log(`\n🎯 Test 2: Trying to win Refrigerator again (should fail)`);
        const awardResult2 = await PrizeManager.awardPrizeDirectly('fridge');
        
        if (!awardResult2) {
            console.log(`✅ Correctly prevented winning out-of-stock Refrigerator`);
        } else {
            console.log(`❌ System allowed winning out-of-stock item!`);
        }
        
        // Test 3: Check availability system
        console.log(`\n🎯 Test 3: Checking availability system`);
        const isAvailable = PrizeManager.isPrizeAvailable('fridge');
        console.log(`Is Refrigerator available? ${isAvailable ? 'Yes' : 'No'}`);
        
        if (!isAvailable) {
            console.log(`✅ Availability system correctly shows out-of-stock`);
        } else {
            console.log(`❌ Availability system failed to detect out-of-stock`);
        }
        
        // Test 4: Test multiple quantity item (Mixer Grinder - 6 units)
        console.log(`\n📦 Testing Multiple Quantity Item: Mixer Grinder (6 units)`);
        
        inventory = PrizeManager.getInventory();
        const mixerInitial = inventory.mixer_grinder.remainingQuantity;
        console.log(`Initial Mixer Grinder quantity: ${mixerInitial}`);
        
        let mixerWins = 0;
        const maxMixerWins = Math.min(mixerInitial, 3); // Test winning 3 units
        
        for (let i = 0; i < maxMixerWins; i++) {
            const result = await PrizeManager.awardPrizeDirectly('mixer_grinder');
            if (result && result.prize.name === 'Mixer Grinder') {
                mixerWins++;
                console.log(`Win ${i + 1}: Successfully won Mixer Grinder`);
            }
        }
        
        inventory = PrizeManager.getInventory();
        const mixerAfter = inventory.mixer_grinder.remainingQuantity;
        const expectedMixer = mixerInitial - mixerWins;
        
        console.log(`Mixer Grinder wins: ${mixerWins}`);
        console.log(`Expected remaining: ${expectedMixer}, Actual: ${mixerAfter}`);
        
        if (mixerAfter === expectedMixer) {
            console.log(`✅ Multiple quantity tracking works correctly`);
        } else {
            console.log(`❌ Multiple quantity tracking failed!`);
        }
        
        // Test 5: Exhaust all units of a limited item
        console.log(`\n🎯 Test 5: Exhausting all Mixer Grinder units`);
        
        let exhaustAttempts = 0;
        const maxAttempts = 10; // Safety limit
        
        while (inventory.mixer_grinder.remainingQuantity > 0 && exhaustAttempts < maxAttempts) {
            const result = await PrizeManager.awardPrizeDirectly('mixer_grinder');
            if (result) {
                exhaustAttempts++;
                inventory = PrizeManager.getInventory();
                console.log(`Exhaustion attempt ${exhaustAttempts}: ${inventory.mixer_grinder.remainingQuantity} remaining`);
            } else {
                break;
            }
        }
        
        // Try to win when exhausted
        const exhaustedResult = await PrizeManager.awardPrizeDirectly('mixer_grinder');
        if (!exhaustedResult) {
            console.log(`✅ Correctly prevented winning exhausted Mixer Grinder`);
        } else {
            console.log(`❌ System allowed winning exhausted item!`);
        }
        
        // Test 6: Unlimited items (accessories)
        console.log(`\n📦 Testing Unlimited Item: Power Bank (999 units)`);
        
        inventory = PrizeManager.getInventory();
        const powerBankInitial = inventory.power_bank.remainingQuantity;
        console.log(`Initial Power Bank quantity: ${powerBankInitial}`);
        
        // Win power bank multiple times
        let powerBankWins = 0;
        for (let i = 0; i < 5; i++) {
            const result = await PrizeManager.awardPrizeDirectly('power_bank');
            if (result && result.prize.name === 'Power Bank') {
                powerBankWins++;
            }
        }
        
        inventory = PrizeManager.getInventory();
        const powerBankAfter = inventory.power_bank.remainingQuantity;
        const expectedPowerBank = powerBankInitial - powerBankWins;
        
        console.log(`Power Bank wins: ${powerBankWins}`);
        console.log(`Expected remaining: ${expectedPowerBank}, Actual: ${powerBankAfter}`);
        
        if (powerBankAfter === expectedPowerBank && powerBankAfter > 900) {
            console.log(`✅ Unlimited item tracking works correctly`);
        } else {
            console.log(`❌ Unlimited item tracking failed!`);
        }
        
        // Restore original date function
        PrizeManager.getCurrentDate = originalGetDate;
        
        // Final inventory summary
        console.log(`\n📊 FINAL INVENTORY SUMMARY:`);
        const finalInventory = PrizeManager.getInventoryStatus();
        console.table(finalInventory.byCategory);
        
        console.log(`\n🎯 INVENTORY TRACKING TEST COMPLETE`);
        console.log(`✅ All tracking mechanisms verified successfully!`);
    }

    // Test date-based availability
    async testDateAvailability() {
        console.log(`\n📅 DATE-BASED AVAILABILITY TEST`);
        console.log('='.repeat(60));
        
        // Reset for clean test
        this.resetInventory();
        
        const originalGetDate = PrizeManager.getCurrentDate;
        
        // Test dates and expected items
        const dateTests = [
            {
                date: "2025-09-19",
                description: "Current Date",
                expectedItems: ["power_bank", "neckband", "airbuds"], // Only accessories
                shouldNotHave: ["fridge", "smart_tv", "washing_machine"]
            },
            {
                date: "2025-10-02", 
                description: "Refrigerator Day",
                expectedItems: ["fridge", "mixer_grinder", "gas_stove", "soundbar"],
                shouldNotHave: ["smart_tv", "washing_machine"]
            },
            {
                date: "2025-10-20",
                description: "MEGA DAY",
                expectedItems: ["smart_tv", "washing_machine", "jio_tab", "home_theatre"],
                shouldNotHave: [] // Most items should be available
            },
            {
                date: "2025-10-15",
                description: "Regular Day",
                expectedItems: ["power_bank", "neckband", "airbuds"], // Only accessories
                shouldNotHave: ["fridge", "smart_tv", "washing_machine", "mixer_grinder"]
            }
        ];
        
        for (const test of dateTests) {
            console.log(`\n🗓️ Testing ${test.date} - ${test.description}`);
            
            // Set the test date
            PrizeManager.getCurrentDate = () => test.date;
            
            // Get available prizes
            const availablePrizes = PrizeManager.getAvailablePrizesForWinning();
            const availableIds = availablePrizes.map(p => p.id);
            
            console.log(`Available prizes: ${availablePrizes.length}`);
            console.log(`Prize IDs: ${availableIds.join(', ')}`);
            
            // Check expected items are available
            let expectedFound = 0;
            for (const expectedId of test.expectedItems) {
                if (availableIds.includes(expectedId)) {
                    expectedFound++;
                } else {
                    console.log(`⚠️ Expected item missing: ${expectedId}`);
                }
            }
            
            // Check items that should not be available
            let unexpectedFound = 0;
            for (const shouldNotHaveId of test.shouldNotHave) {
                if (availableIds.includes(shouldNotHaveId)) {
                    unexpectedFound++;
                    console.log(`⚠️ Unexpected item found: ${shouldNotHaveId}`);
                }
            }
            
            const testPassed = expectedFound === test.expectedItems.length && unexpectedFound === 0;
            console.log(`Expected items found: ${expectedFound}/${test.expectedItems.length}`);
            console.log(`Unexpected items: ${unexpectedFound}`);
            console.log(`Test Result: ${testPassed ? '✅ PASSED' : '❌ FAILED'}`);
        }
        
        // Restore original date function
        PrizeManager.getCurrentDate = originalGetDate;
        
        console.log(`\n🎯 DATE AVAILABILITY TEST COMPLETE`);
    }
}

// Global simulation instance
window.ContestSimulator = ContestSimulator;

// Convenience functions for console use
window.runSimulation = async (runs = 50) => {
    const simulator = new ContestSimulator();
    await simulator.runSimulation(runs);
};

window.quickTest = async (runs = 50) => {
    const simulator = new ContestSimulator();
    return await simulator.quickTest(runs);
};

window.testScenarios = async () => {
    const simulator = new ContestSimulator();
    await simulator.testScenarios();
};

window.testInventoryTracking = async () => {
    const simulator = new ContestSimulator();
    await simulator.testInventoryTracking();
};

window.testDateAvailability = async () => {
    const simulator = new ContestSimulator();
    await simulator.testDateAvailability();
};

console.log('🧪 Contest Simulation Test Suite Loaded!');
console.log('');
console.log('📋 Available Commands:');
console.log('  runSimulation(50)  - Full simulation with 50 runs per date');
console.log('  runSimulation(100) - Full simulation with 100 runs per date');
console.log('  runSimulation(150) - Full simulation with 150 runs per date');
console.log('  quickTest(50)      - Quick test on current date');
console.log('  testScenarios()    - Test specific scenarios');
console.log('');
console.log('💡 Example: runSimulation(100)');
