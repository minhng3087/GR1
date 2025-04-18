#!/bin/bash

# Start PHP-FPM in the background
php-fpm &

# Wait a few seconds to make sure PHP-FPM is up and running
sleep 5

# Run Laravel commands
php artisan key:generate
php artisan config:clear

# Keep the container running (this is important for Docker containers to keep alive)
tail -f /dev/null