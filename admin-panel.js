// Admin Panel for Easy Date and Quantity Management
const AdminPanel = {
    isVisible: false,
    isAuthenticated: false,
    adminPassword: 'myT2025Admin!', // Change this to your desired password
    
    // Initialize admin panel
    init() {
        this.createAdminHTML();
        this.createPasswordModal();
        this.attachEventListeners();
        this.updateDisplay();
        console.log('🔧 Admin Panel initialized (Password Protected)');
    },
    
    // Create admin panel HTML
    createAdminHTML() {
        const adminHTML = `
            <div id="adminPanel" class="admin-panel" style="display: none;">
                <div class="admin-header">
                    <h3>🔧 Contest Admin Panel</h3>
                    <div class="admin-header-actions">
                        <button id="logoutAdmin" class="logout-btn" title="Logout">🔒</button>
                        <button id="closeAdmin" class="close-admin">×</button>
                    </div>
                </div>
                
                <div class="admin-tabs">
                    <button class="tab-btn active" data-tab="inventory">📦 Inventory</button>
                    <button class="tab-btn" data-tab="dates">📅 Dates</button>
                    <button class="tab-btn" data-tab="verification">✅ Verify</button>
                    <button class="tab-btn" data-tab="analytics">📊 Analytics</button>
                </div>
                
                <!-- Inventory Management Tab -->
                <div id="inventoryTab" class="tab-content active">
                    <h4>📦 Prize Inventory Management</h4>
                    <div class="current-date">
                        <strong>Current Date:</strong> <span id="currentDate"></span>
                        <button id="simulateDateBtn" class="btn-small">📅 Simulate Date</button>
                    </div>
                    
                    <div class="inventory-grid" id="inventoryGrid">
                        <!-- Dynamic inventory items will be inserted here -->
                    </div>
                    
                    <div class="admin-actions">
                        <button id="refreshInventory" class="btn-primary">🔄 Refresh</button>
                        <button id="resetInventory" class="btn-danger">🗑️ Reset All</button>
                        <button id="exportData" class="btn-secondary">📥 Export Data</button>
                    </div>
                </div>
                
                <!-- Date Management Tab -->
                <div id="datesTab" class="tab-content">
                    <h4>📅 Prize Date Management</h4>
                    <div class="date-manager">
                        <select id="prizeSelector" class="form-control">
                            <option value="">Select Prize to Modify</option>
                        </select>
                        
                        <div id="prizeDetails" class="prize-details" style="display: none;">
                            <h5 id="selectedPrizeName"></h5>
                            <div class="current-dates">
                                <strong>Current Available Dates:</strong>
                                <div id="currentDates" class="date-list"></div>
                            </div>
                            
                            <div class="date-actions">
                                <input type="date" id="newDate" class="form-control">
                                <button id="addDate" class="btn-primary">➕ Add Date</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Verification Tab -->
                <div id="verificationTab" class="tab-content">
                    <h4>✅ Prize Availability Verification</h4>
                    <div class="verification-controls">
                        <input type="date" id="verifyDate" class="form-control">
                        <button id="verifyBtn" class="btn-primary">🔍 Check Availability</button>
                    </div>
                    
                    <div id="verificationResults" class="verification-results">
                        <!-- Results will be displayed here -->
                    </div>
                </div>
                
                <!-- Analytics Tab -->
                <div id="analyticsTab" class="tab-content">
                    <h4>📊 Contest Analytics</h4>
                    <div id="analyticsData" class="analytics-data">
                        <!-- Analytics will be displayed here -->
                    </div>
                </div>
            </div>
            
            <!-- Admin Toggle Button -->
            <button id="adminToggle" class="admin-toggle">⚙️</button>
            
            <!-- Date Simulation Modal -->
            <div id="dateSimulationModal" class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h3>📅 Simulate Date for Testing</h3>
                        <button class="close-btn" onclick="AdminPanel.closeDateSimulation()">×</button>
                    </div>
                    <div class="modal-body">
                        <p>Select a date to simulate for testing prize availability:</p>
                        <input type="date" id="simulationDate" class="form-control">
                        <div class="modal-actions">
                            <button onclick="AdminPanel.applyDateSimulation()" class="btn-primary">Apply Simulation</button>
                            <button onclick="AdminPanel.resetDateSimulation()" class="btn-secondary">Reset to Today</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', adminHTML);
    },
    
    // Create password protection modal
    createPasswordModal() {
        const passwordHTML = `
            <div id="adminPasswordModal" class="modal-overlay" style="z-index: 10001;">
                <div class="modal password-modal">
                    <div class="modal-header">
                        <h3>🔐 Admin Access Required</h3>
                        <button class="close-btn" onclick="AdminPanel.closePasswordModal()">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="password-form">
                            <div class="security-icon">🛡️</div>
                            <p>This admin panel is password protected. Please enter the admin password to continue.</p>
                            
                            <div class="password-input-group">
                                <input type="password" id="adminPasswordInput" placeholder="Enter admin password" 
                                       class="password-input" autocomplete="off">
                                <button id="showPasswordBtn" class="show-password-btn" type="button">👁️</button>
                            </div>
                            
                            <div class="password-actions">
                                <button onclick="AdminPanel.verifyPassword()" class="btn-primary password-submit">
                                    🔓 Access Admin Panel
                                </button>
                                <button onclick="AdminPanel.closePasswordModal()" class="btn-secondary">
                                    Cancel
                                </button>
                            </div>
                            
                            <div id="passwordError" class="password-error" style="display: none;">
                                ❌ Incorrect password. Please try again.
                            </div>
                            
                            <div class="security-notice">
                                <small>🔒 Access is logged for security purposes</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', passwordHTML);
    },
    
    // Attach event listeners
    attachEventListeners() {
        // Toggle admin panel
        document.getElementById('adminToggle').addEventListener('click', () => {
            this.toggle();
        });
        
        // Close admin panel
        document.getElementById('closeAdmin').addEventListener('click', () => {
            this.hide();
        });
        
        // Logout admin
        document.getElementById('logoutAdmin').addEventListener('click', () => {
            this.logout();
        });
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
        
        // Prize selector change
        document.getElementById('prizeSelector').addEventListener('change', (e) => {
            this.selectPrize(e.target.value);
        });
        
        // Add date button
        document.getElementById('addDate').addEventListener('click', () => {
            this.addDateToPrize();
        });
        
        // Verification button
        document.getElementById('verifyBtn').addEventListener('click', () => {
            this.verifyPrizeAvailability();
        });
        
        // Action buttons
        document.getElementById('refreshInventory').addEventListener('click', () => {
            this.updateDisplay();
        });
        
        document.getElementById('resetInventory').addEventListener('click', () => {
            this.resetInventory();
        });
        
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });
        
        document.getElementById('simulateDateBtn').addEventListener('click', () => {
            this.showDateSimulation();
        });
        
        // Password input enter key
        document.getElementById('adminPasswordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyPassword();
            }
        });
        
        // Show/hide password toggle
        document.getElementById('showPasswordBtn').addEventListener('click', () => {
            this.togglePasswordVisibility();
        });
    },
    
    // Toggle admin panel visibility
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            if (this.isAuthenticated) {
                this.show();
            } else {
                this.showPasswordModal();
            }
        }
    },
    
    // Show password modal
    showPasswordModal() {
        document.getElementById('adminPasswordModal').classList.add('show');
        document.getElementById('adminPasswordInput').focus();
        document.getElementById('passwordError').style.display = 'none';
    },
    
    // Close password modal
    closePasswordModal() {
        document.getElementById('adminPasswordModal').classList.remove('show');
        document.getElementById('adminPasswordInput').value = '';
        document.getElementById('passwordError').style.display = 'none';
    },
    
    // Verify password
    verifyPassword() {
        const inputPassword = document.getElementById('adminPasswordInput').value;
        const errorDiv = document.getElementById('passwordError');
        
        if (inputPassword === this.adminPassword) {
            // Correct password
            this.isAuthenticated = true;
            this.closePasswordModal();
            this.show();
            this.logSecurityEvent('Admin access granted', 'success');
            this.showNotification('🔓 Admin access granted', 'success');
            
            // Set session timeout (30 minutes)
            this.setSessionTimeout();
        } else {
            // Incorrect password
            errorDiv.style.display = 'block';
            document.getElementById('adminPasswordInput').value = '';
            document.getElementById('adminPasswordInput').focus();
            this.logSecurityEvent('Failed login attempt', 'warning');
            
            // Add shake animation to modal
            const modal = document.querySelector('.password-modal');
            modal.classList.add('shake');
            setTimeout(() => modal.classList.remove('shake'), 500);
        }
    },
    
    // Toggle password visibility
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('adminPasswordInput');
        const toggleBtn = document.getElementById('showPasswordBtn');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    },
    
    // Set session timeout
    setSessionTimeout() {
        // Clear existing timeout
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        // Set 30-minute timeout
        this.sessionTimeout = setTimeout(() => {
            this.logout();
        }, 30 * 60 * 1000); // 30 minutes
    },
    
    // Logout admin
    logout() {
        this.isAuthenticated = false;
        this.hide();
        this.logSecurityEvent('Admin session expired', 'info');
        this.showNotification('🔒 Admin session expired. Please login again.', 'warning');
        
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
    },
    
    // Log security events
    logSecurityEvent(event, type) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            event,
            type,
            userAgent: navigator.userAgent,
            ip: 'client-side' // In real implementation, get from server
        };
        
        // Store in localStorage for audit trail
        const securityLog = JSON.parse(localStorage.getItem('admin_security_log') || '[]');
        securityLog.push(logEntry);
        
        // Keep only last 100 entries
        if (securityLog.length > 100) {
            securityLog.splice(0, securityLog.length - 100);
        }
        
        localStorage.setItem('admin_security_log', JSON.stringify(securityLog));
        console.log(`🔒 Security Event: ${event} (${type}) at ${timestamp}`);
    },
    
    // Show admin panel (after authentication)
    show() {
        document.getElementById('adminPanel').style.display = 'block';
        this.isVisible = true;
        this.updateDisplay();
    },
    
    // Hide admin panel
    hide() {
        document.getElementById('adminPanel').style.display = 'none';
        this.isVisible = false;
    },
    
    // Switch between tabs
    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabName + 'Tab').classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update content based on tab
        if (tabName === 'inventory') {
            this.updateInventoryDisplay();
        } else if (tabName === 'dates') {
            this.updateDateManager();
        } else if (tabName === 'analytics') {
            this.updateAnalytics();
        }
    },
    
    // Update main display
    updateDisplay() {
        this.updateCurrentDate();
        this.updateInventoryDisplay();
        this.updateDateManager();
    },
    
    // Update current date display
    updateCurrentDate() {
        const currentDate = PrizeManager.getCurrentDate();
        document.getElementById('currentDate').textContent = currentDate;
    },
    
    // Update inventory display
    updateInventoryDisplay() {
        const inventory = PrizeManager.getInventory();
        const currentDate = PrizeManager.getCurrentDate();
        const inventoryGrid = document.getElementById('inventoryGrid');
        
        let html = '';
        
        // Group by category
        const categories = {
            very_rare: { name: 'Ultra Rare', items: [] },
            rare: { name: 'Rare', items: [] },
            accessory: { name: 'Accessories', items: [] }
        };
        
        Object.values(inventory).forEach(prize => {
            categories[prize.category].items.push(prize);
        });
        
        Object.entries(categories).forEach(([categoryKey, category]) => {
            if (category.items.length === 0) return;
            
            html += `
                <div class="category-section ${categoryKey}">
                    <h5>${category.name} (${category.items.length} items)</h5>
                    <div class="prize-items">
            `;
            
            category.items.forEach(prize => {
                const isAvailable = PrizeManager.isPrizeAvailable(prize.id);
                const isAvailableToday = prize.availableDates.length === 0 || 
                                       prize.availableDates.includes(currentDate);
                const hasQuantity = prize.remainingQuantity > 0;
                
                html += `
                    <div class="prize-item ${isAvailable ? 'available' : 'unavailable'}">
                        <div class="prize-header">
                            <span class="prize-emoji">${prize.emoji}</span>
                            <strong>${prize.name}</strong>
                        </div>
                        
                        <div class="prize-stats">
                            <div class="quantity-control">
                                <label>Quantity:</label>
                                <button onclick="AdminPanel.adjustQuantity('${prize.id}', -1)" 
                                        class="qty-btn ${prize.remainingQuantity <= 0 ? 'disabled' : ''}">-</button>
                                <input type="number" value="${prize.remainingQuantity}" 
                                       onchange="AdminPanel.setQuantity('${prize.id}', this.value)"
                                       class="qty-input" min="0">
                                <button onclick="AdminPanel.adjustQuantity('${prize.id}', 1)" class="qty-btn">+</button>
                            </div>
                            
                            <div class="availability-status">
                                <span class="status-indicator ${isAvailable ? 'green' : 'red'}">
                                    ${isAvailable ? '✅ Available' : '❌ Unavailable'}
                                </span>
                                <div class="status-details">
                                    <small>
                                        Date: ${isAvailableToday ? '✅' : '❌'} | 
                                        Qty: ${hasQuantity ? '✅' : '❌ (0 left)'}
                                    </small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="prize-dates">
                            <strong>Available Dates:</strong>
                            <div class="date-tags">
                                ${prize.availableDates.length === 0 ? 
                                    '<span class="date-tag always">Always Available</span>' :
                                    prize.availableDates.map(date => 
                                        `<span class="date-tag ${date === currentDate ? 'today' : ''}">${date}</span>`
                                    ).join('')
                                }
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        inventoryGrid.innerHTML = html;
    },
    
    // Update date manager
    updateDateManager() {
        const inventory = PrizeManager.getInventory();
        const prizeSelector = document.getElementById('prizeSelector');
        
        // Populate prize selector with rare/very rare items only
        let options = '<option value="">Select Prize to Modify</option>';
        Object.values(inventory).forEach(prize => {
            if (prize.category === 'rare' || prize.category === 'very_rare') {
                options += `<option value="${prize.id}">${prize.emoji} ${prize.name}</option>`;
            }
        });
        
        prizeSelector.innerHTML = options;
    },
    
    // Select prize for date management
    selectPrize(prizeId) {
        const prizeDetails = document.getElementById('prizeDetails');
        
        if (!prizeId) {
            prizeDetails.style.display = 'none';
            return;
        }
        
        const inventory = PrizeManager.getInventory();
        const prize = inventory[prizeId];
        
        document.getElementById('selectedPrizeName').textContent = `${prize.emoji} ${prize.name}`;
        
        // Display current dates
        const currentDates = document.getElementById('currentDates');
        if (prize.availableDates.length === 0) {
            currentDates.innerHTML = '<span class="date-tag always">Always Available</span>';
        } else {
            currentDates.innerHTML = prize.availableDates.map(date => `
                <span class="date-tag">
                    ${date}
                    <button onclick="AdminPanel.removeDate('${prizeId}', '${date}')" class="remove-date">×</button>
                </span>
            `).join('');
        }
        
        prizeDetails.style.display = 'block';
    },
    
    // Add date to prize
    addDateToPrize() {
        const prizeId = document.getElementById('prizeSelector').value;
        const newDate = document.getElementById('newDate').value;
        
        if (!prizeId || !newDate) {
            alert('Please select a prize and enter a date');
            return;
        }
        
        const inventory = PrizeManager.getInventory();
        const prize = inventory[prizeId];
        
        if (!prize.availableDates.includes(newDate)) {
            prize.availableDates.push(newDate);
            prize.availableDates.sort(); // Keep dates sorted
            
            localStorage.setItem('contest_inventory', JSON.stringify(inventory));
            
            console.log(`✅ Added date ${newDate} to ${prize.name}`);
            this.selectPrize(prizeId); // Refresh display
            this.updateInventoryDisplay();
            
            // Clear input
            document.getElementById('newDate').value = '';
        } else {
            alert('This date is already added to the prize');
        }
    },
    
    // Remove date from prize
    removeDate(prizeId, dateToRemove) {
        const inventory = PrizeManager.getInventory();
        const prize = inventory[prizeId];
        
        prize.availableDates = prize.availableDates.filter(date => date !== dateToRemove);
        localStorage.setItem('contest_inventory', JSON.stringify(inventory));
        
        console.log(`❌ Removed date ${dateToRemove} from ${prize.name}`);
        this.selectPrize(prizeId); // Refresh display
        this.updateInventoryDisplay();
    },
    
    // Adjust quantity
    adjustQuantity(prizeId, change) {
        const inventory = PrizeManager.getInventory();
        const prize = inventory[prizeId];
        
        const newQuantity = Math.max(0, prize.remainingQuantity + change);
        this.setQuantity(prizeId, newQuantity);
    },
    
    // Set specific quantity
    setQuantity(prizeId, newQuantity) {
        const inventory = PrizeManager.getInventory();
        const prize = inventory[prizeId];
        
        const quantity = Math.max(0, parseInt(newQuantity) || 0);
        prize.remainingQuantity = quantity;
        
        localStorage.setItem('contest_inventory', JSON.stringify(inventory));
        
        console.log(`📦 Set ${prize.name} quantity to ${quantity}`);
        this.updateInventoryDisplay();
    },
    
    // Verify prize availability for specific date
    verifyPrizeAvailability() {
        const verifyDate = document.getElementById('verifyDate').value;
        if (!verifyDate) {
            alert('Please select a date to verify');
            return;
        }
        
        // Temporarily override current date
        const originalGetCurrentDate = PrizeManager.getCurrentDate;
        PrizeManager.getCurrentDate = () => verifyDate;
        
        const availablePrizes = PrizeManager.getAvailablePrizesForWinning();
        const inventory = PrizeManager.getInventory();
        
        // Restore original function
        PrizeManager.getCurrentDate = originalGetCurrentDate;
        
        // Display results
        const resultsDiv = document.getElementById('verificationResults');
        
        let html = `
            <h5>📅 Prize Availability for ${verifyDate}</h5>
            <div class="verification-summary">
                <div class="summary-stat">
                    <strong>${availablePrizes.length}</strong> prizes available for winning
                </div>
            </div>
            
            <div class="verification-categories">
        `;
        
        const categories = {
            very_rare: { name: 'Ultra Rare', available: [], unavailable: [] },
            rare: { name: 'Rare', available: [], unavailable: [] },
            accessory: { name: 'Accessories', available: [], unavailable: [] }
        };
        
        Object.values(inventory).forEach(prize => {
            const isDateAvailable = prize.availableDates.length === 0 || 
                                   prize.availableDates.includes(verifyDate);
            const hasQuantity = prize.remainingQuantity > 0;
            const isFullyAvailable = isDateAvailable && hasQuantity;
            
            if (isFullyAvailable) {
                categories[prize.category].available.push(prize);
            } else {
                categories[prize.category].unavailable.push({
                    ...prize,
                    reason: !isDateAvailable ? 'Date not available' : 'Out of stock'
                });
            }
        });
        
        Object.entries(categories).forEach(([categoryKey, category]) => {
            html += `
                <div class="category-verification ${categoryKey}">
                    <h6>${category.name}</h6>
                    
                    ${category.available.length > 0 ? `
                        <div class="available-prizes">
                            <strong>✅ Available (${category.available.length}):</strong>
                            ${category.available.map(prize => `
                                <span class="prize-tag available">
                                    ${prize.emoji} ${prize.name} (${prize.remainingQuantity} left)
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${category.unavailable.length > 0 ? `
                        <div class="unavailable-prizes">
                            <strong>❌ Unavailable (${category.unavailable.length}):</strong>
                            ${category.unavailable.map(prize => `
                                <span class="prize-tag unavailable">
                                    ${prize.emoji} ${prize.name} - ${prize.reason}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        html += '</div>';
        resultsDiv.innerHTML = html;
    },
    
    // Show date simulation modal
    showDateSimulation() {
        document.getElementById('dateSimulationModal').classList.add('show');
        document.getElementById('simulationDate').value = PrizeManager.getCurrentDate();
    },
    
    // Close date simulation modal
    closeDateSimulation() {
        document.getElementById('dateSimulationModal').classList.remove('show');
    },
    
    // Apply date simulation
    applyDateSimulation() {
        const simulationDate = document.getElementById('simulationDate').value;
        if (!simulationDate) return;
        
        // Override the getCurrentDate function
        PrizeManager.getCurrentDate = () => simulationDate;
        
        console.log(`📅 Date simulation applied: ${simulationDate}`);
        this.updateDisplay();
        this.closeDateSimulation();
        
        // Show notification
        this.showNotification(`📅 Simulating date: ${simulationDate}`, 'info');
    },
    
    // Reset date simulation
    resetDateSimulation() {
        // Restore original getCurrentDate function
        PrizeManager.getCurrentDate = function() {
            return new Date().toISOString().split('T')[0];
        };
        
        console.log('📅 Date simulation reset to current date');
        this.updateDisplay();
        this.closeDateSimulation();
        
        this.showNotification('📅 Date simulation reset to today', 'success');
    },
    
    // Reset inventory
    resetInventory() {
        if (confirm('⚠️ Are you sure you want to reset all inventory data? This cannot be undone.')) {
            PrizeManager.resetInventory();
            this.updateDisplay();
            this.showNotification('🔄 Inventory reset successfully', 'success');
        }
    },
    
    // Export data
    exportData() {
        const data = {
            inventory: PrizeManager.getInventory(),
            wins: JSON.parse(localStorage.getItem('contest_wins') || '[]'),
            redirections: JSON.parse(localStorage.getItem('contest_redirections') || '[]'),
            analytics: PrizeManager.getInventoryStatus(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contest-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('📥 Data exported successfully', 'success');
    },
    
    // Update analytics
    updateAnalytics() {
        const status = PrizeManager.getInventoryStatus();
        const wins = JSON.parse(localStorage.getItem('contest_wins') || '[]');
        const redirections = JSON.parse(localStorage.getItem('contest_redirections') || '[]');
        
        const analyticsDiv = document.getElementById('analyticsData');
        
        analyticsDiv.innerHTML = `
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h5>📦 Inventory Overview</h5>
                    <div class="stat-row">
                        <span>Total Prizes:</span>
                        <strong>${status.totalPrizes}</strong>
                    </div>
                    <div class="stat-row">
                        <span>Available Today:</span>
                        <strong>${status.availableToday}</strong>
                    </div>
                    <div class="stat-row">
                        <span>Out of Stock:</span>
                        <strong>${status.outOfStock}</strong>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <h5>🏆 Win Statistics</h5>
                    <div class="stat-row">
                        <span>Total Wins:</span>
                        <strong>${wins.length}</strong>
                    </div>
                    <div class="stat-row">
                        <span>Direct Wins:</span>
                        <strong>${wins.filter(w => w.winType === 'direct_win').length}</strong>
                    </div>
                    <div class="stat-row">
                        <span>Redirected Wins:</span>
                        <strong>${wins.filter(w => w.winType === 'redirected').length}</strong>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <h5>🔄 Redirection Analysis</h5>
                    <div class="stat-row">
                        <span>Total Redirections:</span>
                        <strong>${redirections.length}</strong>
                    </div>
                    <div class="stat-row">
                        <span>Out of Stock:</span>
                        <strong>${redirections.filter(r => r.reason === 'out_of_stock').length}</strong>
                    </div>
                    <div class="stat-row">
                        <span>Date Unavailable:</span>
                        <strong>${redirections.filter(r => r.reason === 'unavailable_date').length}</strong>
                    </div>
                </div>
                
                <div class="analytics-card category-breakdown">
                    <h5>📊 By Category</h5>
                    ${Object.entries(status.byCategory).map(([category, data]) => `
                        <div class="category-stats ${category}">
                            <h6>${category.replace('_', ' ').toUpperCase()}</h6>
                            <div class="stat-row">
                                <span>Available:</span>
                                <strong>${data.available}/${data.total}</strong>
                            </div>
                            <div class="stat-row">
                                <span>Remaining:</span>
                                <strong>${data.remaining} units</strong>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AdminPanel.init();
});

// Make AdminPanel globally accessible
window.AdminPanel = AdminPanel;
