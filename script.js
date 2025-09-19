// PickerWheel Contest App - Main JavaScript V2.0 with GitHub Pages Support
console.log('🎯 PickerWheel V2.0 Script Loaded - GitHub Pages Compatible');

// GitHub Pages path resolver
function resolveAssetPath(path) {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    const currentPath = window.location.pathname;
    
    if (isGitHubPages && currentPath !== '/') {
        // Extract repository name from path
        const pathParts = currentPath.split('/').filter(part => part);
        if (pathParts.length > 0) {
            const repoName = pathParts[0];
            return `/${repoName}/${path}`;
        }
    }
    
    return path;
}

class PickerWheelApp {
    constructor() {
        this.wheel = document.getElementById('wheel');
        this.spinBtn = null; // Will be set after center button is created
        this.modalOverlay = document.getElementById('modalOverlay');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.closeBtn = document.getElementById('closeBtn');
        this.spinAgainBtn = document.getElementById('spinAgainBtn');
        
        // Prize display elements
        this.prizeEmoji = document.getElementById('prizeEmoji');
        this.prizeName = document.getElementById('prizeName');
        this.prizeCategory = document.getElementById('prizeCategory');
        
        // Cross-promotion elements
        this.scoodyPromo = document.getElementById('scoodyPromo');
        this.promoEnterBtn = document.getElementById('promoEnterBtn');
        
        // Initialize celebration manager
        this.celebrationManager = new CelebrationManager();
        
        // App state
        this.isSpinning = false;
        this.currentRotation = 0;
        this.prizes = [];
        this.availablePrizes = [];
        
        this.init();
    }
    
    init() {
        this.loadPrizes();
        this.createWheelSegments();
        this.bindEvents();
        
        // Initialize inventory system
        PrizeManager.initializeInventory();
        
        // Initialize futuristic effects
        this.initFuturisticEffects();
        
        // Initialize banner logo
        this.initBannerLogo();
        
        console.log('🎯 PickerWheel Contest App initialized');
        console.log(`📊 Wheel displays: ${this.prizes.length} prizes`);
        console.log(`🎁 Available for winning today: ${PrizeManager.getAvailablePrizesForWinning().length} prizes`);
        
        // Log inventory status for debugging (hidden from users)
        if (window.location.search.includes('debug=true')) {
            console.table(PrizeManager.getInventoryStatus());
        }
    }

    // Initialize futuristic visual effects
    initFuturisticEffects() {
        this.createParticleSystem();
        this.addHolographicEffects();
        this.initCyberAnimations();
    }

