#!/bin/bash
# Script para crear grupo clase_linux, asignarlo a los usuarios alumno1 a alumno4, crear el directorio /home/clase_linux y asignar los permisos adecuados.
# Autor: Endika Peña
# Fecha: 2025-11-29

#creación del grupo
sudo groupadd clase_linux 
# Añadir el grupo a los 4 usuario alumno usando un bucle, es lo mismo que ejecutar el comando 4 veces cambiando el nombre de usuario.
for i in {1..4}; do sudo usermod -aG clase_linux alumno${i}; done 

#creación del directorio desde root
sudo mkdir -p /home/clase_linux 

#modificación del grupo al que está asociado el directorio
sudo chown :clase_linux /home/clase_linux 

# Asignación de permisos para u=rwx,g=rwx,o=r-x haciendo que propietario y grupo puedan crear, ejecutar y leer (ejecutar también permite explorar directorios) pero cualquier otro usuario solo puede explorar directorios y leer ficheros.
sudo chmod 775 /home/clase_linux 

# Permite que los archivos o subdirectorios creados hereden la propiedad de grupo del directorio padre y no los propietarios y grupo del creador del archivo.
sudo chmod g+s /home/clase_linux 