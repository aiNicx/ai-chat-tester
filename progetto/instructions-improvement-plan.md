# Piano di Implementazione del Sistema di Istruzioni Modulare

## Prompt 1: Creazione della Struttura Dati per le Istruzioni Modulari
[x]

Creare la struttura base del nuovo sistema di istruzioni modulare. Questo prompt include la creazione dei file JSON per i diversi tipi di istruzioni e l'implementazione del servizio che gestirà il caricamento e la combinazione delle istruzioni.

### Nuovi file da creare:
- `src/data/instructions/base.json`: Istruzioni di base sempre attive.
- `src/data/instructions/tone.json`: Stili di comunicazione (formale, casual, professionale).
- `src/data/instructions/domain.json`: Istruzioni specifiche per dominio (programmazione, scrittura creativa, analisi dati).
- `src/data/instructions/persona.json`: Personalità del modello.
- `src/services/instructionService.js`: Servizio per la gestione delle istruzioni.

### Descrizione:
Implementare un sistema che permetta di comporre istruzioni da diverse categorie. Il servizio `instructionService.js` deve fornire funzioni per caricare le istruzioni dalle diverse categorie, combinarle in modo efficace e formattarle per l'invio all'API. Ogni file JSON conterrà oggetti con chiave (id dell'istruzione) e valore (testo dell'istruzione).

## Prompt 2: Aggiornamento del Contesto e della Logica di Gestione delle Istruzioni
[x]

Aggiornare il contesto della chat e i servizi correlati per supportare il nuovo sistema di istruzioni modulare e rimuovere il vecchio sistema di template.

### File da modificare:
- `src/contexts/ChatContext.jsx`: Aggiornare per gestire le istruzioni modulari.
- `src/services/apiService.js`: Modificare per supportare il nuovo formato di istruzioni.
- `src/services/modelConfig.js`: Rimuovere `INSTRUCTION_TEMPLATES` e qualsiasi riferimento ad esso.

### Descrizione:
Estendere il `ChatContext` per gestire lo stato delle istruzioni modulari, includendo lo stato attivo per ciascuna categoria e la combinazione corrente. Aggiornare `apiService.js` per formattare correttamente le istruzioni composite in un unico messaggio di sistema quando si inviano richieste all'API, assicurando la compatibilità con OpenRouter. Eliminare completamente il vecchio sistema di template dalle configurazioni e aggiornare tutte le relative dipendenze.

## Prompt 3: Sviluppo dei Componenti UI per la Selezione delle Istruzioni
[x]

Creare i componenti UI necessari per selezionare e gestire le istruzioni modulari nella dashboard, sostituendo completamente il vecchio sistema di template.

### Nuovi file da creare:
- `src/components/instructions/InstructionModuleSelector.jsx`: Componente per selezionare moduli di istruzione.
- `src/components/instructions/InstructionPreview.jsx`: Componente per visualizzare l'anteprima delle istruzioni combinate.
- `src/components/instructions/InstructionCategory.jsx`: Componente per gestire una categoria di istruzioni.

### Descrizione:
Implementare componenti UI che permettano all'utente di selezionare istruzioni da diverse categorie. `InstructionModuleSelector` consentirà la selezione da ogni categoria, `InstructionCategory` gestirà la visualizzazione e selezione all'interno di una singola categoria, e `InstructionPreview` mostrerà l'anteprima delle istruzioni combinate prima dell'invio. Questi componenti sostituiranno completamente la vecchia interfaccia basata su template. Assicurarsi che il design sia coerente con il sistema Bootstrap utilizzato nel resto dell'applicazione.

## Prompt 4: Riprogettazione dell'Editor di Istruzioni e del Pannello di Configurazione
[x]

Riprogettare completamente i componenti esistenti per integrare il nuovo sistema di istruzioni e rimuovere il vecchio sistema di template.

### File da modificare:
- `src/components/InstructionEditor.jsx`: Riprogettare completamente, eliminando la funzionalità di template.
- `src/components/ConfigPanel.jsx`: Integrare il nuovo sistema di istruzioni.
- `src/components/ui/Card.jsx`: Eventuali adattamenti per supportare il layout a tab/schede.

