<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="html" html-version="5.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Hiddendomain RSS Feed</title>
        <style>
          body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #fafafa; }
          .post { border-bottom: 1px solid #ddd; padding: 20px 0; }
          h1 { color: #222; }
        </style>
      </head>
      <body>
        <header>
          <h1>Hiddendomain Feed</h1>
        </header>
        
        <main>
          <xsl:apply-templates select="rss/channel/item"/>
        </main>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="item">
    <article class="post">
      <h2>
        <a href="{link}"><xsl:value-of select="title"/></a>
      </h2>
      <p><xsl:value-of select="description"/></p>
      <small>Published on: <xsl:value-of select="pubDate"/></small>
      <xsl:if test="*[local-name()='updated']">
       | <small>Last Modified: <xsl:value-of select="*[local-name()='updated']" /></small>
      </xsl:if>
    </article>
  </xsl:template>
</xsl:stylesheet>
