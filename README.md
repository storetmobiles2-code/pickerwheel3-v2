# 🎯 Spin & Win Contest App

A modern, interactive prize wheel application with celebration effects and a lucky draw system.

## 🚀 Features

- **Interactive Prize Wheel**: 13 segments with smooth spinning animation
- **Smart Text Layout**: Optimized text positioning to prevent cluttering
- **Celebration System**: Confetti, fireworks, and sound effects
- **Lucky Draw**: Separate scooter contest with form submission
- **Responsive Design**: Works on desktop and mobile devices
- **PWA Support**: Can be installed as a web app

## 🎨 Prizes

### Rare Prizes (Date-controlled availability)
- 🧊 Refrigerator
- 🧺 Washing Machine  
- ❄️ Air-cooler
- 📱 Smartphone
- 📺 SmartTV

### Common Prizes (Always available)
- 🔊 20W Speaker
- ⌚ Smartwatch
- 🎵 Earbuds
- 🔗 Wireless Neckband
- 🎧 Wired Headphone
- 🔋 Power Bank
- 📱 Screen Guard Combo
- 🛡️ Screen Guard

### Bumper Prize
- 🛵 Scooty (Separate Lucky Draw)

## 🛠️ Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (to avoid CORS issues)

### Option 1: Using Python (Recommended)

```bash
# Navigate to the project directory
cd /path/to/pickerwheel2

# Python 3
python -m http.server 8000

# Python 2 (if Python 3 is not available)
python -m SimpleHTTPServer 8000
```

Then open: http://localhost:8000

### Option 2: Using Node.js

```bash
# Install a simple HTTP server globally
npm install -g http-server

# Navigate to project directory
cd /path/to/pickerwheel2

# Start the server
http-server -p 8000
```

Then open: http://localhost:8000

### Option 3: Using PHP

```bash
# Navigate to project directory
cd /path/to/pickerwheel2

# Start PHP built-in server
php -S localhost:8000
```

Then open: http://localhost:8000

### Option 4: Using Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎮 How to Use

1. **Spin the Wheel**: Click the "SPIN" button to start the wheel
2. **View Prize**: A modal will show your prize with celebration effects
3. **Enter Lucky Draw**: Click the scooter box to enter the bumper prize draw
4. **Toggle Effects**: Use the sound and effects buttons in the top-right corner

## 🔧 Configuration

### Prize Availability
Edit `prize-config.js` to modify:
- Contest dates
- Prize availability dates
- Lucky draw settings

```javascript
// Example: Make rare prizes available from a specific date
rarePrizeDates: {
    defaultLaunchDate: "2025-10-01",
    refrigerator: "2025-10-02",
    washingMachine: "2025-10-03"
}
```

### Customization
- **Colors**: Modify the `colors` array in `script.js` (line 70-74)
- **Wheel Size**: Change `.wheel` dimensions in `style.css`
- **Prizes**: Update the `prizes` array in `prize-config.js`

## 🐛 Troubleshooting

### Common Issues

1. **Blank wheel or missing text**
   - Ensure you're running from a web server (not file://)
   - Check browser console for JavaScript errors

2. **No sound effects**
   - Audio files are optional - the app uses Web Audio API fallbacks
   - Check if sound is enabled in the app controls

3. **Responsive issues**
   - The app is optimized for screens 280px and above
   - Text automatically adjusts based on screen size

### Debug Commands

Open browser console and try:
```javascript
// Show available prizes
pickerWheelApp.showAvailablePrizes()

// Test celebrations
celebrationManager.createQuickConfetti()

// Check sound status
celebrationManager.checkCustomSounds()

// Get user statistics
AppUtilities.getStats()
```

## 📱 Mobile Optimization

The app includes:
- Touch-friendly controls
- Responsive wheel sizing
- Optimized text for small screens
- Mobile-specific animations

## 🔒 Privacy & Data

- All data is stored locally in browser localStorage
- No external API calls for core functionality
- Social sharing uses standard web APIs

## 🎯 Recent Improvements

### Text Cluttering Fixes
- ✅ Improved text wrapping algorithm
- ✅ Dynamic font sizing based on content length
- ✅ Better line spacing and positioning
- ✅ Text outline for better readability
- ✅ Shortened prize names for better fit

### Asset Management
- ✅ Replaced missing images with emoji alternatives
- ✅ Fallback audio system using Web Audio API
- ✅ Responsive emoji sizing

## 📄 License

This project is for contest/promotional use. Modify as needed for your requirements.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on different devices
5. Submit a pull request

---

**Enjoy spinning and winning! 🎉**
