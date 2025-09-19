#!/bin/bash

# 🔄 PickerWheel Server Restart Script
# This script stops the current server and starts a new one

echo "🔄 Restarting PickerWheel Contest Server..."

# Stop existing server
echo "🛑 Stopping existing server..."
pkill -f "python.*http.server.*8000" 2>/dev/null || true
sleep 1

# Check if port is free
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8000 still in use. Forcing kill..."
    kill -9 $(lsof -Pi :8000 -sTCP:LISTEN -t) 2>/dev/null || true
    sleep 1
fi

# Start new server
echo "🚀 Starting new server on port 8000..."
cd "$(dirname "$0")"
python3 -m http.server 8000 &

# Wait a moment for server to start
sleep 2

# Check if server started successfully
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Server started successfully!"
    echo "🌐 Access at: http://localhost:8000"
    echo "🧪 Validation page: http://localhost:8000/validation.html"
    echo ""
    echo "📋 Available Pages:"
    echo "  • Main Contest: http://localhost:8000"
    echo "  • Validation Suite: http://localhost:8000/validation.html"
    echo ""
    echo "🔧 To stop server: Ctrl+C or run './stop-server.sh'"
else
    echo "❌ Failed to start server!"
    exit 1
fi