    // Create floating particle system
    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.body.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createParticle(particleContainer);
            }, i * 100);
        }

        // Continuously spawn particles
        setInterval(() => {
            this.createParticle(particleContainer);
        }, 2000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random color
        const colors = ['#00ffff', '#ff0080', '#8000ff', '#00ff41', '#ff4000'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }

    // Add holographic effects to wheel
    addHolographicEffects() {
        const wheel = this.wheel;
        
        // Add holographic shimmer
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: conic-gradient(
                from 0deg,
                transparent 0deg,
                rgba(0, 255, 255, 0.1) 45deg,
                transparent 90deg,
                rgba(255, 0, 128, 0.1) 135deg,
                transparent 180deg,
                rgba(128, 0, 255, 0.1) 225deg,
                transparent 270deg,
                rgba(0, 255, 255, 0.1) 315deg,
                transparent 360deg
            );
            border-radius: 50%;
            animation: shimmerRotate 8s linear infinite;
            pointer-events: none;
            z-index: 5;
        `;
        
        wheel.appendChild(shimmer);
        
        // Add CSS for shimmer animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmerRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize cyber animations
    initCyberAnimations() {
        // Add glitch effect to title occasionally
        setInterval(() => {
            const title = document.querySelector('.title');
            if (title && Math.random() < 0.1) { // 10% chance every interval
                title.classList.add('glitch');
                setTimeout(() => {
                    title.classList.remove('glitch');
                }, 300);
            }
        }, 3000);

        // Add pulse effect to wheel pointer
        const pointer = document.querySelector('.wheel-pointer');
        if (pointer) {
            setInterval(() => {
                pointer.style.animation = 'none';
                setTimeout(() => {
                    pointer.style.animation = 'pointerPulse 2s ease-in-out infinite';
                }, 10);
            }, 5000);
        }
    }
    
    loadPrizes() {
        // Always load ALL prizes for wheel display (users see all 22 prizes)
        this.prizes = PrizeManager.getAllPrizes();
        // Note: We no longer use availablePrizes for UI - that's handled internally
    }
    
    createWheelSegments() {
        const wheelInner = this.wheel.querySelector('.wheel-inner');
        wheelInner.innerHTML = ''; // Clear existing segments
        
        // Get the current wheel size for responsive design
        const wheelSize = this.wheel.offsetWidth || 450;
        const viewBoxSize = wheelSize;
        const centerX = wheelSize / 2;
        const centerY = wheelSize / 2;
        const radius = wheelSize / 2;
        
        // Create SVG wheel for perfect segments - Updated for 13 prizes
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${viewBoxSize} ${viewBoxSize}`);
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        
        const segmentAngle = 360 / this.prizes.length; // Now ~27.7 degrees for 13 prizes
        
        // Vibrant neon multi-colors for segments
        const colors = [
            '#00ffff', '#ff0080', '#8000ff', '#00ff41', 
            '#ff4000', '#0080ff', '#ff8000', '#80ff00', 
            '#ff0040', '#4000ff', '#00ff80', '#ff4080', 
            '#8040ff', '#ff6600', '#00ff99', '#ff3366',
            '#3366ff', '#ff9900', '#00ccff', '#ff6699',
            '#66ff00', '#cc00ff'
        ];
        
        // Special colors for rare categories
        const rareColors = ['#ffff00', '#ff6600', '#ff0080', '#8000ff', '#00ff80', '#ff4080']; // Different colors for rare items
        const veryRareColor = '#ff1493'; // Deep pink for very rare
        let rareColorIndex = 0;
        
        this.prizes.forEach((prize, index) => {
            const startAngle = index * segmentAngle - 90; // -90 to start from top
            const endAngle = (index + 1) * segmentAngle - 90;
            
            // Create path for segment
            const path = this.createSegmentPath(centerX, centerY, radius, startAngle, endAngle);
            
            // Create segment element
            const segment = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            segment.setAttribute('d', path);
            // Set futuristic colors based on category with better distribution
            let segmentColor;
            if (prize.category === 'very_rare') {
                segmentColor = veryRareColor;
            } else if (prize.category === 'rare') {
                segmentColor = rareColors[rareColorIndex % rareColors.length];
                rareColorIndex++;
            } else {
                segmentColor = colors[index % colors.length];
            }
            segment.setAttribute('fill', segmentColor);
            segment.setAttribute('stroke', '#ffffff');
            segment.setAttribute('stroke-width', '2');
            
            // Enhanced neon glow effect
            segment.style.filter = `drop-shadow(0 0 8px ${segmentColor}) drop-shadow(0 0 15px ${segmentColor})`;
            segment.style.opacity = '0.9';
            segment.classList.add(`segment-${index + 1}`);
            
            svg.appendChild(segment);
            
            // Create text label with responsive sizing
            const textAngle = startAngle + segmentAngle / 2;
            const textRadius = radius * 0.78; // Moved text slightly further out for better spacing
            const textX = centerX + Math.cos((textAngle * Math.PI) / 180) * textRadius;
            const textY = centerY + Math.sin((textAngle * Math.PI) / 180) * textRadius;
            
            // Create group for text with better rotation
            const textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            let rotationAngle = textAngle + 90;
            
            // Adjust rotation to prevent upside-down text
            if (rotationAngle > 90 && rotationAngle < 270) {
                rotationAngle += 180;
            }
            
            textGroup.setAttribute('transform', `translate(${textX}, ${textY}) rotate(${rotationAngle})`);
            
            // Responsive font sizes based on wheel size and segment count
            const segmentCount = this.prizes.length;
            const emojiSize = Math.max(14, wheelSize * 0.035); // Optimized emoji size
            const baseTextSize = Math.max(8, wheelSize * 0.018); // Reduced base text size for better fit
            
            // Add icon image (with emoji fallback)
            if (prize.icon) {
                const resolvedPath = resolveAssetPath(prize.icon);
                console.log(`🖼️ Loading icon for ${prize.name}: ${prize.icon} → ${resolvedPath}`);
                
                const iconImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                iconImage.setAttribute('x', -emojiSize/2); // Center horizontally
                iconImage.setAttribute('y', -emojiSize - 10); // Position above text
                iconImage.setAttribute('width', emojiSize);
                iconImage.setAttribute('height', emojiSize);
                iconImage.setAttribute('href', resolvedPath);
                iconImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                
                // Add error handling - fallback to emoji if image fails
                iconImage.onerror = () => {
                    console.warn(`Failed to load icon: ${prize.icon} for prize: ${prize.name}`);
                    iconImage.style.display = 'none';
                    const emojiText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    emojiText.setAttribute('x', '0');
                    emojiText.setAttribute('y', '-15');
                    emojiText.setAttribute('text-anchor', 'middle');
                    emojiText.setAttribute('font-size', emojiSize);
                    emojiText.textContent = prize.emoji;
                    textGroup.appendChild(emojiText);
                };
                
                // Add load success handler for debugging
                iconImage.onload = () => {
                    console.log(`Successfully loaded icon: ${prize.icon} for prize: ${prize.name}`);
                };
                
                textGroup.appendChild(iconImage);
            } else {
                // Fallback to emoji if no icon specified
                const emojiText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                emojiText.setAttribute('x', '0');
                emojiText.setAttribute('y', '-15');
                emojiText.setAttribute('text-anchor', 'middle');
                emojiText.setAttribute('font-size', emojiSize);
                emojiText.textContent = prize.emoji;
                textGroup.appendChild(emojiText);
            }
            
            // Smart text handling for better readability - more aggressive wrapping
            const maxCharsPerLine = segmentCount > 20 ? 6 : 8; // Dynamic char limit based on segment count
            const words = prize.name.split(' ');
            const lines = [];
            let currentLine = '';
            
            // Intelligent word wrapping with better logic
            words.forEach(word => {
                // If word itself is too long, split it
                if (word.length > maxCharsPerLine) {
                    if (currentLine) {
                        lines.push(currentLine);
                        currentLine = '';
                    }
                    // Split long words
                    for (let i = 0; i < word.length; i += maxCharsPerLine) {
                        lines.push(word.substring(i, i + maxCharsPerLine));
                    }
                } else if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
                    currentLine = (currentLine + ' ' + word).trim();
                } else {
                    if (currentLine) lines.push(currentLine);
                    currentLine = word;
                }
            });
            if (currentLine) lines.push(currentLine);
            
            // Limit to maximum 2 lines for 22+ segments, 3 lines for fewer segments
            const maxLines = segmentCount > 20 ? 2 : 3;
            if (lines.length > maxLines) {
                lines[maxLines - 1] = lines[maxLines - 1].substring(0, maxCharsPerLine - 3) + '...';
                lines.splice(maxLines);
            }
            
            // Calculate dynamic text size based on content length and segment count
            const textSize = segmentCount > 20 ? baseTextSize - 1 : baseTextSize;
            const lineHeight = Math.max(textSize * 1.1, textSize + 2); // Improved line spacing
            
            // Calculate starting Y position to center text vertically
            const totalTextHeight = lines.length * lineHeight;
            const startY = -(totalTextHeight / 2) + lineHeight;
            
            // Add text lines with improved font and spacing
            lines.forEach((line, lineIndex) => {
                const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                nameText.setAttribute('x', '0');
                nameText.setAttribute('y', `${startY + (lineIndex * lineHeight)}`); // Centered and properly spaced
                nameText.setAttribute('text-anchor', 'middle');
                nameText.setAttribute('font-size', textSize);
                nameText.setAttribute('font-weight', '600'); // Semi-bold for better readability
                nameText.setAttribute('font-family', 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'); // Clean, readable font
                nameText.setAttribute('fill', '#1a1a1a'); // Darker text for better contrast
                nameText.setAttribute('stroke', '#ffffff');
                nameText.setAttribute('stroke-width', '1'); // Thicker stroke for better visibility
                nameText.setAttribute('stroke-linejoin', 'round'); // Smooth stroke joins
                nameText.setAttribute('paint-order', 'stroke fill'); // Stroke behind fill
                nameText.textContent = line;
                textGroup.appendChild(nameText);
            });
            
            svg.appendChild(textGroup);
        });
        
        wheelInner.appendChild(svg);
        
        // Add center spin button (outside wheel-inner so it doesn't rotate)
        this.addCenterSpinButton(this.wheel, wheelSize);
    }
    
    addCenterSpinButton(wheelContainer, wheelSize) {
        // Create center spin button
        const centerButton = document.createElement('button');
        centerButton.className = 'wheel-center-button';
        centerButton.id = 'centerSpinBtn';
        centerButton.style.position = 'absolute';
        centerButton.style.top = '50%';
        centerButton.style.left = '50%';
        centerButton.style.transform = 'translate(-50%, -50%)';
        centerButton.style.width = '100px';
        centerButton.style.height = '100px';
        centerButton.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
        centerButton.style.borderRadius = '50%';
        centerButton.style.border = '5px solid #fff';
        centerButton.style.display = 'flex';
        centerButton.style.alignItems = 'center';
        centerButton.style.justifyContent = 'center';
        centerButton.style.boxShadow = '0 0 25px rgba(255, 107, 107, 0.7), inset 0 0 25px rgba(255, 255, 255, 0.3)';
        centerButton.style.zIndex = '15';
        centerButton.style.cursor = 'pointer';
        centerButton.style.fontSize = '0'; // Hide any text
        centerButton.style.fontWeight = 'bold';
        centerButton.style.color = '#fff';
        centerButton.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
        centerButton.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
        centerButton.style.transition = 'all 0.3s ease';
        
        // Create play button triangle
        const playTriangle = document.createElement('div');
        playTriangle.style.width = '0';
        playTriangle.style.height = '0';
        playTriangle.style.borderLeft = '25px solid #fff';
        playTriangle.style.borderTop = '15px solid transparent';
        playTriangle.style.borderBottom = '15px solid transparent';
        playTriangle.style.marginLeft = '8px'; // Slight offset to center visually
        playTriangle.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))';
        
        centerButton.appendChild(playTriangle);
        
        // Add hover and touch effects
        centerButton.onmouseenter = () => {
            centerButton.style.transform = 'translate(-50%, -50%) scale(1.15)';
            centerButton.style.boxShadow = '0 0 35px rgba(255, 107, 107, 0.9), inset 0 0 30px rgba(255, 255, 255, 0.4)';
            playTriangle.style.borderLeft = '28px solid #fff';
            playTriangle.style.borderTop = '17px solid transparent';
            playTriangle.style.borderBottom = '17px solid transparent';
        };
        
        centerButton.onmouseleave = () => {
            centerButton.style.transform = 'translate(-50%, -50%) scale(1)';
            centerButton.style.boxShadow = '0 0 25px rgba(255, 107, 107, 0.7), inset 0 0 25px rgba(255, 255, 255, 0.3)';
            playTriangle.style.borderLeft = '25px solid #fff';
            playTriangle.style.borderTop = '15px solid transparent';
            playTriangle.style.borderBottom = '15px solid transparent';
        };
        
        // Add touch events for mobile
        centerButton.ontouchstart = () => {
            centerButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        };
        
        centerButton.ontouchend = () => {
            centerButton.style.transform = 'translate(-50%, -50%) scale(1)';
        };
        
        // Connect to existing spin functionality
        centerButton.onclick = () => {
            this.spinWheel();
        };
        
        // Set this as the main spin button
        this.spinBtn = centerButton;
        
        wheelContainer.appendChild(centerButton);
    }
    
    initBannerLogo() {
        const bannerImg = document.querySelector('.banner-logo-img');
        const bannerFallback = document.querySelector('.banner-fallback');
        
        if (bannerImg && bannerFallback) {
            bannerImg.onload = () => {
                bannerImg.style.display = 'block';
                bannerFallback.style.display = 'none';
            };
            
            bannerImg.onerror = () => {
                bannerImg.style.display = 'none';
                bannerFallback.style.display = 'block';
            };
        }
    }
    
    createSegmentPath(centerX, centerY, radius, startAngle, endAngle) {
        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = (endAngle * Math.PI) / 180;
        
        const x1 = centerX + radius * Math.cos(startAngleRad);
        const y1 = centerY + radius * Math.sin(startAngleRad);
        const x2 = centerX + radius * Math.cos(endAngleRad);
        const y2 = centerY + radius * Math.sin(endAngleRad);
        
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        
        return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    }
    
    updateAvailablePrizes() {
        // This method is kept for compatibility but no longer used for UI logic
        // Backend availability is handled by PrizeManager internally
        const availableForWinning = PrizeManager.getAvailablePrizesForWinning();
        console.log(`🎁 Backend: ${availableForWinning.length} prizes available for winning today`);
    }
    
    bindEvents() {
        // Center spin button will be bound when created in addCenterSpinButton
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.spinAgainBtn.addEventListener('click', () => this.spinAgain());
        
        // Cross-promotion button
        if (this.promoEnterBtn) {
            this.promoEnterBtn.addEventListener('click', () => {
                this.closeModal();
                window.scoodyApp.openLuckyDraw();
            });
        }
        
        // Close modal when clicking overlay
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('show')) {
                this.closeModal();
            }
            if (e.key === ' ' && !this.isSpinning) {
                e.preventDefault();
                this.spinWheel();
            }
        });
        
        // Handle window resize to recreate wheel with proper sizing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (!this.isSpinning) {
                    this.createWheelSegments();
                }
            }, 250);
        });
    }
    
    async spinWheel() {
        if (this.isSpinning) return;
        
        // Check if any prizes are available for winning (backend check)
        const availableForWinning = PrizeManager.getAvailablePrizesForWinning();
        if (availableForWinning.length === 0) {
            this.showNoAvailablePrizesMessage();
            return;
        }
        
        this.isSpinning = true;
        if (this.spinBtn) {
            this.spinBtn.disabled = true;
            this.spinBtn.style.opacity = '0.6';
            this.spinBtn.style.cursor = 'not-allowed';
        }
        
        // Play spin sound
        this.celebrationManager.playSpinSound();
        
        // Skip loading overlay to keep wheel visible during spin
        // this.showLoading();
        
        try {
            // Step 1: Backend logic - determine what prize will actually be awarded
            const availablePrizes = PrizeManager.getAvailablePrizesForWinning();
            console.log(`🎁 Available prizes today:`, availablePrizes.map(p => p.name));
            
            if (availablePrizes.length === 0) {
                throw new Error('No prizes available');
            }
            
            // Step 2: Select an available prize that can actually be awarded
            const prizeToAward = this.selectAvailablePrize(availablePrizes);
            console.log(`🎯 Prize selected for wheel:`, prizeToAward);
            
            if (!prizeToAward) {
                throw new Error('Failed to select prize');
            }
            
            // Step 3: Calculate rotation to show the prize that will be awarded
            const targetRotation = this.calculateTargetRotation(prizeToAward);
            
            // Step 4: Perform the spin animation (wheel lands on the prize they'll actually get)
            await this.performSpinAnimation(targetRotation);
            
            // Step 5: Award the prize directly (bypass redirection since we pre-selected available)
            const awardResult = await PrizeManager.awardPrizeDirectly(prizeToAward.id);
            console.log(`🏆 Award result:`, awardResult);
            
            if (!awardResult) {
                throw new Error('Failed to award prize');
            }
            
            // Step 6: Show the awarded prize (should match what wheel landed on)
            const prizeToShow = awardResult.prize;
            console.log(`🎉 Prize to show in modal:`, prizeToShow.name);
            
            // Skip hiding loading overlay since we didn't show it
            // this.hideLoading();
            
            // Start celebrations for the awarded prize
            const celebrationInfo = this.celebrationManager.celebratePrizeWin(prizeToShow);
            
            // Show prize modal
            setTimeout(() => {
                this.showPrizeModal(prizeToShow);
            }, 500);
            
        } catch (error) {
            console.error('Error during wheel spin:', error);
            // this.hideLoading(); // Skip since we didn't show loading
            this.showErrorMessage();
        }
        
        this.isSpinning = false;
        if (this.spinBtn) {
            this.spinBtn.disabled = false;
            this.spinBtn.style.opacity = '1';
            this.spinBtn.style.cursor = 'pointer';
        }
    }
    
    selectAvailablePrize(availablePrizes) {
        // Use weighted selection from available prizes only
        if (availablePrizes.length === 0) {
            console.error('No available prizes to select from');
            return null;
        }
        
        // Use the PrizeManager's weighted selection
        const selectedInventoryPrize = PrizeManager.weightedRandomSelection(availablePrizes);
        
        // Convert back to wheel display format by finding matching prize in this.prizes
        const wheelPrize = this.prizes.find(p => p.id === selectedInventoryPrize.id);
        
        if (!wheelPrize) {
            console.error('Selected prize not found in wheel display:', selectedInventoryPrize);
            // Fallback to first accessory
            return this.prizes.find(p => p.category === 'accessory');
        }
        
        console.log(`🎯 Selected prize for wheel landing: ${wheelPrize.name}`);
        return wheelPrize;
    }
    
    selectRandomWheelPrize() {
        // This method is now deprecated - kept for compatibility
        const randomIndex = Math.floor(Math.random() * this.prizes.length);
        return this.prizes[randomIndex];
    }
    
    calculateTargetRotation(selectedPrize) {
        const prizeIndex = this.prizes.findIndex(prize => prize.id === selectedPrize.id);
        
        if (prizeIndex === -1) {
            console.error('Prize not found in wheel display:', selectedPrize);
            console.error('Available prizes:', this.prizes.map(p => p.id));
            console.error('Selected prize:', selectedPrize);
            // Fallback to first available accessory
            const fallbackPrize = this.prizes.find(p => p.category === 'accessory');
            if (fallbackPrize) {
                const fallbackIndex = this.prizes.findIndex(prize => prize.id === fallbackPrize.id);
                const segmentAngle = 360 / this.prizes.length;
                const centerAngle = (fallbackIndex * segmentAngle) + (segmentAngle / 2);
                const extraRotations = (Math.floor(Math.random() * 4) + 5) * 360;
                return extraRotations + (360 - centerAngle);
            }
            return 0;
        }
        
        const segmentAngle = 360 / this.prizes.length;
        
        // Calculate the center angle of the selected segment
        const centerAngle = (prizeIndex * segmentAngle) + (segmentAngle / 2);
        
        // Add extra rotations for dramatic effect (5-8 full rotations)
        const extraRotations = (Math.floor(Math.random() * 4) + 5) * 360;
        
        // Calculate final rotation (we need to rotate to make the prize land at the top)
        const targetRotation = extraRotations + (360 - centerAngle);
        
        console.log(`🎯 Wheel will land on: ${selectedPrize.name} (index: ${prizeIndex}, angle: ${centerAngle}°)`);
        return targetRotation;
    }
    
    async performSpinAnimation(targetRotation) {
        return new Promise((resolve) => {
            // Set CSS custom property for the rotation
            this.wheel.style.setProperty('--spin-rotation', `${targetRotation}deg`);
            
            // Add spinning class to trigger animation
            this.wheel.classList.add('spinning');
            
            // Remove spinning class after animation completes and set final position
            setTimeout(() => {
                this.wheel.classList.remove('spinning');
                
                // CRITICAL: Set the final rotation directly to maintain position
                this.currentRotation = targetRotation % 360;
                this.wheel.style.transform = `rotate(${targetRotation}deg)`;
                this.wheel.style.transition = 'none'; // Remove transition to prevent movement
                
                resolve();
            }, 4000); // 4 seconds animation duration
        });
    }
    
    closeModal() {
        this.modalOverlay.classList.remove('show');
        
        // Reset the wheel transition after modal closes to allow future spins
        setTimeout(() => {
            this.wheel.style.transition = 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)';
        }, 300);
    }
    
    spinAgain() {
        this.closeModal();
        // Small delay before allowing another spin
        setTimeout(() => {
            this.updateAvailablePrizes();
            // Reset transition for next spin
        }, 1000);
    }
    
    showPrizeModal(prize) {
        // Get both the image and fallback elements
        const prizeImg = document.getElementById('prizeEmoji');
        const prizeFallback = document.querySelector('.prize-emoji-fallback');
        
        console.log(`🏆 Showing prize modal for: ${prize.name} with icon: ${prize.icon}`);
        
        // Update modal content with the awarded prize - use icon if available
        if (prize.icon) {
            const resolvedPath = resolveAssetPath(prize.icon);
            console.log(`🖼️ Modal: Loading ${prize.icon} → ${resolvedPath}`);
            
            prizeImg.src = resolvedPath;
            prizeImg.alt = prize.name;
            
            // Add error handling - fallback to emoji if image fails
            prizeImg.onerror = () => {
                console.warn(`❌ Modal: Failed to load ${prize.icon}, using emoji fallback`);
                prizeImg.style.display = 'none';
                prizeFallback.textContent = prize.emoji;
                prizeFallback.style.display = 'flex';
            };
            
            // Show image and hide fallback when loaded successfully
            prizeImg.onload = () => {
                console.log(`✅ Modal: Successfully loaded ${prize.icon}`);
                prizeImg.style.display = 'block';
                prizeFallback.style.display = 'none';
            };
        } else {
            // No icon available, use emoji fallback
            console.log(`📝 Modal: No icon for ${prize.name}, using emoji: ${prize.emoji}`);
            prizeImg.style.display = 'none';
            prizeFallback.textContent = prize.emoji;
            prizeFallback.style.display = 'flex';
        }
        
        // Update prize name and category
        this.prizeName.textContent = prize.name;
        
        const categoryDisplay = {
            'very_rare': 'ULTRA RARE',
            'rare': 'RARE',
            'accessory': 'ACCESSORY'
        };
        
        this.prizeCategory.textContent = categoryDisplay[prize.category] || prize.category.toUpperCase();
        this.prizeCategory.className = `prize-category ${prize.category}`;
        
        // Add special styling for rare prizes
        const modal = this.modalOverlay.querySelector('.modal');
        if (prize.category === 'very_rare' || prize.category === 'rare') {
            modal.classList.add('rare-prize');
        } else {
            modal.classList.remove('rare-prize');
        }
        
        // Show/hide cross-promotion based on Scoody draw availability
        if (this.scoodyPromo && window.scoodyApp && window.scoodyApp.isLuckyDrawActive()) {
            this.scoodyPromo.style.display = 'block';
        } else if (this.scoodyPromo) {
            this.scoodyPromo.style.display = 'none';
        }
        
        // Show modal with animation
        this.modalOverlay.classList.add('show');
        
        // Add modal-specific celebration effects
        this.celebrationManager.celebratePrizeModal(prize);
        
        // Backend logging (hidden from user)
        console.log(`🎉 User won: ${prize.name} (${prize.category})`);
    }
    
    createConfettiEffect() {
        // This method is now handled by CelebrationManager
        // Keeping for compatibility but directing to new system
        console.log('Old confetti method called - now handled by CelebrationManager');
    }
    
    // Note: Prize tracking is now handled by PrizeManager.awardPrize()
    
    closeModal() {
        this.modalOverlay.classList.remove('show');
        
        // Reset the wheel transition after modal closes to allow future spins
        setTimeout(() => {
            this.wheel.style.transition = 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)';
        }, 300);
    }
    
    spinAgain() {
        this.closeModal();
        // Small delay before allowing another spin
        setTimeout(() => {
            this.updateAvailablePrizes();
            // Reset transition for next spin
            this.wheel.style.transition = 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)';
        }, 500);
    }
    
    showLoading() {
        this.loadingOverlay.classList.add('show');
    }
    
    hideLoading() {
        this.loadingOverlay.classList.remove('show');
    }
    
    showNoAvailablePrizesMessage() {
        alert('🎯 No prizes are currently available! Please try again later.');
    }
    
    showErrorMessage() {
        alert('⚠️ Something went wrong! Please try spinning again.');
    }
    
    // Debug methods
    showAvailablePrizes() {
        console.log('🎯 All prizes on wheel:', this.prizes.length);
        console.log('🎁 Available for winning today:', PrizeManager.getAvailablePrizesForWinning());
        console.table(PrizeManager.getInventoryStatus());
    }
    
    simulateDate(dateString) {
        // Override the getCurrentDate method for testing
        const originalMethod = PrizeManager.getCurrentDate;
        PrizeManager.getCurrentDate = () => dateString;
        
        console.log(`🗓️ Simulating date: ${dateString}`);
        console.log(`🎁 Available prizes:`, PrizeManager.getAvailablePrizesForWinning().length);
        console.table(PrizeManager.getInventoryStatus());
        
        // Restore original method after 10 seconds
        setTimeout(() => {
            PrizeManager.getCurrentDate = originalMethod;
            console.log('🔄 Restored to actual date');
            console.table(PrizeManager.getInventoryStatus());
        }, 10000);
    }
    
    // New debug methods for inventory system
    showInventoryStatus() {
        console.table(PrizeManager.getInventoryStatus());
    }
    
    showUserStats() {
        console.table(PrizeManager.getUserStats());
    }
    
    resetInventory() {
        if (confirm('⚠️ This will reset all inventory and win data. Continue?')) {
            PrizeManager.resetInventory();
            console.log('✅ Inventory reset complete');
        }
    }
}

