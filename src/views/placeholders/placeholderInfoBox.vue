<template>
  <div class="infoBox">
    <el-row>
      <h1>Platzhalter</h1>
      <span>
        <p style="font-size: 12px">
          Mithilfe von Platzhaltern können Sie einmalig definierte Textpassagen
          in beliebig vielen Dialogantworten parallel anzeigen lassen. Sobald
          Sie am Inhalt der Textpassage eine Änderung vornehmen, überträgt sich
          diese automatisch auf alle Vorkommen des Platzhalters, sodass die
          Pflege der einzelnen Dialogantworten entfällt.
        </p>

        <p style="font-size: 12px">
          Alle Platzhalter setzen sich aus zwei Teilen zusammen: Die
          Platzhalterbezeichnung dient als ID des Platzhalters und wird in einer
          Dialogantwort an gewünschter Stelle in der Form
          ##Platzhalterbezeichnung## eingesetzt. Der Platzhalterwert enthält den
          konkreten Ausdruck oder die Textpassage, die Ihr Kunde im Chatbot
          sieht.
        </p>

        <p style="font-size: 14px">
          In der folgenden Tabelle können Sie Ihre Platzhalter erstellen,
          bearbeiten oder löschen.
        </p>

        <p style="font-size: 14px">
          <span
            style="
              font-weight: bold;
              text-transform: uppercase;
              font-size: 13px;
            "
          >
            Tipp:
          </span>
          Um Dialoge zu finden, in denen die Platzhalter verwendet werden, geben
          Sie die Platzhalter einfach in der Form ##Platzhalterbezeichnung## im
          Suchfeld ein.
        </p>
      </span>
    </el-row>
  </div>
</template>
