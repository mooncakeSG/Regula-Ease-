#!/bin/bash

# Copy data files to volume if they don't exist
if [ ! -f "/app/data/checklist.json" ]; then
    echo "Copying data files to persistent volume..."
    if [ -f "/tmp/checklist.json" ]; then
        cp /tmp/checklist.json /app/data/
    fi
    if [ -f "/tmp/skills.json" ]; then
        cp /tmp/skills.json /app/data/
    fi
fi

# Start the Python application
python app.py 