// Utility functions for additional features
const AppUtilities = {
    // Get user's win history (updated for new system)
    getWinHistory() {
        return PrizeManager.getUserStats().winHistory;
    },
    
    // Clear win history (admin function)
    clearWinHistory() {
        if (confirm('⚠️ This will clear your win history. Continue?')) {
            PrizeManager.resetInventory();
            console.log('✅ Win history cleared');
        }
    },
    
    // Get statistics (updated for new system)
    getStats() {
        const userStats = PrizeManager.getUserStats();
        const inventoryStatus = PrizeManager.getInventoryStatus();
        
        return {
            userStats: userStats,
            inventoryStatus: inventoryStatus,
            totalWins: userStats.totalWins,
            directWins: userStats.directWins,
            redirectedWins: userStats.redirectedWins,
            redirectionRate: userStats.totalWins > 0 ? 
                ((userStats.redirectedWins / userStats.totalWins) * 100).toFixed(1) + '%' : '0%'
        };
    },
    
    // Get contest analytics (admin function)
    getContestAnalytics() {
        const wins = JSON.parse(localStorage.getItem('contest_wins') || '[]');
        const redirections = JSON.parse(localStorage.getItem('contest_redirections') || '[]');
        
        return {
            totalWins: wins.length,
            totalRedirections: redirections.length,
            uniqueUsers: [...new Set(wins.map(w => w.deviceId))].length,
            redirectionReasons: redirections.reduce((acc, r) => {
                acc[r.reason] = (acc[r.reason] || 0) + 1;
                return acc;
            }, {}),
            popularPrizes: wins.reduce((acc, w) => {
                acc[w.awardedPrizeName] = (acc[w.awardedPrizeName] || 0) + 1;
                return acc;
            }, {})
        };
    }
};

