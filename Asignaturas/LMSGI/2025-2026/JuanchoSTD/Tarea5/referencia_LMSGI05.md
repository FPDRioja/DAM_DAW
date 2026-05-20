# Referencia Rápida: LMSGI05 - Conversión y adaptación de documentos (XPath y XSLT)

## 1. XPath (XML Path Language)

### 1.1 Introducción a XPath

- **XPath** (XML Path Language) es un lenguaje para navegar por documentos XML y seleccionar nodos mediante expresiones de ruta.
- Utiliza sintaxis similar a las rutas de sistemas de archivos (`/`, `//`, `..`, `.`).
- Es un componente fundamental utilizado en **XSLT**, **XQuery**, **XPointer**, **XForms** y otras tecnologías XML.
- XPath opera sobre el **modelo de árbol** de un documento XML.
- Las expresiones XPath devuelven uno de estos cuatro tipos: **conjunto de nodos**, **cadena**, **número** o **booleano**.
- Existen dos versiones principales: XPath 1.0 (la más usada con XSLT 1.0) y XPath 2.0/3.0 (usadas con XSLT 2.0/3.0).

### 1.2 Tipos de nodos en XPath (7 tipos)

| # | Tipo de nodo | Descripción | Ejemplo de acceso |
|---|-------------|-------------|-------------------|
| 1 | **Elemento** (element) | Representa un elemento XML | `nombre`, `//libro` |
| 2 | **Atributo** (attribute) | Atributo de un elemento | `@id`, `@cod` |
| 3 | **Texto** (text) | Contenido textual de un elemento | `text()`, `./text()` |
| 4 | **Espacio de nombres** (namespace) | Declaración xmlns | `namespace::*` |
| 5 | **Instrucción de procesamiento** (processing-instruction) | `<? ... ?>` | `processing-instruction()` |
| 6 | **Comentario** (comment) | `<!-- ... -->` | `comment()` |
| 7 | **Raíz / Documento** (document) | Nodo raíz del documento | `/` |

### 1.3 Expresiones de ruta (Location Paths)

Las expresiones de ruta son la construcción fundamental de XPath para navegar por el árbol XML.

#### 1.3.1 Abreviaturas de sintaxis

| Expresión | Significado |
|-----------|-------------|
| `nombre` | Selecciona hijos con ese nombre de elemento |
| `/` | Al inicio: nodo raíz del documento. Como separador: nivel jerárquico |
| `//` | Descendiente en cualquier nivel del árbol |
| `.` | Nodo actual (self) |
| `..` | Nodo padre |
| `@` | Prefijo para acceder a atributos |
| `*` | Cualquier elemento (comodín) |
| `@*` | Cualquier atributo |
| `node()` | Cualquier nodo (elemento, texto, comentario, etc.) |
| `text()` | Cualquier nodo de texto |
| `comment()` | Cualquier comentario |
| `processing-instruction()` | Cualquier instrucción de procesamiento |

#### 1.3.2 Ejemplos de expresiones

```xpath
/agenda/propietario/identificadores/nombre
```

```xpath
//contactos/persona[@id="p02"]/*
```

```xpath
//contactos/persona/telefonos/casa/../../@id
```

```xpath
//libro[titulo and precio]
```

```xpath
/*/capitulos/capitulo[3]
```

```xpath
//*[@id]
```

### 1.4 Rutas absolutas vs relativas

| Tipo | Definición | Ejemplo |
|------|-----------|---------|
| **Absoluta** | Empieza con `/` desde la raíz del documento | `/biblioteca/libros/libro` |
| **Relativa** | No empieza con `/`; se evalúa desde el nodo actual | `libro/titulo` |

**Ejemplos comparativos:**

```xpath
<!-- Absoluta -->
/biblioteca/libros/libro/precio

<!-- Relativa (desde un contexto como un xsl:template) -->
precio
```

```xpath
<!-- Absoluta -->
//persona[@id="p01"]/nombre

<!-- Relativa (si el contexto ya es persona) -->
@id
```

### 1.5 Ejes XPath

Los ejes definen la dirección de navegación dentro del árbol XML. Cada expresión de ruta se compone de un **eje** y un **test de nodo**.

#### 1.5.1 Tabla de ejes

| Eje | Abreviatura | Descripción |
|-----|-------------|-------------|
| `child::` | *(ninguno, por defecto)* | Hijos del nodo actual |
| `attribute::` | `@` | Atributos del nodo actual |
| `descendant::` | `//` | Descendientes a todos los niveles |
| `parent::` | `..` | Padre del nodo actual |
| `self::` | `.` | El propio nodo actual |
| `ancestor::` | - | Ancestros (padre, abuelo, etc. hasta la raíz) |
| `descendant-or-self::` | `//` | Descendientes + el propio nodo |
| `ancestor-or-self::` | - | Ancestros + el propio nodo |
| `following-sibling::` | - | Hermanos que siguen al nodo actual |
| `preceding-sibling::` | - | Hermanos anteriores al nodo actual |
| `following::` | - | Todos los nodos que siguen al actual (excluye descendientes) |
| `preceding::` | - | Todos los nodos anteriores al actual (excluye ancestros) |
| `namespace::` | - | Nodos de espacio de nombres del nodo actual |

#### 1.5.2 Ejemplos con ejes completos

```xpath
child::persona                         → persona (hijo del contexto)
attribute::id                          → @id (atributo del contexto)
descendant::titulo                     → //titulo (todos los títulos descendientes)
parent::*                              → .. (cualquier padre)
self::node()                           → . (el nodo actual)
ancestor::libro                        → ancestro de tipo libro
following-sibling::precio              → hermano siguiente de tipo precio
preceding-sibling::nombre              → hermano anterior de tipo nombre
child::text()[1]                       → primer hijo de texto
```

#### 1.5.3 Equivalencias entre sintaxis completa y abreviada

| Sintaxis completa | Sintaxis abreviada |
|-------------------|-------------------|
| `child::persona` | `persona` |
| `attribute::id` | `@id` |
| `descendant::titulo` | `.//titulo` o `//titulo` |
| `parent::*` | `..` |
| `self::*` | `.` |
| `descendant-or-self::node()/child::baile` | `//baile` |

