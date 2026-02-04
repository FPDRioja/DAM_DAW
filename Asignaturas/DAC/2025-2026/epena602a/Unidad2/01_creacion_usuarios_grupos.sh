#!/bin/bash
# Script para crear usuarios y grupos en un sistema Linux
# Autor: Endika Peña
# Fecha: 2025-11-29

#Creación de los grupos
sudo groupadd group1
sudo groupadd group2

sudo adduser --shell /bin/bash profesor

# Creacion de los alumnos del 1 al 4
for i in {1..4}; do
    # Creación de usuarios
    alumno="alumno${i}"
    sudo adduser --shell /bin/bash "$alumno"
done

# Asignación de los alumnos a los grupos
sudo usermod -aG group1 alumno1
sudo usermod -aG group1 alumno2
sudo usermod -aG group2 alumno3
sudo usermod -aG group2 alumno4

