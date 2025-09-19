// GitHub Pages Testing Script
// Add this to browser console to debug icon loading issues

function testGitHubPagesIcons() {
    console.log('🔍 GitHub Pages Icon Loading Test');
    console.log('=====================================');
    
    // Environment info
    console.log('📍 Current URL:', window.location.href);
    console.log('🌐 Hostname:', window.location.hostname);
    console.log('📂 Pathname:', window.location.pathname);
    console.log('🔗 Is GitHub Pages:', window.location.hostname.includes('github.io'));
    
    // Test path resolution
    console.log('\n🔧 Path Resolution Test:');
    const testPaths = [
        'icons/fridge.png',
        'icons/smart-tv.png',
        'myt-mobiles-logo.png',
        'red-scooter.png'
    ];
    
    testPaths.forEach(path => {
        const resolved = resolveAssetPath(path);
        console.log(`  ${path} → ${resolved}`);
    });
    
    // Test actual image loading
    console.log('\n🖼️ Image Loading Test:');
    const testImage = new Image();
    testImage.onload = () => {
        console.log('✅ Test image loaded successfully');
    };
    testImage.onerror = () => {
        console.log('❌ Test image failed to load');
    };
    testImage.src = resolveAssetPath('icons/fridge.png');
    
    // Check if icons directory exists
    console.log('\n📁 File Structure Check:');
    fetch(resolveAssetPath('icons/'))
        .then(response => {
            if (response.ok) {
                console.log('✅ Icons directory accessible');
            } else {
                console.log('❌ Icons directory not accessible:', response.status);
            }
        })
        .catch(error => {
            console.log('❌ Error accessing icons directory:', error.message);
        });
    
    // List all prizes and their icon paths
    console.log('\n🎁 Prize Icon Paths:');
    if (typeof PRIZE_CONFIG !== 'undefined') {
        PRIZE_CONFIG.prizes.forEach(prize => {
            const resolved = resolveAssetPath(prize.icon);
            console.log(`  ${prize.name}: ${prize.icon} → ${resolved}`);
        });
    } else {
        console.log('❌ PRIZE_CONFIG not loaded');
    }
}

// Auto-run test if on GitHub Pages
if (window.location.hostname.includes('github.io')) {
    console.log('🚀 GitHub Pages detected - running icon test in 2 seconds...');
    setTimeout(testGitHubPagesIcons, 2000);
}

// Export for manual use
window.testGitHubPagesIcons = testGitHubPagesIcons;