### 1.6 Predicados `[ ]`

Los predicados filtran nodos según una condición booleana. Se colocan después del test de nodo.

#### 1.6.1 Ejemplos básicos

```xpath
//persona[@id="p02"]              ← persona con id="p02"
```

```xpath
//libro[paginas < 100]            ← libros con menos de 100 páginas
```

```xpath
//libro[position() <= 3]          ← primeros 3 libros
```

```xpath
//libro[last()]                   ← el último libro
```

```xpath
//libro[autor and editorial]      ← libros que tienen ambos hijos (autor y editorial)
```

```xpath
//baile[precio/@moneda="euro"]    ← bailes cuyo precio tiene moneda="euro"
```

#### 1.6.2 Predicados anidados

```xpath
//biblioteca/libro[autor[nacionalidad="española"]]
```

```xpath
//hospital/paciente[doctor[especialidad="cardiología"]]
```

#### 1.6.3 Posiciones en predicados

```xpath
//capitulo[1]                     ← primer capítulo (en cada contexto)
(//capitulo)[1]                   ← el primer capítulo de todo el documento
//capitulo[position() mod 2 = 0]  ← capítulos en posición par
//capitulo[position() > 5]        ← capítulos a partir del sexto
```

### 1.7 Operadores XPath

#### 1.7.1 Operadores de comparación

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `=` | Igualdad | `@id = "p01"` |
| `!=` | Distinto | `@tipo != "vip"` |
| `<` | Menor que | `precio < 50` |
| `>` | Mayor que | `paginas > 200` |
| `<=` | Menor o igual | `edad <= 18` |
| `>=` | Mayor o igual | `nota >= 5` |

#### 1.7.2 Operadores lógicos

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `and` | Y lógico | `precio > 10 and precio < 50` |
| `or` | O lógico | `@tipo="urgente" or @tipo="prioritario"` |
| `not(expr)` | Negación | `not(fallecimiento)` |

#### 1.7.3 Operadores aritméticos

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `+` | Suma | `precio + iva` |
| `-` | Resta | `total - descuento` |
| `*` | Multiplicación | `cantidad * precio_unitario` |
| `div` | División | `precio div 2` |
| `mod` | Módulo (resto) | `position() mod 2` |

#### 1.7.4 Operador de unión de conjuntos

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `\|` | Unión de conjuntos de nodos | `//nombre \| //apellido` |

### 1.8 Funciones XPath

#### 1.8.1 Funciones de cadena (string)

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `string(nodo?)` | Convierte el nodo a su valor textual | `string(//titulo)` |
| `concat(c1, c2, ...)` | Concatena dos o más cadenas | `concat($nombre, " - ", $pais)` |
| `string-length(cadena)` | Devuelve la longitud de la cadena | `string-length(//nombre)` |
| `contains(c1, c2)` | ¿La cadena c1 contiene c2? | `contains(., "XML")` |
| `starts-with(c1, c2)` | ¿c1 empieza con c2? | `starts-with(., "X")` |
| `substring(c, inicio)` | Subcadena desde inicio hasta el final | `substring(., 4)` |
| `substring(c, inicio, long)` | Subcadena con longitud específica | `substring(., 1, 3)` |
| `substring-before(c, delim)` | Parte anterior al delimitador | `substring-before(@fecha, "-")` |
| `substring-after(c, delim)` | Parte posterior al delimitador | `substring-after(@fecha, "-")` |
| `normalize-space(c?)` | Elimina espacios iniciales, finales y duplicados | `normalize-space(.)` |
| `translate(c1, c2, c3)` | Reemplaza caracteres de c2 con los de c3 | `translate(., "áéíóú", "aeiou")` |
| `upper-case(c)` | Convierte a mayúsculas (XPath 2.0+) | `upper-case(.)` |
| `lower-case(c)` | Convierte a minúsculas (XPath 2.0+) | `lower-case(.)` |

#### 1.8.2 Funciones numéricas

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `number(valor)` | Convierte a número | `number(./precio)` |
| `count(conjunto)` | Cuenta el número de nodos | `count(//doctor)` |
| `sum(conjunto)` | Suma los valores numéricos | `sum(//precio)` |
| `floor(n)` | Redondea hacia abajo | `floor(3.14)` → `3` |
| `ceiling(n)` | Redondea hacia arriba | `ceiling(3.14)` → `4` |
| `round(n)` | Redondeo estándar | `round(3.5)` → `4` |
| `min(conjunto)` | Valor mínimo (XPath 2.0+) | `min(//precio)` |
| `max(conjunto)` | Valor máximo (XPath 2.0+) | `max(//paginas)` |
| `avg(conjunto)` | Media aritmética (XPath 2.0+) | `avg(//nota)` |
| `abs(n)` | Valor absoluto (XPath 2.0+) | `abs(-5)` → `5` |

#### 1.8.3 Funciones de contexto

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `position()` | Posición actual dentro del contexto (1-indexed) | `position() <= 3` |
| `last()` | Última posición del contexto actual | `position() = last()` |
| `name()` | Nombre del nodo actual (con prefijo de namespace) | `name(.)` |
| `local-name()` | Nombre del nodo sin prefijo de namespace | `local-name(.)` |
| `namespace-uri()` | URI del namespace del nodo | `namespace-uri(.)` |
| `lang(idioma)` | ¿El nodo está en el idioma especificado? | `lang("es")` |

#### 1.8.4 Funciones booleanas

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `boolean(expr)` | Convierte explícitamente a booleano | `boolean(//error)` |
| `not(expr)` | Negación lógica | `not(@caducado)` |
| `true()` | Literal booleano verdadero | `test="true()"` |
| `false()` | Literal booleano falso | `test="false()"` |
| `lang(idioma)` | Comprueba el idioma del nodo | `lang("en")` |

#### 1.8.5 Funciones de conjunto de nodos

