# AI Chat Tester

Un'applicazione React per testare e confrontare diversi modelli di AI attraverso OpenRouter.

## Funzionalità Principali

- Interfaccia chat in tempo reale
- Supporto per diversi modelli AI (GPT-4, GPT-3.5, Claude 3 Opus, Claude 3 Sonnet, ecc.)
- Configurazione della temperature (creatività del modello)
- Istruzioni personalizzate per il modello
- Template di istruzioni predefiniti
- Design responsive e tema chiaro/scuro
- Persistenza delle configurazioni e chat

## Prerequisiti

- Node.js 14.x o superiore
- npm o yarn
- Un account OpenRouter e una API key (ottienila su [openrouter.ai](https://openrouter.ai))

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/tuonome/ai-chat-tester.git
   cd ai-chat-tester
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Configura le variabili d'ambiente:
   - Copia il file `.env.example` in un nuovo file chiamato `.env`
   - Modifica il file `.env` inserendo la tua API key di OpenRouter

4. Avvia l'applicazione in modalità sviluppo:
   ```bash
   npm run dev
   ```

5. L'applicazione sarà disponibile all'indirizzo: [http://localhost:5173](http://localhost:5173)

## Configurazione API Key

Ci sono due modi per configurare l'API key:

1. **Tramite file .env** (consigliato per lo sviluppo):
   - Crea un file `.env` nella root del progetto
   - Aggiungi la tua API key: `VITE_OPENROUTER_API_KEY=your_api_key_here`

2. **Tramite interfaccia**:
   - Avvia l'applicazione
   - Inserisci la tua API key quando richiesto
   - L'API key sarà salvata nel localStorage del browser

## Utilizzo

1. **Chat**: La pagina principale mostra l'interfaccia di chat dove puoi interagire con l'AI.
2. **Configurazioni**: Accedi alle impostazioni tramite il pulsante "Configurazioni" per:
   - Selezionare il modello AI
   - Regolare la temperature
   - Impostare istruzioni personalizzate
   - Salvare/modificare l'API key

## Tecnologie Utilizzate

- React 18
- React Router 6
- Tailwind CSS
- Axios per le chiamate API
- Context API per la gestione dello stato
- Vite come build tool

## Note sulla Sicurezza

- L'API key viene salvata nel localStorage del browser o nel file .env
- Le conversazioni sono salvate solo localmente
- Nessun dato viene inviato a server diversi da quello di OpenRouter

## Licenza

MIT
