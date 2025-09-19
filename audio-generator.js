// Web Audio API Sound Generator for Celebration Effects
// This script generates celebration sounds programmatically for better browser compatibility

class AudioGenerator {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.init();
    }
    
    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            await this.generateSounds();
        } catch (error) {
            console.log('Web Audio API not supported:', error);
        }
    }
    
    async generateSounds() {
        // Generate different celebration sounds
        this.sounds.spin = this.generateSpinSound();
        this.sounds.win = this.generateWinSound();
        this.sounds.rareWin = this.generateRareWinSound();
        this.sounds.celebration = this.generateCelebrationSound();
    }
    
    generateSpinSound() {
        // Create a whoosh/spinning sound
        const duration = 1.5;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / sampleRate;
            // Decreasing frequency whoosh
            const frequency = 200 + 100 * Math.exp(-t * 2);
            const noise = (Math.random() - 0.5) * 0.1;
            const envelope = Math.exp(-t * 1.5);
            channelData[i] = (Math.sin(2 * Math.PI * frequency * t) + noise) * envelope * 0.3;
        }
        
        return buffer;
    }
    
    generateWinSound() {
        // Create a cheerful ascending bell sound
        const duration = 1.0;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (major triad)
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / sampleRate;
            let sample = 0;
            
            notes.forEach((freq, index) => {
                const noteStart = index * 0.2;
                if (t >= noteStart) {
                    const noteTime = t - noteStart;
                    const envelope = Math.exp(-noteTime * 3);
                    sample += Math.sin(2 * Math.PI * freq * noteTime) * envelope * 0.2;
                }
            });
            
            channelData[i] = sample;
        }
        
        return buffer;
    }
    
    generateRareWinSound() {
        // Create a triumphant fanfare sound
        const duration = 2.0;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        // Trumpet-like fanfare notes
        const melody = [
            {freq: 523.25, start: 0, duration: 0.3},    // C5
            {freq: 659.25, start: 0.2, duration: 0.3},  // E5
            {freq: 783.99, start: 0.4, duration: 0.3},  // G5
            {freq: 1046.5, start: 0.6, duration: 0.5}   // C6
        ];
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / sampleRate;
            let sample = 0;
            
            melody.forEach(note => {
                if (t >= note.start && t <= note.start + note.duration) {
                    const noteTime = t - note.start;
                    const envelope = Math.exp(-noteTime * 2) * Math.sin(Math.PI * noteTime / note.duration);
                    // Add harmonic richness for trumpet-like sound
                    sample += Math.sin(2 * Math.PI * note.freq * noteTime) * envelope * 0.3;
                    sample += Math.sin(2 * Math.PI * note.freq * 2 * noteTime) * envelope * 0.1;
                }
            });
        }
        
        return buffer;
    }
    
    generateCelebrationSound() {
        // Create party sound with multiple elements
        const duration = 1.5;
        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        for (let i = 0; i < channelData.length; i++) {
            const t = i / sampleRate;
            let sample = 0;
            
            // Add crowd cheer simulation (filtered noise)
            if (t < 0.8) {
                const noise = (Math.random() - 0.5) * 0.4;
                const filter = Math.sin(2 * Math.PI * 100 * t) * Math.exp(-t);
                sample += noise * filter;
            }
            
            // Add party horn (sharp attack, quick decay)
            if (t < 0.2) {
                const hornFreq = 400 + 200 * Math.sin(2 * Math.PI * 5 * t);
                const envelope = Math.exp(-t * 8);
                sample += Math.sin(2 * Math.PI * hornFreq * t) * envelope * 0.3;
            }
            
            channelData[i] = Math.max(-1, Math.min(1, sample)); // Clamp to prevent distortion
        }
        
        return buffer;
    }
    
    playBuffer(buffer, volume = 0.7) {
        if (!this.audioContext || !buffer) return;
        
        const source = this.audioContext.createBufferSource();
        const gainNode = this.audioContext.createGain();
        
        source.buffer = buffer;
        gainNode.gain.value = volume;
        
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        source.start();
    }
    
    // Public methods for playing sounds
    playSpinSound() {
        this.playBuffer(this.sounds.spin, 0.4);
    }
    
    playWinSound() {
        this.playBuffer(this.sounds.win, 0.6);
    }
    
    playRareWinSound() {
        this.playBuffer(this.sounds.rareWin, 0.8);
    }
    
    playCelebrationSound() {
        this.playBuffer(this.sounds.celebration, 0.5);
    }
}

// Export for use in the main application
if (typeof window !== 'undefined') {
    window.AudioGenerator = AudioGenerator;
}

// Usage instructions:
// const audioGen = new AudioGenerator();
// audioGen.playWinSound(); // Play win sound
// audioGen.playRareWinSound(); // Play rare win sound