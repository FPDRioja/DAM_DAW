document.addEventListener('DOMContentLoaded', function() {
    // Cargar los clientes al iniciar la página
    cargarClientes();
    
    // Agregar evento al select 
    document.getElementById('clienteSelect').addEventListener('change', function() {
        const clienteDni = this.value;
        if (clienteDni) {
            cargarFacturas(clienteDni);
        } else {
            document.getElementById('tablaFacturas').innerHTML = '';
            document.querySelector('#facturas .mensaje').textContent = 'Seleccione un cliente para ver sus facturas';
        }
    });
});

function cargarClientes() {

    fetch('ventas_servicio.php?accion=lista_clientes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(clientes => {
            const select = document.getElementById('clienteSelect');
            
            // Conservar solo la opción por defecto
            select.innerHTML = '<option value="">-- Seleccione un cliente --</option>';
            
            // Agregar cada cliente como una opción
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.dni;
                option.textContent = `${cliente.nomcliente} (${cliente.dni})`;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los clientes:', error);
            alert('Error al cargar la lista de clientes');
        });
}

function cargarFacturas(dni) {//Este lo haré por post
    const formData = new FormData();
    formData.append('accion', 'listar_facturas');
    formData.append('dni_cliente', dni);

    const postData = {
        method: 'POST',
        body: formData
    };

    fetch('ventas_servicio.php', postData)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(facturas => {
            const contenedorTabla = document.getElementById('tablaFacturas');
            const mensaje = document.querySelector('#facturas .mensaje');
            
            if (facturas.length === 0) {
                mensaje.textContent = 'Este cliente no tiene facturas registradas';
                contenedor.innerHTML = '';
                return;
            }
            
            mensaje.textContent = '';

            //tabla
            let html = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Fecha</th>
                            <th>DNI Cliente</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            facturas.forEach(factura => {
                html += `
                    <tr>
                        <td>${factura.codfra}</td>
                        <td>${factura.fecha}</td>
                        <td>${factura.dni}</td>
                    </tr>
                `;
            });
            
            html += `
                    </tbody>
                </table>
            `;
            
            contenedorTabla.innerHTML = html;
        })
        .catch(error => {
            console.error('Error al cargar las facturas:', error);
            alert('Error al cargar las facturas del cliente');
        });
}