### Descrizione:
Riprogettare `InstructionEditor.jsx` per utilizzare un'interfaccia a tab che consenta la selezione da diverse categorie di istruzioni e l'inserimento di istruzioni personalizzate, eliminando completamente il pulsante "Template" e la logica associata. Rimuovere l'import di `INSTRUCTION_TEMPLATES` e qualsiasi riferimento ad esso. Aggiornare `ConfigPanel.jsx` per integrare la nuova interfaccia dell'editor di istruzioni. Adattare i componenti UI esistenti secondo necessità, mantenendo la coerenza con il design system Bootstrap.

## Prompt 5: Implementazione della Persistenza e Integrazione con l'Interfaccia Chat
[x]

Implementare la persistenza delle configurazioni di istruzioni e integrare il nuovo sistema con l'interfaccia di chat.

### File da modificare:
- `src/components/ChatInterface.jsx`: Aggiornare per utilizzare le istruzioni composite.
- `src/contexts/ChatContext.jsx`: Aggiungere la persistenza della configurazione di istruzioni.
- `src/pages/Dashboard.jsx`: Eventuali adattamenti per il layout.

### Descrizione:
Aggiornare la logica di persistenza in `ChatContext.jsx` per salvare e caricare la configurazione completa delle istruzioni modulari nel localStorage. Modificare lo schema di persistenza per supportare un oggetto strutturato con le diverse categorie di istruzioni invece di una singola stringa. Implementare una strategia di migrazione per convertire le istruzioni salvate nel formato precedente al nuovo formato strutturato. Modificare `ChatInterface.jsx` per utilizzare il nuovo formato di istruzioni durante l'invio dei messaggi. Adattare `Dashboard.jsx` se necessario per accogliere il layout più complesso. Assicurarsi che non ci siano più riferimenti al vecchio sistema di template in nessuna parte dell'applicazione.

## Prompt 6: Test e Ottimizzazione del Sistema di Istruzioni
[x]

Testare a fondo il nuovo sistema di istruzioni, ottimizzare le prestazioni e migliorare l'esperienza utente.

### File da modificare:
- Tutti i file coinvolti nel sistema di istruzioni.

### Descrizione:
Verificare che tutte le funzionalità del nuovo sistema di istruzioni funzionino correttamente: selezione di istruzioni da diverse categorie, creazione di istruzioni personalizzate, combinazione efficace, persistenza della configurazione, e corretta trasmissione all'API. Ottimizzare il codice per prestazioni e usabilità. Aggiungere feedback visivi e tooltips per aiutare l'utente a comprendere il sistema. Assicurarsi che non ci siano residui del vecchio sistema di template che potrebbero causare confusione o errori.

## Prompt 7: Integrazione e Compatibilità
[x]

Assicurare una corretta integrazione del nuovo sistema di istruzioni con il resto dell'applicazione e gestire la compatibilità con i dati esistenti.

### Aspetti da considerare:
- Creare la directory `src/data/` e le sottodirectory necessarie se non esistono.
- Aggiornare tutte le importazioni che fanno riferimento a `INSTRUCTION_TEMPLATES`.
- Implementare una strategia di migrazione per convertire le istruzioni salvate nel formato precedente al nuovo formato strutturato.
- Assicurare la coerenza stilistica dei nuovi componenti UI con il design system esistente (Bootstrap).
- Verificare la compatibilità con l'API OpenRouter mantenendo il formato corretto per il messaggio di sistema.

### Descrizione:
Questo passaggio si concentra sugli aspetti di integrazione e compatibilità che potrebbero essere trascurati durante lo sviluppo del nuovo sistema. È fondamentale garantire che i dati esistenti vengano migrati correttamente, che tutte le dipendenze siano aggiornate e che l'esperienza utente rimanga coerente. Prestare particolare attenzione al formato delle istruzioni inviate all'API OpenRouter, assicurandosi che la combinazione delle diverse categorie di istruzioni produca un messaggio di sistema ben formattato e compatibile. Inoltre, verificare che il nuovo sistema funzioni correttamente con tutte le versioni dei browser supportati e che non ci siano problemi di compatibilità con le versioni precedenti dell'applicazione.
