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
        url: 'ventas_servicio.php?accion=lista_clientes&XML=1', // Solicitar XML
        type: 'GET',
        dataType: 'xml', // Esperar XML
        success: function(xmlDoc) {
            const select = $('#clienteSelect');
            
            // Conservar solo la opción por defecto
            select.html('<option value="">-- Seleccione un cliente --</option>');
            
            // Procesar el XML y agregar cada cliente como una opción
            $(xmlDoc).find('cliente').each(function() {
                const nombre = $(this).find('nombre').text();
                const dni = $(this).find('dni').text();
                select.append(`<option value="${dni}">${nombre} (${dni})</option>`);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar los clientes (XML):', error);
            alert('Error al cargar la lista de clientes (XML)');
        }
    });
}

function cargarFacturas(dni) {
    $.ajax({
        url: 'ventas_servicio.php',
        type: 'POST',
        data: {
            accion: 'listar_facturas',
            dni_cliente: dni,
            XML: 1 // Solicitar XML
        },
        dataType: 'xml', // Esperar XML
        success: function(xmlDoc) {
            const contenedorTabla = $('#tablaFacturas');
            const mensaje = $('#facturas .mensaje');
            
            if ($(xmlDoc).find('factura').length === 0) {
                mensaje.text('Este cliente no tiene facturas registradas');
                contenedorTabla.html('');
                return;
            }
            
            mensaje.text('');

            // Crear tabla con jQuery
            const tabla = $('<table>');
            const thead = $('<thead>').appendTo(tabla);
            const tbody = $('<tbody>').appendTo(tabla);

            // Crear cabecera
            const headerRow = $('<tr>').appendTo(thead);
            $('<th>').text('Código').appendTo(headerRow);
            $('<th>').text('Fecha').appendTo(headerRow);
            $('<th>').text('DNI Cliente').appendTo(headerRow);

            // Procesar el XML y crear filas de datos
            $(xmlDoc).find('factura').each(function() {
                const codfra = $(this).find('codfra').text();
                const fecha = $(this).find('fecha').text();
                const dniCliente = $(this).find('dni').text(); // Asegúrate que el tag DNI exista en el XML de facturas

                const fila = $('<tr>').appendTo(tbody);
                $('<td>').text(codfra).appendTo(fila);
                $('<td>').text(fecha).appendTo(fila);
                $('<td>').text(dniCliente).appendTo(fila);
            });

            contenedorTabla.html(tabla);
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar las facturas (XML):', error);
            alert('Error al cargar las facturas del cliente (XML)');
        }
    });
}