| Función | Descripción |
|---------|-------------|
| `id(string)` | Busca nodo(s) por su atributo de tipo ID |
| `key(nombre, valor)` | Busca nodos por clave indexada (específica de XSLT) |
| `document(URI)` | Carga un documento XML externo (específica de XSLT) |
| `current()` | Devuelve el nodo actual en XSLT (fuera del contexto de la expresión) |
| `generate-id(nodo?)` | Genera un identificador único para el nodo (XSLT) |

#### 1.8.6 Funciones de fecha y hora (XPath 2.0+)

| Función | Descripción |
|---------|-------------|
| `current-date()` | Fecha actual |
| `current-time()` | Hora actual |
| `current-dateTime()` | Fecha y hora actual |
| `year-from-date(fecha)` | Extrae el año |
| `month-from-date(fecha)` | Extrae el mes |
| `day-from-date(fecha)` | Extrae el día |

---

## 2. XSLT (eXtensible Stylesheet Language Transformations)

### 2.1 Introducción a XSLT

- **XSLT** es un lenguaje de transformación de documentos XML basado en reglas (plantillas).
- Permite convertir XML a: **HTML**, **XML**, **texto plano**, **SVG**, **PDF** (vía XSL-FO), etc.
- Utiliza **XPath** para seleccionar y navegar partes del documento fuente.
- Es un lenguaje **declarativo**: defines qué mostrar y cómo, no el flujo de control.
- El procesamiento se basa en **coincidencia de patrones** (pattern matching).
- La versión más extendida es **XSLT 1.0**, aunque existen XSLT 2.0 y 3.0 con funcionalidades ampliadas.

### 2.2 Estructura básica de una transformación XSLT

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <!-- Plantillas y reglas de transformación -->
</xsl:stylesheet>
```

O también usando el elemento raíz alternativo:

```xml
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  ...
</xsl:transform>
```

### 2.3 Elementos XSLT principales

| Elemento | Descripción |
|----------|-------------|
| `xsl:stylesheet` / `xsl:transform` | Elemento raíz del documento XSLT |
| `xsl:template` | Define una plantilla con `match` (patrón) y/o `name` |
| `xsl:apply-templates` | Aplica plantillas a los hijos seleccionados |
| `xsl:value-of` | Inserta el valor textual de un nodo o expresión |
| `xsl:for-each` | Itera sobre un conjunto de nodos |
| `xsl:if` | Condicional simple (sin else) |
| `xsl:choose` | Condicional múltiple (switch) |
| `xsl:when` | Caso dentro de `xsl:choose` |
| `xsl:otherwise` | Caso por defecto dentro de `xsl:choose` |
| `xsl:sort` | Ordenación (dentro de `for-each` o `apply-templates`) |
| `xsl:attribute` | Crea un atributo dinámico en la salida |
| `xsl:output` | Configura el formato de salida (método, encoding, etc.) |
| `xsl:variable` | Declara una variable (inmutable) |
| `xsl:param` | Declara un parámetro (puede recibir valor externo) |
| `xsl:call-template` | Llama a una plantilla por su nombre |
| `xsl:with-param` | Pasa parámetros a una plantilla invocada |
| `xsl:comment` | Genera un comentario XML/HTML en la salida |
| `xsl:copy` | Copia el nodo actual sin su subárbol |
| `xsl:copy-of` | Copia el nodo actual incluyendo su subárbol |
| `xsl:number` | Genera números de secuencia (formateados) |
| `xsl:decimal-format` | Define formato para números (separadores decimal/miles) |
| `xsl:strip-space` | Elimina nodos de texto que solo contienen espacios |
| `xsl:preserve-space` | Conserva nodos de texto con espacios |
| `xsl:import` | Importa elementos de otra hoja XSLT (menor prioridad) |
| `xsl:include` | Incluye elementos de otra hoja XSLT (misma prioridad) |
| `xsl:text` | Genera texto literal en la salida |
| `xsl:element` | Crea un elemento dinámicamente (nombre variable) |
| `xsl:message` | Emite un mensaje (útil para depuración) |
| `xsl:fallback` | Contenido alternativo si el procesador no soporta un elemento |
| `xsl:namespace-alias` | Sustituye espacios de nombres en la salida |
| `xsl:key` | Declara una clave para indexación/búsqueda |
| `xsl:apply-imports` | Aplica plantillas importadas (con menor prioridad) |
| `xsl:result-document` | Crea múltiples documentos de salida (XSLT 2.0+) |

### 2.4 xsl:template - Las plantillas

Las plantillas son el corazón de XSLT. Definen reglas de transformación.

```xml
<xsl:template
  match="patrón"
  name="nombre"
  priority="número"
  mode="modo">
  <!-- cuerpo de la plantilla -->
</xsl:template>
```

| Atributo | Descripción | Uso |
|----------|-------------|-----|
| `match` | Patrón XPath que activa la plantilla | Coincidencia por patrón |
| `name` | Nombre para invocación directa desde `call-template` | Llamada por nombre |
| `priority` | Prioridad numérica para resolver conflictos (valores altos ganan) | Resolución de conflictos |
| `mode` | Permite múltiples plantillas para el mismo nodo en diferentes contextos | Modos de procesamiento |

#### 2.4.1 Tipos de plantillas

**Plantilla raíz** — procesamiento desde el nodo raíz:

```xml
<xsl:template match="/">
  <html>
    <head><title>Mi página</title></head>
    <body>
      <xsl:apply-templates/>
    </body>
  </html>
</xsl:template>
```

**Plantilla nombrada** — invocación directa:

```xml
<xsl:template name="cabecera">
  <header>
    <h1>Bienvenido</h1>
  </header>
</xsl:template>
```

**Plantilla de identidad** — copia fiel del documento fuente:

```xml
<xsl:template match="@*|node()">
  <xsl:copy>
    <xsl:apply-templates select="@*|node()"/>
  </xsl:copy>
</xsl:template>
```

### 2.5 xsl:apply-templates - Procesamiento recursivo

Aplica las plantillas correspondientes a los nodos seleccionados.

```xml
<!-- Aplica plantillas a TODOS los hijos del nodo actual -->
<xsl:apply-templates/>

