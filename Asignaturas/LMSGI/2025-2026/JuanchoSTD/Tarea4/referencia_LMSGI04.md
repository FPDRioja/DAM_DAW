# Referencia Rápida: LMSGI04 - Documentos para el intercambio de información

## 1. Estructura de un documento XML

```
                    ┌─ <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
   ┌─ Prólogo ──────┤
   │                └─ <!DOCTYPE torneo SYSTEM "torneo.dtd">
   │
   │                ┌─ <torneo edicion="1998">                    ← elemento raíz
   │                │     <participante idP="j01">                ← elemento hijo
   │                │       <nombre>Manuel Pérez</nombre>         ← terminal
   └─ Ejemplar ─────┤       <edad>23</edad>
                    │     </participante>
                    │   </torneo>
```

### 1.1 Prólogo

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!DOCTYPE nombre_ejemplar SUBCONJUNTO>
```

| Componente | Descripción |
|------------|-------------|
| `version` | Versión de XML (1.0, 1.1) |
| `encoding` | Codificación de caracteres (UTF-8, ISO-8859-1, ...) |
| `standalone` | `yes` → autónomo (no requiere ficheros externos); `no` → necesita DTD externo |

### 1.2 Declaración del tipo de documento

**Con subconjunto interno** — las declaraciones DTD van dentro del propio XML:
```xml
<!DOCTYPE alumno [
  <!ELEMENT alumno (#PCDATA)>
]>
```

**Con subconjunto externo** — las declaraciones están en un fichero `.dtd` separado:
```xml
<!DOCTYPE torneo SYSTEM "torneo.dtd">
<!DOCTYPE torneo PUBLIC "identificador_público" "URI">
```

**Mixto** — interno + externo. Se procesa primero el subconjunto interno (puede sobrescribir declaraciones externas):
```xml
<!DOCTYPE torneo SYSTEM "torneo.dtd" [
  <!ELEMENT localizacion (#PCDATA)>
]>
```

### 1.3 Reglas de buena formación (XML bien formado)
1. Un único elemento raíz
2. Etiquetas correctamente anidadas (no entrelazadas)
3. Toda etiqueta abierta se cierra
4. Los atributos van entre comillas (dobles `"` o simples `'`)
5. Los nombres distinguen mayúsculas/minúsculas
6. Los elementos vacíos pueden auto-cerrarse: `<enred/>`

### 1.4 Elemento vs atributo — criterios prácticos

| Es mejor **elemento** si... | Es mejor **atributo** si... |
|-----------------------------|-----------------------------|
| Contiene subestructuras | Es pequeño y cambia raramente |
| Es de tamaño considerable | Solo puede tener unos pocos valores fijos |
| Su valor cambia frecuentemente | Guía el procesamiento pero no se muestra |
| Su valor se muestra al usuario | |

### 1.5 Espacios de nombres (namespaces)
```xml
<!-- Sin prefijo (por defecto) -->
<html xmlns="http://www.w3.org/1999/xhtml">

<!-- Con prefijo -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

<!-- Para asociar esquema -->
<impresoras xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="impresoras.xsd">
```

---

## 2. DTD (Definición de Tipo de Documento)

### 2.1 Sintaxis general de declaración de elementos

```
<!ELEMENT nombre contenido_modelo>
```

### 2.2 Elementos terminales (hojas del árbol)

| Declaración | Significado | XML válido |
|-------------|-------------|------------|
| `<!ELEMENT x EMPTY>` | Elemento vacío | `<x/>` o `<x></x>` |
| `<!ELEMENT x ANY>` | Cualquier contenido (texto, elementos, mixto) | `<x>cualquier cosa</x>` |
| `<!ELEMENT x (#PCDATA)>` | Solo texto (Parsed Character Data) | `<x>Hola</x>` |

Ejemplos:
```xml
<!ELEMENT enred EMPTY>
<!ELEMENT descripcion ANY>
<!ELEMENT nombre (#PCDATA)>
```

### 2.3 Elementos no terminales (ramas del árbol)

```
<!ELEMENT padre (hijo1, hijo2, ...)>
```

Ejemplo:
```dtd
<!ELEMENT alumno (nombre, apellidos, direccion)>
<!ELEMENT nombre     (#PCDATA)>
<!ELEMENT apellidos  (#PCDATA)>
<!ELEMENT direccion  (#PCDATA)>
```

#### Grupos anidados
```dtd
<!ELEMENT persona (nombre, (telefono | email), direccion)>
<!ELEMENT provincia (nombre, (cp, ciudad)+)>
```

### 2.4 Operadores de cardinalidad

| Operador | Significado | Sobre | Ejemplo | ¿Obligatorio? |
|----------|-------------|-------|---------|---------------|
| Ninguno | Exactamente 1 | elemento o grupo | `(nombre)` | Sí |
| `?` | 0 o 1 vez (opcional) | elemento o grupo | `(trabajo?, casa)` | No |
| `+` | 1 o más veces | elemento o grupo | `(cp, ciudad)+` | Sí (al menos 1) |
| `*` | 0 o más veces | elemento o grupo | `(cp, ciudad)*` | No |
| `\|` | Elección (uno u otro, exclusivo) | entre elementos | `(cp \| ciudad)` | Depende del contexto |

Ejemplos completos:
```dtd
<!ELEMENT telefono (fijo?, movil)>               <!-- fijo opcional, movil obligatorio -->
<!ELEMENT factura (linea+)>                       <!-- una o más líneas -->
<!ELEMENT curriculum (formacion, experiencia*)>   <!-- experiencia 0..N -->
<!ELEMENT contacto (telefono | email)>            <!-- o teléfono o email, exactamente uno -->
<!ELEMENT direccion (calle, numero, (piso | escalera)?, cp, ciudad)>
```

### 2.5 Declaración de atributos

```
<!ATTLIST elemento
    nombre_atributo1 tipo1 modificador1
    nombre_atributo2 tipo2 modificador2
    ...>
```

Se pueden declarar varios atributos para un mismo elemento en una sola instrucción `<!ATTLIST>`:
```dtd
<!ATTLIST participante
          idP    ID     #REQUIRED
          pareja IDREF  #REQUIRED>
```

O usando varias instrucciones independientes (equivalente):
```dtd
<!ATTLIST participante idP ID #REQUIRED>
<!ATTLIST participante pareja IDREF #REQUIRED>
```

#### Tipos de atributos

| Tipo | Descripción | Ejemplo XML |
|------|-------------|-------------|
| `CDATA` | Cadena de texto | `nombre="Juan"` |
| `ID` | Identificador único en todo el documento | `idP="j01"` |
| `IDREF` | Referencia a un ID existente en el documento | `pareja="j02"` |
| `IDREFS` | Lista de referencias a IDs separadas por espacios | `parejas="j02 j03"` |
| `NMTOKEN` | Palabra con caracteres XML válidos (sin espacios) | `tipo="láser"` |
| `NMTOKENS` | Lista de NMTOKEN separados por espacios | `colores="rojo verde azul"` |
| `ENTITY` | Entidad previamente declarada | `logo="&logo_empresa;"` |
| `ENTITIES` | Lista de entidades | `fotos="&foto1; &foto2;"` |
| `NOTATION` | Notación previamente declarada | `formato="gif"` |
| Enumeración | Lista de valores permitidos | `(matricial \| láser \| tinta)` |

#### Modificadores

| Modificador | Descripción | Ejemplo en DTD |
|-------------|-------------|----------------|
| `#REQUIRED` | Obligatorio, debe aparecer siempre | `tipo CDATA #REQUIRED` |
| `#IMPLIED` | Opcional, puede omitirse | `compra CDATA #IMPLIED` |
| `#FIXED "valor"` | Valor fijo e inmutable | `moneda CDATA #FIXED "EUR"` |
| `"valor_defecto"` | Valor por defecto si no se especifica | `formato CDATA "A4"` |

Ejemplo completo:
```dtd
<!ATTLIST impresora
    numSerie ID     #REQUIRED
    tipo     (matricial|láser|tinta) #REQUIRED
    compra   CDATA  #IMPLIED
    color    CDATA  #FIXED "negro">
```

### 2.6 Restricción de integridad referencial con ID/IDREF

```xml
<!-- DTD -->
<!ATTLIST participante
    idP    ID     #REQUIRED
    pareja IDREF  #REQUIRED>

<!-- XML válido -->
<torneo>
  <participante idP="j01" pareja="j02">...</participante>
  <participante idP="j02" pareja="j01">...</participante>
</torneo>
<!-- j01 y j02 se referencian mutuamente -->
```

> **Atención**: Los valores ID no pueden ser solo números (ej. `123` no es válido, pero `j01` sí).

### 2.7 Entidades

```
<!ENTITY nombre "valor_expandido">
```

#### Entidades internas predefinidas

| Entidad | Carácter | Significado |
|---------|----------|-------------|
| `&lt;` | `<` | Menor que |
| `&gt;` | `>` | Mayor que |
| `&quot;` | `"` | Comilla doble |
| `&apos;` | `'` | Apóstrofe / comilla simple |
| `&amp;` | `&` | Ampersand |

#### Entidades internas definidas por el usuario

```dtd
<!ENTITY empresa "Soluciones Informáticas SL">
<!ENTITY eslogan "Calidad y confianza">
```
Uso en XML: `&empresa;`, `&eslogan;` → el procesador sustituye por el valor.

#### Entidades externas

```dtd
<!ENTITY clausulas SYSTEM "clausulas_legales.xml">
```
Uso: `&clausulas;` → inserta el contenido del fichero externo (debe ser XML bien formado).

#### Entidades de parámetro (solo dentro del DTD)

```dtd
<!ENTITY % direccion "calle, numero?, ciudad, cp">

<!ELEMENT alumno (dni, %direccion;)>
<!ELEMENT ies (nombre, %direccion;)>

<!-- Se expande a: -->
<!ELEMENT alumno (dni, calle, numero?, ciudad, cp)>
<!ELEMENT ies (nombre, calle, numero?, ciudad, cp)>
```

#### Entidades de parámetro externas

```dtd
<!ENTITY % comunes SYSTEM "comunes.dtd">
%comunes;
```

#### Entidades no analizadas (binarias) + notación

```dtd
<!NOTATION gif SYSTEM "gifEditor.exe">
<!ENTITY logo SYSTEM "logo.gif" NDATA gif>
```

### 2.8 Notaciones

```dtd
<!NOTATION nombre_identificador SYSTEM "aplicación">
<!NOTATION nombre_identificador PUBLIC "identificador_público" "URI">
```

Ejemplo:
```dtd
<!NOTATION pdf SYSTEM "AcrobatReader.exe">
<!NOTATION jpeg PUBLIC "JPEG Image" "http://www.example.com/viewer">
```

### 2.9 Secciones condicionales

Solo válidas en el subconjunto **externo** de DTD:

```dtd
<![INCLUDE [
  <!ELEMENT nombre (#PCDATA)>
  <!ELEMENT apellidos (#PCDATA)>
]]>

<![IGNORE [
  <!ELEMENT clave_secreta (#PCDATA)>
]]>
```

Se puede usar con entidades de parámetro para activar/desactivar secciones:
```dtd
<!ENTITY % debug "INCLUDE">
<!ENTITY % produccion "IGNORE">

<![%debug;[
  <!ELEMENT trazas (#PCDATA)>
]]>

<![%produccion;[
  <!ELEMENT optimizaciones (#PCDATA)>
]]>
```

### 2.10 Ejemplo completo: `torneo.dtd` → `torneo.xml`

```dtd
<!-- fichero: torneo.dtd -->
<!ELEMENT torneo (participante+)>

<!ATTLIST torneo
          anteriorGanador CDATA #REQUIRED
          edicion          CDATA #REQUIRED>

<!ELEMENT participante (nombre, edad, pais, cabezaDeSerie?)>

<!ATTLIST participante
          idP    ID     #REQUIRED
          pareja IDREF  #REQUIRED>

<!ELEMENT nombre        (#PCDATA)>
<!ELEMENT edad          (#PCDATA)>
<!ELEMENT pais          (#PCDATA)>
<!ELEMENT cabezaDeSerie EMPTY>
```

```xml
<!-- fichero: torneo.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE torneo SYSTEM "torneo.dtd">
<torneo edicion="1998" anteriorGanador="j01">
  <participante idP="j01" pareja="j02">
    <nombre>Manuel Pérez</nombre>
    <edad>23</edad>
    <pais>España</pais>
    <cabezaDeSerie/>
  </participante>
  <participante idP="j02" pareja="j01">
    <nombre>Manuel Gómez</nombre>
    <edad>25</edad>
    <pais>España</pais>
  </participante>
  <participante idP="j03" pareja="j04">
    <nombre>Ana Puertas</nombre>
    <edad>22</edad>
    <pais>España</pais>
    <cabezaDeSerie/>
  </participante>
  <participante idP="j04" pareja="j03">
    <nombre>Paco Fraile</nombre>
    <edad>45</edad>
    <pais>España</pais>
  </participante>
</torneo>
```

### 2.11 Limitaciones de los DTD

| Limitación | Descripción |
|------------|-------------|
| Sintaxis no XML | Los DTD no son documentos XML válidos |
| Sin soporte de namespaces | No entiende `xmlns:` |
| Tipado pobre | Solo `#PCDATA` para elementos, sin tipos numéricos, fechas, etc. |
| Sin restricciones de valor | No hay rangos, patrones, enumeraciones detalladas |
| Sin orden no secuencial | No hay equivalente a `xs:all` |
| Claves compuestas | No permite formar claves con múltiples atributos/elementos |
| No extensible | Una vez definido no se puede añadir nuevo vocabulario |

---

## 3. XML Schema (XSD)

### 3.1 Estructura básica de un esquema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           elementFormDefault="qualified"
           targetNamespace="...">
  <!-- declaraciones globales -->
</xs:schema>
```

| Atributo de `xs:schema` | Descripción |
|-------------------------|-------------|
| `xmlns:xs` | Espacio de nombres de XML Schema (obligatorio) |
| `elementFormDefault` | `"qualified"` → los elementos locales deben usar prefijo del namespace |
| `targetNamespace` | Namespace al que pertenecen las declaraciones del esquema |

### 3.2 Declaración de elementos

```xml
<!-- Elemento global (hijo directo de xs:schema) -->
<xs:element name="alumno" type="xs:string"/>

<!-- Elemento local (dentro de un complexType) -->
<xs:element name="nombre" type="xs:string"/>

<!-- Elemento basado en referencia a otro global -->
<xs:element ref="impresora"/>

<!-- Elemento con tipo anónimo -->
<xs:element name="edad">
  <xs:simpleType>
    <xs:restriction base="xs:integer">
      <xs:minInclusive value="0"/>
      <xs:maxInclusive value="120"/>
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

| Atributo de `xs:element` | Descripción |
|--------------------------|-------------|
| `name` | Nombre del elemento |
| `ref` | Referencia a un elemento global |
| `type` | Tipo XSD predefinido o definido por el usuario |
| `minOccurs` | Ocurrencias mínimas (0 o 1; por defecto 1) |
| `maxOccurs` | Ocurrencias máximas (entero o `"unbounded"`) |
| `default` | Valor por defecto |
| `fixed` | Valor fijo |
| `nillable` | `"true"` → permite `xsi:nil="true"` |

### 3.3 Tipos de datos predefinidos

#### Tipos numéricos
| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `xs:int` | Entero de 32 bits | `-100` |
| `xs:integer` | Entero sin límite de tamaño | `123456789012345` |
| `xs:positiveInteger` | Entero > 0 | `5` |
| `xs:nonNegativeInteger` | Entero >= 0 | `0` |
| `xs:negativeInteger` | Entero < 0 | `-5` |
| `xs:nonPositiveInteger` | Entero <= 0 | `-5` |
| `xs:decimal` | Número decimal | `3.1416` |
| `xs:float` | Coma flotante 32 bits | `3.14E+2` |
| `xs:double` | Coma flotante 64 bits | `3.1415926535` |
| `xs:byte` | Entero 8 bits (-128..127) | `100` |
| `xs:short` | Entero 16 bits (-32768..32767) | `32000` |
| `xs:long` | Entero 64 bits | `9223372036854775807` |
| `xs:unsignedByte` | Entero 8 bits (0..255) | `255` |
| `xs:unsignedShort` | Entero 16 bits (0..65535) | `65000` |
| `xs:unsignedInt` | Entero 32 bits | `4000000000` |
| `xs:unsignedLong` | Entero 64 bits | `100000000000` |

#### Tipos de fecha/hora
| Tipo | Formato | Ejemplo |
|------|---------|---------|
| `xs:dateTime` | `CCYY-MM-DDThh:mm:ss` | `2024-01-15T10:30:00` |
| `xs:date` | `CCYY-MM-DD` | `2024-01-15` |
| `xs:time` | `hh:mm:ss` | `10:30:00` |
| `xs:gYear` | `CCYY` | `2024` |
| `xs:gYearMonth` | `CCYY-MM` | `2024-01` |
| `xs:gMonthDay` | `--MM-DD` | `--01-15` |
| `xs:gDay` | `---DD` | `---15` |
| `xs:gMonth` | `--MM` | `--01` |
| `xs:duration` | `PnYnMnDTnHnMnS` | `P2Y4M3DT5H6M7S` |

#### Tipos de texto y miscelánea
| Tipo | Descripción |
|------|-------------|
| `xs:string` | Cadena de caracteres UNICODE |
| `xs:normalizedString` | Cadena sin tabs, retornos ni saltos de línea |
| `xs:token` | normalizedString sin espacios múltiples ni iniciales/finales |
| `xs:language` | Código de idioma (RFC 1766): `es`, `en`, `fr` |
| `xs:boolean` | `true` / `false` / `1` / `0` |
| `xs:anyURI` | URI absoluta o relativa |
| `xs:base64Binary` | Datos binarios codificados en Base64 |
| `xs:hexBinary` | Datos binarios en hexadecimal |
| `xs:ID` | Igual que en DTD (único en el documento) |
| `xs:IDREF` | Referencia a un ID |
| `xs:IDREFS` | Lista de IDREF |
| `xs:ENTITY` | Entidad |
| `xs:ENTITIES` | Lista de entidades |
| `xs:NMTOKEN` | Palabra con caracteres XML válidos |
| `xs:NMTOKENS` | Lista de NMTOKEN |

### 3.4 Facetas (restricciones sobre tipos simples)

#### Facetas de longitud
```xml
<xs:element name="codigo">
  <xs:simpleType>
    <xs:restriction base="xs:string">
      <xs:length value="10"/>
    </xs:restriction>
  </xs:simpleType>
</xs:element>
<!-- Válido: "ABCD1234EF" -->
<!-- Inválido: "ABC" (menos de 10) -->
```

```xml
<xs:element name="descripcion">
  <xs:simpleType>
    <xs:restriction base="xs:string">
      <xs:minLength value="1"/>
      <xs:maxLength value="255"/>
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

#### Facetas de rango
```xml
<xs:element name="edad">
  <xs:simpleType>
    <xs:restriction base="xs:integer">
      <xs:minInclusive value="0"/>
      <xs:maxInclusive value="150"/>
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

```xml
<xs:element name="precio">
  <xs:simpleType>
    <xs:restriction base="xs:decimal">
      <xs:minExclusive value="0"/>       <!-- precio > 0 -->
      <xs:maxExclusive value="10000"/>    <!-- precio < 10000 -->
      <xs:fractionDigits value="2"/>      <!-- 2 decimales -->
      <xs:totalDigits value="8"/>         <!-- 8 dígitos en total -->
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

#### Faceta de enumeración
```xml
<xs:element name="tipo">
  <xs:simpleType>
    <xs:restriction base="xs:string">
      <xs:enumeration value="matricial"/>
      <xs:enumeration value="láser"/>
      <xs:enumeration value="tinta"/>
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

#### Faceta de patrón (pattern)
```xml
<xs:element name="dni">
  <xs:simpleType>
    <xs:restriction base="xs:string">
      <xs:pattern value="[0-9]{8}[A-Z]"/>
    </xs:restriction>
  </xs:simpleType>
</xs:element>
<!-- Válido: "12345678Z" -->
```

| Patrón de ejemplo | Descripción |
|-------------------|-------------|
| `[0-9]{8}[A-Z]` | DNI español: 8 dígitos + 1 letra mayúscula |
| `\d{4}-\d{4}` | Formato de teléfono parcial: `1234-5678` |
| `\+?\d{2,3}[- ]?\d{9}` | Teléfono internacional con prefijo |
| `[A-Z]{1,2}[0-9]{4}[A-Z]{1,2}` | Matrícula española antigua |
| `[A-Z]{4}[0-9]{3}` | Matrícula moderna: `ABC1234` |
| `C-[0-9]{3}[A-Z]+` | Código de cartucho: `C-123BV` |
| `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` | Email básico |
| `[0-9]{5}` | Código postal español |
| `(https?\|ftp)://[^\s/$.?#].[^\s]*` | URL básica |

#### Faceta de tratamiento de espacios
```xml
<xs:element name="nombre">
  <xs:simpleType>
    <xs:restriction base="xs:string">
      <xs:whiteSpace value="preserve"/>   <!-- conserva espacios -->
      <!-- value="replace"  → reemplaza tabs/saltos por espacios -->
      <!-- value="collapse" → colapsa espacios múltiples en uno solo -->
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

### 3.5 Tipos complejos

#### Tipo complejo anónimo (definido inline)
```xml
<xs:element name="alumno">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="nombre"    type="xs:string" minOccurs="1"/>
      <xs:element name="apellidos" type="xs:string"/>
      <xs:element name="edad"      type="xs:positiveInteger"/>
    </xs:sequence>
    <xs:attribute name="dni" type="xs:string" use="required"/>
  </xs:complexType>
</xs:element>
```

#### Tipo complejo nombrado (reutilizable)
```xml
<xs:element name="alumno" type="tAlumno"/>
<xs:element name="profesor" type="tAlumno"/>

<xs:complexType name="tAlumno">
  <xs:sequence>
    <xs:element name="nombre"    type="xs:string"/>
    <xs:element name="apellidos" type="xs:string"/>
    <xs:element name="edad"      type="xs:positiveInteger"/>
  </xs:sequence>
  <xs:attribute name="dni" type="xs:string" use="required"/>
</xs:complexType>
```

#### Tipos complejos con atributos
```xml
<xs:complexType name="tProducto">
  <xs:simpleContent>
    <xs:extension base="xs:string">
      <xs:attribute name="codigo" type="xs:string" use="required"/>
      <xs:attribute name="precio" type="xs:decimal"/>
    </xs:extension>
  </xs:simpleContent>
</xs:complexType>
<!-- XML: <producto codigo="P001" precio="12.50">Descripción</producto> -->
```

#### Tipos complejos vacíos (con solo atributos)
```xml
<xs:element name="cabezaDeSerie">
  <xs:complexType>
    <xs:attribute name="categoria" type="xs:string"/>
  </xs:complexType>
</xs:element>
<!-- XML: <cabezaDeSerie categoria="A"/> -->
```

### 3.6 Modelos de contenido

#### `xs:sequence` — orden estricto
```xml
<xs:complexType name="tDireccion">
  <xs:sequence>
    <xs:element name="calle"    type="xs:string"/>
    <xs:element name="numero"   type="xs:integer"/>
    <xs:element name="ciudad"   type="xs:string"/>
    <xs:element name="cp"       type="xs:string" minOccurs="0"/>
  </xs:sequence>
</xs:complexType>
```

#### `xs:choice` — elegir uno (exclusivo)
```xml
<xs:complexType name="tContacto">
  <xs:choice>
    <xs:element name="telefono" type="xs:string"/>
    <xs:element name="email"    type="xs:string"/>
    <xs:element name="direccion" type="tDireccion"/>
  </xs:choice>
</xs:complexType>
```

#### `xs:all` — cualquier orden (máx. 1 cada elemento)
```xml
<xs:complexType name="tProducto">
  <xs:all>
    <xs:element name="nombre"      type="xs:string"/>
    <xs:element name="descripcion" type="xs:string" minOccurs="0"/>
    <xs:element name="precio"      type="xs:decimal"/>
  </xs:all>
</xs:complexType>
<!-- Válido: <producto><precio>10</precio><nombre>X</nombre></producto> -->
```

#### Contenido mixto (texto + elementos)
```xml
<xs:element name="parrafo">
  <xs:complexType mixed="true">
    <xs:choice minOccurs="0" maxOccurs="unbounded">
      <xs:element name="negrita" type="xs:string"/>
      <xs:element name="cursiva" type="xs:string"/>
    </xs:choice>
  </xs:complexType>
</xs:element>
<!-- XML: <parrafo>Texto <negrita>importante</negrita> y más texto</parrafo> -->
```

### 3.7 Cardinalidad con minOccurs / maxOccurs

| minOccurs | maxOccurs | Significado |
|-----------|-----------|-------------|
| `0` | `1` | Opcional (equivalente a `?` en DTD) |
| `1` | `1` | Exactamente una vez (valor por defecto) |
| `0` | `unbounded` | De 0 a N veces (equivalente a `*`) |
| `1` | `unbounded` | Al menos una vez (equivalente a `+`) |
| `2` | `5` | De 2 a 5 veces |
| `0` | `0` | Prohibido (técnicamente posible pero raro) |

```xml
<xs:element name="impresoras">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="impresora" minOccurs="1" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>
</xs:element>
```

### 3.8 Declaración de atributos en XSD

```xml
<xs:attribute name="numSerie" type="xs:ID" use="required"/>
<xs:attribute name="tipo">
  <xs:simpleType>
    <xs:restriction base="xs:string">
      <xs:enumeration value="matricial"/>
      <xs:enumeration value="láser"/>
      <xs:enumeration value="tinta"/>
    </xs:restriction>
  </xs:simpleType>
</xs:attribute>
<xs:attribute name="compra" type="xs:gYear"/>
<xs:attribute name="color" type="xs:string" default="negro"/>
<xs:attribute name="activo" type="xs:boolean" fixed="true"/>
```

| Atributo de `xs:attribute` | Descripción |
|---------------------------|-------------|
| `name` | Nombre del atributo |
| `ref` | Referencia a un atributo global |
| `type` | Tipo XSD del atributo |
| `use` | `"required"` / `"optional"` / `"prohibited"` |
| `default` | Valor por defecto |
| `fixed` | Valor fijo |
| `form` | `"qualified"` / `"unqualified"` (calificado con namespace) |

### 3.9 Atributo `use` en detalle

```xml
<xs:attribute name="numSerie" type="xs:ID" use="required"/>     <!-- obligatorio -->
<xs:attribute name="compra" type="xs:gYear" use="optional"/>    <!-- opcional -->
<xs:attribute name="obsoleto" type="xs:boolean" use="prohibited"/> <!-- no permitido -->
<xs:attribute name="color" type="xs:string" default="negro"/>   <!-- opcional con valor por defecto -->
<xs:attribute name="activo" type="xs:boolean" fixed="true"/>    <!-- fijo -->
```

### 3.10 Groups (agrupaciones reutilizables)

#### group de elementos
```xml
<xs:group name="grupoDireccion">
  <xs:sequence>
    <xs:element name="calle" type="xs:string"/>
    <xs:element name="numero" type="xs:string"/>
    <xs:element name="ciudad" type="xs:string"/>
    <xs:element name="cp" type="xs:string"/>
  </xs:sequence>
</xs:group>

<xs:complexType name="tAlumno">
  <xs:sequence>
    <xs:element name="nombre" type="xs:string"/>
    <xs:group ref="grupoDireccion"/>
  </xs:sequence>
</xs:complexType>
```

#### attributeGroup
```xml
<xs:attributeGroup name="atributosProducto">
  <xs:attribute name="codigo" type="xs:string" use="required"/>
  <xs:attribute name="precio" type="xs:decimal"/>
  <xs:attribute name="stock" type="xs:positiveInteger"/>
</xs:attributeGroup>

<xs:complexType name="tProducto">
  <xs:sequence>
    <xs:element name="nombre" type="xs:string"/>
  </xs:sequence>
  <xs:attributeGroup ref="atributosProducto"/>
</xs:complexType>
```

### 3.11 Tipos lista y tipos unión

#### Lista (valores separados por espacios)
```xml
<xs:simpleType name="diasSemana">
  <xs:list itemType="xs:string"/>
</xs:simpleType>
<!-- XML válido: <dias>lunes martes miércoles</dias> -->

<xs:simpleType name="notas">
  <xs:list>
    <xs:simpleType>
      <xs:restriction base="xs:decimal">
        <xs:minInclusive value="0"/>
        <xs:maxInclusive value="10"/>
      </xs:restriction>
    </xs:simpleType>
  </xs:list>
</xs:simpleType>
<!-- XML válido: <notas>7.5 8.0 6.3 9.1</notas> -->
```

#### Unión (el valor debe coincidir con uno de los tipos)
```xml
<xs:simpleType name="talla">
  <xs:union memberTypes="xs:positiveInteger">
    <xs:simpleType>
      <xs:restriction base="xs:string">
        <xs:enumeration value="XS"/>
        <xs:enumeration value="S"/>
        <xs:enumeration value="M"/>
        <xs:enumeration value="L"/>
        <xs:enumeration value="XL"/>
      </xs:restriction>
    </xs:simpleType>
  </xs:union>
</xs:simpleType>
<!-- XML válido: <talla>42</talla> o <talla>M</talla> -->
```

### 3.12 Elementos nillable
```xml
<xs:element name="telefono" type="xs:string" nillable="true"/>
```
```xml
<!-- XML: el elemento existe pero es nulo -->
<telefono xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
<!-- VS elemento ausente (con minOccurs="0") -->
```

### 3.13 Ejemplo completo: `impresoras.xsd` → `impresoras.xml`

```xml
<!-- fichero: impresoras.xsd -->
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">

  <xs:element name="impresoras">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="impresora" minOccurs="1" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="impresora">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="marca" type="xs:string"/>
        <xs:element name="modelo" type="xs:string"/>

        <xs:element name="peso">
          <xs:simpleType>
            <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>

        <xs:element name="tamaño" type="xs:string" maxOccurs="unbounded"/>

        <xs:element name="cartucho">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:pattern value="C-[0-9]{3}[A-Z]+"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>

        <!-- Elemento opcional y vacío -->
        <xs:element name="enred" minOccurs="0">
          <xs:simpleType>
            <xs:restriction base="xs:string">
              <xs:length value="0"/>
            </xs:restriction>
          </xs:simpleType>
        </xs:element>
      </xs:sequence>

      <xs:attribute name="compra">
        <xs:simpleType>
          <xs:restriction base="xs:gYear">
            <xs:minInclusive value="0001"/>
          </xs:restriction>
        </xs:simpleType>
      </xs:attribute>

      <xs:attribute name="numSerie" type="xs:ID" use="required"/>

      <xs:attribute name="tipo" use="required">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <xs:enumeration value="matricial"/>
            <xs:enumeration value="láser"/>
            <xs:enumeration value="tinta"/>
          </xs:restriction>
        </xs:simpleType>
      </xs:attribute>
    </xs:complexType>
  </xs:element>

</xs:schema>
```

```xml
<!-- fichero: impresoras.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<impresoras xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="impresoras.xsd">
  <impresora numSerie="i245" tipo="láser" compra="2010">
    <marca>Epson</marca>
    <modelo>EPL300</modelo>
    <peso>4.52</peso>
    <tamaño>A4</tamaño>
    <tamaño>A5</tamaño>
    <cartucho>C-123BV</cartucho>
    <enred/>
  </impresora>
  <impresora numSerie="i246" tipo="matricial">
    <marca>HP</marca>
    <modelo>LaserJet 2410</modelo>
    <peso>3.2</peso>
    <tamaño>A4</tamaño>
    <cartucho>C-456P</cartucho>
  </impresora>
</impresoras>
```

### 3.14 Asociación del XSD con el XML

```xml
<!-- Sin namespace de destino -->
<raiz xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:noNamespaceSchemaLocation="esquema.xsd">

<!-- Con namespace de destino -->
<raiz xmlns="http://midominio.com/miNamespace"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://midominio.com/miNamespace esquema.xsd">
```

### 3.15 Incluir y reimportar esquemas

```xml
<!-- Incluir otro esquema en el mismo namespace de destino -->
<xs:include schemaLocation="tipos_comunes.xsd"/>

<!-- Importar un esquema con distinto namespace -->
<xs:import namespace="http://otro.com/ns" schemaLocation="otro.xsd"/>
```

### 3.16 Documentación del esquema

```xml
<xs:annotation>
  <xs:documentation xml:lang="es-es">
    Esquema para el intercambio de datos de impresoras.
    Autor: Juan García
    Fecha: 2024
  </xs:documentation>
  <xs:appinfo>
    <herramienta>Validador interno v2.1</herramienta>
    <ayuda>El campo numSerie debe ser único</ayuda>
  </xs:appinfo>
</xs:annotation>
```

### 3.17 Comparativa DTD vs XSD

| Aspecto | DTD | XSD |
|---------|-----|-----|
| Sintaxis | No XML (sintaxis propia) | XML válido |
| Tipos de datos | Solo `#PCDATA` | Numerosos tipos (string, integer, date, ...) |
| Restricciones de valor | No directamente | Facetas (pattern, minInclusive, enumeration, ...) |
| Namespaces | No soporta | Soporte completo |
| Cardinalidad | `?`, `+`, `*` | `minOccurs` / `maxOccurs` (0..unbounded) |
| Claves/Claves compuestas | ID/IDREF (solo 1 atributo) | `xs:key` / `xs:keyref` (varios campos) |
| Orden | Solo secuencial con `,` | `sequence`, `choice`, `all` |
| Reutilización | Entidades de parámetro | `xs:group`, `xs:complexType name`, `xs:attributeGroup` |
| Extensibilidad | No | `xs:include`, `xs:import`, herencia de tipos |
| Herencia | No | `xs:extension`, `xs:restriction` |
| Documentación | Comentarios `<!-- -->` | `xs:annotation` / `xs:documentation` |

---

## 4. Herramientas de creación y validación

| Herramienta | Tipo | Plataforma |
|-------------|------|------------|
| EditiX XML Editor | Open source / Comercial | Multiplataforma |
| XMLFox | Freeware | Windows |
| Altova XML Spy | Comercial | Windows |
| xmlBlueprint | Comercial | Windows |
| Stylus Studio | Comercial | Windows |
| Oxygen XML Editor | Comercial | Multiplataforma |
| Exchanger XML Editor | Comercial | Multiplataforma |
| XML Copy Editor | Open source | Multiplataforma |
| VS Code + XML Extension | Gratuito | Multiplataforma |
| xmllint (CLI) | Open source | Linux/Unix |

---

## 5. Recursos adicionales

- [XML Schema Primer (W3C)](https://www.w3.org/TR/xmlschema-0/)
- [XML Schema Estructuras (W3C)](https://www.w3.org/TR/xmlschema-1/)
- [XML Schema Tipos de datos (W3C)](https://www.w3.org/TR/xmlschema-2/)
- [W3Schools - Tutorial XML Schema](https://www.w3schools.com/xml/schema_intro.asp)
- [W3Schools - Tutorial DTD](https://www.w3schools.com/xml/xml_dtd_intro.asp)
- [Abrirllave.com - Tutorial XSD](https://www.abrirllave.com/xsd/)
