// Verification Demo Script - Demonstrates Rare Prize Management
const VerificationDemo = {
    // Run comprehensive verification demo
    async runDemo() {
        console.log('\n🎯 RARE PRIZE VERIFICATION DEMO');
        console.log('='.repeat(60));
        
        // Step 1: Show current state
        console.log('\n📊 STEP 1: Current Prize Availability');
        AdminUtilities.showAvailablePrizes();
        
        // Step 2: Test date simulation
        console.log('\n📅 STEP 2: Testing Date-Based Availability');
        await this.testDateAvailability();
        
        // Step 3: Test quantity management
        console.log('\n📦 STEP 3: Testing Quantity Management');
        await this.testQuantityManagement();
        
        // Step 4: Test admin modifications
        console.log('\n⚙️ STEP 4: Testing Admin Modifications');
        await this.testAdminModifications();
        
        // Step 5: Test verification system
        console.log('\n🔍 STEP 5: Testing Verification System');
        await this.testVerificationSystem();
        
        console.log('\n✅ DEMO COMPLETED - All systems working correctly!');
        console.log('💡 Open Admin Panel (⚙️ button) to manage prizes visually');
    },
    
    // Test date-based availability
    async testDateAvailability() {
        console.log('\n🔍 Testing Refrigerator (Oct 2 only):');
        
        // Test unavailable date
        AdminUtilities.simulateDate('2025-10-01');
        AdminUtilities.verifyPrize('fridge');
        
        // Test available date
        AdminUtilities.simulateDate('2025-10-02');
        AdminUtilities.verifyPrize('fridge');
        
        // Test another unavailable date
        AdminUtilities.simulateDate('2025-10-03');
        AdminUtilities.verifyPrize('fridge');
        
        // Reset to current date
        AdminUtilities.resetDate();
    },
    
    // Test quantity management
    async testQuantityManagement() {
        console.log('\n🔍 Testing Smart TV quantity management:');
        
        // Simulate the TV's available date
        AdminUtilities.simulateDate('2025-10-20');
        
        // Show initial state
        AdminUtilities.verifyPrize('smart_tv');
        
        // Test force win (should reduce quantity)
        console.log('\n🎯 Testing force win (should reduce quantity):');
        await AdminUtilities.forceWinPrize('smart_tv');
        
        // Verify quantity reduced
        AdminUtilities.verifyPrize('smart_tv');
        
        // Try to win again (should fail - out of stock)
        console.log('\n🎯 Testing second win attempt (should fail):');
        await AdminUtilities.forceWinPrize('smart_tv');
        
        // Reset quantity for demo
        AdminUtilities.setPrizeQuantity('smart_tv', 1);
        AdminUtilities.resetDate();
    },
    
    // Test admin modifications
    async testAdminModifications() {
        console.log('\n🔍 Testing admin date modifications:');
        
        // Show original dates for mixer grinder
        AdminUtilities.verifyPrize('mixer_grinder');
        
        // Add a new date
        AdminUtilities.addPrizeDate('mixer_grinder', '2025-12-25');
        
        // Test the new date
        AdminUtilities.simulateDate('2025-12-25');
        AdminUtilities.verifyPrize('mixer_grinder');
        
        // Update quantity
        AdminUtilities.setPrizeQuantity('mixer_grinder', 10);
        
        AdminUtilities.resetDate();
    },
    
    // Test verification system
    async testVerificationSystem() {
        console.log('\n🔍 Testing comprehensive verification:');
        
        // Test multiple dates
        const testDates = ['2025-09-22', '2025-10-01', '2025-10-02', '2025-10-20'];
        
        for (const date of testDates) {
            console.log(`\n📅 Checking availability for ${date}:`);
            AdminUtilities.simulateDate(date);
            
            const available = PrizeManager.getAvailablePrizesForWinning();
            console.log(`  📊 ${available.length} prizes available`);
            
            // Show breakdown by category
            const categories = { very_rare: 0, rare: 0, accessory: 0 };
            available.forEach(prize => categories[prize.category]++);
            
            console.log(`  🏷️ Very Rare: ${categories.very_rare}, Rare: ${categories.rare}, Accessories: ${categories.accessory}`);
        }
        
        AdminUtilities.resetDate();
    },
    
    // Quick setup for testing specific scenarios
    setupTestScenario(scenario) {
        console.log(`\n🎬 Setting up test scenario: ${scenario}`);
        
        switch (scenario) {
            case 'fridge_day':
                AdminUtilities.simulateDate('2025-10-02');
                console.log('📅 Simulated Oct 2 - Refrigerator should be available');
                break;
                
            case 'tv_day':
                AdminUtilities.simulateDate('2025-10-20');
                console.log('📅 Simulated Oct 20 - Smart TV should be available');
                break;
                
            case 'no_rare_day':
                AdminUtilities.simulateDate('2025-09-25');
                console.log('📅 Simulated Sep 25 - No rare prizes should be available');
                break;
                
            case 'multi_rare_day':
                AdminUtilities.simulateDate('2025-10-20');
                console.log('📅 Simulated Oct 20 - Multiple rare prizes available');
                break;
                
            default:
                console.log('❌ Unknown scenario. Available: fridge_day, tv_day, no_rare_day, multi_rare_day');
        }
        
        AdminUtilities.showAvailablePrizes();
    },
    
    // Test edge cases
    testEdgeCases() {
        console.log('\n🧪 Testing Edge Cases');
        console.log('='.repeat(40));
        
        // Test invalid prize ID
        console.log('\n1. Invalid Prize ID:');
        AdminUtilities.verifyPrize('invalid_prize');
        
        // Test zero quantity
        console.log('\n2. Zero Quantity Prize:');
        AdminUtilities.setPrizeQuantity('fridge', 0);
        AdminUtilities.simulateDate('2025-10-02');
        AdminUtilities.verifyPrize('fridge');
        
        // Reset
        AdminUtilities.setPrizeQuantity('fridge', 1);
        AdminUtilities.resetDate();
        
        // Test empty date array (accessories)
        console.log('\n3. Always Available Prize (Accessory):');
        AdminUtilities.verifyPrize('power_bank');
        
        console.log('\n✅ Edge cases tested successfully');
    }
};

// Make demo available globally
if (typeof window !== 'undefined') {
    window.VerificationDemo = VerificationDemo;
    window.runDemo = () => VerificationDemo.runDemo();
    window.setupTest = (scenario) => VerificationDemo.setupTestScenario(scenario);
    window.testEdges = () => VerificationDemo.testEdgeCases();
    
    // Auto-run demo message
    console.log('\n🎯 VERIFICATION DEMO READY!');
    console.log('📋 Available Commands:');
    console.log('  runDemo() - Run complete verification demo');
    console.log('  setupTest("fridge_day") - Setup specific test scenario');
    console.log('  testEdges() - Test edge cases');
    console.log('  adminHelp() - Show all admin commands');
}