<!-- Aplica plantillas solo a elementos específicos -->
<xsl:apply-templates select="doctor"/>

<!-- Selecciona nodos con una expresión XPath -->
<xsl:apply-templates select="//libro"/>

<!-- Con ordenación -->
<xsl:apply-templates select="//libro">
  <xsl:sort select="titulo" order="ascending"/>
</xsl:apply-templates>

<!-- Con modo específico -->
<xsl:apply-templates select="." mode="resumen"/>
```

### 2.6 xsl:value-of - Insertar valores

Inserta el valor textual de un nodo o el resultado de una expresión XPath.

```xml
<xsl:value-of select="nombre"/>
```

```xml
<xsl:value-of select="@cod"/>
```

```xml
<xsl:value-of select="."/>
```

```xml
<xsl:value-of select="concat(nombre, ' - ', pais)"/>
```

```xml
<xsl:value-of select="sum(//precio)"/>
```

```xml
<xsl:value-of select="normalize-space(descripcion)"/>
```

```xml
<xsl:value-of select="substring(@fecha, 1, 4)"/>
```

### 2.7 xsl:for-each - Bucles sobre conjuntos de nodos

Itera sobre un conjunto de nodos seleccionados por XPath y aplica las mismas reglas a cada uno.

```xml
<xsl:for-each select="Bailes/baile[plazas >= 10]">
  <xsl:sort select="plazas" data-type="number" order="descending"/>
  <tr>
    <td><xsl:value-of select="nombre"/></td>
    <td><xsl:value-of select="plazas"/></td>
    <td><xsl:value-of select="precio"/></td>
  </tr>
</xsl:for-each>
```

```xml
<xsl:for-each select="//doctor">
  <p>
    Dr. <xsl:value-of select="nombredoctor"/>
    (<xsl:value-of select="especialidad"/>)
  </p>
</xsl:for-each>
```

### 2.8 xsl:if - Condicional simple

Evalúa una condición booleana y ejecuta su contenido si es verdadera.

```xml
<xsl:if test="habitacion > 199">
  <xsl:if test="habitacion < 301">
    <tr>
      <td><xsl:value-of select="habitacion"/></td>
      <td><xsl:value-of select="nombrepaciente"/></td>
    </tr>
  </xsl:if>
</xsl:if>
```

```xml
<xsl:if test="precio/@moneda = 'euro'">
  <span class="euro"><xsl:value-of select="precio"/> €</span>
</xsl:if>
```

### 2.9 xsl:choose / xsl:when / xsl:otherwise - Condicional múltiple

Estructura switch/case: evalúa condiciones en orden y ejecuta la primera que sea verdadera.

```xml
<xsl:choose>
  <xsl:when test="precio/@moneda = 'dolares'">
    <xsl:text> $</xsl:text>
  </xsl:when>
  <xsl:when test="precio/@moneda = 'euro'">
    <xsl:text> €</xsl:text>
  </xsl:when>
  <xsl:when test="precio/@moneda = 'libras'">
    <xsl:text> £</xsl:text>
  </xsl:when>
  <xsl:otherwise>
    <xsl:text> €</xsl:text>
  </xsl:otherwise>
</xsl:choose>
```

```xml
<xsl:choose>
  <xsl:when test="fallecimiento and fallecimiento != ''">
    <td><xsl:value-of select="fallecimiento"/></td>
  </xsl:when>
  <xsl:otherwise>
    <td>Desconocido</td>
  </xsl:otherwise>
</xsl:choose>
```

### 2.10 xsl:sort - Ordenación

Se usa dentro de `xsl:for-each` o `xsl:apply-templates` para ordenar los nodos.

```xml
<xsl:sort select="campo"
          data-type="text|number|qname"
          order="ascending|descending"
          case-order="upper-first|lower-first"
          lang="idioma"/>
```

| Atributo | Valores | Descripción |
|----------|---------|-------------|
| `select` | Expresión XPath | Campo por el que ordenar |
| `data-type` | `text` (default), `number`, `qname` | Tipo de datos para la ordenación |
| `order` | `ascending` (default), `descending` | Orden ascendente o descendente |
| `case-order` | `upper-first`, `lower-first` | Orden considerando mayúsculas/minúsculas |
| `lang` | Código de idioma | Reglas de ordenación específicas del idioma |

```xml
<xsl:for-each select="artistas/artista[nacimiento > 1500]">
  <xsl:sort select="nacimiento" data-type="number" order="ascending"/>
  <tr>
    <td><xsl:value-of select="nombreCompleto"/></td>
    <td><xsl:value-of select="nacimiento"/></td>
  </tr>
</xsl:for-each>
```

```xml
<xsl:apply-templates select="articulo">
  <xsl:sort select="precio" data-type="number" order="descending"/>
  <xsl:sort select="titulo" data-type="text" order="ascending"/>
</xsl:apply-templates>
```

### 2.11 xsl:output - Configuración de salida

Define el formato del documento resultante.

```xml
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
```

| Atributo | Valores comunes | Descripción |
|----------|-----------------|-------------|
| `method` | `xml`, `html`, `text`, `xhtml` | Tipo de documento de salida |
| `encoding` | `UTF-8`, `ISO-8859-1`, `UTF-16` | Codificación de caracteres |
| `indent` | `yes`, `no` | Si debe indentar el resultado |
| `omit-xml-declaration` | `yes`, `no` | Omite la declaración XML (`<?xml version="1.0"?>`) |
| `doctype-public` | Identificador público DTD | DOCTYPE público (ej: `-//W3C//DTD HTML 4.01//EN`) |
| `doctype-system` | URI del DTD | DOCTYPE de sistema (ej: `http://www.w3.org/TR/html4/strict.dtd`) |
| `media-type` | Tipo MIME | Tipo de medio del resultado (ej: `text/html`) |
| `cdata-section-elements` | Lista de elementos | Elementos cuyo contenido se envuelve en CDATA |
| `standalone` | `yes`, `no` | Declaración standalone en XML |

### 2.12 xsl:attribute - Atributos dinámicos