// Celebration Management System
class CelebrationManager {
    constructor() {
        this.soundEnabled = this.loadSetting('soundEnabled', true);
        this.effectsEnabled = this.loadSetting('effectsEnabled', true);
        this.audioContext = null;
        this.sounds = {};
        
        this.initializeAudio();
        this.initializeControls();
    }
    
    initializeAudio() {
        // Initialize audio elements
        this.sounds.win = document.getElementById('winSound');
        this.sounds.rareWin = document.getElementById('rareWinSound');
        this.sounds.celebration = document.getElementById('celebrationSound');
        this.sounds.spin = document.getElementById('spinSound');
        
        // Set up audio context for better browser compatibility
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
        
        // Initialize Web Audio API generator as fallback
        if (window.AudioGenerator) {
            this.audioGenerator = new AudioGenerator();
        }
        
        // Prepare audio for mobile (requires user interaction)
        document.addEventListener('click', () => {
            this.prepareAudio();
        }, { once: true });
    }
    
    prepareAudio() {
        // Resume audio context if suspended (required on mobile)
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        // Prime all audio elements
        Object.values(this.sounds).forEach(audio => {
            if (audio) {
                // Test if the audio file can load
                audio.volume = 0.1;
                audio.play().then(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    audio.volume = 0.7;
                    console.log(`✅ Custom audio loaded: ${audio.id}`);
                }).catch((error) => {
                    console.log(`⚠️ Custom audio not available for ${audio.id}, will use Web Audio fallback`);
                    // Don't set as error, just let it fall back to Web Audio API
                });
            }
        });
    }
    
    initializeControls() {
        const soundToggle = document.getElementById('soundToggle');
        const celebrationToggle = document.getElementById('celebrationToggle');
        
        if (soundToggle) {
            soundToggle.addEventListener('click', () => this.toggleSound());
            this.updateToggleDisplay(soundToggle, this.soundEnabled, '🔊', '🔇', 'Sound');
        }
        
        if (celebrationToggle) {
            celebrationToggle.addEventListener('click', () => this.toggleEffects());
            this.updateToggleDisplay(celebrationToggle, this.effectsEnabled, '🎉', '🚫', 'Effects');
        }
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.saveSetting('soundEnabled', this.soundEnabled);
        
        const soundToggle = document.getElementById('soundToggle');
        this.updateToggleDisplay(soundToggle, this.soundEnabled, '🔊', '🔇', 'Sound');
        
        // Play a test sound when enabling
        if (this.soundEnabled) {
            this.playSound('celebration', 0.3);
        }
    }
    
    toggleEffects() {
        this.effectsEnabled = !this.effectsEnabled;
        this.saveSetting('effectsEnabled', this.effectsEnabled);
        
        const celebrationToggle = document.getElementById('celebrationToggle');
        this.updateToggleDisplay(celebrationToggle, this.effectsEnabled, '🎉', '🚫', 'Effects');
        
        // Show a test effect when enabling
        if (this.effectsEnabled) {
            this.createQuickConfetti();
        }
    }
    
    updateToggleDisplay(button, enabled, enabledIcon, disabledIcon, label) {
        if (!button) return;
        
        const icon = button.querySelector('.sound-icon, .celebration-icon');
        const text = button.querySelector('.control-text');
        
        if (icon) icon.textContent = enabled ? enabledIcon : disabledIcon;
        if (text) text.textContent = `${label} ${enabled ? 'ON' : 'OFF'}`;
        
        if (enabled) {
            button.classList.remove('disabled');
        } else {
            button.classList.add('disabled');
        }
    }
    
    playSound(soundType, volume = 0.7) {
        if (!this.soundEnabled) return;
        
        const audio = this.sounds[soundType];
        
        // Try custom HTML audio first
        if (audio && !audio.error) {
            try {
                audio.currentTime = 0;
                audio.volume = volume;
                
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log(`🎵 Playing custom ${soundType} sound`);
                    }).catch(error => {
                        console.log(`⚠️ Custom ${soundType} sound failed, using Web Audio fallback:`, error);
                        this.playWebAudioFallback(soundType);
                    });
                }
                return;
            } catch (error) {
                console.log(`⚠️ Error with custom ${soundType} sound, using Web Audio fallback:`, error);
            }
        }
        
        // Fallback to Web Audio API generated sounds
        console.log(`🎵 Playing generated ${soundType} sound (custom file not available)`);
        this.playWebAudioFallback(soundType);
    }
    
    playWebAudioFallback(soundType) {
        if (!this.audioGenerator) return;
        
        try {
            switch (soundType) {
                case 'win':
                    this.audioGenerator.playWinSound();
                    break;
                case 'rareWin':
                    this.audioGenerator.playRareWinSound();
                    break;
                case 'celebration':
                    this.audioGenerator.playCelebrationSound();
                    break;
                case 'spin':
                    this.audioGenerator.playSpinSound();
                    break;
                default:
                    console.log('Unknown sound type:', soundType);
            }
        } catch (error) {
            console.log('Web Audio API fallback failed:', error);
        }
    }
    
    // Main celebration trigger for prize wins
    celebratePrizeWin(prize) {
        if (!this.effectsEnabled && !this.soundEnabled) return;
        
        const isRare = prize.category === 'rare';
        
        // Play appropriate sound
        if (this.soundEnabled) {
            if (isRare) {
                this.playSound('rareWin', 0.8);
                // Add extra celebration sound after delay
                setTimeout(() => this.playSound('celebration', 0.6), 1000);
            } else {
                this.playSound('win', 0.7);
            }
        }
        
        // Create visual celebrations
        if (this.effectsEnabled) {
            this.createCelebrationOverlay();
            this.createConfettiCannon(isRare ? 100 : 50);
            this.createFireworks(isRare ? 8 : 4);
            this.createSparkles(isRare ? 20 : 10);
            this.showCelebrationMessage(isRare);
            
            if (isRare) {
                this.createWinnerBurst();
                setTimeout(() => this.createConfettiCannon(50), 1500);
            }
        }
        
        return {
            duration: isRare ? 5000 : 3000,
            isRare: isRare
        };
    }
    
    createCelebrationOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'celebration-overlay';
        overlay.id = 'celebrationOverlay';
        document.body.appendChild(overlay);
        
        // Remove after 6 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 6000);
        
        return overlay;
    }
    
    createConfettiCannon(count = 50) {
        const overlay = document.getElementById('celebrationOverlay') || this.createCelebrationOverlay();
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#FFD700'];
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            // For triangles, set border color instead of background
            if (confetti.classList.contains('triangle')) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderBottomColor = color;
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderBottom = '10px solid ' + color;
            }
            
            overlay.appendChild(confetti);
            
            // Remove individual confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }
    
    createFireworks(count = 4) {
        const overlay = document.getElementById('celebrationOverlay') || this.createCelebrationOverlay();
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FF9FF3', '#96CEB4'];
        
        for (let f = 0; f < count; f++) {
            setTimeout(() => {
                const centerX = Math.random() * window.innerWidth;
                const centerY = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.2);
                
                // Create burst of particles
                for (let i = 0; i < 12; i++) {
                    const firework = document.createElement('div');
                    firework.className = 'firework';
                    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    firework.style.left = centerX + 'px';
                    firework.style.top = centerY + 'px';
                    
                    const angle = (i / 12) * Math.PI * 2;
                    const distance = 50 + Math.random() * 100;
                    
                    firework.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
                    firework.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
                    
                    overlay.appendChild(firework);
                    
                    setTimeout(() => {
                        if (firework.parentNode) {
                            firework.parentNode.removeChild(firework);
                        }
                    }, 1500);
                }
            }, f * 300);
        }
    }
    
    createSparkles(count = 10) {
        const overlay = document.getElementById('celebrationOverlay') || this.createCelebrationOverlay();
        
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';
            
            overlay.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }
    }
    
    createWinnerBurst() {
        const overlay = document.getElementById('celebrationOverlay') || this.createCelebrationOverlay();
        const burst = document.createElement('div');
        burst.className = 'winner-burst';
        overlay.appendChild(burst);
        
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 2000);
    }
    
    showCelebrationMessage(isRare = false) {
        const overlay = document.getElementById('celebrationOverlay') || this.createCelebrationOverlay();
        const message = document.createElement('div');
        message.className = 'celebration-message';
        
        const messages = isRare 
            ? ['🏆 RARE PRIZE! 🏆', '✨ AMAZING WIN! ✨', '🎉 JACKPOT! 🎉']
            : ['🎉 WINNER! 🎉', '🎯 NICE! 🎯', '⭐ CONGRATS! ⭐'];
            
        message.textContent = messages[Math.floor(Math.random() * messages.length)];
        overlay.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }
    
    createQuickConfetti() {
        // Quick confetti burst for testing
        const overlay = this.createCelebrationOverlay();
        this.createConfettiCannon(20);
        
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 2000);
    }
    
    // Prize-specific modal celebrations
    celebratePrizeModal(prize) {
        if (!this.effectsEnabled) return;
        
        const prizeEmoji = document.getElementById('prizeEmoji');
        const modal = document.querySelector('.modal');
        
        if (prizeEmoji) {
            prizeEmoji.classList.add('celebrating');
            setTimeout(() => {
                prizeEmoji.classList.remove('celebrating');
            }, 1500);
        }
        
        if (modal) {
            modal.classList.add('prize-celebration');
            if (prize.category === 'rare') {
                modal.classList.add('rare-prize-celebration');
            }
            
            setTimeout(() => {
                modal.classList.remove('prize-celebration', 'rare-prize-celebration');
            }, 3000);
        }
        
        // Add sound wave effect
        this.createSoundWaveEffect();
    }
    
    createSoundWaveEffect() {
        const modal = document.querySelector('.modal');
        if (!modal) return;
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.className = 'sound-wave';
                modal.appendChild(wave);
                
                setTimeout(() => {
                    if (wave.parentNode) {
                        wave.parentNode.removeChild(wave);
                    }
                }, 2000);
            }, i * 500);
        }
    }
    
    // Utility methods
    loadSetting(key, defaultValue) {
        try {
            const saved = localStorage.getItem(`celebration_${key}`);
            return saved !== null ? JSON.parse(saved) : defaultValue;
        } catch {
            return defaultValue;
        }
    }
    
    saveSetting(key, value) {
        try {
            localStorage.setItem(`celebration_${key}`, JSON.stringify(value));
        } catch (error) {
            console.log('Unable to save setting:', error);
        }
    }
    
    // Spin sound effect
    playSpinSound() {
        this.playSound('spin', 0.4);
    }
    
    // Get celebration settings
    getSettings() {
        return {
            soundEnabled: this.soundEnabled,
            effectsEnabled: this.effectsEnabled
        };
    }
    
    // Test all sounds utility
    testAllSounds() {
        console.log('🎵 Testing all custom sounds...');
        
        const sounds = ['spin', 'win', 'rareWin', 'celebration'];
        let index = 0;
        
        const testNext = () => {
            if (index < sounds.length) {
                const soundType = sounds[index];
                console.log(`Testing ${soundType} sound...`);
                this.playSound(soundType, 0.5);
                index++;
                setTimeout(testNext, 2000); // Wait 2 seconds between tests
            } else {
                console.log('✅ Sound testing complete!');
            }
        };
        
        testNext();
    }
    
    // Check which custom sounds are available
    checkCustomSounds() {
        console.log('🔍 Checking custom sound availability...');
        
        const results = {};
        Object.keys(this.sounds).forEach(key => {
            const audio = this.sounds[key];
            if (audio) {
                results[key] = {
                    element: 'Found',
                    error: audio.error ? 'Load Error' : 'OK',
                    readyState: audio.readyState,
                    duration: audio.duration || 'Unknown'
                };
            } else {
                results[key] = 'Element Not Found';
            }
        });
        
        console.table(results);
        return results;
    }
}

