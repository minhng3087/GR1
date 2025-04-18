# Use PHP 8.1 FPM image as the base image
FROM php:8.1-fpm

# Set the working directory inside the container to /var/www
WORKDIR /var/www/api

# Update package list and install essential system libraries and tools
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    nano \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Install Composer (PHP dependency manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clean up apt-get cache to reduce the image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Create a new group and user with UID and GID set to 1000
RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www

# Copy the source code into the /var/www/api directory in the container and set ownership
COPY --chown=www:www-data . /var/www/api

# Grant write permission to the storage directory
RUN chmod -R ug+w /var/www/api/storage

# Create the log directory and a PHP error log file, granting full permissions
RUN mkdir -p /var/log/php && touch /var/log/php/errors.log && chmod 777 /var/log/php/errors.log

# Copy the .env.example file to .env
RUN cp .env.example .env

# Install PHP dependencies using Composer, ignoring platform requirements and optimizing the autoloader
RUN composer require nesbot/carbon --with-all-dependencies \
    && composer install --ignore-platform-reqs --optimize-autoloader --no-dev --no-interaction

# Copy the run.sh script into the container
COPY ./run.sh /var/www/api/run.sh

# Grant execute permission to the run.sh script
RUN chmod +x /var/www/api/run.sh

# Expose port 9000 for PHP-FPM to listen to incoming connections
EXPOSE 9000

# Run the run.sh script when the container starts
CMD ["/bin/bash", "/var/www/api/run.sh"]