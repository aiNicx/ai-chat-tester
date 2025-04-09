# Mappa della Directory - AI Chat Tester

## Struttura del Progetto
```
ai-chat-tester/
│
├── src/
│   ├── components/           # Componenti riutilizzabili
│   │   ├── ChatInterface.jsx    # Interfaccia principale della chat
│   │   ├── ChatMessage.jsx      # Componente per singolo messaggio
│   │   ├── ConfigPanel.jsx      # Pannello configurazione modello/parametri
│   │   ├── ModelSelector.jsx    # Dropdown per scegliere il modello
│   │   ├── TemperatureSlider.jsx # Slider per impostare la temperature
│   │   ├── InstructionEditor.jsx # Editor per le istruzioni al modello
│   │   └── ui/                  # Componenti UI riutilizzabili
│   │       ├── Button.jsx       # Componente button stilizzato
│   │       ├── Input.jsx        # Componente input stilizzato
│   │       └── Card.jsx         # Componente card stilizzato
│   │
│   ├── contexts/             # Context API di React
│   │   └── ChatContext.jsx   # Gestisce lo stato globale dell'applicazione
│   │
│   ├── services/             # Logica business e API
│   │   ├── apiService.js     # Funzioni per le chiamate API a OpenRouter
│   │   └── modelConfig.js    # Configurazioni dei modelli disponibili
│   │
│   ├── utils/                # Funzioni di utilità
│   │   └── formatters.js     # Formattazione messaggi, timestamp, ecc.
│   │
│   ├── pages/                # Pagine dell'applicazione
│   │   ├── Home.jsx          # Pagina principale con chat a schermo intero
│   │   └── Dashboard.jsx     # Pagina dashboard per la configurazione
│   │
│   ├── App.jsx               # Componente principale, routing
│   ├── index.jsx             # Entry point dell'applicazione
│   └── index.css             # Stili globali
│
├── public/                   # File statici
│   ├── index.html           # HTML template
│   └── favicon.ico          # Icona del sito
│
├── package.json             # Dipendenze e script
└── README.md                # Documentazione
```

## Descrizione dei File Principali

### Componenti (src/components/)

1. **ChatInterface.jsx**: Interfaccia principale della chat, include lista messaggi e input utente.
   - Gestisce invio messaggi e visualizzazione risposte
   - Si occupa della UI a schermo intero per la home

2. **ChatMessage.jsx**: Visualizza un singolo messaggio nella chat.
   - Supporta formattazione per messaggi utente vs AI
   - Gestisce loading state durante generazione risposta

3. **ConfigPanel.jsx**: Pannello per configurare il modello AI.
   - Contiene ModelSelector, TemperatureSlider e InstructionEditor
   - Fornisce bottoni per salvare configurazione e tornare alla chat

4. **ModelSelector.jsx**: Dropdown per selezionare modello AI.
   - Lista modelli da modelConfig.js
   - Mostra info aggiuntive su hover (velocità, costo, ecc.)

5. **TemperatureSlider.jsx**: Slider per regolare temperature del modello.
   - Range tipico 0-2 con step 0.1
   - Indicazione visiva del livello di casualità/creatività

6. **InstructionEditor.jsx**: Editor per modificare le istruzioni al modello.
   - Textarea con sintassi highlighting
   - Possibilità di salvare/caricare template di istruzioni

### Contexts (src/contexts/)

1. **ChatContext.jsx**: Context provider per stato globale.
   - Gestisce cronologia messaggi
   - Mantiene configurazione corrente (modello, temp, istruzioni)
   - Fornisce metodi per aggiornare stato e inviare messaggi

### Services (src/services/)

1. **apiService.js**: Gestisce comunicazione con OpenRouter API.
   - Funzione per inviare prompt e ricevere risposta
   - Gestisce autenticazione e parametri delle richieste

2. **modelConfig.js**: Configurazione dei modelli disponibili.
   - Lista di modelli con ID, nome, provider
   - Parametri default per ogni modello

### Pages (src/pages/)

1. **Home.jsx**: Pagina principale con chat a schermo intero.
   - Utilizza ChatInterface come componente principale
   - Include pulsante per accedere alla dashboard

2. **Dashboard.jsx**: Dashboard per configurazione modelli.
   - Utilizza ConfigPanel come componente principale
   - Include pulsante per tornare alla home/chat

### Core (src/)

1. **App.jsx**: Componente principale, gestisce routing.
   - Router con due route: / (Home) e /dashboard
   - Avvolge tutto con ChatContext.Provider

2. **index.jsx**: Entry point dell'applicazione.
   - Monta App nel DOM
   - Setup di eventuali provider globali

3. **index.css**: Stili globali dell'applicazione.
   - Reset CSS e variabili di tema
   - Stili di base condivisi