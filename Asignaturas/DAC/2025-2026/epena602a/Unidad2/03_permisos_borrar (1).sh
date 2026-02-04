#!/bin/bash
# Script para eliminar grupo clase_linux, desasignarlo a los usuarios alumno1 a alumno4, eliminar el directorio /home/clase_linux y sus contenidos.
# Autor: Endika Peña
# Fecha: 2025-11-29

#eliminación del directorio desde root
sudo rm -Rf /home/clase_linux 

# Eliminar el grupo a los 4 usuario alumno usando un bucle, es lo mismo que ejecutar el comando 4 veces cambiando el nombre de usuario.
for i in {1..4}; do sudo gpasswd -d alumno${i} clase_linux; done 

#eliminar grupo
sudo groupdel clase_linux 
