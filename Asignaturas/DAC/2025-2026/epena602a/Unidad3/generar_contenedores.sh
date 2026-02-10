#!/bin/bash

# Construir la imagen de MariaDB
docker build -t mariadb-dac:endika -f Dockerfile.mariadb .

# Construir la imagen de Joomla
docker build -t joomla-dac:endika -f Dockerfile.joomla .

# Crear una red personalizada para que los contenedores puedan comunicarse
docker network create joomla-network-endika

# Crear un volumen para persistir los datos de MariaDB
docker volume create mariadb-data
docker volume create joomla-data

# Ejecutar el contenedor de MariaDB
docker run -d --name mariadb --network joomla-network-endika -e MYSQL_ROOT_PASSWORD=root -v mariadb-data:/var/lib/mysql mariadb-dac:endika

# Ejecutar el contenedor de Joomla
docker run -d --name joomla --network joomla-network-endika -p 8080:80 -v joomla-data:/var/www/html joomla-dac:endika