Permite crear atributos cuyo nombre o valor se calcula dinámicamente.

```xml
<!-- Usando llaves { } para valor dinámico -->
<a href="{fichaCompleta}">Saber más</a>

<!-- Usando xsl:attribute -->
<a>
  <xsl:attribute name="href">
    <xsl:value-of select="fichaCompleta"/>
  </xsl:attribute>
  Saber más
</a>

<!-- Atributo con nombre dinámico -->
<elemento>
  <xsl:attribute name="data-{@tipo}">
    <xsl:value-of select="valor"/>
  </xsl:attribute>
</elemento>
```

### 2.13 xsl:variable - Variables (inmutables)

Las variables en XSLT son **inmutables**: una vez asignadas, no pueden modificarse.

```xml
<!-- Variable con valor de una expresión XPath -->
<xsl:variable name="precio_minimo" select="10"/>

<!-- Variable con contenido template -->
<xsl:variable name="titulo_pagina">Bailes de Salón</xsl:variable>

<!-- Variable que contiene un conjunto de nodos -->
<xsl:variable name="doctores" select="//doctor[especialidad='cardiología']"/>
```

**Uso de variables**:

```xml
<!-- Dentro de atributos con llaves -->
<p class="{$estilo}">Texto</p>

<!-- Con xsl:value-of -->
<xsl:value-of select="$precio_minimo"/>

<!-- Dentro de expresiones XPath -->
<xsl:if test="precio > $precio_minimo">
  ...
</xsl:if>
```

### 2.14 xsl:param y xsl:with-param - Parámetros

Los parámetros permiten pasar valores a las plantillas, ya sea desde fuera del XSLT o desde otra plantilla.

```xml
<!-- Declaración de parámetro (en una plantilla o global) -->
<xsl:param name="idioma" select="'es'"/>

<!-- Parámetro con valor por defecto template -->
<xsl:param name="color_fondo">#FFFFFF</xsl:param>
```

**Paso de parámetros al invocar una plantilla:**

```xml
<xsl:call-template name="mostrarPrecio">
  <xsl:with-param name="moneda" select="'euro'"/>
  <xsl:with-param name="valor" select="precio"/>
</xsl:call-template>
```

**Recepción de parámetros en la plantilla:**

```xml
<xsl:template name="mostrarPrecio">
  <xsl:param name="moneda"/>
  <xsl:param name="valor"/>
  <span><xsl:value-of select="$valor"/> <xsl:value-of select="$moneda"/></span>
</xsl:template>
```

### 2.15 xsl:call-template - Llamada a plantillas por nombre

Permite invocar directamente una plantilla por su nombre, similar a una función.

```xml
<xsl:template name="piePagina">
  <hr/>
  <p>Documento generado con XSLT</p>
</xsl:template>

<!-- Invocación -->
<xsl:call-template name="piePagina"/>
```

```xml
<xsl:template name="filaTabla">
  <xsl:param name="clase"/>
  <xsl:param name="contenido"/>
  <tr class="{$clase}">
    <td><xsl:value-of select="$contenido"/></td>
  </tr>
</xsl:template>

<!-- Uso -->
<xsl:call-template name="filaTabla">
  <xsl:with-param name="clase" select="'destacado'"/>
  <xsl:with-param name="contenido" select="nombre"/>
</xsl:call-template>
```

### 2.16 El elemento xsl:text - Texto literal

Permite insertar texto literal (incluyendo espacios) en la salida. Es especialmente útil para caracteres especiales o espacios que de otro modo serían eliminados por el procesador.

```xml
<xsl:text> &#8364;</xsl:text>        <!-- entidad HTML para el símbolo euro -->
<xsl:text> </xsl:text>               <!-- espacio en blanco literal -->
<xsl:text>&#10;</xsl:text>           <!-- salto de línea literal -->
<xsl:text>Copyright &amp;copy; 2024</xsl:text>
```

### 2.17 xsl:number - Números de secuencia

Genera números de secuencia formateados para los nodos.

```xml
<xsl:number count="capitulo" level="multiple" format="1.1 "/>
<xsl:number value="position()" format="(1) "/>
<xsl:number count="seccion" format="I. " />      <!-- números romanos -->
<xsl:number count="item" format="a) " />          <!-- letras minúsculas -->
<xsl:number count="item" format="A. " />          <!-- letras mayúsculas -->
```

### 2.18 xsl:copy y xsl:copy-of - Copia de nodos

```xml
<!-- xsl:copy: copia el nodo actual SIN sus hijos ni atributos -->
<xsl:copy/>

<!-- xsl:copy-of: copia el nodo actual CON todo su subárbol -->
<xsl:copy-of select="."/>

<!-- Copiar un subárbol específico -->
<xsl:copy-of select="//hospital/paciente[habitacion < 200]"/>

<!-- Copiar atributos y nodos -->
<xsl:template match="@*|node()">
  <xsl:copy>
    <xsl:apply-templates select="@*|node()"/>
  </xsl:copy>
</xsl:template>
```

### 2.19 xsl:comment - Comentarios en la salida

Genera un comentario en el documento de salida.

```xml
<xsl:comment> Generado por XSLT el <xsl:value-of select="$fecha"/> </xsl:comment>
```

### 2.20 xsl:element - Creación dinámica de elementos

Crea elementos cuyo nombre se determina dinámicamente.

```xml
<xsl:element name="seccion_{@tipo}">
  <xsl:attribute name="class"><xsl:value-of select="@clase"/></xsl:attribute>
  <xsl:apply-templates/>
</xsl:element>
```

### 2.21 xsl:strip-space y xsl:preserve-space - Control de espacios

```xml
<!-- Elimina nodos de texto que solo contienen espacios en ciertos elementos -->
<xsl:strip-space elements="lista items contacto"/>

<!-- Conserva espacios en elementos específicos -->
<xsl:preserve-space elements="descripcion poema codigo"/>
```

### 2.22 xsl:message - Mensajes de depuración

Permite emitir mensajes durante el procesamiento (útiles para depuración).

