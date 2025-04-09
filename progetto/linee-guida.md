# Linee Guida per AI Chat Tester

## Principi di Sviluppo
1. **Semplicità**: Mantieni il codice semplice e diretto. Evita over-engineering.
2. **Modularità**: Componenti separati con responsabilità specifiche.
3. **Consistenza**: Mantieni convenzioni di naming e stile coerenti.
4. **User Experience**: L'interfaccia deve essere intuitiva e reattiva.
5. **Testabilità**: Il codice deve essere facile da testare.
6. **Design System**: Utilizza componenti UI condivisi e riutilizzabili nella cartella ui/.

## Gestione dei File e del Codice
1. **NON inventare file**: È ASSOLUTAMENTE VIETATO creare o modificare file di configurazione autonomamente.
2. **NO alla creazione autonoma**: L'agente NON deve MAI creare autonomamente file di configurazione, anche se l'inizializzazione fallisce.
3. **Risoluzione problemi**: In caso di errori, diagnosticare e risolvere il problema invece di creare soluzioni alternative.
4. **Verifica prima di procedere**: Controllare sempre che i file esistano prima di modificarli.
5. **Rispetta la struttura**: Seguire esattamente la struttura della directory fornita.
6. **Usa solo comandi ufficiali**: Utilizzare esclusivamente i comandi documentati ufficialmente.

## Best Practices

### Struttura e Organizzazione
- Usa nomi di file e funzioni descrittivi che indicano chiaramente lo scopo.
- Mantieni i componenti React piccoli e focalizzati su un singolo compito.
- Utilizza struttura di cartelle flat dove possibile per evitare nidificazione eccessiva.
- Separa logica business (services) dalla UI (components).

### Stato dell'Applicazione
- Usa il Context API per lo stato globale invece di prop drilling.
- Persisti le configurazioni in localStorage per mantenerle tra sessioni.
- Evita stati ridondanti - deriva i dati dallo stato principale quando possibile.
- Utilizza useState per stato locale dei componenti.

### Styling e Configurazione Tailwind CSS
- Adotta Tailwind CSS come framework principale per gli stili.
- **Inizializzazione Tailwind CSS**:
  1. Installa le dipendenze necessarie: `npm install -D tailwindcss postcss autoprefixer`
  2. Genera i file di configurazione con: `npx tailwindcss init -p`
  3. Configura i percorsi dei contenuti in `tailwind.config.js`:
     ```js
     /** @type {import('tailwindcss').Config} */
     module.exports = {
       content: [
         "./src/**/*.{js,jsx,ts,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```
  4. Aggiungi le direttive Tailwind al tuo CSS principale (`src/index.css`):
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
  5. Verifica che il compilatore Tailwind funzioni correttamente
  6. Se l'inizializzazione fallisce dopo 2 tentativi, crea manualmente i file di configurazione necessari
- Usa variabili CSS per colori, spaziature e dimensioni tipografiche attraverso il tema Tailwind.
- Implementa design responsive fin dall'inizio usando le classi responsive di Tailwind.
- Mantieni coerenza visiva tra Chat e Dashboard usando componenti stilisticamente uniformi.

### API e Data Fetching
- Centralizza la logica API in apiService.js.
- Implementa gestione timeout e retry per richieste fallite.
- Usa try/catch per catturare e gestire errori API.
- Implementa feedback visivo durante le operazioni asincrone.

### Performance
- Usa React.memo() per componenti che ricevono props stabili.
- Implementa lazy loading per componenti pesanti.
- Evita calcoli costosi nei render cycle.
- Limita il numero di messaggi visualizzati nella cronologia.

### Sicurezza
- Non inserire mai API keys direttamente nel codice sorgente.
- Usa environment variables (.env) per valori sensibili.
- Valida input utente prima di inviarlo all'API.
- Sanitizza output di testo da modelli AI prima di renderizzarli.

## Convenzioni di Codice

### Naming
- **Componenti**: PascalCase (es. ChatInterface.jsx)
- **File non-componenti**: camelCase (es. apiService.js)
- **Funzioni**: camelCase (es. sendMessage)
- **Variabili Context**: PascalCase (es. ChatContext)
- **Costanti**: UPPER_SNAKE_CASE (es. DEFAULT_TEMPERATURE)

### Import/Export
- Preferisci named exports per facilitare l'autocompletamento.
- Usa export default solo per il componente principale in un file.
- Ordina gli import: React, librerie esterne, componenti, utils.

### JSX
- Usa tags self-closing quando appropriato (`<Component />` vs `<Component></Component>`).
- Limita la logica nei template JSX, sposta in funzioni helper.
- Estrai JSX complesso in componenti o variabili separate.

### Gestione Errori
- Usa Error Boundaries per catturare errori nei componenti React.
- Implementa fallback UI per stati di errore.
- Logga errori significativi per debugging.

## Integrazione OpenRouter API

### Autenticazione
- Usa un token API OpenRouter conservato in environment variable.
- Implementa refresh automatico per sessioni lunghe.

### Gestione Modelli
- Carica dinamicamente lista modelli da OpenRouter quando possibile.
- Fornisci valori predefiniti sensati per ogni modello (temperature, ecc.).
- Includi informazioni su costi stimati per vari modelli.

### Istruzioni ai Modelli
- Fornisci template di istruzioni predefiniti per casi d'uso comuni.
- Implementa sistema di salvataggio/caricamento per istruzioni personalizzate.
- Valida lunghezza istruzioni per evitare troncamento.

## Testing e Debug
- Implementa mock per apiService durante lo sviluppo.
- Usa React DevTools per ispezione componenti.
- Testa l'app su diversi browser e dispositivi.
- Crea uno stato "demo" che non richiede API key per testing.

## Risolvere Problemi con Tailwind CSS
Se si verificano problemi con Tailwind CSS:

1. **NON creare mai manualmente i file di configurazione**:
   - Se l'inizializzazione di Tailwind fallisce, NON procedere con la creazione manuale dei file
   - Diagnosticare il problema e risolverlo alla radice
   - Riprovare il comando di inizializzazione corretto: `npx tailwindcss init -p`
   - Se il problema persiste, verificare l'installazione di Node.js e npm

2. **Problemi con le classi non applicate**:
   - Verificare che il progetto sia stato configurato correttamente attraverso i comandi ufficiali
   - Controllare che i percorsi nel file di configurazione (che deve essere generato automaticamente) corrispondano alla struttura del progetto
   - Riavviare il server di sviluppo
   - Utilizzare solo i comandi ufficialmente supportati da Tailwind CSS

3. **Approccio corretto**:
   - Seguire ESCLUSIVAMENTE la documentazione ufficiale di Tailwind CSS
   - Non tentare soluzioni alternative o creazione manuale di file
   - In caso di errori, ripristinare lo stato iniziale e ricominciare da capo
   - Se i tentativi falliscono, segnalare l'errore specifico con il suo messaggio completo

## Considerazioni Finali
- Questa è un'app di test, quindi favorisci velocità di sviluppo e flessibilità.
- Evita feature non essenziali per mantenere il progetto gestibile.
- Documenta le decisioni importanti e le assunzioni fatte.
- Mantieni il codice pulito ma non ripulire in modo eccessivo - l'app deve funzionare.