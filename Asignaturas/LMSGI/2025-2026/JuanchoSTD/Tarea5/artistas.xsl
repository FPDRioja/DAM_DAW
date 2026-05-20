<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <html>
      <head>
        <title>Artistas</title>
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
            background-color: aquamarine;
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
        <h1>Artistas</h1>
        <table id="mitabla">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Año de nacimiento</th>
              <th>Año de fallecimiento</th>
              <th>País</th>
              <th>Página web</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="artistas/artista[nacimiento &gt; 1500]">
              <xsl:sort select="nacimiento" data-type="number" order="ascending"/>
              <tr>
                <td>
                  <xsl:value-of select="@cod"/>
                </td>
                <td>
                  <xsl:value-of select="nombreCompleto"/>
                </td>
                <td>
                  <xsl:value-of select="nacimiento"/>
                </td>
                <td>
                  <xsl:choose>
                    <xsl:when test="fallecimiento and fallecimiento != ''">
                      <xsl:value-of select="fallecimiento"/>
                    </xsl:when>
                    <xsl:otherwise>Desconocido</xsl:otherwise>
                  </xsl:choose>
                </td>
                <td>
                  <xsl:value-of select="pais"/>
                </td>
                <td>
                  <a href="{fichaCompleta}">Saber más</a>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