```xml
<xsl:message>Procesando el nodo: <xsl:value-of select="name(.)"/></xsl:message>

<xsl:message terminate="yes">Error: no se encontró el elemento raíz</xsl:message>
```

### 2.23 xsl:import y xsl:include - Modularización

```xml
<!-- xsl:include: incorpora el contenido de otra hoja (misma prioridad) -->
<xsl:include href="plantillas-comunes.xsl"/>

<!-- xsl:import: incorpora con menor prioridad que la hoja actual -->
<xsl:import href="formateos-base.xsl"/>
```

### 2.24 xsl:key - Claves indexadas

Define una clave para búsqueda eficiente mediante la función `key()`.

```xml
<xsl:key name="por-nombre" match="persona" use="nombreCompleto"/>

<!-- Uso posterior -->
<xsl:value-of select="key('por-nombre', 'Juan Pérez')"/>
```

---

## 3. Patrones de plantillas comunes

### 3.1 Plantilla raíz (root template)

Inicia el procesamiento desde el nodo raíz del documento. Generalmente genera la estructura base del HTML o documento de salida.

```xml
<xsl:template match="/">
  <html>
    <head>
      <title>Mi página generada</title>
      <style>
        table { border: 2px solid black; margin: 0 auto; }
        td { border: 2px solid black; text-align: center; padding: 5px; }
        th { border: 2px solid black; background-color: gold; font-size: 1.2em; padding: 8px; }
      </style>
    </head>
    <body>
      <h1>Listado de elementos</h1>
      <xsl:apply-templates/>
    </body>
  </html>
</xsl:template>
```

### 3.2 Plantilla de identidad (identity template)

Copia el documento fuente sin modificaciones. Es la base para transformaciones que solo modifican partes específicas del árbol.

```xml
<xsl:template match="@*|node()">
  <xsl:copy>
    <xsl:apply-templates select="@*|node()"/>
  </xsl:copy>
</xsl:template>
```

### 3.3 Plantilla para cada elemento específica

```xml
<xsl:template match="nombre">
  <span class="nombre-destacado">
    <xsl:value-of select="."/>
  </span>
</xsl:template>
```

```xml
<xsl:template match="precio">
  <span class="precio">
    <xsl:value-of select="."/>
    <xsl:if test="@moneda">
      <xsl:text> </xsl:text>
      <xsl:value-of select="@moneda"/>
    </xsl:if>
  </span>
</xsl:template>
```

### 3.4 Plantilla con modo

```xml
<xsl:template match="libro" mode="resumen">
  <div class="resumen">
    <h3><xsl:value-of select="titulo"/></h3>
    <p><xsl:value-of select="autor"/></p>
  </div>
</xsl:template>

<xsl:template match="libro" mode="detalle">
  <div class="detalle">
    <h2><xsl:value-of select="titulo"/></h2>
    <p><strong>Autor:</strong> <xsl:value-of select="autor"/></p>
    <p><strong>Año:</strong> <xsl:value-of select="anio"/></p>
    <p><strong>Páginas:</strong> <xsl:value-of select="paginas"/></p>
    <p><strong>Resumen:</strong> <xsl:value-of select="resumen"/></p>
  </div>
</xsl:template>
```

---

## 4. Ejemplos completos

### 4.1 Bailes.xsl → Bailes.xml (HTML con filtro, ordenación y condicional)

Transforma un XML de bailes en una tabla HTML, filtrando por plazas disponibles y ordenando por número de plazas.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <html>
      <head>
        <title>Bailes de Salón</title>
        <style>
          table { border: 2px solid black; margin: 0 auto; }
          td { border: 2px solid black; text-align: center; padding: 4px; }
          th { border: 2px solid black; background-color: gold; font-size: 1.5em; padding: 6px; }
          h1 { text-align: center; }
        </style>
      </head>
      <body>
        <h1>Bailes de Salón</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Profesor</th>
              <th>Plazas</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="Bailes/baile[plazas >= 10]">
              <xsl:sort select="plazas" data-type="number" order="descending"/>
              <tr>
                <td><xsl:value-of select="nombre"/></td>
                <td>
                  <xsl:for-each select="profesor">
                    <xsl:value-of select="."/><br/>
                  </xsl:for-each>
                </td>
                <td><xsl:value-of select="plazas"/></td>
                <td>
                  <xsl:value-of select="precio"/>
                  <xsl:choose>
                    <xsl:when test="precio/@moneda = 'dolares'"> $</xsl:when>
                    <xsl:when test="precio/@moneda = 'euro'"> €</xsl:when>
                    <xsl:when test="precio/@moneda = 'libras'"> £</xsl:when>
                    <xsl:otherwise>€</xsl:otherwise>
                  </xsl:choose>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
```

### 4.2 artistas.xsl → artistas.xml (HTML con condicional y enlace)

Transforma un XML de artistas, filtrando por fecha de nacimiento y manejando valores ausentes.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <html>
      <head>
        <title>Artistas</title>
        <style>
          table { border-collapse: collapse; width: 90%; margin: 0 auto; }
          th, td { border: 1px solid #333; padding: 6px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Listado de Artistas</h1>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Nacimiento</th>
              <th>Fallecimiento</th>
              <th>País</th>
              <th>Web</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="artistas/artista[nacimiento > 1500]">
              <xsl:sort select="nacimiento" data-type="number" order="ascending"/>
              <tr>
                <td><xsl:value-of select="@cod"/></td>
                <td><xsl:value-of select="nombreCompleto"/></td>
                <td><xsl:value-of select="nacimiento"/></td>
                <td>
                  <xsl:choose>
                    <xsl:when test="fallecimiento and fallecimiento != ''">
                      <xsl:value-of select="fallecimiento"/>
                    </xsl:when>
                    <xsl:otherwise>Desconocido</xsl:otherwise>
                  </xsl:choose>
                </td>
                <td><xsl:value-of select="pais"/></td>
                <td><a href="{fichaCompleta}">Saber más</a></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
```

### 4.3 hospital.xsl (filtro por rango numérico con if anidados)

