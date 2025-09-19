// Per-Date Inventory Test Script
const PerDateInventoryTest = {
    
    // Run comprehensive per-date inventory test
    async runTest() {
        console.log('\n🧪 PER-DATE INVENTORY SYSTEM TEST');
        console.log('='.repeat(60));
        
        // Reset inventory to test fresh
        this.resetInventory();
        
        // Test mixer grinder (6 units across 6 dates)
        await this.testMixerGrinder();
        
        // Test gas stove (3 units across 3 dates)
        await this.testGasStove();
        
        // Test washing machine (2 units across 2 dates)
        await this.testWashingMachine();
        
        console.log('\n✅ ALL PER-DATE INVENTORY TESTS COMPLETED');
    },
    
    // Test mixer grinder per-date limits
    async testMixerGrinder() {
        console.log('\n📋 MIXER GRINDER TEST (6 units across 6 dates)');
        console.log('-'.repeat(50));
        
        // Test date: 2025-09-22 (should have 1 unit)
        AdminUtilities.simulateDate("2025-09-22");
        console.log('📅 Testing date: 2025-09-22');
        
        // Check initial availability
        const details1 = PrizeManager.getPrizeAvailabilityDetails("mixer_grinder");
        console.log(`📊 Initial availability: ${details1.available ? '✅ Available' : '❌ Unavailable'}`);
        
        if (details1.available) {
            // Win first mixer grinder on this date
            const result1 = await PrizeManager.awardPrizeDirectly("mixer_grinder");
            console.log(`🎯 First win: ${result1 ? '✅ Success' : '❌ Failed'}`);
            
            // Try to win second mixer grinder on same date (should fail)
            const result2 = await PrizeManager.awardPrizeDirectly("mixer_grinder");
            console.log(`🎯 Second win attempt: ${result2 ? '❌ Unexpected success' : '✅ Correctly blocked'}`);
            
            // Check availability after first win
            const details2 = PrizeManager.getPrizeAvailabilityDetails("mixer_grinder");
            console.log(`📊 After first win: ${details2.available ? '❌ Still available (wrong!)' : '✅ No longer available (correct!)'}`);
        }
        
        // Test different date: 2025-09-29 (should still have 1 unit)
        AdminUtilities.simulateDate("2025-09-29");
        console.log('\n📅 Testing date: 2025-09-29');
        
        const details3 = PrizeManager.getPrizeAvailabilityDetails("mixer_grinder");
        console.log(`📊 Availability on new date: ${details3.available ? '✅ Available' : '❌ Unavailable'}`);
        
        if (details3.available) {
            const result3 = await PrizeManager.awardPrizeDirectly("mixer_grinder");
            console.log(`🎯 Win on new date: ${result3 ? '✅ Success' : '❌ Failed'}`);
        }
    },
    
    // Test gas stove per-date limits
    async testGasStove() {
        console.log('\n📋 GAS STOVE TEST (3 units across 3 dates)');
        console.log('-'.repeat(50));
        
        // Test date: 2025-09-23 (should have 1 unit)
        AdminUtilities.simulateDate("2025-09-23");
        console.log('📅 Testing date: 2025-09-23');
        
        const details1 = PrizeManager.getPrizeAvailabilityDetails("gas_stove");
        console.log(`📊 Initial availability: ${details1.available ? '✅ Available' : '❌ Unavailable'}`);
        
        if (details1.available) {
            // Win gas stove
            const result1 = await PrizeManager.awardPrizeDirectly("gas_stove");
            console.log(`🎯 Win attempt: ${result1 ? '✅ Success' : '❌ Failed'}`);
            
            // Try to win again on same date (should fail)
            const result2 = await PrizeManager.awardPrizeDirectly("gas_stove");
            console.log(`🎯 Second win attempt: ${result2 ? '❌ Unexpected success' : '✅ Correctly blocked'}`);
        }
    },
    
    // Test washing machine per-date limits
    async testWashingMachine() {
        console.log('\n📋 WASHING MACHINE TEST (2 units across 2 dates)');
        console.log('-'.repeat(50));
        
        // Test date: 2025-09-28 (should have 1 unit)
        AdminUtilities.simulateDate("2025-09-28");
        console.log('📅 Testing date: 2025-09-28');
        
        const details1 = PrizeManager.getPrizeAvailabilityDetails("washing_machine");
        console.log(`📊 Initial availability: ${details1.available ? '✅ Available' : '❌ Unavailable'}`);
        
        if (details1.available) {
            // Win washing machine
            const result1 = await PrizeManager.awardPrizeDirectly("washing_machine");
            console.log(`🎯 Win attempt: ${result1 ? '✅ Success' : '❌ Failed'}`);
            
            // Try to win again on same date (should fail)
            const result2 = await PrizeManager.awardPrizeDirectly("washing_machine");
            console.log(`🎯 Second win attempt: ${result2 ? '❌ Unexpected success' : '✅ Correctly blocked'}`);
        }
        
        // Test second date: 2025-10-20 (should still have 1 unit)
        AdminUtilities.simulateDate("2025-10-20");
        console.log('\n📅 Testing date: 2025-10-20');
        
        const details2 = PrizeManager.getPrizeAvailabilityDetails("washing_machine");
        console.log(`📊 Availability on second date: ${details2.available ? '✅ Available' : '❌ Unavailable'}`);
    },
    
    // Show per-date inventory breakdown
    showPerDateInventory() {
        console.log('\n📊 PER-DATE INVENTORY BREAKDOWN');
        console.log('='.repeat(50));
        
        const inventory = PrizeManager.getInventory();
        
        Object.values(inventory).forEach(prize => {
            if (prize.category === 'rare' && prize.perDateQuantities) {
                console.log(`\n🏆 ${prize.name}:`);
                console.log(`  Total remaining: ${prize.remainingQuantity}/${prize.initialQuantity}`);
                console.log(`  Per-date breakdown:`);
                
                Object.entries(prize.perDateQuantities).forEach(([date, quantity]) => {
                    const status = quantity > 0 ? '✅' : '❌';
                    console.log(`    ${date}: ${quantity} ${status}`);
                });
            }
        });
    },
    
    // Reset inventory for testing
    resetInventory() {
        console.log('🔄 Resetting inventory for per-date testing...');
        localStorage.removeItem('contest_inventory');
        PrizeManager.initializeInventory();
        console.log('✅ Inventory reset complete');
    },
    
    // Quick test for specific prize and date
    testPrizeOnDate(prizeId, testDate) {
        console.log(`\n🧪 QUICK TEST: ${prizeId} on ${testDate}`);
        console.log('-'.repeat(30));
        
        AdminUtilities.simulateDate(testDate);
        const details = PrizeManager.getPrizeAvailabilityDetails(prizeId);
        
        console.log(`📅 Date: ${testDate}`);
        console.log(`📊 Available: ${details.available ? '✅ Yes' : '❌ No'}`);
        console.log(`📝 Reason: ${details.reason}`);
        
        return details.available;
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.PerDateInventoryTest = PerDateInventoryTest;
    window.testPerDateInventory = () => PerDateInventoryTest.runTest();
    window.showPerDateInventory = () => PerDateInventoryTest.showPerDateInventory();
    window.testPrizeOnDate = (prizeId, date) => PerDateInventoryTest.testPrizeOnDate(prizeId, date);
    
    console.log('\n🧪 PER-DATE INVENTORY TEST READY!');
    console.log('📋 Available Commands:');
    console.log('  testPerDateInventory() - Run complete per-date test');
    console.log('  showPerDateInventory() - Show current per-date breakdown');
    console.log('  testPrizeOnDate("mixer_grinder", "2025-09-22") - Quick test');
    console.log('  PerDateInventoryTest.resetInventory() - Reset for testing');
}
