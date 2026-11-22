FROM php:8.2-apache

# Dependencias del sistema y extensiones de PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
        unzip git curl zip ca-certificates libzip-dev libicu-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip \
    && rm -rf /var/lib/apt/lists/*

# Node.js 20 (el de apt suele ser demasiado viejo para Vite)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Habilita mod_rewrite (rutas de Laravel)
RUN a2enmod rewrite

WORKDIR /var/www/html

# 1) Dependencias primero: así Docker reutiliza la caché si no cambian
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-scripts --no-autoloader

COPY package.json package-lock.json ./
RUN npm ci

# 2) Resto del proyecto
COPY . .

RUN composer dump-autoload --optimize \
    && npm run build

# Configuración de Apache (DocumentRoot debe apuntar a /var/www/html/public)
COPY ./docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Permisos para que Laravel pueda escribir
RUN chown -R www-data:www-data storage bootstrap/cache
