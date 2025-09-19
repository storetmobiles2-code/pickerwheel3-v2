#!/bin/bash

# 🛑 PickerWheel Server Stop Script

echo "🛑 Stopping PickerWheel Contest Server..."

# Stop server
pkill -f "python.*http.server.*8000" 2>/dev/null || true

# Wait a moment
sleep 1

# Force kill if still running
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Force killing server..."
    kill -9 $(lsof -Pi :8000 -sTCP:LISTEN -t) 2>/dev/null || true
    sleep 1
fi

# Check if stopped
if ! lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Server stopped successfully!"
else
    echo "❌ Failed to stop server!"
    exit 1
fi
