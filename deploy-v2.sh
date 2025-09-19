#!/bin/bash

# 🎯 PickerWheel Contest App V2.0 - Deployment Script
# Enhanced Mobile-First Professional Edition

echo "🎯 PickerWheel Contest App V2.0 - Professional Mobile Edition"
echo "============================================================="

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python3 found"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    PYTHON_CMD="python"
else
    echo "❌ Python not found. Please install Python to run the server."
    exit 1
fi

# Check if port 8000 is available
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8000 is already in use"
    echo "🛑 Stopping existing server..."
    pkill -f "python.*8000" 2>/dev/null || true
    sleep 2
fi

echo "🚀 Starting PickerWheel V2.0 server on port 8000..."
echo ""
echo "🎊 V2.0 New Features:"
echo "  ▶️  Professional center play button"
echo "  📱 Enhanced mobile experience"
echo "  🎯 Larger wheel size (up to 700px)"
echo "  🏷️  Full-width logo banner"
echo "  🛵 Real scooter image icon"
echo "  📝 Improved text layout"
echo ""
echo "📋 Available URLs:"
echo "  🎯 Main App: http://localhost:8000"
echo "  🧪 Validation: http://localhost:8000/validation.html"
echo ""
echo "🔧 To stop server: Press Ctrl+C"
echo "============================================================="

# Start the server
$PYTHON_CMD -m http.server 8000
