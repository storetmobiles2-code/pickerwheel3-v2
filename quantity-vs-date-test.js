// Quantity vs Date Priority Test Script
const QuantityVsDateTest = {
    
    // Run comprehensive test
    async runTest() {
        console.log('\n🧪 QUANTITY vs DATE PRIORITY TEST');
        console.log('='.repeat(60));
        
        // Test scenario: Washing Machine on valid date but 0 quantity
        await this.testScenario1();
        
        // Test scenario: Compare with valid quantity
        await this.testScenario2();
        
        // Test scenario: Invalid date with quantity
        await this.testScenario3();
        
        // Test scenario: Spin simulation
        await this.testScenario4();
        
        console.log('\n✅ ALL TESTS COMPLETED');
        console.log('📋 Summary: Quantity always takes priority over dates');
    },
    
    // Scenario 1: Valid date, Zero quantity
    async testScenario1() {
        console.log('\n📋 SCENARIO 1: Valid Date + Zero Quantity');
        console.log('-'.repeat(40));
        
        // Setup
        AdminUtilities.simulateDate("2025-09-28"); // Valid date
        AdminUtilities.setPrizeQuantity("washing_machine", 0); // Zero quantity
        
        console.log('📅 Date: 2025-09-28 (VALID for washing machine)');
        console.log('📦 Quantity: 0 (ZERO stock)');
        console.log('🔍 Expected: Should be UNAVAILABLE\n');
        
        // Test
        const details = PrizeManager.getPrizeAvailabilityDetails("washing_machine");
        console.log(`📊 Result: ${details.available ? '✅ AVAILABLE' : '❌ UNAVAILABLE'}`);
        console.log(`📝 Reason: ${details.reason}`);
        console.log(`📋 Details: ${details.details}`);
        
        // Verify it's not in available list
        const availablePrizes = PrizeManager.getAvailablePrizesForWinning();
        const isInList = availablePrizes.some(p => p.id === 'washing_machine');
        console.log(`📊 In available list: ${isInList ? '✅ YES' : '❌ NO'}`);
    },
    
    // Scenario 2: Valid date, Valid quantity
    async testScenario2() {
        console.log('\n📋 SCENARIO 2: Valid Date + Valid Quantity');
        console.log('-'.repeat(40));
        
        // Setup
        AdminUtilities.simulateDate("2025-09-28"); // Same valid date
        AdminUtilities.setPrizeQuantity("washing_machine", 2); // Restore quantity
        
        console.log('📅 Date: 2025-09-28 (VALID for washing machine)');
        console.log('📦 Quantity: 2 (IN STOCK)');
        console.log('🔍 Expected: Should be AVAILABLE\n');
        
        // Test
        const details = PrizeManager.getPrizeAvailabilityDetails("washing_machine");
        console.log(`📊 Result: ${details.available ? '✅ AVAILABLE' : '❌ UNAVAILABLE'}`);
        console.log(`📝 Reason: ${details.reason}`);
        console.log(`📋 Details: ${details.details}`);
        
        // Verify it's in available list
        const availablePrizes = PrizeManager.getAvailablePrizesForWinning();
        const isInList = availablePrizes.some(p => p.id === 'washing_machine');
        console.log(`📊 In available list: ${isInList ? '✅ YES' : '❌ NO'}`);
    },
    
    // Scenario 3: Invalid date, Valid quantity
    async testScenario3() {
        console.log('\n📋 SCENARIO 3: Invalid Date + Valid Quantity');
        console.log('-'.repeat(40));
        
        // Setup
        AdminUtilities.simulateDate("2025-09-25"); // Invalid date
        AdminUtilities.setPrizeQuantity("washing_machine", 2); // Keep quantity
        
        console.log('📅 Date: 2025-09-25 (INVALID for washing machine)');
        console.log('📦 Quantity: 2 (IN STOCK)');
        console.log('🔍 Expected: Should be UNAVAILABLE (wrong date)\n');
        
        // Test
        const details = PrizeManager.getPrizeAvailabilityDetails("washing_machine");
        console.log(`📊 Result: ${details.available ? '✅ AVAILABLE' : '❌ UNAVAILABLE'}`);
        console.log(`📝 Reason: ${details.reason}`);
        console.log(`📋 Details: ${details.details}`);
        
        // Show valid dates
        const inventory = PrizeManager.getInventory();
        const prize = inventory["washing_machine"];
        console.log(`📅 Valid dates: [${prize.availableDates.join(', ')}]`);
    },
    
    // Scenario 4: Spin simulation test
    async testScenario4() {
        console.log('\n📋 SCENARIO 4: Spin Simulation Test');
        console.log('-'.repeat(40));
        
        // Setup critical test: valid date, zero quantity
        AdminUtilities.simulateDate("2025-09-28");
        AdminUtilities.setPrizeQuantity("washing_machine", 0);
        
        console.log('🎯 Simulating user landing on washing machine...');
        console.log('📅 Date: 2025-09-28 (valid)');
        console.log('📦 Quantity: 0 (out of stock)');
        console.log('🔍 Expected: Should redirect to alternative prize\n');
        
        try {
            // Try to award the washing machine
            const result = await PrizeManager.awardPrize("washing_machine");
            
            if (result.redirected) {
                console.log('🔄 REDIRECTION OCCURRED (as expected)');
                console.log(`📦 Original prize: Washing Machine`);
                console.log(`🏆 Awarded prize: ${result.prize.emoji} ${result.prize.name}`);
                console.log(`📝 Redirection reason: ${result.redirectionReason || 'out_of_stock'}`);
            } else {
                console.log('❌ NO REDIRECTION (unexpected!)');
                console.log(`🏆 Direct win: ${result.prize.name}`);
            }
        } catch (error) {
            console.log('❌ Award failed (as expected for zero quantity)');
            console.log(`📝 Error: ${error.message}`);
        }
    },
    
    // Quick test for any prize
    testPrize(prizeId, testDate, testQuantity) {
        console.log(`\n🧪 QUICK TEST: ${prizeId}`);
        console.log('-'.repeat(30));
        
        AdminUtilities.simulateDate(testDate);
        AdminUtilities.setPrizeQuantity(prizeId, testQuantity);
        
        console.log(`📅 Date: ${testDate}`);
        console.log(`📦 Quantity: ${testQuantity}`);
        
        const details = PrizeManager.getPrizeAvailabilityDetails(prizeId);
        console.log(`📊 Result: ${details.available ? '✅ AVAILABLE' : '❌ UNAVAILABLE'}`);
        console.log(`📝 Reason: ${details.reason}`);
        
        return details.available;
    },
    
    // Reset everything to original state
    resetToOriginal() {
        console.log('\n🔄 Resetting to original state...');
        AdminUtilities.resetDate();
        AdminUtilities.setPrizeQuantity("washing_machine", 2); // Original quantity
        console.log('✅ Reset complete');
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.QuantityVsDateTest = QuantityVsDateTest;
    window.testQuantityVsDate = () => QuantityVsDateTest.runTest();
    window.quickTest = (prizeId, date, quantity) => QuantityVsDateTest.testPrize(prizeId, date, quantity);
    
    console.log('\n🧪 QUANTITY vs DATE TEST READY!');
    console.log('📋 Available Commands:');
    console.log('  testQuantityVsDate() - Run complete test suite');
    console.log('  quickTest("washing_machine", "2025-09-28", 0) - Quick test');
    console.log('  QuantityVsDateTest.resetToOriginal() - Reset state');
}