// Scoody Lucky Draw Application
class ScoodyLuckyDrawApp {
    constructor() {
        this.scoodySection = document.getElementById('scoodySection');
        this.scoodyBox = document.getElementById('scoodyBox');
        this.scoodyModalOverlay = document.getElementById('scoodyModalOverlay');
        this.scoodyCloseBtn = document.getElementById('scoodyCloseBtn');
        this.scoodyEntryForm = document.getElementById('scoodyEntryForm');
        this.countdownTimer = document.getElementById('countdownTimer');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.modalCountdown = document.getElementById('modalCountdown');
        
        // Form elements
        this.userName = document.getElementById('userName');
        this.userEmail = document.getElementById('userEmail');
        this.userPhone = document.getElementById('userPhone');
        this.entriesLeft = document.getElementById('entriesLeft');
        this.successMessage = document.getElementById('successMessage');
        this.spinWheelCta = document.getElementById('spinWheelCta');
        
        // Social sharing buttons
        this.facebookShare = document.getElementById('facebookShare');
        this.twitterShare = document.getElementById('twitterShare');
        this.whatsappShare = document.getElementById('whatsappShare');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCountdown();
        this.updateEntriesLeft();
        this.checkVisibility();
        
        // Start countdown timer
        setInterval(() => this.updateCountdown(), 60000); // Update every minute
        
        console.log('Scoody Lucky Draw initialized');
    }
    
