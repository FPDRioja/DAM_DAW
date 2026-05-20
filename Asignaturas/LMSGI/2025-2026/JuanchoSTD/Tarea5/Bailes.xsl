<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <html>
      <head>
        <title>Bailes de Salón</title>
        <style>
          #mitabla {
            border: 2px solid black;
            margin: 0 auto;
          }

          td {
            border: 2px solid black;
            text-align: center;
            margin: auto;
          }

          #celdasombra {
            border: 2px solid black;
            background-color: aquamarine;
            width: 180px;
            text-align: center;
            margin: auto;
          }

          th {
            border: 2px solid black;
            background-color: gold;
            font-size: 1.5em;
            text-align: center;
            margin: auto;
          }

          #centrado {
            text-align: center;
          }
        </style>
      </head>
      <body id="centrado">
        <h1>Bailes de Salón</h1>
        <table id="mitabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Profesor</th>
              <th>Plazas</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="Bailes/baile[plazas &gt;= 10]">
              <xsl:sort select="plazas" data-type="number" order="descending"/>
              <tr>
                <td>
                  <xsl:value-of select="nombre"/>
                </td>
                <td>
                  <xsl:for-each select="profesor">
                    <xsl:value-of select="."/>
                    <br/>
                  </xsl:for-each>
                </td>
                <td>
                  <xsl:value-of select="plazas"/>
                </td>
                <td>
                  <xsl:value-of select="precio"/>
                  <xsl:choose>
                    <xsl:when test="precio/@moneda = 'dolares'">
                      <xsl:text> &#36;</xsl:text>
                    </xsl:when>
                    <xsl:when test="precio/@moneda = 'euro'">
                      <xsl:text> &#8364;</xsl:text>
                    </xsl:when>
                    <xsl:when test="precio/@moneda = 'libras'">
                      <xsl:text> &#xA3;</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:text>€</xsl:text>
                    </xsl:otherwise>
                  </xsl:choose>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
        <p><b>Ordenado en descendente por plazas igual o superior a 10</b></p>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
