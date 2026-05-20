# Referencia Rápida: LMSGI07 - Sistemas de Gestión Empresarial (ERP/CRM y Odoo)

---

## Índice

1. [ERP (Enterprise Resource Planning)](#1-erp-enterprise-resource-planning)
   - [1.1 ¿Qué es un ERP?](#11-¿qué-es-un-erp)
   - [1.2 Módulos típicos de un ERP](#12-módulos-típicos-de-un-erp)
   - [1.3 Ventajas del ERP](#13-ventajas-del-erp)
   - [1.4 Desventajas del ERP](#14-desventajas-del-erp)
   - [1.5 Implantación de un ERP](#15-implantación-de-un-erp)
   - [1.6 Ejemplos de ERPs del mercado](#16-ejemplos-de-erps-del-mercado)
   - [1.7 ERP en la nube vs. ERP on-premise](#17-erp-en-la-nube-vs-erp-on-premise)
   - [1.8 Ciclo de vida de un proyecto ERP](#18-ciclo-de-vida-de-un-proyecto-erp)
   - [1.9 Costes asociados a un ERP](#19-costes-asociados-a-un-erp)
2. [CRM (Customer Relationship Management)](#2-crm-customer-relationship-management)
   - [2.1 ¿Qué es un CRM?](#21-¿qué-es-un-crm)
   - [2.2 Funcionalidades CRM](#22-funcionalidades-crm)
   - [2.3 Ciclo de vida del cliente en un CRM](#23-ciclo-de-vida-del-cliente-en-un-crm)
   - [2.4 Tipos de CRM](#24-tipos-de-crm)
   - [2.5 Ejemplos de CRMs populares](#25-ejemplos-de-crms-populares)
3. [ODOO](#3-odoo)
   - [3.1 ¿Qué es Odoo?](#31-¿qué-es-odoo)
   - [3.2 Instalación con Docker Compose](#32-instalación-con-docker-compose)
   - [3.3 Acceso a Odoo](#33-acceso-a-odoo)
   - [3.4 Instalación de módulos](#34-instalación-de-módulos)
   - [3.5 Desinstalación de módulos](#35-desinstalación-de-módulos)
   - [3.6 Gestión de usuarios](#36-gestión-de-usuarios)
   - [3.7 Personalización de módulos](#37-personalización-de-módulos)
   - [3.8 Seguridad en Odoo](#38-seguridad-en-odoo)
   - [3.9 Roles y Privilegios](#39-roles-y-privilegios)
   - [3.10 Reportes e Informes](#310-reportes-e-informes)
   - [3.11 Integración con ofimática](#311-integración-con-ofimática)
   - [3.12 Arquitectura de Odoo](#312-arquitectura-de-odoo)
   - [3.13 Módulos principales de Odoo](#313-módulos-principales-de-odoo)
   - [3.14 Odoo Community vs. Odoo Enterprise](#314-odoo-community-vs-odoo-enterprise)
   - [3.15 Comandos útiles de Odoo](#315-comandos-útiles-de-odoo)
   - [3.16 Estructura de un módulo en Odoo](#316-estructura-de-un-módulo-en-odoo)
   - [3.17 Bases de datos en Odoo](#317-bases-de-datos-en-odoo)
   - [3.18 Localización y traducciones](#318-localización-y-traducciones)
4. [Seguridad en Sistemas ERP](#4-seguridad-en-sistemas-erp)
5. [Comparativa ERP vs CRM](#5-comparativa-erp-vs-crm)
6. [Vocabulario Clave](#6-vocabulario-clave)
7. [Preguntas Frecuentes sobre ERP](#7-preguntas-frecuentes-sobre-erp)

---

## 1. ERP (Enterprise Resource Planning)

### 1.1 ¿Qué es un ERP?

Un **ERP** (Enterprise Resource Planning o Planificación de Recursos Empresariales) es un sistema de información modular que integra todas las áreas funcionales de una empresa en un único sistema coherente.

**Características fundamentales:**

| Característica | Descripción |
|----------------|-------------|
| **Integral** | Abarca todas las áreas de la empresa (producción, ventas, compras, RRHH, contabilidad, logística) |
| **Modular** | Cada área funcional es un módulo independiente que puede instalarse según necesidades |
| **Adaptable** | Se configura para ajustarse a los procesos de negocio específicos |
| **Base de datos centralizada** | Todos los módulos comparten una única fuente de datos, eliminando redundancias |
| **Interfaz web** | Puede desplegarse como aplicación web accesible mediante navegador (intranet/Internet) |

**Objetivo principal:** Centralizar y optimizar los procesos de negocio, eliminando silos de información y automatizando tareas repetitivas.

**Componentes esenciales:**
- Base de datos centralizada (única fuente de verdad)
- Módulos funcionales interconectados
- Interfaz de usuario unificada
- Motor de workflows y procesos
- Sistema de reportes e informes

---

### 1.2 Módulos típicos de un ERP

| Módulo | Función principal | Subfunciones |
|--------|-------------------|--------------|
| **Producción** | Planificación y control de la fabricación | Control de calidad, mantenimiento de equipos, planificación de la producción, gestión de BOM (Bill of Materials) |
| **Ventas** | Gestión del ciclo de venta | Pedidos, facturación, catálogo de productos, tarifas, clientes, presupuestos |
| **Compras** | Aprovisionamiento de materiales | Solicitudes de compra, pedidos a proveedores, gestión de proveedores, evaluación |
| **RRHH** | Gestión del capital humano | Nóminas, contratación, formación, absentismo, evaluación del desempeño, expedientes |
| **Contabilidad** | Gestión financiera | Libros contables (diario, mayor, inventario), balances, cuentas anuales, impuestos, tesorería |
| **Logística** | Gestión de almacenes y transportes | Inventario, almacenes, envíos, trazabilidad, rutas de transporte |
| **CRM** | Gestión de relaciones con clientes | Contactos, oportunidades, marketing, soporte, historial de interacciones |
| **Proyectos** | Gestión de proyectos y tareas | Planificación, asignación de recursos, tiempos, costes, facturación por proyecto |
| **Activos fijos** | Gestión de inmovilizado | Amortizaciones, depreciación, inventario de activos, mantenimiento |

---

### 1.3 Ventajas del ERP

- **Utilidades integradas**: Todas las herramientas en un único sistema, sin necesidad de integrar aplicaciones separadas.
- **Visibilidad global**: Información consolidada y en tiempo real de todas las áreas de la empresa.
- **Mejor información sobre clientes**: Historial completo de compras, preferencias, interacciones y comunicaciones.
- **Ciclo de vida del producto optimizado**: Trazabilidad desde la materia prima hasta el cliente final.
- **Aumento de ventas**: Procesos comerciales más eficientes y mejor conocimiento del cliente.
- **Reducción de costes operativos**: Automatización de procesos, eliminación de redundancias y errores.
- **Toma de decisiones basada en datos**: Reportes e indicadores actualizados para la dirección.
- **Cumplimiento normativo**: Facilita el cumplimiento de regulaciones contables, fiscales y laborales.
- **Escalabilidad**: Capacidad de crecimiento conforme la empresa se expande.

---

### 1.4 Desventajas del ERP

- **Requiere personal formado**: Necesidad de formación continua para usuarios y administradores.
- **Sistema rígido**: Una vez implantado y personalizado, es difícil y costoso modificarlo.
- **Problemas de cuello de botella**: Al centralizar todos los procesos, un fallo en el sistema puede paralizar la empresa.
- **Costes elevados**: Tanto de implantación inicial como de mantenimiento continuo.
- **Migración de datos compleja**: La transferencia de datos desde sistemas legacy puede ser problemática.
- **Resistencia al cambio**: Los empleados pueden mostrar oposición a abandonar sus herramientas habituales.
- **Dependencia del proveedor**: Una vez implantado, cambiar de sistema es muy costoso (vendor lock-in).
- **Tiempo de implantación prolongado**: Pueden ser necesarios meses o incluso años para una implantación completa.

---

### 1.5 Implantación de un ERP

El proceso de implantación sigue estas fases:

| Fase | Descripción | Duración estimada |
|------|-------------|-------------------|
| **1. Definir necesidades** | Análisis de procesos actuales, identificación de requisitos funcionales y técnicos | 2-4 semanas |
| **2. Selección del ERP** | Evaluación de alternativas, demostraciones, comparativa de costes | 2-6 semanas |
| **3. Verificar requisitos técnicos** | Comprobar infraestructura (servidores, redes, SO, base de datos) | 1-2 semanas |
| **4. Crear base de datos** | Diseño del esquema de datos, migración de datos legacy, limpieza de datos | 2-8 semanas |
| **5. Instalar el sistema** | Instalación del software y configuración inicial (a menudo vía navegador web si es intranet) | 1-2 semanas |
| **6. Configuración y parametrización** | Ajuste de módulos, perfiles de usuario, workflows, plantillas | 4-12 semanas |
| **7. Formación** | Capacitación de usuarios finales y administradores | 2-6 semanas |
| **8. Pruebas** | Pruebas unitarias, de integración, de aceptación por parte del usuario (UAT) | 2-4 semanas |
| **9. Puesta en producción** | Migración final, corte con sistemas antiguos, soporte post-implantación | 1-2 semanas |
| **10. Mantenimiento continuo** | Soporte, actualizaciones, mejoras, resolución de incidencias | Permanente |

**Ejemplo de comando para crear la base de datos en PostgreSQL:**

```sql
CREATE DATABASE empresa_erp
  ENCODING 'UTF8'
  LC_COLLATE 'es_ES.UTF-8'
  LC_CTYPE 'es_ES.UTF-8'
  TEMPLATE template0;
```

**Tipos de implantación:**

| Tipo | Descripción | Ventajas | Desventajas |
|------|-------------|----------|-------------|
| **Big Bang** | Todos los módulos a la vez | Rápido, sin convivencia de sistemas | Alto riesgo, impacto masivo |
| **Faseada** | Módulos uno a uno | Menor riesgo, aprendizaje progresivo | Mayor duración, posible descoordinación |
| **Paralela** | ERP y sistema antiguo simultáneamente | Seguridad por redundancia | Duplicidad de trabajo, coste doble |

**ERPs en la nube (Cloud ERP):**
- Ejemplo destacado: Salesforce.com
- Sin costes de instalación (modelo SaaS - Software as a Service)
- Actualizaciones automáticas gestionadas por el proveedor
- Acceso desde cualquier lugar con conexión a Internet
- Escalabilidad elástica (pago por uso)

---

### 1.6 Ejemplos de ERPs del mercado

| ERP | Tipo | Licencia | Empresa/Desarrollador | Lenguaje/Framework |
|-----|------|----------|----------------------|--------------------|
| **SAP S/4HANA** | Propietario | Pago | SAP AG | ABAP, Java |
| **Oracle ERP Cloud** | Propietario | Pago (SaaS) | Oracle Corporation | Java, Cloud |
| **Microsoft Dynamics 365** | Propietario | Pago (SaaS) | Microsoft | .NET, C# |
| **Odoo** | Open Source | Community (gratis) / Enterprise (pago) | Odoo S.A. | Python, PostgreSQL |
| **ERPNext** | Open Source | Gratis (GNU GPL) | Frappe Technologies | Python, JavaScript |
| **Openbravo** | Open Source | Gratis / Pago | Openbravo S.L. | Java, PostgreSQL |
| **Tryton** | Open Source | Gratis (GNU GPL) | Comunidad Tryton | Python, PostgreSQL |
| **Dolibarr** | Open Source | Gratis (GNU GPL) | Comunidad Dolibarr | PHP, MySQL/PostgreSQL |
| **Zoho ERP** | Propietario | Pago (SaaS) | Zoho Corporation | Cloud |
| **Axapta (Dynamics AX)** | Propietario | Pago | Microsoft | X++, C# |

---

### 1.7 ERP en la nube vs. ERP on-premise

| Aspecto | ERP on-premise | Cloud ERP |
|---------|---------------|-----------|
| **Infraestructura** | Servidores propios (físicos o virtualizados) | Infraestructura del proveedor |
| **Instalación** | Manual, requiere técnico especializado | Sin instalación, acceso web inmediato |
| **Coste inicial** | Alto (licencias + hardware + implantación) | Bajo o nulo (suscripción mensual) |
| **Coste recurrente** | Mantenimiento, personal IT, electricidad | Cuota de suscripción predecible |
| **Actualizaciones** | Gestionadas por el equipo interno | Automáticas, realizadas por el proveedor |
| **Seguridad** | Control total sobre los datos | Dependencia de la seguridad del proveedor |
| **Personalización** | Alta (acceso completo al sistema) | Limitada a lo que permita la plataforma |
| **Acceso** | Red interna/VPN | Desde cualquier lugar con Internet |
| **Escalabilidad** | Requiere inversión en hardware | Elástica, pago por uso |
| **Ejemplos** | SAP on-premise, Odoo on-premise | Salesforce, Odoo Online, Oracle Cloud |

---

### 1.8 Ciclo de vida de un proyecto ERP

```
1. Análisis de viabilidad
   ↓
2. Selección del software
   ↓
3. Implantación
   ↓
4. Estabilización (resolución de incidencias post-implantación)
   ↓
5. Operación y mantenimiento
   ↓
6. Evolución y actualizaciones
   ↓
7. Migración o retirada (cuando el sistema queda obsoleto)
```

---

### 1.9 Costes asociados a un ERP

| Tipo de coste | Descripción | Ejemplo |
|---------------|-------------|---------|
| **Licencias** | Derecho de uso del software | Odoo Enterprise: desde 20€/usuario/mes |
| **Implantación** | Consultoría, parametrización, migración de datos | 10.000€ - 200.000€+ según tamaño |
| **Hardware** | Servidores, almacenamiento, red | 5.000€ - 50.000€ |
| **Formación** | Capacitación de usuarios | 500€ - 5.000€ por curso |
| **Mantenimiento** | Soporte técnico, actualizaciones | 15-20% del coste de licencias anual |
| **Personal IT** | Administradores del sistema | 30.000€ - 60.000€/año por persona |
| **Personalización** | Desarrollo de módulos a medida | 50€ - 150€/hora de desarrollo |

---

## 2. CRM (Customer Relationship Management)

### 2.1 ¿Qué es un CRM?

Un **CRM** (Customer Relationship Management o Gestión de Relaciones con Clientes) es un sistema enfocado en la gestión integral de la información sobre los clientes de una empresa.

**Información que almacena un CRM:**
- Datos de contacto (nombre, teléfono, email, dirección)
- Historial de compras y transacciones
- Preferencias y segmentación
- Interacciones previas (llamadas, emails, reuniones)
- Oportunidades de venta y pipeline
- Incidencias y tickets de soporte
- Contratos y acuerdos comerciales

**Relación ERP-CRM:** Los ERPs modernos incluyen módulos CRM y, a su vez, los CRMs avanzados incorporan funcionalidades ERP. La tendencia actual es la convergencia de ambos sistemas.

---

### 2.2 Funcionalidades CRM

| Funcionalidad | Descripción detallada |
|---------------|----------------------|
| **Gestión de contactos** | Base de datos centralizada con toda la información de clientes, prospectos y contactos |
| **Seguimiento de oportunidades** | Pipeline de ventas con fases (prospección, calificación, propuesta, negociación, cierre) |
| **Automatización de marketing** | Campañas de email, segmentación de audiencias, scoring de leads, automatización de flujos |
| **Servicio de atención al cliente** | Gestión de tickets, base de conocimiento, SLA, encuestas de satisfacción (CSAT/NPS) |
| **Análisis y reportes** | Dashboards, forecast de ventas, análisis de embudo, KPIs, tendencias |
| **Gestión de calendario y tareas** | Planificación de reuniones, llamadas, seguimientos y recordatorios |
| **Integración multicanal** | Email, teléfono, chat, redes sociales, WhatsApp |
| **Mobile CRM** | Acceso desde dispositivos móviles para equipos comerciales en campo |
| **Workflows de ventas** | Automatización de procesos comerciales con reglas de negocio |
| **Firma electrónica** | Digitalización de contratos y acuerdos |

---

### 2.3 Ciclo de vida del cliente en un CRM

```
1. Captación (prospección, lead generation)
   ↓
2. Calificación (MQL → SQL)
   ↓
3. Oportunidad (negociación)
   ↓
4. Cierre (conversión a cliente)
   ↓
5. Fidelización (postventa, upselling, cross-selling)
   ↓
6. Retención (prevención de cancelaciones/churn)
```

**Etapas del pipeline de ventas:**

| Etapa | Acción | Responsable |
|-------|--------|-------------|
| **Lead** | Identificación de potencial cliente | Marketing |
| **MQL** (Marketing Qualified Lead) | Lead que ha mostrado interés | Marketing |
| **SQL** (Sales Qualified Lead) | Lead listo para contacto comercial | Ventas |
| **Oportunidad** | Negociación activa | Ventas |
| **Propuesta** | Envío de presupuesto | Ventas |
| **Negociación** | Ajuste de condiciones | Ventas |
| **Cerrado ganado** | Contrato firmado | Ventas |
| **Cerrado perdido** | No se concretó la venta | Ventas |

---

### 2.4 Tipos de CRM

| Tipo | Descripción | Ventajas | Desventajas | Ejemplos |
|------|-------------|----------|-------------|----------|
| **Operacional** | Automatiza procesos de ventas, marketing y soporte | Eficiencia operativa | No ofrece análisis profundo | Salesforce, HubSpot |
| **Analítico** | Analiza datos de clientes para tomar decisiones estratégicas | Insights profundos | Requiere datos de calidad | Tableau CRM, SAS |
| **Colaborativo** | Facilita la comunicación entre departamentos sobre clientes | Visión 360° del cliente | Complejo de implementar | Zoho CRM, Microsoft Dynamics |
| **Social** | Monitoriza redes sociales para interacción con clientes | Escucha social activa | Dependiente de APIs externas | Hootsuite, Sprout Social |
| **Estratégico** | CRM orientado a la fidelización y retención a largo plazo | Relaciones duraderas | Difícil de medir ROI | Oracle CX |

---

### 2.5 Ejemplos de CRMs populares

| CRM | Tipo | Precio orientativo | Características destacadas |
|-----|------|--------------------|----------------------------|
| **Salesforce** | Cloud / SaaS | Desde 25€/usuario/mes | Líder del mercado, AppExchange, AI (Einstein) |
| **HubSpot CRM** | Cloud / SaaS | Freemium, desde 50€/mes | Integración con marketing, gratuito básico |
| **Zoho CRM** | Cloud / SaaS | Desde 14€/usuario/mes | BUEN RELACIÓN calidad-precio, IA integrada |
| **Microsoft Dynamics 365** | Cloud / SaaS | Desde 65€/usuario/mes | Integración con Office 365 y Power BI |
| **Odoo CRM** | Open Source / Cloud | Gratuito (Community), desde 20€/usuario/mes (Enterprise) | Integración con ERP completo |
| **SugarCRM** | Open Source / Cloud | Desde 40€/usuario/mes | Flexible, personalizable |
| **Pipedrive** | Cloud / SaaS | Desde 12€/usuario/mes | Enfoque en pipeline visual |
| **Freshsales** | Cloud / SaaS | Desde 9€/usuario/mes | IA integrada, fácil uso |
| **Insightly** | Cloud / SaaS | Desde 29€/usuario/mes | Gestión de proyectos + CRM |
| **Capsule CRM** | Cloud / SaaS | Desde 18€/usuario/mes | Simple, ideal para pequeñas empresas |

---

## 3. ODOO

### 3.1 ¿Qué es Odoo?

**Odoo** es un ERP de código abierto (open source) que cubre todas las áreas funcionales de una empresa:
- Contabilidad y finanzas
- Ventas y CRM
- Recursos Humanos
- Compras y aprovisionamiento
- Proyectos y servicios
- Almacenes e inventario
- Fabricación y producción
- Marketing y comunicaciones

**Características principales:**
- **Versión gratuita**: Odoo Community (código abierto, licencia LGPL)
- **Versión de pago**: Odoo Enterprise (incluye soporte, aplicaciones exclusivas y versiones móviles)
- **Sitio web oficial**: https://www.odoo.com
- **Código fuente**: https://github.com/odoo/odoo
- **Lenguaje**: Python (backend), JavaScript (frontend), XML (vistas)
- **Base de datos**: PostgreSQL
- **Instalación de módulos**: Desde el panel de administración (menú Aplicaciones)

**Historia de Odoo:**
- 2005: Lanzamiento como TinyERP (Bélgica)
- 2010: Renombrado a OpenERP
- 2014: Renombrado a Odoo (versión 8.0)
- Actualmente: Versión 17.0 y 18.0 (2025+)

---

### 3.2 Instalación con Docker Compose

```yaml
version: '3.1'
services:
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD=odoo
      - POSTGRES_USER=odoo
    volumes:
      - odoo-db-data:/var/lib/postgresql/data
    restart: unless-stopped

  web:
    image: odoo:17.0
    depends_on:
      - db
    ports:
      - "8069:8069"
    volumes:
      - odoo-web-data:/var/lib/odoo
      - ./config:/etc/odoo
      - ./addons:/mnt/extra-addons
    restart: unless-stopped

volumes:
  odoo-db-data:
  odoo-web-data:
```

**Explicación del Docker Compose:**

| Servicio | Descripción |
|----------|-------------|
| **db** | Contenedor PostgreSQL 15 con las credenciales de la base de datos |
| **web** | Contenedor Odoo 17.0 que se conecta al servicio db |
| **volumes** | Almacenamiento persistente para datos y archivos de Odoo |
| **ports** | Mapea el puerto 8069 del contenedor al puerto 8069 del host |

**Instalación alternativa con Docker CLI:**

```bash
# Crear red para los contenedores
docker network create odoo-network

# Lanzar PostgreSQL
docker run -d --name odoo-db \
  --network odoo-network \
  -e POSTGRES_USER=odoo \
  -e POSTGRES_PASSWORD=odoo \
  -e POSTGRES_DB=postgres \
  -v odoo-db-data:/var/lib/postgresql/data \
  postgres:15

# Lanzar Odoo
docker run -d --name odoo-web \
  --network odoo-network \
  -p 8069:8069 \
  -v odoo-web-data:/var/lib/odoo \
  -v ./config:/etc/odoo \
  -v ./addons:/mnt/extra-addons \
  --link odoo-db:db \
  odoo:17.0
```

**Pasos para arrancar:**

```bash
# Arrancar los contenedores en segundo plano
docker-compose up -d

# Ver los logs en tiempo real
docker-compose logs -f

# Detener los contenedores
docker-compose down

# Detener y eliminar volúmenes (borra todos los datos)
docker-compose down -v
```

---

### 3.3 Acceso a Odoo

- **URL**: http://localhost:8069 (tras arrancar los contenedores)
- **Primera vez**: Aparece el asistente de creación de base de datos
- **Campos del asistente**:
  - Database Name: Nombre de la base de datos (ej. `mi_empresa`)
  - Email: Correo del administrador (ej. `admin@miempresa.com`)
  - Password: Contraseña del administrador
  - Language: Seleccionar idioma (español disponible)
  - Country: España
  - Demo data: Marcar para incluir datos de demostración (recomendado para pruebas)
- **Usuario administrador por defecto**: `admin` (el email y password introducidos en el asistente)

**Configuración del archivo odoo.conf:**

```ini
[options]
addons_path = /mnt/extra-addons,/usr/lib/python3/dist-packages/odoo/addons
data_dir = /var/lib/odoo
admin_passwd = admin
db_host = db
db_port = 5432
db_user = odoo
db_password = odoo
db_template = template1
dbfilter = .*
limit_time_cpu = 60
limit_time_real = 120
```

---

### 3.4 Instalación de módulos

**Procedimiento desde la interfaz web:**

1. Acceder al menú **Aplicaciones (Apps)**
2. Buscar el módulo deseado en el buscador
3. Hacer clic en el botón **"Instalar"**
4. Esperar a que se complete la instalación
5. Explorar los datos de demostración que vienen con cada módulo

**Módulos preinstalados comunes:**

| Módulo técnico | Función |
|----------------|---------|
| **Base** | Módulo base del sistema (obligatorio) |
| **Web** | Interfaz web de Odoo |
| **Mail** | Comunicaciones internas y externas por correo |
| **Contacts** | Gestión de contactos y direcciones |
| **Calendar** | Calendario integrado |
| **Discuss** | Chat interno y discusiones |

**Módulos de negocio populares:**

| Módulo | Nombre técnico | Descripción |
|--------|---------------|-------------|
| **Ventas** | `sale` | Gestión de pedidos, presupuestos y facturación |
| **CRM** | `crm` | Leads, oportunidades, pipeline de ventas |
| **Contabilidad** | `account` | Facturación, planes contables, impuestos, balances |
| **Compras** | `purchase` | Órdenes de compra, recepción de materiales |
| **Inventario** | `stock` | Almacenes, movimientos, inventario físico |
| **Fabricación** | `mrp` | Órdenes de fabricación, despiece (BOM) |
| **RRHH** | `hr` | Empleados, contratos, nóminas, ausencias |
| **Proyectos** | `project` | Gestión de proyectos, tareas, planificación |
| **Website** | `website` | Sitio web, tienda online, blog |
| **Marketing** | `marketing_automation` | Campañas de email automatizadas |
| **Punto de venta** | `point_of_sale` | TPV para tiendas físicas |
| **Flota** | `fleet` | Gestión de vehículos y mantenimiento |
| **Eventos** | `event` | Organización y venta de entradas para eventos |
| **Suscripciones** | `sale_subscription` | Facturación recurrente y suscripciones |
| **Firma digital** | `sign` | Envío y firma de documentos |
| **Presupuestos** | `sale_management` | Plantillas de presupuestos |

---

### 3.5 Desinstalación de módulos

**Procedimiento:**

1. Ir a **Aplicaciones** → buscar el módulo instalado
2. Seleccionar el módulo
3. Hacer clic en **"Desinstalar"** (o **"Uninstall"**)
4. Confirmar la operación

**Importante:**
- Desinstalar un módulo elimina **todos los datos** asociados al mismo
- Si hay datos críticos, se recomienda hacer una copia de seguridad antes de desinstalar
- Algunos módulos tienen dependencias; no se pueden desinstalar si otros módulos los requieren

**Copia de seguridad de la base de datos antes de desinstalar:**

```bash
# Desde línea de comandos (PostgreSQL)
pg_dump -h localhost -U odoo -d mi_empresa > backup_mi_empresa.sql

# En Docker
docker exec -t odoo-db pg_dump -U odoo mi_empresa > backup_mi_empresa.sql
```

---

### 3.6 Gestión de usuarios

- **Menú**: Ajustes → Usuarios y Compañías → Usuarios
- **Acciones disponibles**:
  - **Crear**: Nuevo usuario (nombre, email, empresa, roles)
  - **Editar**: Modificar datos, permisos, preferencias
  - **Archivar** (Desactivar): Impide que el usuario inicie sesión (no lo elimina definitivamente)
  - **Borrar**: Solo usuarios creados por error, sin actividad asociada

**Campos principales de un usuario:**

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Nombre completo del usuario |
| **Dirección de correo** | Email de inicio de sesión |
| **Contraseña** | Password de acceso |
| **Idioma** | Idioma de la interfaz |
| **Zona horaria** | Huso horario del usuario |
| **Empresa** | Compañía a la que pertenece (en multi-compañía) |
| **Grupos de acceso** | Roles y permisos asignados |

**Archivar vs. Borrar:**

| Acción | Efecto | Reversible |
|--------|--------|------------|
| **Archivar** | El usuario no puede iniciar sesión, sus datos se conservan | Sí (desarchivar) |
| **Borrar** | Eliminación definitiva del registro de usuario | No |

---

### 3.7 Personalización de módulos

**Opciones de personalización:**

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Configuración** | Ajuste de parámetros específicos de cada módulo | Activar facturación electrónica, configurar impuestos |
| **Temas/Colores** | Paletas de colores, logos, estilos de empresa | Cambiar la paleta de colores corporativos |
| **Vistas** | Modificar formularios, listas, kanban, gráficos | Añadir campos a formularios de pedido |
| **Campos personalizados** | Añadir información específica del negocio | Campo "NIF" en clientes, "Número de lote" en productos |
| **Workflows** | Automatizar procesos con reglas de negocio | Aprobación automática de pedidos según importe |
| **Reportes** | Personalizar informes y documentos | Modificar plantilla de factura con logotipo |
| **Módulos** | Extensiones funcionales completas | Crear un módulo de gestión de calidad |

**Tipos de módulos según su origen:**

| Origen | Descripción | Ejemplo |
|--------|-------------|---------|
| **Prediseñados por el fabricante** | Módulos oficiales de Odoo S.A. | Ventas, Contabilidad, CRM |
| **De terceros** | Módulos creados por la comunidad o partners | Localizaciones fiscales, integraciones externas |
| **Creados a medida** | Módulos desarrollados específicamente para la empresa | Módulo de gestión de flota personalizado |

**Ejemplo de estructura de un módulo personalizado:**

```
custom_module/
├── __init__.py              # Inicializador del paquete Python
├── __manifest__.py           # Metadatos del módulo (nombre, versión, dependencias)
├── controllers/             # Controladores (rutas HTTP)
│   └── __init__.py
│   └── main.py
├── models/                  # Modelos de datos (ORM)
│   └── __init__.py
│   └── custom_model.py
├── views/                   # Vistas (XML)
│   └── custom_view.xml
├── security/                # Seguridad y permisos
│   └── ir.model.access.csv
├── data/                    # Datos iniciales y de demostración
│   └── demo_data.xml
├── static/                  # Archivos estáticos (CSS, JS, imágenes)
│   └── description/
│       └── icon.png
├── report/                  # Reportes personalizados
│   └── custom_report.xml
└── wizard/                  # Asistentes (wizards)
    └── custom_wizard.py
```

**Ejemplo de __manifest__.py:**

```python
{
    'name': 'Módulo Personalizado de Ejemplo',
    'version': '1.0',
    'category': 'Sales',
    'summary': 'Módulo de ejemplo para personalización',
    'description': 'Este módulo añade funcionalidades personalizadas.',
    'author': 'Nombre del Desarrollador',
    'website': 'https://www.ejemplo.com',
    'depends': ['base', 'sale', 'stock'],
    'data': [
        'security/ir.model.access.csv',
        'views/custom_view.xml',
        'data/demo_data.xml',
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
```

---

### 3.8 Seguridad en Odoo

| Aspecto | Descripción |
|---------|-------------|
| **Perfiles de usuario** | Control de acceso basado en roles (RBAC) |
| **Grupos de acceso** | Conjunto de permisos agrupados en roles funcionales |
| **Reglas de registro** | Filtros a nivel de registro (fila) para restringir visibilidad de datos |
| **HTTP** | Comunicación cifrada mediante HTTPS (certificado SSL/TLS) |
| **Auditoría** | Registro de transacciones, accesos y cambios en el sistema |
| **Sesiones** | Las sesiones expiran por inactividad; los cambios de permisos requieren nueva sesión |
| **Roles múltiples** | Un usuario puede pertenecer a varios grupos; aplica la intersección (prevalece el más restrictivo) |
| **Contraseñas** | Almacenamiento hasheado con algoritmo PBKDF2 + SHA256 |
| **Protección CSRF** | Tokens anti-cross-site request forgery en formularios |
| **Logging** | Registro de eventos de seguridad en archivos de log |

**Modelo de seguridad en Odoo:**

```
Usuario
  └── Pertenencia a Grupos (roles)
        └── Permisos de modelo (crear, leer, editar, borrar)
              └── Reglas de registro (filtros de acceso por registro)
                    └── Acceso a menús y vistas
```

**Ejemplo de archivo de permisos (ir.model.access.csv):**

```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_custom_model_user,custom_model.user,model_custom_model,base.group_user,1,0,0,0
access_custom_model_manager,custom_model.manager,model_custom_model,base.group_sale_manager,1,1,1,0
access_custom_model_admin,custom_model.admin,model_custom_model,base.group_system,1,1,1,1
```

**Recomendaciones de seguridad:**

1. Cambiar la contraseña maestra por defecto (`admin_passwd` en odoo.conf)
2. Usar HTTPS en producción (proxy inverso con Nginx + Certbot/Let's Encrypt)
3. Restringir el acceso a `/web/database/manager` (gestor de bases de datos) solo a administradores
4. Auditorías periódicas de usuarios activos y permisos
5. Mantener Odoo actualizado con los últimos parches de seguridad
6. Usar autenticación de dos factores (2FA) para usuarios administradores

**Configuración de proxy inverso Nginx con HTTPS:**

```nginx
server {
    listen 80;
    server_name odoo.miempresa.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name odoo.miempresa.com;

    ssl_certificate /etc/letsencrypt/live/odoo.miempresa.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/odoo.miempresa.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    location /websocket {
        proxy_pass http://127.0.0.1:8069;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### 3.9 Roles y Privilegios

**Estructura de grupos (roles) en Odoo:**

| Nivel de acceso | Descripción | Ejemplo de grupo |
|----------------|-------------|------------------|
| **Usuario** | Acceso básico de lectura a sus propios datos | `base.group_user` |
| **Empleado** | Acceso a funcionalidades de empleado | `hr.group_employee` |
| **Responsable** | Acceso de gestión sobre un área | `sale.group_sale_manager` |
| **Administrador** | Acceso total a la configuración del módulo | `account.group_account_manager` |
| **Sistema** | Acceso completo a toda la configuración técnica | `base.group_system` (técnico/configuración) |

**Jerarquía de permisos para un modelo de Odoo:**

| Permiso | Código | Acción |
|---------|--------|--------|
| **Leer** | `perm_read` | Ver registros existentes |
| **Crear** | `perm_create` | Añadir nuevos registros |
| **Editar** | `perm_write` | Modificar registros existentes |
| **Borrar** | `perm_unlink` | Eliminar registros permanentemente |

**Ejemplo de creación de un grupo de acceso en XML:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <data>
        <record id="group_custom_role" model="res.groups">
            <field name="name">Rol Personalizado</field>
            <field name="category_id" ref="base.module_category_hidden"/>
            <field name="implied_ids" eval="[(4, ref('base.group_user'))]"/>
            <field name="users" eval="[(4, ref('base.user_admin'))]"/>
        </record>
    </data>
</odoo>
```

---

### 3.10 Reportes e Informes

**Características de los reportes en Odoo:**

- **Motor de plantillas**: Qweb (basado en XML + Python)
- **Generación**: Principalmente en formato **PDF**
- **Exportación**: Hoja de cálculo, presentaciones, correo electrónico
- **Riesgo**: Posible fuga de información si no se controlan los permisos de acceso a reportes
- **Módulos de terceros**: Excel Report Engine (generación de Excel avanzado)

**Tipos de reportes en Odoo:**

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Facturas** | Documentos fiscales de venta | Factura proforma, factura rectificativa |
| **Presupuestos** | Cotizaciones para clientes | Presupuesto comercial, oferta |
| **Albaranes** | Documentos de entrega/movimiento | Albarán de entrega, albarán de devolución |
| **Órdenes de compra** | Documentos de aprovisionamiento | Pedido a proveedor |
| **Informes contables** | Reportes financieros | Balance de situación, cuenta de resultados, libro mayor |
| **Informes de inventario** | Reportes de stock | Valoración de inventario, movimientos |
| **Informes de RRHH** | Reportes de personal | Nóminas, contratos, absentismo |
| **Informes de ventas** | Análisis comerciales | Forecast, pipeline, facturación por período |

**Ejemplo de un reporte Qweb básico:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <template id="report_custom_document">
        <t t-call="web.html_container">
            <t t-foreach="docs" t-as="doc">
                <t t-call="web.internal_layout">
                    <div class="page">
                        <h2>Informe Personalizado</h2>
                        <p><strong>Cliente:</strong> <span t-field="doc.partner_id.name"/></p>
                        <p><strong>Fecha:</strong> <span t-field="doc.date_order"/></p>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr t-foreach="doc.order_line" t-as="line">
                                    <td><span t-field="line.product_id.name"/></td>
                                    <td><span t-field="line.product_uom_qty"/></td>
                                    <td><span t-field="line.price_unit"/></td>
                                    <td><span t-field="line.price_subtotal"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </t>
            </t>
        </t>
    </template>
</odoo>
```

---

### 3.11 Integración con ofimática

**Vías de integración:**

| Vía | Descripción | Ejemplos |
|-----|-------------|---------|
| **Mediante módulo ERP** | Módulo de Odoo que permite integración directa | Módulo de documentos, módulo de hojas de cálculo |
| **Plugin de suite ofimática** | Complemento para software ofimático | Owncloud/Nextcloud plugin, Office365 connector, Google Workspace add-on |
| **Compatibilidad con formatos estándar** | Importación/exportación en formatos comunes | CSV, XLSX, ODF, PDF, XML, JSON |

**Formatos soportados:**

| Formato | Uso | Dirección |
|---------|-----|-----------|
| **CSV** | Importación/exportación de datos masivos | Bidireccional |
| **XLSX** | Exportación de reportes a Excel | Salida |
| **ODF** | Documentos en formato OpenDocument | Salida |
| **HTML** | Vistas web y correos electrónicos | Salida |
| **PDF** | Documentos imprimibles (facturas, albaranes) | Salida |
| **XML** | Intercambio de datos estructurados (factura electrónica) | Bidireccional |
| **JSON** | API REST e integraciones externas | Bidireccional |
| **VCF** | Importación/exportación de contactos | Bidireccional |
| **iCal** | Sincronización de calendarios | Bidireccional |

**Integración con Nextcloud/Owncloud:**

```
Odoo ─── Módulo de documentos ─── WebDAV ─── Nextcloud
                                             └── Edición colaborativa de documentos
                                             └── Almacenamiento compartido
```

---

### 3.12 Arquitectura de Odoo

**Arquitectura multicapa:**

```
+-----------------------------------------------+
|               Cliente Web/Navegador            |
|         (JavaScript, Owl Framework)            |
+-----------------------------------------------+
                    |  HTTP/JSON-RPC
                    v
+-----------------------------------------------+
|            Servidor Web (Odoo)                 |
|  Capa de Presentación (XML, Qweb, CSS, JS)    |
|  Capa de Negocio (Python - ORM, Workflows)     |
|  Capa de Acceso a Datos (ORM)                  |
+-----------------------------------------------+
                    |  SQL/psycopg2
                    v
+-----------------------------------------------+
|            PostgreSQL (Base de datos)           |
|  → Tablas de datos (modelos Odoo)              |
|  → Metadatos (vistas, informes, traducciones)   |
+-----------------------------------------------+
```

**Componentes técnicos:**

| Componente | Tecnología | Función |
|------------|-----------|---------|
| **ORM** (Object-Relational Mapping) | Python | Mapeo de objetos a tablas de base de datos |
| **Server** | Python (Twisted) | Gestión de peticiones HTTP/HTTPS |
| **Web Client** | JavaScript (Owl Framework, jQuery) | Interfaz de usuario dinámica |
| **Qweb** | XML + Python | Motor de plantillas para vistas y reportes |
| **Workflow** | Python | Motor de procesos y flujos de trabajo |
| **Report Engine** | Qweb + wkhtmltopdf | Generación de informes PDF |
| **API** | JSON-RPC / XML-RPC | Comunicación con aplicaciones externas |

---

### 3.13 Módulos principales de Odoo

**Módulos de aplicación (App Store de Odoo):**

| Módulo | Nombre técnico | Categoría | Funcionalidad principal |
|--------|---------------|-----------|------------------------|
| CRM | `crm` | Ventas | Gestión de leads, oportunidades, pipeline |
| Ventas | `sale` | Ventas | Pedidos, presupuestos, facturación |
| Contabilidad | `account` | Finanzas | Contabilidad general, facturación, impuestos |
| Facturación | `account_accountant` | Finanzas | Contabilidad analítica, cierre fiscal |
| Inventario | `stock` | Logística | Almacenes, movimientos, inventario |
| Compras | `purchase` | Logística | Órdenes de compra, recepción |
| Fabricación | `mrp` | Producción | Órdenes de fabricación, BOM, planificación |
| RRHH | `hr` | Recursos Humanos | Empleados, contratos, nóminas |
| Reclutamiento | `hr_recruitment` | RRHH | Procesos de selección, candidatos |
| Proyecto | `project` | Servicios | Gestión de proyectos, tareas, planificación |
| TPV | `point_of_sale` | Ventas | Punto de venta para tienda física |
| Website | `website` | Web | Sitio web corporativo, tienda online |
| Marketing | `marketing_automation` | Marketing | Campañas automatizadas de email |
| Email Marketing | `mass_mailing` | Marketing | Envío masivo de correos |
| Flota | `fleet` | Logística | Gestión de vehículos y mantenimiento |
| Eventos | `event` | Servicios | Gestión de eventos y venta de entradas |
| Firmar | `sign` | Productividad | Envío y firma de documentos |
| Subastas | `auction` | Ventas | Gestión de subastas online |
| Documentos | `documents` | Productividad | Gestión de documentos y archivos |
| Aprobaciones | `approvals` | Productividad | Flujos de aprobación |
| Mantenimiento | `maintenance` | Producción | Gestión de mantenimiento de equipos |
| Calidad | `quality` | Producción | Control de calidad, puntos de control |
| Gastos | `hr_expense` | RRHH | Gestión de gastos de empleados |
| Hojas de tiempo | `hr_timesheet` | RRHH | Registro de horas trabajadas |
| Planificación | `planning` | RRHH | Planificación de turnos de trabajo |
| Notas | `note` | Productividad | Notas y recordatorios |
| Encuestas | `survey` | Marketing | Creación y envío de encuestas |

---

### 3.14 Odoo Community vs. Odoo Enterprise

| Aspecto | Odoo Community | Odoo Enterprise |
|---------|---------------|-----------------|
| **Licencia** | LGPL (código abierto) | Propietaria (licencia anual) |
| **Precio** | Gratuito | Desde ~20€/usuario/mes (app), desde ~35€/usuario/mes (tres apps) |
| **Soporte oficial** | No (soporte comunitario) | Sí (soporte técnico de Odoo S.A.) |
| **Actualizaciones** | Manuales | Automáticas (Odoo.sh) o guiadas |
| **Módulos exclusivos** | Solo módulos base | Acceso a todas las apps de Odoo Enterprise |
| **Odoo Studio** | No disponible | Sí (personalización sin código) |
| **Aplicaciones móviles** | No oficiales | Oficiales (iOS, Android) |
| **Firma digital** | No | Sí (módulo Sign) |
| **IoT Box** | No | Sí (integración hardware) |
| **Multi-compañía** | Limitado | Completo |
| **SLA (Service Level Agreement)** | No | Sí (según plan) |
| **Odoo.sh (Cloud hosting)** | No | Sí (plataforma cloud oficial) |

**¿Cuándo usar cada versión?**

| Situación | Recomendación |
|-----------|--------------|
| Empresa pequeña (<10 usuarios, necesidades básicas) | Community |
| Empresa en crecimiento (10-50 usuarios) | Enterprise |
| Gran empresa (>50 usuarios) | Enterprise |
| Desarrollo de módulos personalizados | Community (entorno de desarrollo gratuito) |
| Necesidad de soporte oficial | Enterprise |
| Presupuesto limitado | Community + módulos de terceros |
| Personalización intensiva | Community (acceso completo al código fuente) |
| Datos sensibles en cloud | Enterprise (Odoo.sh con certificaciones) |

---

### 3.15 Comandos útiles de Odoo

**Gestión de base de datos desde línea de comandos:**

```bash
# Crear base de datos (con contraseña maestra)
python3 odoo-bin -d mi_empresa --db_user odoo --db_password odoo --db_host localhost

# Actualizar un módulo específico
python3 odoo-bin -d mi_empresa -u sale --db_user odoo --db_password odoo

# Actualizar todos los módulos
python3 odoo-bin -d mi_empresa -u all --db_user odoo --db_password odoo

# Instalar un módulo desde línea de comandos
python3 odoo-bin -d mi_empresa -i sale,crm,account --db_user odoo --db_password odoo
```

**Gestión con Docker:**

```bash
# Ver logs de Odoo
docker-compose logs -f web

# Acceder al contenedor de Odoo
docker exec -it tarea07_web_1 bash

# Conectarse a la base de datos PostgreSQL
docker exec -it tarea07_db_1 psql -U odoo -d postgres

# Listar bases de datos en PostgreSQL
docker exec -it tarea07_db_1 psql -U odoo -d postgres -c "\l"

# Backup de la base de datos
docker exec -t tarea07_db_1 pg_dump -U odoo mi_empresa > backup.sql

# Restore de la base de datos
cat backup.sql | docker exec -i tarea07_db_1 psql -U odoo -d mi_empresa

# Backup de los datos (filestore)
docker run --rm -v tarea07_odoo-web-data:/data -v $(pwd):/backup alpine tar czf /backup/filestore_backup.tar.gz -C /data .
```

**Comandos PostgreSQL útiles:**

```sql
-- Listar todas las bases de datos
\l

-- Conectar a una base de datos
\c mi_empresa

-- Listar tablas
\dt

-- Listar tablas con información detallada
\dt+

-- Ver usuarios y roles
\du

-- Ver la estructura de una tabla
\d+ res_partner

-- Consultar módulos instalados
SELECT name, state FROM ir_module_module WHERE state = 'installed';

-- Ver sesiones activas
SELECT * FROM pg_stat_activity;
```

---

### 3.16 Estructura de un módulo en Odoo

**Árbol de directorios completo de un módulo Odoo:**

```
modulo_ejemplo/
├── __init__.py                      # Importación de modelos y controladores
├── __manifest__.py                  # Metadatos del módulo
├── controllers/                     # Rutas HTTP (para endpoints web)
│   ├── __init__.py
│   └── main.py
├── models/                          # Modelos de datos (ORM)
│   ├── __init__.py
│   ├── partner.py                   # Herencia/extensiones de modelos existentes
│   └── custom_model.py              # Nuevo modelo
├── views/                           # Vistas (interfaz de usuario)
│   ├── custom_model_view.xml        # Vistas: tree, form, kanban, search
│   ├── menu_views.xml               # Entradas de menú
│   └── report_templates.xml         # Plantillas de informes
├── security/                        # Seguridad y control de acceso
│   ├── ir.model.access.csv          # Permisos ACL por modelo
│   └── security_groups.xml          # Definición de grupos de acceso
├── data/                            # Datos iniciales
│   ├── data.xml                     # Datos de configuración inicial
│   └── demo.xml                     # Datos de demostración
├── report/                          # Definiciones de reportes
│   ├── __init__.py
│   └── custom_report.py             # Lógica de reportes
├── wizards/                         # Asistentes (diálogos modales)
│   ├── __init__.py
│   └── custom_wizard.py             # Lógica del wizard
├── static/                          # Archivos estáticos
│   └── description/
│       └── icon.png                 # Icono del módulo (256x256 px)
├── i18n/                            # Traducciones
│   ├── es.po                        # Traducción al español
│   └── fr.po                        # Traducción al francés
└── tests/                           # Pruebas unitarias
    ├── __init__.py
    └── test_custom_model.py
```

**Ejemplo de modelo (models/custom_model.py):**

```python
from odoo import api, fields, models


class CustomModel(models.Model):
    _name = 'custom.model'
    _description = 'Modelo Personalizado de Ejemplo'
    _rec_name = 'name'
    _order = 'create_date desc'

    name = fields.Char(string='Nombre', required=True, tracking=True)
    description = fields.Text(string='Descripción')
    active = fields.Boolean(string='Activo', default=True)
    state = fields.Selection([
        ('draft', 'Borrador'),
        ('confirmed', 'Confirmado'),
        ('done', 'Hecho'),
        ('cancelled', 'Cancelado'),
    ], string='Estado', default='draft', tracking=True)
    partner_id = fields.Many2one('res.partner', string='Cliente', required=True)
    user_id = fields.Many2one('res.users', string='Responsable', default=lambda self: self.env.user)
    amount = fields.Float(string='Importe', digits=(16, 2))
    currency_id = fields.Many2one('res.currency', string='Moneda',
                                  default=lambda self: self.env.company.currency_id)
    amount_with_tax = fields.Monetary(string='Importe con impuestos',
                                      currency_field='currency_id', compute='_compute_amount_with_tax')
    line_ids = fields.One2many('custom.model.line', 'parent_id', string='Líneas')
    date = fields.Date(string='Fecha', default=fields.Date.today)
    notes = fields.Html(string='Notas')

    @api.depends('amount', 'line_ids.subtotal')
    def _compute_amount_with_tax(self):
        for record in self:
            total = record.amount
            for line in record.line_ids:
                total += line.subtotal
            record.amount_with_tax = total * 1.21  # IVA 21%

    def action_confirm(self):
        self.state = 'confirmed'

    def action_done(self):
        self.state = 'done'

    def action_cancel(self):
        self.state = 'cancelled'
```

---

### 3.17 Bases de datos en Odoo

**Características de la base de datos de Odoo:**

| Aspecto | Descripción |
|---------|-------------|
| **SGBD** | PostgreSQL (único soportado oficialmente) |
| **ORM** | Mapeo objeto-relacional propio (cada modelo Python → tabla SQL) |
| **Convención de tablas** | `ir_*` → tablas del sistema, `res_*` → recursos (usuarios, empresas), `*_*` → tablas por módulo |
| **Herencia** | Herencia de tablas: cada clase Python puede heredar de modelos existentes |
| **Filestore** | Archivos adjuntos almacenados en sistema de archivos (no en BBDD) |
| **Traducciones** | Almacenadas en tabla `ir_translation` |
| **Vistas** | Definiciones de interfaz almacenadas en tablas `ir_ui_view` |
| **Secuencias** | Numeración automática de documentos (facturas, pedidos) en `ir_sequence` |

**Tablas principales del sistema:**

| Tabla | Descripción |
|-------|-------------|
| `res_users` | Usuarios del sistema |
| `res_partner` | Contactos (clientes, proveedores, empresas) |
| `res_company` | Compañías/empresas |
| `ir_module_module` | Módulos instalados y disponibles |
| `ir_model` | Modelos registrados en el sistema |
| `ir_model_fields` | Campos de cada modelo |
| `ir_ui_view` | Definiciones de vistas (form, tree, kanban) |
| `ir_ui_menu` | Entradas del menú de navegación |
| `ir_act_window` | Acciones de ventana |
| `ir_cron` | Tareas programadas (cron jobs) |
| `ir_attachment` | Archivos adjuntos |
| `ir_translation` | Traducciones de términos |
| `ir_sequence` | Secuencias de numeración |
| `ir_logging` | Registro de logs del sistema |
| `ir_mail_server` | Servidores de correo saliente |
| `ir_config_parameter` | Parámetros de configuración del sistema |

**Comandos para gestión de bases de datos en Odoo:**

```bash
# Gestión desde la interfaz web:
# http://localhost:8069/web/database/manager

# Crear base de datos desde terminal
python3 odoo-bin -d nueva_empresa --db_user odoo --db_password odoo \
  --db_host localhost --db_port 5432 --addons-path=./addons --init=base

# Duplicar base de datos (desde psql)
CREATE DATABASE mi_empresa_copia TEMPLATE mi_empresa OWNER odoo;
```

---

### 3.18 Localización y traducciones

**Odoo y la localización española:**

| Aspecto | Descripción |
|---------|-------------|
| **Módulo de localización** | `l10n_es` (localización española) |
| **Plan contable** | Plan General Contable (PGC) español |
| **Impuestos** | IVA (21%, 10%, 4%), IRPF, IGIC (Canarias) |
| **Factura electrónica** | Facturae (formato XML SII) |
| **SII** | Suministro Inmediato de Información (AEAT) |
| **Libros contables** | Libro Diario, Libro Mayor, Balance de Situación |
| **Modelos fiscales** | Modelo 303 (IVA), Modelo 111 (IRPF), Modelo 347 |
| **Moneda** | Euro (EUR) |
| **Idioma** | Español (es_ES) |

**Instalación de la localización española:**

1. Ir a **Aplicaciones** → Buscar "Contabilidad España" o `l10n_es`
2. Instalar el módulo
3. Configurar: **Contabilidad → Configuración → Ajustes de localización**
4. Seleccionar el plan contable español
5. Configurar impuestos (IVA, IRPF)

**Traducciones en Odoo:**

Las traducciones se almacenan en archivos `.po` y se gestionan desde:
- **Menú**: Ajustes → Traducciones → Términos traducidos
- **Idiomas disponibles**: Más de 50 idiomas
- **Formato de archivo**: PO (Portable Object) estándar

**Ejemplo de archivo de traducción (i18n/es.po):**

```
#. module: custom_module
#. model: ir.model.fields, field_description:custom_module.model_custom_model
#: code:addons/custom_module/models/custom_model.py:0
msgid "Custom Model"
msgstr "Modelo Personalizado"

#. module: custom_module
#. model: ir.model.fields, field_description:custom_module.field_custom_model__name
#: code:addons/custom_module/models/custom_model.py:0
msgid "Name"
msgstr "Nombre"

#. module: custom_module
#: model: ir.actions.act_window,name:custom_module.action_custom_model
msgid "Custom Models"
msgstr "Modelos Personalizados"
```

---

## 4. Seguridad en Sistemas ERP

| Aspecto | Descripción | Medidas recomendadas |
|---------|-------------|---------------------|
| **Perfiles de usuario** | Control de acceso basado en roles (RBAC) | Principio de mínimo privilegio, revisión periódica |
| **HTTPS** | Cifrado de comunicaciones cliente-servidor | Certificado SSL/TLS válido, HTTP→301→HTTPS |
| **Auditoría** | Registro de transacciones y accesos | Logs centralizados, alertas de actividad sospechosa |
| **Sesiones** | Gestión de sesiones de usuario | Tiempo de expiración, invalidación al cerrar sesión |
| **Roles múltiples** | Un usuario puede tener varios roles; aplica el más restrictivo | Revisar combinaciones de roles incompatibles |
| **Autenticación** | Verificación de identidad del usuario | 2FA, política de contraseñas robustas |
| **Cifrado de datos** | Protección de datos en reposo y en tránsito | Cifrado de disco, cifrado TLS, hash de contraseñas |
| **Backup** | Copias de seguridad periódicas | Backup diario + semanal, almacenamiento externo, pruebas de restauración |
| **Firewall** | Control de tráfico de red | Restringir puertos, solo tráfico HTTPS desde Internet |
| **Actualizaciones** | Parches de seguridad | Mantener ERP y SO actualizados, plan de parcheado |

**Buenas prácticas de seguridad en entornos ERP:**

```
1. Cambiar contraseñas por defecto (admin, postgres, etc.)
2. No exponer el gestor de bases de datos a Internet
3. Segmentar la red (ERP en VLAN separada)
4. Usar proxy inverso (Nginx) para terminar SSL
5. Implementar autenticación de dos factores
6. Realizar auditorías de acceso periódicas
7. Mantener un plan de copias de seguridad y restauración
8. Formar a los usuarios en seguridad (phishing, contraseñas seguras)
9. Limitar el acceso físico a servidores
10. Registrar y monitorizar eventos de seguridad
```

---

## 5. Comparativa ERP vs CRM

| Aspecto | ERP | CRM |
|---------|-----|-----|
| **Enfoque principal** | Toda la empresa (visión global) | Clientes y relaciones comerciales |
| **Módulos característicos** | Producción, logística, finanzas, RRHH, compras | Ventas, marketing, soporte al cliente |
| **Objetivo fundamental** | Optimizar procesos internos y recursos | Gestionar y mejorar relaciones con clientes |
| **Usuarios objetivo** | Toda la organización | Ventas, marketing, atención al cliente |
| **Datos gestionados** | Órdenes, inventario, finanzas, nóminas, producción | Contactos, oportunidades, interacciones, tickets |
| **ROI (Retorno de inversión)** | Eficiencia operativa, reducción de costes | Aumento de ventas, retención de clientes |
| **Complejidad** | Alta (múltiples módulos, integración compleja) | Media (enfocado en procesos comerciales) |
| **Tiempo de implantación** | 3-18 meses | 1-6 meses |
| **Coste típico** | 50.000€ - 500.000€+ | 10.000€ - 100.000€ |
| **Ejemplos** | SAP, Odoo, Microsoft Dynamics | Salesforce, HubSpot, Zoho CRM |
| **Tendencia actual** | Convergencia: los ERP incluyen CRM y viceversa |

**¿Cuándo necesito ERP y cuándo CRM?**

```
Situación: Empresa que fabrica y vende productos
→ ERP completo (producción + ventas + compras + contabilidad)
  └── CRM integrado como módulo de ventas

Situación: Empresa de servicios con foco en captación de clientes
→ CRM (gestión de leads, oportunidades, email marketing)
  └── Funcionalidades ERP básicas (contabilidad, facturación)

Situación: Empresa consolidada que quiere optimizar toda su operación
→ ERP (integra todos los departamentos)
  └── CRM como parte del módulo de ventas

Situación: Startup que necesita captar clientes rápidamente
→ CRM (primero ventas, luego operaciones)
  └── ERP más adelante cuando el volumen lo requiera
```

---

## 6. Vocabulario Clave

| Término | Definición | Contexto |
|---------|------------|----------|
| **ERP** | Enterprise Resource Planning - Sistema que planifica y gestiona todos los recursos empresariales | Sistemas de Gestión Empresarial |
| **CRM** | Customer Relationship Management - Sistema de gestión de relaciones con clientes | Ventas y Marketing |
| **Módulo** | Componente funcional independiente del ERP que cubre un área de negocio específica | Arquitectura de ERP |
| **Rol / Grupo** | Conjunto de privilegios que determinan el acceso a funcionalidades y datos | Seguridad y Permisos |
| **Docker** | Plataforma de contenedores que permite empaquetar y desplegar aplicaciones de forma aislada | Infraestructura y Despliegue |
| **Docker Compose** | Herramienta para definir y ejecutar aplicaciones multi-contenedor (YAML) | Infraestructura y Despliegue |
| **PostgreSQL** | Sistema de base de datos relacional open source usado por Odoo | Base de datos |
| **ORM** | Object-Relational Mapping - Mapeo objeto-relacional para interactuar con la BD sin SQL directo | Desarrollo |
| **Qweb** | Motor de plantillas de Odoo basado en XML para vistas e informes | Reportes y Vistas |
| **Open Source** | Código abierto, modificable y distribuible libremente (cumpliendo licencia) | Licencias |
| **Cloud ERP** | ERP alojado en la nube sin instalación local (modelo SaaS) | Modalidades de ERP |
| **On-premise** | Software instalado en servidores locales de la empresa | Modalidades de ERP |
| **SaaS** | Software as a Service - Software como servicio (pago por uso en la nube) | Modalidades de ERP |
| **Pipeline** | Tubería de ventas: fases por las que pasa un lead hasta convertirse en cliente | CRM |
| **Lead** | potencial cliente que ha mostrado interés inicial | CRM |
| **Oportunidad** | Lead cualificado con alta probabilidad de cierre | CRM |
| **MQL** | Marketing Qualified Lead - Lead cualificado por marketing | CRM |
| **SQL** | Sales Qualified Lead - Lead cualificado por ventas para contacto comercial directo | CRM |
| **BOM** | Bill of Materials - Lista de materiales/despiece de un producto | Producción |
| **Workflow** | Flujo de trabajo automatizado con reglas de negocio | Automatización |
| **ACL** | Access Control List - Lista de control de acceso para permisos | Seguridad |
| **RBAC** | Role-Based Access Control - Control de acceso basado en roles | Seguridad |
| **2FA** | Two-Factor Authentication - Autenticación de dos factores | Seguridad |
| **SSL/TLS** | Secure Sockets Layer / Transport Layer Security - Protocolos de cifrado | Seguridad |
| **Proxy inverso** | Servidor intermediario que distribuye peticiones a servidores internos | Infraestructura |
| **Filestore** | Almacenamiento de archivos adjuntos en sistema de archivos (no en BD) | Arquitectura Odoo |
| **Contenedor** | Unidad estándar de software que empaqueta código y dependencias | Docker |
| **Volumen Docker** | Mecanismo para persistir datos generados por contenedores | Docker |
| **YAML** | YAML Ain't Markup Language - Formato de serialización de datos legible | Configuración |
| **Localización** | Adaptación del software a requisitos fiscales, legales e idiomáticos de un país | Configuración regional |
| **SII** | Suministro Inmediato de Información - Sistema de facturación electrónica de la AEAT | Localización España |
| **AEAT** | Agencia Estatal de Administración Tributaria (Hacienda española) | Localización España |
| **Facturae** | Formato XML estándar para factura electrónica en España | Localización España |
| **LOPD/GDPR** | Ley Orgánica de Protección de Datos / General Data Protection Regulation | Cumplimiento legal |

---

## 7. Preguntas Frecuentes sobre ERP

**¿Qué significa ERP?**
Enterprise Resource Planning (Planificación de Recursos Empresariales).

**¿Qué significa CRM?**
Customer Relationship Management (Gestión de Relaciones con Clientes).

**¿Cuál es la diferencia entre ERP y CRM?**
El ERP integra todos los procesos de la empresa (producción, logística, finanzas, RRHH, etc.) en un solo sistema, mientras que el CRM se centra exclusivamente en la gestión de relaciones con clientes (ventas, marketing, soporte). Los ERPs modernos suelen incluir módulos CRM.

**¿Es Odoo gratuito?**
Existe la versión Community gratuita (código abierto, licencia LGPL) con funcionalidades básicas, y versiones Enterprise de pago (por usuario/mes) que incluyen soporte oficial, aplicaciones exclusivas y versiones móviles.

**¿Qué base de datos usa Odoo?**
PostgreSQL. Es el único sistema de base de datos soportado oficialmente.

**¿Qué puerto usa Odoo por defecto?**
El puerto 8069 para HTTP. Para HTTPS se recomienda usar un proxy inverso (Nginx) en el puerto 443.

**¿Cómo se instalan módulos en Odoo?**
Desde el menú Aplicaciones (Apps), buscar el módulo deseado y hacer clic en "Instalar". También se pueden instalar desde línea de comandos con `-i nombre_modulo`.

**¿Cómo se desinstala un módulo en Odoo?**
Desde Aplicaciones → buscar el módulo → hacer clic en "Desinstalar" → confirmar. Esto elimina todos los datos asociados al módulo.

**¿Qué es un módulo en Odoo?**
Es un componente funcional independiente que añade funcionalidades específicas al sistema (ventas, contabilidad, CRM, etc.). Cada módulo tiene su propia estructura de datos, vistas, permisos y lógica de negocio.

**¿Qué es Docker y por qué se usa con Odoo?**
Docker es una plataforma de contenedores que permite ejecutar Odoo y PostgreSQL en entornos aislados y reproducibles. Docker Compose simplifica la gestión de ambos servicios con un solo archivo de configuración.

**¿Cómo se accede a la base de datos de Odoo?**
Mediante psql (cliente de PostgreSQL) o desde el gestor de bases de datos web en `/web/database/manager`.

**¿Qué es el filestore de Odoo?**
Es el directorio donde Odoo almacena los archivos adjuntos (documentos, imágenes) fuera de la base de datos, normalmente en `/var/lib/odoo/filestore`.

**¿Cómo se configura HTTPS en Odoo?**
Mediante un proxy inverso Nginx que termina SSL y redirige el tráfico al puerto 8069 de Odoo. También se puede configurar directamente en Odoo usando certificados SSL.

**¿Qué significa que un usuario esté "archivado"?**
Un usuario archivado no puede iniciar sesión, pero sus datos permanecen en el sistema. Es reversible (se puede desarchivar). Es preferible a borrar, que elimina definitivamente el registro.

**¿Qué es el SII en el contexto de Odoo?**
El Suministro Inmediato de Información es un sistema de la Agencia Tributaria española (AEAT) que requiere el envío electrónico de los libros de IVA en tiempo real. Odoo tiene módulos de localización para cumplir con esta obligación.

**¿Cuánto cuesta implantar un ERP?**
Depende del tamaño de la empresa, los módulos necesarios y la complejidad. Puede ir desde 5.000€ para una pequeña empresa con Odoo Community hasta 500.000€+ para grandes empresas con SAP u Oracle.

**¿Qué habilidades se necesitan para administrar Odoo?**
Conocimientos de: administración de sistemas Linux, PostgreSQL, redes, Docker, conceptos de contabilidad, gestión empresarial y, para desarrollo, Python y XML.

**¿Qué es un grupo de acceso en Odoo?**
Es un conjunto de permisos que se asigna a los usuarios para controlar qué funcionalidades y datos pueden ver y modificar. Los grupos pueden organizarse jerárquicamente.

**¿Se puede usar Odoo sin conexión a Internet?**
Sí, si está instalado on-premise en servidores locales. La versión cloud (Odoo Online) requiere conexión permanente.

**¿Qué alternativas open source existen a Odoo?**
ERPNext, Dolibarr, Tryton, Openbravo, Apache OFBiz, Metasfresh, Axelor.

**¿Qué es la versión Enterprise de Odoo?**
Es la versión de pago que incluye soporte oficial, aplicaciones adicionales (Odoo Studio, firma digital, IoT Box, aplicaciones móviles), y acceso a Odoo.sh (plataforma cloud oficial de Odoo).

---

## Resumen visual de conceptos clave

```
┌─────────────────────────────────────────────────────────┐
│                 SISTEMAS DE GESTIÓN EMPRESARIAL           │
├─────────────────────────┬───────────────────────────────┤
│          ERP            │            CRM                 │
│  (Enterprise Resource   │  (Customer Relationship        │
│   Planning)             │   Management)                  │
├─────────────────────────┼───────────────────────────────┤
│ • Producción            │ • Gestión de contactos        │
│ • Logística/Inventario  │ • Oportunidades/pipeline      │
│ • Contabilidad/Finanzas │ • Automatización marketing    │
│ • RRHH                  │ • Soporte al cliente          │
│ • Compras               │ • Análisis de ventas          │
│ • Ventas (+CRM)         │                               │
├─────────────────────────┴───────────────────────────────┤
│                      ODOO                                │
│  Open Source ERP + CRM + CMS + Ecommerce                │
│  Lenguaje: Python, JavaScript, XML, PostgreSQL          │
│  Instalación: local (Docker) o cloud (Odoo Online)      │
└─────────────────────────────────────────────────────────┘
```

---

*Documento de referencia para LMSGI07 - Sistemas de Gestión Empresarial (ERP/CRM y Odoo).*
*Generado como material de estudio y consulta rápida.*
