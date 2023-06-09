# installation
- folgenden Command ausführen:
    
      npm install

- [vue - Extension für vscode installieren](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Vue - Debug extension für Chrome installieren](https://github.com/vuejs/vue-devtools)

# Starten der App
Folgenden Command im Terminal ausführen. Der Platzhalter %environmentName% wird hierbei ersetzt mit einer verfügbaren environment im Ordner "environments". Ein Beispiel ist: lichtblick_dev:

    npm run dev -- --mode %environmentName%

# Backend - URL für die Lokale Entwicklung verwenden
Wenn man das Frontend mit dem lokalen Backend verwenden möchte, führt man folgenden Command aus:

    npm run dev -- --mode localBackend

# Debugging von JavaScript
## Empfohlen
https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/410550273/Lokales+Debugging+von+JavaScript+im+Frontend

## nicht empfohlen (Fehleranfällig)
- [Vue - Anleitung zum Debuggen innerhalb von VS-code](https://vuejs.org/v2/cookbook/debugging-in-vscode.html) -> Die Launch.json ist im repository und kann verwendet werden

# Links:
[Vuejs - Admin Vorlage](https://github.com/PanJiaChen/vue-element-admin)

[Link zu unserer AdminUI-Seite](https://admin.stadtwerk.bot/)
[Link zu unserer Dev AdminUI-Seite](https://adminuidev.stadtwerk.bot/)

[Element-Plus](https://element-plus.org/en-US/)

# ngrok url
If you started the backend with ngrok do not forget to add the ngrok url here in backendUrl.js using slash at the end!
E.g.: https://f8e5-77-185-100-154.ngrok.io/