Ejemplo de filtrado de pacientes por rango de números de habitación usando `xsl:if` anidados.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <html>
      <head>
        <title>Hospital - Habitaciones 200-300</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #666; padding: 5px; }
          th { background-color: #2196F3; color: white; }
        </style>
      </head>
      <body>
        <h1>Pacientes en habitaciones 200-300</h1>
        <table>
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Nº Camas</th>
              <th>Paciente</th>
              <th>Fecha Nacimiento</th>
              <th>Doctores</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="hospital/paciente">
              <xsl:sort select="habitacion"/>
              <xsl:if test="habitacion < 301">
                <xsl:if test="habitacion > 199">
                  <tr>
                    <td><xsl:value-of select="habitacion"/></td>
                    <td><xsl:value-of select="habitacion/@numcamas"/></td>
                    <td><xsl:value-of select="nombrepaciente"/></td>
                    <td><xsl:value-of select="fecha_nacimiento"/></td>
                    <td>
                      <xsl:for-each select="doctor">
                        <xsl:value-of select="nombredoctor"/>
                        <xsl:text> - </xsl:text>
                        <xsl:value-of select="especialidad"/>
                        <br/>
                      </xsl:for-each>
                    </td>
                  </tr>
                </xsl:if>
              </xsl:if>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
```

### 4.4 Transformación de XML a XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="xml" encoding="UTF-8" indent="yes"/>

  <!-- Plantilla de identidad: copia todo -->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Modificar precios: añadir iva -->
  <xsl:template match="precio">
    <precio con_iva="{. * 1.21}">
      <xsl:value-of select="."/>
    </precio>
  </xsl:template>

  <!-- Eliminar elementos innecesarios -->
  <xsl:template match="notas_internas"/>
</xsl:stylesheet>
```

### 4.5 Transformación a texto plano (CSV)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="text" encoding="UTF-8"/>

  <xsl:template match="/">
    <xsl:text>Código,Nombre,Nacimiento,País&#10;</xsl:text>
    <xsl:for-each select="artistas/artista">
      <xsl:value-of select="@cod"/>
      <xsl:text>,</xsl:text>
      <xsl:value-of select="nombreCompleto"/>
      <xsl:text>,</xsl:text>
      <xsl:value-of select="nacimiento"/>
      <xsl:text>,</xsl:text>
      <xsl:value-of select="pais"/>
      <xsl:text>&#10;</xsl:text>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
```

---

## 5. Procesadores XSLT

### 5.1 Tabla de procesadores

| Procesador | Descripción | Plataforma |
|------------|-------------|------------|
| **MSXML** | Microsoft XML Core Services, integrado en Internet Explorer | Windows |
| **xsltproc** | Herramienta CLI, parte de la biblioteca libxslt | Linux / Unix / Mac |
| **Saxon** | Procesador XSLT/XQuery de referencia (últimas versiones) | Java / .NET |
| **Xalan** | Procesador Apache (soporta XSLT 1.0) | Java / C++ |
| **AltovaXML** | Motor XML de Altova (XMLSpy, Oxygen) | Windows |
| **Integrado en navegadores** | Chrome, Firefox, Safari, Edge soportan XSLT 1.0 | Multiplataforma |

### 5.2 Uso de xsltproc (línea de comandos)

```bash
xsltproc -o salida.html estilo.xsl datos.xml
```

```bash
xsltproc --novalid estilo.xsl datos.xml > resultado.html
```

```bash
xsltproc --param idioma "'en'" estilo.xsl datos.xml
```

### 5.3 Uso de Saxon (línea de comandos)

```bash
java -jar saxon9he.jar -s:datos.xml -xsl:estilo.xsl -o:salida.html
```

---

## 6. Asociación de XSLT con XML

Para que un documento XML se transforme automáticamente al abrirlo en un navegador (que soporte XSLT 1.0), se debe incluir una **instrucción de procesamiento** al inicio del archivo XML.

```xml
<?xml-stylesheet type="text/xsl" href="Bailes.xsl"?>
```

Ejemplo completo en un archivo XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="Bailes.xsl"?>
<Bailes>
  <baile id="b01">
    <nombre>Tango</nombre>
    <plazas>30</plazas>
    <precio moneda="euro">25.50</precio>
  </baile>
</Bailes>
```

El navegador aplicará automáticamente la transformación XSLT y mostrará el resultado HTML renderizado. Si no se encuentra el archivo XSLT, el navegador mostrará el XML en su vista de árbol por defecto.

---

## 7. Documentación y depuración

### 7.1 Comentarios en XSLT

Los comentarios en XSLT usan la misma sintaxis que XML:

```xml
<!-- Comentario: esta plantilla procesa los elementos libro -->
<xsl:template match="libro">
  ...
</xsl:template>
```

### 7.2 Técnicas de depuración

| Técnica | Descripción |
|---------|-------------|
| **xsl:message** | Emite mensajes durante el procesamiento para seguir el flujo |
| **Vista simultánea** | XMLSpy, Oxygen, VS Code con extensiones: editor muestra plantilla + datos fuente + salida |
| **Paso a paso** | Depuradores XML como XMLSpy, Oxygen XML Editor permiten ejecución paso a paso |
| **Salida intermedia** | Generar salidas parciales para inspeccionar resultados intermedios |
| **Verificación de XPath** | Probar expresiones XPath con herramientas online o editores XML |

### 7.3 document() - Carga de documentos externos

La función `document()` permite acceder a documentos XML externos desde una transformación XSLT.

```xml
<!-- Cargar y mostrar datos de otro archivo XML -->
<xsl:value-of select="document('otro.xml')//titulo"/>

<!-- Combinar datos de múltiples fuentes -->
<xsl:for-each select="document('catalogo.xml')//producto">
  <xsl:variable name="id" select="@id"/>
  <xsl:variable name="stock" select="document('inventario.xml')//item[@id=$id]/cantidad"/>
  ...
</xsl:for-each>
```

### 7.4 Herramientas recomendadas

| Herramienta | Tipo | Características |
|-------------|------|-----------------|
| **XMLSpy** (Altova) | Editor comercial | Vista dividida, depurador XSLT, generación de código |
| **Oxygen XML Editor** | Editor comercial | Soporte XSLT 1.0/2.0/3.0, depuración paso a paso |
| **BaseX** | Base de datos XML | Soporta XSLT y XQuery, gratuita |
| **VS Code + XML Extensions** | Editor gratuito | Soporte básico de XSLT, resaltado de sintaxis |
| **xmllint** (libxml2) | CLI gratuita | Validación y procesamiento básico desde terminal |
| **Online XSLT Testers** | Web | Pruebas rápidas: xslt.online, freeformatter.com |

---

## 8. Referencia rápida de XPath en contexto XSLT

| Patrón XPath | Descripción en contexto XSLT |
|--------------|------------------------------|
| `match="/"` | Coincide con el nodo raíz del documento |
| `match="baile"` | Coincide con cualquier elemento llamado `<baile>` |
| `match="precio/@moneda"` | Coincide con el atributo `moneda` del elemento `<precio>` |
| `match="*"` | Coincide con cualquier elemento |
| `match="node()"` | Coincide con cualquier nodo (incluyendo texto) |
| `match="@*"` | Coincide con cualquier atributo |
| `match="cd/country"` | Coincide con `country` hijo de `cd` |
| `select="Bailes/baile"` | Selecciona todos los `<baile>` hijos de `<Bailes>` |
| `select=".//nombre"` | Selecciona todos los `<nombre>` descendientes del nodo actual |
| `select="//nombre \| //apellido"` | Unión de nodos: nombres y apellidos |
| `test="@cod"` | Verdadero si el nodo actual tiene atributo `cod` |
| `test="position()=last()"` | Verdadero si es el último nodo del contexto |
| `test="count(doctor)>1"` | Verdadero si hay más de un doctor |
| `test="not(fallecimiento)"` | Verdadero si NO existe el elemento `fallecimiento` |
| `test="precio > 50"` | Verdadero si precio es mayor que 50 |
| `test="starts-with(@id, 'p')"` | Verdadero si el atributo id empieza por "p" |
| `test="contains(nombre, 'García')"` | Verdadero si nombre contiene "García" |
| `test="precio[@moneda='euro']"` | Verdadero si precio tiene moneda euro |
| `select="precio[1]"` | Primer elemento precio (en el contexto) |
| `select="precio[last()]"` | Último elemento precio |
| `select="precio[position() > 1]"` | Todos los precios excepto el primero |

---

## 9. Errores comunes y buenas prácticas

### 9.1 Errores frecuentes

| Error | Causa | Solución |
|-------|-------|----------|
| **No se muestra nada en el navegador** | El XSLT no se encuentra o hay un error de sintaxis | Verificar ruta del `href` en `<?xml-stylesheet?>` |
| **Output inesperado (solo texto)** | `xsl:output method` incorrecto | Usar `method="html"` para HTML, `method="xml"` para XML |
| **xsl:value-of no muestra nada** | La expresión XPath no selecciona nodos | Verificar con una herramienta XPath la expresión |
| **xsl:if no funciona como esperaba** | La condición booleana es falsa o el test es incorrecto | Usar `not()` para negación, comprobar tipos de datos |
| **Ordenación incorrecta** | `data-type="number"` sin especificar | Por defecto ordena como texto (1, 10, 100, 2, 20...) |
| **Conflictos entre plantillas** | Dos plantillas coinciden con el mismo nodo | Usar `priority` o refinar el `match` |
| **Entidad HTML no se renderiza** | Usar `&euro;` directamente en XSLT | Usar `xsl:text` con `&#8364;` en su lugar |
| **xsl:variable no cambia de valor** | Las variables en XSLT son inmutables | No se puede reasignar; usar `xsl:param` si se necesita valor dinámico |

### 9.2 Buenas prácticas

1. **Usar `xsl:output` siempre** para definir explícitamente el formato de salida.
2. **Indentar el código XSLT** para mejorar la legibilidad (el propio XSLT, no solo el output).
3. **Preferir `apply-templates` sobre `for-each`** para transformaciones complejas: es más modular y extensible.
4. **Usar `xsl:strip-space`** para eliminar nodos de texto no deseados que pueden interferir con patrones.
5. **Nombrar las plantillas con claridad** cuando se usen con `call-template`.
6. **Probar las expresiones XPath** por separado antes de integrarlas en el XSLT.
7. **Usar modos (`mode`)** para procesar el mismo nodo de diferentes formas.
8. **Documentar las plantillas** con comentarios XML para facilitar el mantenimiento.
9. **Declarar todos los namespaces** necesarios en el elemento `xsl:stylesheet`.
10. **Validar el XML de entrada** antes de aplicar la transformación.

---

## 10. Resumen de sintaxis XSLT

### 10.1 Estructura general

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <!-- Configuración de salida -->
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <!-- Variables globales -->
  <xsl:variable name="titulo" select="'Mi documento'"/>

  <!-- Parámetros (pueden recibir valor externo) -->
  <xsl:param name="idioma" select="'es'"/>

  <!-- Clave para búsqueda -->
  <xsl:key name="buscar" match="elemento" use="@id"/>

  <!-- Plantilla raíz -->
  <xsl:template match="/">
    <html>
      <head><title><xsl:value-of select="$titulo"/></title></head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

  <!-- Otras plantillas -->
  <xsl:template match="item">
    <div class="item">
      <xsl:apply-templates/>
    </div>
  </xsl:template>

</xsl:stylesheet>
```

### 10.2 Decisiones de diseño según el método de salida

| Salida | `xsl:output method` | Consideraciones |
|--------|---------------------|-----------------|
| **HTML** | `html` | No genera declaración XML, las etiquetas vacías se renderizan correctamente |
| **XHTML** | `xml` o `xhtml` | Genera XML bien formado, requiere `omit-xml-declaration="yes"` |
| **XML** | `xml` | Preserva namespaces, genera declaración XML |
| **Texto plano** | `text` | Solo texto, sin etiquetas. Útil para CSV, JSON, etc. |

---

*Fin de la referencia rápida LMSGI05 — XPath y XSLT*
