# Referencia Rápida: LMSGI06 - Almacenamiento de información (XQuery y XML Storage)

---

## INDICE

1. [XML COMO BASE DE DATOS](#1-xml-como-base-de-datos)
2. [JSON](#2-json)
3. [XQUERY](#3-xquery)
4. [EJEMPLOS COMPLETOS DE XQUERY](#4-ejemplos-completos-de-xquery)
5. [DIFERENCIAS XPATH vs XQUERY](#5-diferencias-xpath-vs-xquery)
6. [MOTORES XQUERY](#6-motores-xquery)
7. [INDICACIONES BaseX](#7-indicaciones-basex)

---

## 1. XML COMO BASE DE DATOS

### 1.1 Almacenamiento de XML

XML puede utilizarse como sistema de almacenamiento de información. Existen dos categorías principales según el tipo de contenido:

| Categoría | Descripción | Ejemplo |
|-----------|-------------|---------|
| **Data-centric** | Datos estructurados y regulares, típicamente migrados desde BD relacionales | Facturas, clientes, productos, inventario |
| **Document-centric** | Documentos con estructura más libre o irregular, donde el contenido de texto es el elemento principal | Artículos, libros, manuales, documentos legales |

#### Colecciones de documentos XML:
- En las Bases de Datos XML Nativas (NXD), los documentos se organizan en **colecciones**
- Cada documento XML puede considerarse un "registro"
- A diferencia de las BD relacionales (tablas planas), XML utiliza una **estructura jerárquica en forma de árbol**

#### Comparación: Estructura Jerárquica vs Relacional

```
XML (Jerárquico - Árbol):           Relacional (Tablas planas):

      biblioteca                         libros      autores     editoriales
          |                               |             |             |
        libros                          fila1        fila1         fila1
        /    \                          fila2        fila2         fila2
     libro   libro                      fila3        fila3         fila3
     /   \
  titulo  autor
```

### 1.2 Mapeo de BD relacional a XML

Cuando migramos datos desde una base de datos relacional a XML, debemos considerar:

#### Paso 1: Crear el esquema XML
```xml
<!-- Estructura que representa las tablas -->
<clientes>
  <cliente id="C001">
    <nombre>Empresa XYZ</nombre>
    <direccion>Calle Principal, 123</direccion>
  </cliente>
</clientes>
```

#### Paso 2: Claves primarias como atributos ID

| BD Relacional | XML Equivalente |
|---------------|-----------------|
| `PRIMARY KEY` | Atributo de tipo `ID` |
| Debe ser único | Debe ser único y válido como NCName (no empieza por número) |

```xml
<pedido numPedido="PED123">    <!-- atributo tipo ID = clave primaria -->
  <fecha>2024-01-15</fecha>
</pedido>
```

#### Paso 3: Relaciones mediante IDREF

| BD Relacional | XML Equivalente |
|---------------|-----------------|
| `FOREIGN KEY` | Atributo de tipo `IDREF` o `IDREFS` |

```xml
<clientes>
  <cliente id="C001">
    <nombre>Juan García</nombre>
  </cliente>
</clientes>

<pedidos>
  <pedido id="PED001" clienteRef="C001">   <!-- IDREF = FOREIGN KEY -->
    <articulo>Libro XML</articulo>
  </pedido>
</pedidos>
```

### 1.3 Bases de Datos XML Nativas (NXD - Native XML Databases)

Las **Bases de Datos XML Nativas** están diseñadas específicamente para almacenar y consultar documentos XML, sin necesidad de mapear a un modelo relacional.

#### Características principales:

| Característica | Descripción |
|----------------|-------------|
| **Colecciones** | Agrupación de documentos XML, similar a "tablas" |
| **Validación** | Soporte para DTD y XML Schema |
| **Consultas** | Lenguajes estándar: XPath y XQuery |
| **Indexación** | Índices optimizados para consultas eficientes sobre estructuras XML |
| **IDs únicos** | Identificadores únicos para nodos y documentos |
| **Transacciones** | Soporte ACID en muchas implementaciones |
| **Actualizaciones** | XQuery Update Facility para modificar documentos |

#### Tipos de Almacenamiento en NXD:

```
┌─────────────────────────────────────────────────────────────────┐
│              ALMACENAMIENTO EN BD XML NATIVAS                   │
├─────────────────────────────┬───────────────────────────────────┤
│   Basado en Texto (BLOB)   │      Basado en Modelo             │
├─────────────────────────────┼───────────────────────────────────┤
│ - Almacena el XML como      │ - Almacena la estructura          │
│   texto plano o binario     │   del árbol (modelo de datos)     │
│                             │                                   │
│ - Similar a un BLOB en BD   │ - Puede implementarse como:       │
│   relacional                │     • Tablas relacionales         │
│                             │     • Bases de Datos Orientadas   │
│ - Ventaja: Recuperación     │       a Objetos (OODB)            │
│   exacta del documento      │     • Almacén personalizado        │
│                             │                                   │
│ - Inconveniente: Consultas  │ - Ventaja: Consultas muy rápidas  │
│   lentas en documentos      │   sobre elementos específicos      │
│   grandes sin indexación    │                                   │
└─────────────────────────────┴───────────────────────────────────┘
```

#### Ejemplos de Bases de Datos XML Nativas:

| Nombre | Descripción | Licencia |
|--------|-------------|----------|
| **eXist-db** | Una de las NXD más completas, con servidor web integrado, REST API | Open Source (LGPL) |
| **BaseX** | Ligera, rápida, interfaz GUI excelente | Open Source (BSD) |
| **Sedna** | NXD de alto rendimiento | Open Source |
| **Tamino** | NXD de Software AG | Comercial |
| **MarkLogic** | Base de datos NoSQL orientada a documentos XML | Comercial |

---

## 2. JSON

### 2.1 Sintaxis básica

**JSON (JavaScript Object Notation)** es un formato ligero de intercambio de datos, fácil de leer y escribir tanto para humanos como para máquinas.

#### Reglas fundamentales:

| Elemento | Sintaxis | Ejemplo |
|----------|----------|---------|
| **Pares nombre/valor** | `"nombre": valor` | `"titulo": "Learning XML"` |
| **Objetos** | Encerrados en `{}` | `{"nombre": "Juan", "edad": 25}` |
| **Arrays** | Encerrados en `[]` | `["manzana", "naranja", "plátano"]` |
| **Comas** | Separan elementos | `"a": 1, "b": 2` |

#### Tipos de datos en JSON:

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **string** | Texto entre comillas dobles | `"Hola Mundo"` |
| **number** | Entero o decimal | `25`, `3.14`, `-10` |
| **boolean** | Valor booleano | `true`, `false` |
| **array** | Lista de valores | `[1, 2, 3]` |
| **object** | Objeto JSON anidado | `{"nombre": "Ana"}` |
| **null** | Valor nulo | `null` |

#### Ejemplo completo de documento JSON:

```json
{
  "biblioteca": {
    "libros": [
      {
        "titulo": "Learning XML",
        "autor": {
          "apellido": "Ray",
          "nombre": "Erik T."
        },
        "editorial": "O'Reilly",
        "paginas": 16,
        "publicacion": 2003,
        "versionElectronica": true
      },
      {
        "titulo": "XML Imprescindible",
        "autor": [
          {"apellido": "Harold", "nombre": "Elliot Rusty"},
          {"apellido": "Means", "nombre": "W. Scott"}
        ],
        "editorial": "O'Reilly",
        "paginas": 832
      }
    ]
  }
}
```

### 2.2 NoSQL y Bases de Datos Documentales

#### Comparación: SQL vs NoSQL

| Característica | SQL (Relacional) | NoSQL (Documental) |
|----------------|------------------|---------------------|
| **Modelo** | Tablas, filas, columnas | Documentos JSON/BSON |
| **Esquema** | Estricto, predefinido | Flexible, dinámico |
| **Lenguaje** | SQL estándar | Específico de cada BD |
| **Escalabilidad** | Vertical (más potencia) | Horizontal (más servidores) |
| **Transacciones** | ACID completo | Depende del producto |

#### Bases de datos documentales que almacenan JSON:

| Base de Datos | Descripción |
|---------------|-------------|
| **MongoDB** | La más popular. Almacena BSON (JSON binario). Muy escalable. |
| **CouchDB** | De Apache. Usa HTTP/REST para consultas. MapReduce. |
| **RavenDB** | .NET, ACID, consultas con LINQ |
| **OrientDB** | Híbrida: Documental + Grafo |
| **Elasticsearch** | Orientada a búsqueda/índice, almacena JSON |

#### Ventajas del esquema flexible JSON:

```
Cada libro puede tener campos diferentes sin alterar una estructura fija:

Libro 1:                  Libro 2:                    Libro 3:
{                         {                           {
  "titulo": "...",          "titulo": "...",           "titulo": "...",
  "autor": "...",           "autores": ["a","b"],      "traductor": "...",
  "paginas": 300            "ilustrador": "..."        "edicion": "bolsillo"
}                         }                           }
```

---

## 3. XQUERY

### 3.1 Introducción

**XQuery** es a XML lo que SQL es a las bases de datos relacionales.

```
        SQL                          XQuery
         ↓                            ↓
   SELECT campo              for $x in doc("a.xml")/raiz/elemento
   FROM tabla                where $x/@atr = "valor"
   WHERE condicion           order by $x/campo
   ORDER BY campo            return $x/info
```

#### Características principales de XQuery:

| Característica | Descripción |
|----------------|-------------|
| **Lenguaje funcional** | Toda expresión devuelve un valor |
| **Declarativo** | Especificas QUÉ quieres, no CÓMO obtenerlo |
| **Basado en XPath 2.0** | Toda expresión XPath válida es XQuery válida |
| **Orientado a secuencias** | Toda expresión opera sobre secuencias de items |
| **Tipado** | Soporte para tipos de datos XML Schema (xs:string, xs:integer, etc.) |

### 3.2 Estructura de una consulta XQuery básica

```xquery
(: Esto es un comentario :)
for $x in doc("libros.xml")/biblioteca/libros/libro
return $x/titulo
```

Componentes:
- `doc("libros.xml")` → Carga el documento XML
- `/biblioteca/libros/libro` → Expresión XPath para navegar
- `for $x in ...` → Itera por cada elemento seleccionado
- `return $x/titulo` → Devuelve el elemento `<titulo>` de cada libro

### 3.3 Comentarios

Los comentarios en XQuery utilizan la sintaxis `(: ... :)`:

```xquery
(: Comentario de una sola línea :)

(: Comentario
   que ocupa
   varias líneas :)

(: 
  Pueden anidarse (: comentario dentro de comentario :) sin problemas
:)

for $x in doc("libros.xml")/*  (: Esto sí es un comentario :)
return $x
```

**Importante**: No confundir con:
- Comentarios XML: `<!-- comentario -->`
- Comentarios XPath 1.0: No existen oficialmente

### 3.4 Expresiones delimitadas por llaves `{ }`

Cuando estás construyendo nuevos elementos XML en el `return`, necesitas usar llaves `{ }` para que XQuery evalúe el contenido como una expresión y no como texto literal.

❌ **Incorrecto** (sin llaves - trata todo como texto):
```xquery
<li>$x/titulo</li>     → Devuelve literalmente: <li>$x/titulo</li>
```

✅ **Correcto** (con llaves - evalúa la expresión):
```xquery
<li>{$x/titulo}</li>   → Devuelve: <li><titulo>Learning XML</titulo></li>
```

#### Ejemplo completo - Generando HTML:

```xquery
<ul>
{
  for $x in doc("artistas.xml")/artistas/artista
  where $x/pais = "España"
  order by $x/nacimiento
  return <li>{data($x/nombreCompleto)} - {data($x/nacimiento)}</li>
}
</ul>
```

**Resultado:**
```xml
<ul>
  <li>Diego Velázquez - 1599</li>
  <li>Francisco de Goya - 1746</li>
</ul>
```

#### Texto fuera de llaves vs dentro de llaves:

```xquery
<div>
  El total es: {count(doc("libros.xml")//libro)} libros
</div>
```

Esto genera:
```xml
<div>El total es: 6 libros</div>
```

### 3.5 Sentencia if-then-else

XQuery dispone de estructura condicional. **Obligatorio** el `else`.

```xquery
if (condición) then
  expresión_si_verdadero
else
  expresión_si_falso
```

#### Ejemplos:

**Ejemplo 1 - Asignación directa:**
```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
return
  if ($x/paginas < 100) then
    <libro_corto>{$x/titulo}</libro_corto>
  else
    <libro_largo>{$x/titulo}</libro_largo>
```

**Ejemplo 2 - Anidados:**
```xquery
for $x in doc("libros.xml")//libro
return
  if (number($x/paginas) < 50) then
    <folleto>{data($x/titulo)}</folleto>
  else if (number($x/paginas) < 300) then
    <libro_normal>{data($x/titulo)}</libro_normal>
  else
    <tomo>{data($x/titulo)}</tomo>
```

**Ejemplo 3 - Dentro de una expresión:**
```xquery
for $x in doc("artistas.xml")//artista
return
  concat(
    data($x/nombreCompleto),
    " - ",
    if ($x/fallecimiento) then "Fallecido" else "Desconocido o vivo"
  )
```

### 3.6 Expresiones FLWOR

**FLWOR** (pronunciado "flower") es la construcción más importante de XQuery. Es el equivalente a `SELECT-FROM-WHERE` en SQL.

Las letras significan:

| Cláusula | Letra | Descripción | Orden de ejecución |
|----------|-------|-------------|-------------------|
| `for` | F | Itera sobre una secuencia, asignando cada item a una variable | 1 |
| `let` | L | Asigna una variable a una expresión completa (sin iterar) | 2 |
| `where` | W | Filtra los items que cumplen una condición | 3 |
| `order by` | O | Ordena los resultados | 4 |
| `return` | R | Construye y devuelve el resultado | 5 |

```
        ┌─────────────────────────────────────────┐
        │           EJECUCIÓN FLWOR               │
        ├─────────────────────────────────────────┤
        │  FOR ──► LET ──► WHERE ──► ORDER BY ──► RETURN │
        │  (itera) (asigna) (filtra)  (ordena)   (devuelve)│
        └─────────────────────────────────────────┘
```

#### 3.6.1 FOR - Iteración

El `for` recorre cada elemento de la secuencia y ejecuta el `return` para cada uno.

```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
return <libro>{$x/titulo, $x/editorial}</libro>
```

**Múltiples variables en FOR:**

```xquery
for $x in (1, 2, 3),
    $y in ("a", "b")
return concat("(", $x, ",", $y, ")")
```

Resultado: `"(1,a)", "(1,b)", "(2,a)", "(2,b)", "(3,a)", "(3,b)"`

#### 3.6.2 LET - Asignación

El `let` **NO itera**. Asigna la secuencia COMPLETA a la variable.

| `for` (itera, 6 ejecuciones) | `let` (asigna todo, 1 ejecución) |
|------------------------------|-----------------------------------|
| ```xquery                    | ```xquery                         |
| for $x in //libro            | let $x := //libro                 |
| return $x/titulo             | return count($x)                  |
| ```                          | ```                                |
| Devuelve 6 títulos           | Devuelve: 6                       |

**Ejemplo práctico LET + FOR combinados:**

```xquery
for $x in doc("libros.xml")/biblioteca/libros
let $libros_cortos := $x/libro[number(paginas) < 100]
return
  <resumen>
    <total_libros>{count($x/libro)}</total_libros>
    <libros_cortos>{count($libros_cortos)}</libros_cortos>
  </resumen>
```

#### 3.6.3 WHERE - Filtrado

Filtra elementos según una condición:

```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
where $x/editorial = "O'Reilly"
return $x/titulo
```

**Condiciones múltiples:**

```xquery
for $x in doc("libros.xml")//libro
where $x/editorial = "O'Reilly"
  and number($x/paginas) > 400
return $x/titulo
```

#### 3.6.4 ORDER BY - Ordenación

Ordena los resultados. Por defecto es **ascendente**.

```xquery
for $x in doc("artistas.xml")/artistas/artista
where $x/pais = "España"
order by $x/nacimiento
return $x/nombreCompleto
```

**Orden descendente:**
```xquery
order by $x/nacimiento descending
```

**Orden numérico vs texto:**
```xquery
order by number($x/paginas)     (: Trata como número :)
order by $x/titulo               (: Trata como texto :)
```

#### 3.6.5 RETURN - Construcción del resultado

El `return` se ejecuta para cada iteración (o una sola vez con `let`).

**Devolver elementos:**
```xquery
for $x in //libro
return <libro>{$x/titulo}</libro>
```

**Devolver valores atómicos:**
```xquery
for $x in //libro
return data($x/titulo)
```

**Devolver HTML:**
```xquery
<table border="1">
{
  for $x in //libro
  return
    <tr>
      <td>{data($x/titulo)}</td>
      <td>{data($x/editorial)}</td>
    </tr>
}
</table>
```

#### 3.6.6 Ejemplo FLWOR completo

```xquery
<consulta>
  <titulo>Libros de O'Reilly con más de 100 páginas</titulo>
  <fecha>{current-date()}</fecha>
  <libros>
  {
    for $x in doc("libros.xml")/biblioteca/libros/libro
    let $num_paginas := number($x/paginas)
    where $x/editorial = "O'Reilly" and $num_paginas > 100
    order by $x/titulo
    return
      <item paginas="{$num_paginas}">
        {data($x/titulo)}
      </item>
  }
  </libros>
</consulta>
```

### 3.7 Funciones de agregado

| Función | Descripción | Ejemplo | Resultado |
|---------|-------------|---------|-----------|
| `count()` | Número de items en la secuencia | `count(//libro)` | `6` |
| `sum()` | Suma de valores numéricos | `sum(//libro/paginas/number(.))` | Suma páginas |
| `avg()` | Media aritmética | `avg(//libro/paginas/number(.))` | Media páginas |
| `min()` | Valor mínimo | `min((1,3,5,2))` | `1` |
| `max()` | Valor máximo | `max((1,3,5,2))` | `5` |

**Ejemplos prácticos:**

```xquery
(: Número total de libros :)
count(doc("libros.xml")//libro)

(: Suma de todas las páginas :)
sum(doc("libros.xml")//libro/paginas/number(.))

(: Número de artistas españoles :)
count(doc("artistas.xml")//artista[pais="España"])

(: Libro con más páginas :)
max(doc("libros.xml")//libro/paginas/number(.))

(: Media de páginas por libro :)
avg(doc("libros.xml")//libro/paginas/number(.))
```

### 3.8 Funciones de cadena

| Función | Descripción | Ejemplo | Resultado |
|---------|-------------|---------|-----------|
| `concat()` | Concatena strings | `concat("Hola ", "Mundo")` | `"Hola Mundo"` |
| `string-length()` | Longitud de cadena | `string-length("XML")` | `3` |
| `starts-with()` | ¿Empieza por? | `starts-with("XML", "X")` | `true` |
| `ends-with()` | ¿Termina por? | `ends-with("XML", "ML")` | `true` |
| `contains()` | ¿Contiene? | `contains("XML Query", "Que")` | `true` |
| `upper-case()` | Mayúsculas | `upper-case("xml")` | `"XML"` |
| `lower-case()` | Minúsculas | `lower-case("XML")` | `"xml"` |
| `substring()` | Extraer parte | `substring("ABCDE", 2, 3)` | `"BCD"` |
| `string-join()` | Une secuencia con separador | `string-join(("a","b","c"), "-")` | `"a-b-c"` |
| `normalize-space()` | Elimina espacios sobrantes | `normalize-space("  hola   mundo  ")` | `"hola mundo"` |
| `replace()` | Reemplaza con regex | `replace("hola123mundo", "\d", "")` | `"holamundo"` |

**Ejemplos prácticos:**

```xquery
(: Convertir título a mayúsculas :)
for $x in //libro
return upper-case(data($x/titulo))

(: Concatenar nombre completo de artista con su país :)
for $x in //artista
return concat(data($x/nombreCompleto), " (", data($x/pais), ")")

(: Libros cuyo título contiene "XML" :)
for $x in //libro
where contains($x/titulo, "XML")
return $x/titulo

(: Ordenar por longitud del título :)
for $x in //libro
order by string-length($x/titulo)
return $x/titulo
```

### 3.9 Funciones de nodos y secuencias

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `data()` | Extrae el valor atómico (sin etiquetas) | `data($x/titulo)` → `"Learning XML"` |
| `distinct-values()` | Elimina duplicados | `distinct-values(//libro/editorial)` |
| `empty()` | ¿Secuencia vacía? | `empty($x/versionElectronica)` |
| `exists()` | ¿Secuencia no vacía? | `exists($x/versionElectronica)` |
| `position()` | Posición actual en for | `for $x in //libro return position()` |
| `last()` | Última posición | `for $x in //libro where position() = last()` |
| `index-of()` | Posición de un valor | `index-of(("a","b","c"), "b")` → `2` |
| `insert-before()` | Inserta en posición | `insert-before((1,2,3), 2, 99)` → `(1,99,2,3)` |
| `remove()` | Elimina posición | `remove((1,2,3), 2)` → `(1,3)` |
| `reverse()` | Invierte secuencia | `reverse((1,2,3))` → `(3,2,1)` |

#### `data()` vs `/text()` vs el elemento directamente:

| Expresión | Resultado | Tipo |
|-----------|-----------|------|
| `$x/titulo` | `<titulo>Learning XML</titulo>` | Elemento (con etiquetas) |
| `$x/titulo/text()` | `Learning XML` (nodo texto) | Nodo de texto |
| `data($x/titulo)` | `"Learning XML"` | Valor atómico (string) |

```xquery
for $x in //libro
return (
  $x/titulo,                (: <titulo>Learning XML</titulo> :)
  $x/titulo/text(),         (: Learning XML :)
  data($x/titulo)           (: "Learning XML" :)
)
```

**Ejemplos prácticos:**

```xquery
(: Distintas editoriales sin repetición :)
distinct-values(//libro/editorial)

(: Artistas que tienen fecha de fallecimiento :)
for $x in //artista
where exists($x/fallecimiento)
return $x/nombreCompleto

(: Artistas SIN fecha de fallecimiento :)
for $x in //artista
where empty($x/fallecimiento)
return $x/nombreCompleto

(: Igual que los anteriores, más compacto :)
for $x in //artista[not(fallecimiento)]
return $x/nombreCompleto

(: Primer libro :)
(//libro)[1]

(: Últimos dos libros :)
//libro[position() > last() - 2]
```

### 3.10 Operadores de comparación

#### 3.10.1 Comparación de valores (Value Comparisons)

Comparan **un solo valor atómico** con otro. Si alguna parte es una secuencia de múltiples elementos, dan error.

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `eq` | Igual | `$x/paginas eq 100` |
| `ne` | Distinto | `$x/pais ne "España"` |
| `lt` | Menor que | `$x/nacimiento lt 1600` |
| `le` | Menor o igual | `number($x) le 300` |
| `gt` | Mayor que | `$x/paginas gt 500` |
| `ge` | Mayor o igual | `$x/nacimiento ge 1500` |

```xquery
for $x in //libro
where data($x/editorial) eq "O'Reilly"
return $x/titulo
```

#### 3.10.2 Comparación general (General Comparisons)

Son **existenciales**. Comparan secuencias. Si **algún elemento** de la izquierda cumple con **algún elemento** de la derecha, devuelve `true`.

| Operador | Significado |
|----------|-------------|
| `=` | Igual (existencial) |
| `!=` | Distinto (existencial) |
| `<` | Menor que |
| `<=` | Menor o igual |
| `>` | Mayor que |
| `>=` | Mayor o igual |

**Ejemplo de por qué `=` puede ser peligroso:**

```xml
<libro>
  <tamaño>A4</tamaño>
  <tamaño>A3</tamaño>
</libro>
```

```xquery
(: Este impresora tiene tamaño A4?  :)
$x/tamaño = "A4"     (: true, porque uno de ellos es A4 :)

(: IMPORTANTE: "!=" no es la negación de "=" ! :)
$x/tamaño != "A3"    (: true también! porque uno NO es A3 :)

(: La verdadera negación de = es not(): :)
not($x/tamaño = "A3")   (: false, ya que SÍ hay un A3 :)
```

**Resumen `=` vs `not()`:**

| Expresión | Significado | Resultado con [A4, A3] |
|-----------|-------------|------------------------|
| `$x = "A3"` | ¿Alguno es A3? | `true` |
| `$x != "A3"` | ¿Alguno NO es A3? | `true` (A4 no es A3) |
| `not($x = "A3")` | ¿Ninguno es A3? | `false` |

#### 3.10.3 Comparación de nodos (Node Comparisons)

Comparan la identidad y posición de los nodos en el documento.

| Operador | Significado |
|----------|-------------|
| `is` | ¿Es el MISMO nodo? |
| `is not` | ¿No es el mismo nodo? |
| `<<` | ¿Aparece antes en el documento? |
| `>>` | ¿Aparece después en el documento? |

```xquery
(: ¿Son el mismo nodo? :)
(//libro)[1] is (//libro)[1]    (: true :)
(//libro)[1] is (//libro)[2]    (: false :)

(: Orden en documento :)
(//libro)[1] << (//libro)[2]     (: true - el primero está antes :)
(//libro)[2] >> (//libro)[1]     (: true :)
```

### 3.11 Operadores aritméticos

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `+` | Suma | `2 + 3` = `5` |
| `-` | Resta | `5 - 2` = `3` |
| `*` | Multiplicación | `2 * 3` = `6` |
| `div` | División | `6 div 4` = `1.5` |
| `mod` | Módulo (resto) | `7 mod 3` = `1` |
| `idiv` | División entera | `6 idiv 4` = `1` |

**⚠️ Importante**: Usar `div`, no `/`, porque `/` es parte de las expresiones XPath.

```xquery
(: Correcto :)
$x/paginas div 2

(: Incorrecto - XPath intenta navegar :)
$x/paginas / 2
```

**Ejemplos:**

```xquery
for $x in //libro
let $pags := number($x/paginas)
return
  <libro>
    <titulo>{data($x/titulo)}</titulo>
    <mitad>{$pags div 2}</mitad>
    <es_par>{$pags mod 2 eq 0}</es_par>
  </libro>
```

### 3.12 Operadores de secuencia

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `,` | Concatenación | `(1, 2), (3, 4)` = `(1, 2, 3, 4)` |
| `\|` o `union` | Unión de secuencias (sin duplicados) | `(1, 2) \| (2, 3)` = `(1, 2, 3)` |
| `intersect` | Intersección | `(1, 2, 3) intersect (2, 3, 4)` = `(2, 3)` |
| `except` | Diferencia | `(1, 2, 3) except (2)` = `(1, 3)` |
| `to` | Rango de enteros | `1 to 5` = `(1, 2, 3, 4, 5)` |

**Ejemplos:**

```xquery
(: Todos los títulos de O'Reilly o Wiley :)
(//libro[editorial="O'Reilly"]/titulo) union (//libro[editorial="Wiley"]/titulo)

(: Rango - útil en for :)
for $i in 1 to 10
return <numero>{$i}</numero>

(: Combinar except :)
for $x in //libro
where $x/editorial = "O'Reilly"
return $x except $x/*[local-name()="paginas"]    (: Todo excepto paginas :)
```

### 3.13 Cuantificadores

Permiten expresar "existe algún" o "todos cumplen".

| Cuantificador | Sintaxis | Descripción |
|---------------|----------|-------------|
| **some** | `some $var in seq satisfies cond` | ¿Algún elemento cumple? |
| **every** | `every $var in seq satisfies cond` | ¿Todos los elementos cumplen? |

**Ejemplos:**

```xquery
(: ¿Hay ALGÚN libro de más de 500 páginas? :)
some $x in doc("libros.xml")//libro
satisfies number($x/paginas) > 500

(: ¿TODOS los libros tienen más de 10 páginas? :)
every $x in doc("libros.xml")//libro
satisfies number($x/paginas) > 10

(: Dentro de un where :)
for $x in //impresora
where some $t in $x/tamaño satisfies $t = "A3"
return $x/modelo
```

### 3.14 Funciones definidas por el usuario

Puedes declarar tus propias funciones con `declare function`.

Sintaxis:
```xquery
declare function local:nombreFuncion($param1 as tipo, $param2 as tipo) as tipoRetorno {
  (: cuerpo de la función - una expresión :)
};
```

**Ejemplo:**

```xquery
(: Declaración :)
declare function local:esCorto($paginas as xs:integer?) as xs:boolean {
  if ($paginas < 100) then true() else false()
};

declare function local:formatearTitulo($titulo as element(titulo)?) as xs:string {
  concat("Libro: ", upper-case(normalize-space(data($titulo))))
};

(: Uso :)
for $x in doc("libros.xml")//libro
where local:esCorto(number($x/paginas))
return local:formatearTitulo($x/titulo)
```

**Funciones recursivas:**

```xquery
(: Factorial :)
declare function local:factorial($n as xs:integer) as xs:integer {
  if ($n <= 1) then 1
  else $n * local:factorial($n - 1)
};

local:factorial(5)    (: Devuelve 120 :)
```

### 3.15 La función `doc()`

Carga un documento XML desde el sistema de archivos.

```xquery
doc("ruta/al/archivo.xml")
```

**Comportamiento:**
- Devuelve el **nodo documento** (no el elemento raíz)
- La ruta puede ser relativa al directorio de trabajo o absoluta
- Muchos motores tienen un concepto de "base de datos" o colecciones

**Ejemplos:**

```xquery
(: Relativo - mismo directorio que la consulta :)
doc("libros.xml")

(: Relativo - subdirectorio :)
doc("datos/artistas.xml")

(: Absoluto (depende del motor) :)
doc("C:/datos/libros.xml")

(: Acceso al elemento raíz :)
doc("libros.xml")/biblioteca    (: Desciende a <biblioteca> :)

(: Cargar varios documentos :)
for $f in ("libros.xml", "artistas.xml")
return count(doc($f)/*/*)
```

### 3.16 Otras funciones útiles

#### Funciones de fecha/hora:

| Función | Descripción |
|---------|-------------|
| `current-date()` | Fecha actual |
| `current-time()` | Hora actual |
| `current-dateTime()` | Fecha y hora actual |
| `year-from-date()` | Extrae año de una fecha |
| `month-from-date()` | Extrae mes |
| `day-from-date()` | Extrae día |

```xquery
current-date()             (: Ej: 2024-05-13 :)
year-from-date(current-date())   (: 2024 :)
```

#### Funciones de conversión de tipos:

| Función | Descripción |
|---------|-------------|
| `xs:string()` | Convertir a cadena |
| `xs:integer()` | Convertir a entero |
| `xs:decimal()` | Convertir a decimal |
| `xs:boolean()` | Convertir a booleano |
| `xs:date()` | Convertir a fecha |
| `number()` | Extrae valor numérico (más permisivo que xs:integer) |
| `string()` | Convertir a string |

```xquery
number("123")           (: 123 :)
string(123)             (: "123" :)
xs:integer("42")        (: 42 :)
```

#### Funciones sobre nodos:

| Función | Descripción |
|---------|-------------|
| `name()` | Nombre del nodo (con prefijo si existe) |
| `local-name()` | Nombre local (sin prefijo de namespace) |
| `namespace-uri()` | URI del namespace |
| `root()` | Nodo raíz del documento |
| `base-uri()` | URI base del nodo |

```xquery
for $x in //libro/*
return local-name($x)    (: titulo, autor, editorial, paginas... :)
```

---

## 4. EJEMPLOS COMPLETOS DE XQUERY

A continuación, ejemplos reales utilizados en la Tarea 06, trabajando sobre los archivos:
- `libros.xml`
- `artistas.xml`  
- `impresoras.xml`
- `hospital.xml`

### 4.1 Estructura de los archivos XML

Primero, recordemos la estructura de cada documento para entender mejor las consultas.

#### libros.xml
```xml
<biblioteca>
  <libros>
    <libro publicacion="2003" edicion="2">
      <titulo>Learning XML</titulo>
      <autor><apellido>Ray</apellido><nombre>Erik T.</nombre></autor>
      <editorial>O'Reilly</editorial>
      <paginas>16</paginas>
      <versionElectronica/>
    </libro>
    <!-- más libros... -->
  </libros>
</biblioteca>
```

#### artistas.xml
```xml
<artistas>
  <artista cod="a101">
    <nombreCompleto>Diego Velázquez</nombreCompleto>
    <nacimiento>1599</nacimiento>
    <fallecimiento>1660</fallecimiento>
    <pais>España</pais>
    <fichaCompleta>https://...</fichaCompleta>
  </artista>
  <!-- más artistas... -->
</artistas>
```

#### impresoras.xml
```xml
<impresoras>
  <impresora numSerie="i245" tipo="láser" compra="2010">
    <marca>Epson</marca>
    <modelo>EPL300</modelo>
    <peso>4.52</peso>
    <tamaño>A4</tamaño>
    <tamaño>A5</tamaño>
    <cartucho>C-123BV</cartucho>
    <enred/>
  </impresora>
  <!-- más impresoras... -->
</impresoras>
```

#### hospital.xml
```xml
<hospital>
  <paciente>
    <nombrepaciente>José Jiménez Jémez</nombrepaciente>
    <habitacion numcamas="2">314</habitacion>
    <doctor titular="Sí">
      <nombredoctor>Casado</nombredoctor>
      <especialidad>Trauma</especialidad>
    </doctor>
    <fecha_nacimiento>12 de enero de 2000</fecha_nacimiento>
    <sexo>Hombre</sexo>
  </paciente>
  <!-- más pacientes... -->
</hospital>
```

---

### 4.2 Consultas sobre libros.xml

**1. Título y editorial de todos los libros:**
```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
return <libro>{$x/titulo, $x/editorial}</libro>
```

**2. Títulos (sin etiquetas) de libros de menos de 100 páginas:**
```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
where number($x/paginas) < 100
return data($x/titulo)
```

**3. Número de libros de menos de 100 páginas:**
```xquery
for $x in doc("libros.xml")/biblioteca/libros
let $y := $x/libro[number(paginas) < 100]
return count($y)
```

**4. Lista HTML con libros de O'Reilly ordenados por título:**
```xquery
<ul>
{
  for $x in doc("libros.xml")/biblioteca/libros/libro
  where $x/editorial = "O'Reilly"
  order by $x/titulo
  return <li>{data($x/titulo)}</li>
}
</ul>
```

**5. Libros publicados en 2002 (atributo `publicacion`):**
```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
where $x[@publicacion="2002"]
return <libro>{$x/titulo, $x/editorial}</libro>
```

**6. Libros con más de un autor:**
```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
where count($x/autor) > 1
return <libro>{$x/titulo, $x/editorial}</libro>
```

**7. Libros que tienen versión electrónica (elemento vacío `<versionElectronica/>`):**
```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
where $x/versionElectronica
return <libro>{$x/titulo, $x/editorial}</libro>
```

**8. Libros SIN versión electrónica:**
```xquery
for $x in doc("libros.xml")/biblioteca/libros/libro
where not($x/versionElectronica)
return $x/titulo
```

**9. Tabla HTML completa de libros:**
```xquery
<table border="1">
  <tr>
    <th>Título</th>
    <th>Editorial</th>
    <th>Páginas</th>
    <th>Año</th>
  </tr>
  {
    for $x in doc("libros.xml")//libro
    order by number($x/paginas) descending
    return
      <tr>
        <td>{data($x/titulo)}</td>
        <td>{data($x/editorial)}</td>
        <td>{data($x/paginas)}</td>
        <td>{data($x/@publicacion)}</td>
      </tr>
  }
</table>
```

---

### 4.3 Consultas sobre artistas.xml

**1. Nombre y país de todos los artistas:**
```xquery
for $x in doc("artistas.xml")/artistas/artista
return <artista>{$x/nombreCompleto, $x/pais}</artista>
```

**2. Nombre (sin etiquetas) de artistas nacidos antes de 1500:**
```xquery
for $x in doc("artistas.xml")/artistas/artista
where number($x/nacimiento) < 1500
return data($x/nombreCompleto)
```

**3. Nombre de artistas para los que no hay año de fallecimiento:**
```xquery
for $x in doc("artistas.xml")/artistas/artista
where not($x/fallecimiento)
return data($x/nombreCompleto)
```

**4. Lista HTML con artistas españoles:**
```xquery
<ul>
{
  for $x in doc("artistas.xml")/artistas/artista
  where $x/pais = "España"
  return <li>{data($x/nombreCompleto)}</li>
}
</ul>
```

**5. Número de artistas nacidos antes de 1600:**
```xquery
for $x in doc("artistas.xml")/artistas
let $y := $x/artista[number(nacimiento) < 1600]
return count($y)
```

**6. Enlaces HTML a las fichas completas:**
```xquery
<div>
  <h3>Artistas y sus enlaces</h3>
  <ul>
  {
    for $x in doc("artistas.xml")//artista
    order by $x/nombreCompleto
    return
      <li>
        <a href="{data($x/fichaCompleta)}">
          {data($x/nombreCompleto)}
        </a>
        ({data($x/nacimiento)}-{if ($x/fallecimiento) then data($x/fallecimiento) else "?"})
      </li>
  }
  </ul>
</div>
```

---

### 4.4 Consultas sobre impresoras.xml

**1. Modelo de las impresoras de tipo "láser":**
```xquery
for $x in doc("impresoras.xml")/impresoras/impresora
where $x[@tipo="láser"]
return data($x/modelo)
```

**2. Marca y modelo de las impresoras con más de un tamaño:**
```xquery
for $x in doc("impresoras.xml")/impresoras/impresora
where count($x/tamaño) > 1
return <impresora>{$x/marca, $x/modelo}</impresora>
```

**3. Impresoras con tamaño A3 (pueden tener otros tamaños también):**
```xquery
for $x in doc("impresoras.xml")/impresoras/impresora
where $x/tamaño = "A3"
return <impresora>{$x/marca, $x/modelo}</impresora>
```

**4. Impresoras con A3 como ÚNICO tamaño:**
```xquery
for $x in doc("impresoras.xml")/impresoras/impresora
where $x/tamaño = "A3" and count($x/tamaño) = 1
return <impresora>{$x/marca, $x/modelo}</impresora>

(: Alternativa usando not(): :)
for $x in doc("impresoras.xml")/impresoras/impresora
where $x/tamaño = "A3" and not($x/tamaño != "A3")
return <impresora>{$x/marca, $x/modelo}</impresora>
```

**5. Impresoras en red (tienen elemento `<enred/>`):**
```xquery
for $x in doc("impresoras.xml")/impresoras/impresora
where $x/enred
return <impresora>{$x/modelo}</impresora>
```

**6. Impresoras matriciales compradas en 2010:**
```xquery
for $x in doc("impresoras.xml")//impresora
where $x/@tipo = "matricial" and $x/@compra = "2010"
return $x/modelo
```

**7. Impresoras que NO son HP:**
```xquery
for $x in doc("impresoras.xml")//impresora
where $x/marca != "HP"
return <impresora>{$x/marca, $x/modelo}</impresora>
```

---

### 4.5 Consultas sobre hospital.xml

**1. Habitaciones con 2 camas, ordenadas descendente:**
```xquery
for $x in doc("hospital.xml")/hospital/paciente/habitacion
where $x/@numcamas='2'
order by number($x) descending
return $x
```

**2. Pacientes con más de un doctor:**
```xquery
for $x in doc("hospital.xml")/hospital/paciente
where count($x/doctor) > 1
return data($x/nombrepaciente)
```

**3. Pacientes en habitaciones entre 200 y 300:**
```xquery
for $x in doc("hospital.xml")/hospital/paciente
where number($x/habitacion) >= 200 and number($x/habitacion) <= 300
order by number($x/habitacion)
return concat($x/nombrepaciente, " - ", $x/habitacion)
```

**4. Pacientes con doctor titular:**
```xquery
for $x in doc("hospital.xml")/hospital/paciente/doctor
where $x/@titular='Sí'
order by $x/../nombrepaciente
return concat(data($x/../nombrepaciente), " - ", data($x/nombredoctor))
```

**5. Pacientes femeninos:**
```xquery
for $x in doc("hospital.xml")//paciente
where $x/sexo = "Mujer"
return
  <paciente>
    <nombre>{data($x/nombrepaciente)}</nombre>
    <habitacion>{data($x/habitacion)}</habitacion>
  </paciente>
```

---

## 5. DIFERENCIAS XPATH vs XQUERY

| Aspecto | XPath 1.0/2.0 | XQuery |
|---------|----------------|--------|
| **Naturaleza principal** | Lenguaje de navegación y selección de nodos | Lenguaje de consulta completo |
| **FLWOR** | No disponible | Sí, construcción fundamental |
| **Construcción de XML** | Limitada en 2.0 | Completa - puede generar nuevos elementos, atributos, HTML... |
| **Funciones definidas por usuario** | No en XPath 1.0; Sí en XPath 2.0+ | Sí, `declare function` |
| **if-then-else** | No en XPath 1.0; Sí en XPath 2.0+ | Sí |
| **Comentarios** | No en XPath 1.0 | `(: ... :)` |
| **Variables** | Variables de contexto; limitadas | Variables con `for`, `let`, `declare variable` |
| **Tipado** | Dinámico; XPath 2.0 soporta tipos | Tipado fuerte con XML Schema tipos |
| **Union de consultas** | `\|` | `\|`, `union`, `intersect`, `except` |
| **Cuantificadores** | No en XPath 1.0 | `some`, `every` satisfies |
| **Casos de uso típicos** | Dentro de XSLT, XPointer, schemas | Consultas independientes, BD XML Nativas |

### Ejemplo equivalente:

**XPath:**
```xpath
//libro[editorial="O'Reilly"]/titulo
```

**XQuery equivalente:**
```xquery
for $x in //libro
where $x/editorial = "O'Reilly"
return $x/titulo
```

**XQuery más complejo (imposible en XPath 1.0):**
```xquery
<table>
  <tr><th>Título</th></tr>
  {
    for $x in //libro
    let $pags := number($x/paginas)
    where $pags > 100
    order by $pags descending
    return <tr><td>{data($x/titulo)} - {$pags} pags</td></tr>
  }
</table>
```

---

## 6. MOTORES XQUERY

| Motor | Descripción | Licencia | Plataformas |
|-------|-------------|----------|-------------|
| **BaseX** | Ligero, rápido, excelente interfaz GUI. Editor con resaltado, visor árbol, debug. Requiere Java 11+. | Open Source (BSD License) | Win/Mac/Linux |
| **Saxon HE/PE/EE** | El procesador XSLT/XQuery de referencia. Implementación muy completa del estándar. Muy usado en producción. | Open Source / Comercial | Win/Mac/Linux (Java) |
| **eXist-db** | Base de Datos XML Nativa completa. Incluye servidor web, REST API, WebDAV, XQuery Update. | Open Source (LGPL) | Win/Mac/Linux (Java) |
| **Qexo** | Implementación de XQuery en Kawa (Scheme sobre JVM). Integración con Java. | Open Source | Multiplataforma |
| **AltovaXML** | Motor XML de Altova. Incluye XPath 1.0/2.0, XSLT 1.0/2.0, XQuery. | Comercial | Windows |
| **Sedna** | Base de Datos XML Nativa de alto rendimiento. | Open Source | Multiplataforma |
| **MarkLogic** | Base de datos NoSQL empresarial para documentos XML y JSON. XQuery como lenguaje principal. | Comercial | Multiplataforma |

---

## 7. INDICACIONES BaseX

BaseX es la herramienta recomendada para realizar las prácticas de este tema.

### 7.1 Instalación

1. Descargar BaseX desde: https://basex.org/download/
2. Requiere **Java 11 o superior** instalado
3. En Windows: usar el instalador .exe
4. En Linux/Mac: descomprimir y ejecutar `bin/basexgui`

### 7.2 Primeros pasos

1. **Abrir BaseX GUI**
2. Se abrirá una ventana con:
   - **Panel izquierdo**: Explorador de bases de datos y archivos
   - **Panel superior central**: Editor de consultas
   - **Panel inferior**: Resultados de la consulta
   - **Panel derecho**: Visualizador del documento (modo Texto/Árbol/Mapa/...)

### 7.3 Configuración recomendada para las prácticas

**Opción A - Base de datos nueva:**
1. `Database` → `New`
2. En `Input Files/Directory` selecciona tus archivos XML
3. Click en `OK`
4. La base de datos se crea y puedes consultar directamente sin `doc()`:
   ```xquery
   //libro         (: Busca en la base de datos abierta :)
   ```

**Opción B - Trabajar con archivos individuales (más simple para prácticas):**
1. Coloca todos tus archivos `.xml` y `.xq` en la **misma carpeta**
2. Abre el editor y escribe tus consultas usando `doc()`:
   ```xquery
   for $x in doc("libros.xml")//libro
   return $x/titulo
   ```
3. **Importante**: Si usas esta opción, primero guarda tu consulta `.xq` en la MISMA carpeta que los `.xml`

### 7.4 Ejecutar consultas

- Botón **Play (▶)** verde o `F5` para ejecutar
- El resultado aparece en el panel inferior
- Puedes cambiar la visualización:
  - `Text` - Vista de texto plano
  - `Map` - Mapa visual
  - `Tree` - Vista de árbol
  - `Table` - Vista tabular

### 7.5 Errores comunes y soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `doc(): file not found: libros.xml` | La ruta del `doc()` es incorrecta | Guarda la consulta en la misma carpeta que el XML, o usa rutas completas |
| `Cannot convert string to double` | Comparando texto como número | Usa `number($x/paginas)` antes de comparar |
| `Single item expected` | Usaste `eq/gt/lt...` con una secuencia múltiple | Usa `=` o filtra primero |
| No devuelve nada pero no hay error | La expresión XPath no encuentra nodos | Revisa mayúsculas/minúsculas, rutas XPath, espacios en nombres |

### 7.6 Trucos útiles

- **Autocompletado**: `Ctrl+Space` muestra sugerencias
- **Comentar/Descomentar**: `Ctrl+K` comenta la línea
- **Formatear consulta**: `Ctrl+Shift+F`
- **Guardar resultados**: Después de ejecutar, `File` → `Export`

### 7.7 Verificación de resultados

Cuando realices las consultas de la tarea, contrasta con:

**libros.xml:**
- Total libros: 6
- Libros O'Reilly: 4 ("Learning XML", "XML Imprescindible", "XML Schema", "XQuery")
- Libros < 100 páginas: 1 ("Learning XML" con 16)
- Con versión electrónica: 2
- Más de un autor: 1 ("XML Imprescindible" de Harold y Means)

**artistas.xml:**
- Total artistas: 4
- Españoles: 2 (Velázquez y Goya)
- Nacidos < 1500: 1 (Herrada de Landsberg - 1125)
- Sin fallecimiento registrado: 1 (Caravaggio - cod=a102)

**impresoras.xml:**
- Total impresoras: 4
- Tipo láser: 1 (Epson EPL300)
- Con más de un tamaño: 2 (i245: A4+A5; i247: A4+A3)
- Tamaño A3: 2 (i247 y i248)
- Solo A3: 1 (i248 - LaserJet 2430)
- En red: 1 (i245 con `<enred/>`)

---

## APÉNDICE: Resumen rápido FLWOR

```xquery
(: Estructura mínima :)
for $variable in secuencia
return expresión

(: Estructura completa :)
for $x in doc("archivo.xml")/ruta/xpath,
    $y in otra_secuencia          (: múltiples for :)
let $variable := expresión        (: asignación sin bucle :)
where condición and otra_condición  (: filtrado :)
order by $x/campo [descending]     (: ordenación :)
return <elemento>{$x/subelem}</elemento>  (: resultado :)
```

---

## Referencias adicionales

- **Documentación BaseX**: https://docs.basex.org/
- **XQuery 3.1 Specification**: https://www.w3.org/TR/xquery-31/
- **XPath/XQuery Functions**: https://www.w3.org/TR/xpath-functions-31/
- **Libro recomendado**: "XQuery: Search Across a Variety of XML Data" - Priscilla Walmsley (O'Reilly)

---

**Archivos de ejemplo para prácticas:**
- `libros.xml` - Biblioteca de libros
- `artistas.xml` - Artistas pintores
- `impresoras.xml` - Catálogo de impresoras
- `hospital.xml` - Datos de pacientes hospitalarios