    bindEvents() {
        // Main Scoody box click
        if (this.scoodyBox) {
            this.scoodyBox.addEventListener('click', () => this.openLuckyDraw());
        }
        
        // Close modal
        if (this.scoodyCloseBtn) {
            this.scoodyCloseBtn.addEventListener('click', () => this.closeLuckyDraw());
        }
        
        // Close when clicking overlay
        if (this.scoodyModalOverlay) {
            this.scoodyModalOverlay.addEventListener('click', (e) => {
                if (e.target === this.scoodyModalOverlay) {
                    this.closeLuckyDraw();
                }
            });
        }
        
        // Form submission
        if (this.scoodyEntryForm) {
            this.scoodyEntryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitEntry();
            });
        }
        
        // Social sharing
        if (this.facebookShare) {
            this.facebookShare.addEventListener('click', () => this.shareOnSocial('facebook'));
        }
        
        if (this.twitterShare) {
            this.twitterShare.addEventListener('click', () => this.shareOnSocial('twitter'));
        }
        
        if (this.whatsappShare) {
            this.whatsappShare.addEventListener('click', () => this.shareOnSocial('whatsapp'));
        }
        
        // CTA buttons
        if (this.spinWheelCta) {
            this.spinWheelCta.addEventListener('click', () => {
                this.closeLuckyDraw();
                document.querySelector('.wheel-container').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
    
    checkVisibility() {
        if (!this.isLuckyDrawActive()) {
            if (this.scoodySection) {
                this.scoodySection.style.display = 'none';
            }
        }
    }
    
    isLuckyDrawActive() {
        return ScoodyManager.isLuckyDrawActive();
    }
    
    updateCountdown() {
        const timeRemaining = ScoodyManager.getTimeRemaining();
        
        if (!timeRemaining.active) {
            if (this.timerDisplay) this.timerDisplay.textContent = 'Draw Ended';
            if (this.modalCountdown) this.modalCountdown.textContent = 'Draw Ended';
            this.checkVisibility();
            return;
        }
        
        const timeString = `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`;
        
        if (this.timerDisplay) this.timerDisplay.textContent = timeString;
        if (this.modalCountdown) this.modalCountdown.textContent = timeString;
    }
    
    updateEntriesLeft() {
        const canEnter = ScoodyManager.canEnterToday();
        const entriesUsed = ScoodyManager.getUserEntries().filter(
            entry => entry.date === ScoodyManager.getCurrentDate()
        ).length;
        const entriesLeft = PRIZE_CONFIG.scoodyLuckyDraw.maxEntriesPerDay - entriesUsed;
        
        if (this.entriesLeft) {
            const span = this.entriesLeft.querySelector('span');
            if (span) span.textContent = entriesLeft;
        }
        
        // Disable form if no entries left
        const submitBtn = document.getElementById('enterDrawBtn');
        if (submitBtn && !canEnter) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Daily Limit Reached';
            submitBtn.style.opacity = '0.6';
        }
    }
    
    openLuckyDraw() {
        if (!this.isLuckyDrawActive()) {
            alert('🚫 Sorry, the Scooty Lucky Draw is not currently active.');
            return;
        }
        
        if (!ScoodyManager.canEnterToday()) {
            alert('⚠️ You have already entered today! Come back tomorrow for another chance.');
            return;
        }
        
        // Add shake animation to the box
        if (this.scoodyBox) {
            this.scoodyBox.style.animation = 'none';
            setTimeout(() => {
                this.scoodyBox.style.animation = 'shake 0.5s ease-in-out';
            }, 10);
        }
        
        // Show modal after animation
        setTimeout(() => {
            if (this.scoodyModalOverlay) {
                this.scoodyModalOverlay.classList.add('show');
            }
            this.updateCountdown();
            this.updateEntriesLeft();
        }, 500);
    }
    
    closeLuckyDraw() {
        if (this.scoodyModalOverlay) {
            this.scoodyModalOverlay.classList.remove('show');
        }
        
        // Reset form
        if (this.scoodyEntryForm) {
            this.scoodyEntryForm.style.display = 'block';
        }
        if (this.successMessage) {
            this.successMessage.classList.add('hidden');
        }
    }
    
    submitEntry() {
        if (!ScoodyManager.canEnterToday()) {
            alert('⚠️ You have already entered today!');
            return;
        }
        
        // Validate form
        if (!this.userName.value || !this.userEmail.value || !this.userPhone.value) {
            alert('📝 Please fill in all required fields.');
            return;
        }
        
        // Prepare entry data
        const entryData = {
            name: this.userName.value,
            email: this.userEmail.value,
            phone: this.userPhone.value,
            source: 'main_form'
        };
        
        try {
            // Submit entry
            ScoodyManager.submitEntry(entryData);
            
            // Show success message
            this.showSuccessMessage();
            
            // Update entries left
            this.updateEntriesLeft();
            
        } catch (error) {
            console.error('Error submitting entry:', error);
            alert('❌ There was an error submitting your entry. Please try again.');
        }
    }
    
    showSuccessMessage() {
        if (this.scoodyEntryForm) {
            this.scoodyEntryForm.style.display = 'none';
        }
        if (this.successMessage) {
            this.successMessage.classList.remove('hidden');
        }
        
        // Add celebration effect
        this.createCelebrationEffect();
    }
    
    createCelebrationEffect() {
        // Create confetti effect
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.transform = `translate(-50%, -50%)`;
            confetti.style.borderRadius = '50%';
            confetti.style.animation = `confettiExplode 1s ease-out forwards`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';
            
            const angle = (i / 30) * 360;
            const distance = 50 + Math.random() * 100;
            
            confetti.style.setProperty('--end-x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
            confetti.style.setProperty('--end-y', `${Math.sin(angle * Math.PI / 180) * distance}px`);
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 1500);
        }
        
        // Add confetti animation if it doesn't exist
        if (!document.querySelector('#scoody-confetti-style')) {
            const style = document.createElement('style');
            style.id = 'scoody-confetti-style';
            style.innerHTML = `
                @keyframes confettiExplode {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
                        opacity: 0;
                    }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px) rotate(-2deg); }
                    75% { transform: translateX(10px) rotate(2deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    shareOnSocial(platform) {
        const shareText = "🛵 I just entered the amazing Scooty Lucky Draw! Join me and win big! 🎉";
        const shareUrl = window.location.href;
        
        let url = '';
        
        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                break;
        }
        
        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
            
            // Track social share (could add bonus entry logic here)
            console.log(`Shared on ${platform}`);
        }
    }
    
    // Utility methods
    getUserStats() {
        return {
            entries: ScoodyManager.getUserEntries(),
            canEnterToday: ScoodyManager.canEnterToday(),
            timeRemaining: ScoodyManager.getTimeRemaining()
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pickerWheelApp = new PickerWheelApp();
    window.scoodyApp = new ScoodyLuckyDrawApp();
    
    // Expose utilities for debugging
    window.AppUtilities = AppUtilities;
    window.PrizeManager = PrizeManager;
    window.ScoodyManager = ScoodyManager;
    window.celebrationManager = window.pickerWheelApp.celebrationManager;
    
    console.log('🎯 Spin & Win Contest App loaded successfully!');
    console.log('🛵 Scooty Lucky Draw loaded successfully!');
    console.log('🎉 Celebration System loaded successfully!');
    console.log('🗄️ Inventory System loaded successfully!');
    console.log('');
    console.log('📋 Debug Commands:');
    console.log('🎯 WHEEL & PRIZES:');
    console.log('  - pickerWheelApp.showAvailablePrizes() // Show current availability');
    console.log('  - pickerWheelApp.simulateDate("2025-10-02") // Test specific dates');
    console.log('  - pickerWheelApp.showInventoryStatus() // Current inventory');
    console.log('');
    console.log('📊 USER STATS:');
    console.log('  - pickerWheelApp.showUserStats() // Your win history');
    console.log('  - AppUtilities.getStats() // Detailed statistics');
    console.log('  - scoodyApp.getUserStats() // Scooty draw stats');
    console.log('');
    console.log('🎉 CELEBRATIONS:');
    console.log('  - celebrationManager.createQuickConfetti() // Test effects');
    console.log('  - celebrationManager.getSettings() // Sound/effects status');
    console.log('');
    console.log('🔧 ADMIN FUNCTIONS:');
    console.log('  - AppUtilities.getContestAnalytics() // Full contest data');
    console.log('  - pickerWheelApp.resetInventory() // Reset everything');
    console.log('');
    console.log('💡 TIP: Add ?debug=true to URL for detailed inventory logging');
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}