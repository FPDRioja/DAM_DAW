$(document).ready(function() {
    // Cargar los clientes al iniciar la página
    cargarClientes();
    
    // Agregar evento al select 
    $('#clienteSelect').on('change', function() {
        const clienteDni = $(this).val();
        if (clienteDni) {
            cargarFacturas(clienteDni);
        } else {
            $('#tablaFacturas').html('');
            $('#facturas .mensaje').text('Seleccione un cliente para ver sus facturas');
        }
    });
});

function cargarClientes() {
    $.ajax({
        url: 'ventas_servicio.php?accion=lista_clientes',
        type: 'GET',
        dataType: 'json',
        success: function(clientes) {
            const select = $('#clienteSelect');
            
            // Conservar solo la opción por defecto
            select.html('<option value="">-- Seleccione un cliente --</option>');
            
            // Agregar cada cliente como una opción
            $.each(clientes, function(index, cliente) {
                select.append(`<option value="${cliente.dni}">${cliente.nomcliente} (${cliente.dni})</option>`);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar los clientes:', error);
            alert('Error al cargar la lista de clientes');
        }
    });
}

function cargarFacturas(dni) { //Este lo haré por post
    $.ajax({
        url: 'ventas_servicio.php',
        type: 'POST',
        data: {
            accion: 'listar_facturas',
            dni_cliente: dni
        },
        dataType: 'json',
        success: function(facturas) {
            const contenedorTabla = $('#tablaFacturas');
            const mensaje = $('#facturas .mensaje');
            
            if (facturas.length === 0) {
                mensaje.text('Este cliente no tiene facturas registradas');
                contenedorTabla.html(''); // Corregido: contenedorTabla en lugar de contenedor
                return;
            }
            
            mensaje.text('');

            //tabla
            /*
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
            
            $.each(facturas, function(index, factura) {
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
            
            contenedorTabla.html(html);
            */

            // Crear tabla con jQuery
            const tabla = $('<table>');
            const thead = $('<thead>').appendTo(tabla);
            const tbody = $('<tbody>').appendTo(tabla);

            // Crear cabecera
            const headerRow = $('<tr>').appendTo(thead);
            $('<th>').text('Código').appendTo(headerRow);
            $('<th>').text('Fecha').appendTo(headerRow);
            $('<th>').text('DNI Cliente').appendTo(headerRow);

            // Crear filas de datos
            $.each(facturas, function(index, factura) {
                const fila = $('<tr>').appendTo(tbody);
                $('<td>').text(factura.codfra).appendTo(fila);
                $('<td>').text(factura.fecha).appendTo(fila);
                $('<td>').text(factura.dni).appendTo(fila);
            });

            contenedorTabla.html(tabla);
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar las facturas:', error);
            alert('Error al cargar las facturas del cliente');
        }
    });
}