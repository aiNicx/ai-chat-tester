# Prompt Sequenziali per lo Sviluppo dell'App AI Chat Tester

## Fase 1: Setup Iniziale
1. Crea un nuovo progetto React utilizzando Create React App o Vite con la configurazione base.
2. Installa le dipendenze necessarie: React Router, Axios, React Icons.
3. Configura Tailwind CSS seguendo ESCLUSIVAMENTE questi passaggi:
   - Installa tailwindcss, postcss e autoprefixer con `npm install -D tailwindcss postcss autoprefixer`
   - Inizializza Tailwind con `npx tailwindcss init -p`
   - NON creare MAI manualmente i file di configurazione
   - Se l'inizializzazione fallisce, diagnosticare e risolvere il problema, quindi ritentare
   - Aggiungi le direttive Tailwind nel file CSS principale
4. Configura la struttura di directory come da mappa fornita.
5. Imposta il routing di base con React Router tra Home e Dashboard.

## Fase 2: Contesto e Stato Globale
5. Implementa ChatContext.jsx per gestire lo stato globale dell'app.
6. Crea i reducer e le azioni per manipolare la cronologia dei messaggi.
7. Aggiungi funzioni per cambiare modello, temperature e istruzioni.
8. Implementa la persistenza delle configurazioni nel localStorage.

## Fase 3: Servizi API
9. Crea apiService.js con le funzioni per comunicare con OpenRouter API.
10. Implementa la funzione per inviare messaggi e ricevere risposte.
11. Aggiungi gestione errori e timeout per le richieste API.
12. Implementa modelConfig.js con la lista dei modelli disponibili da OpenRouter.

## Fase 4: Componenti UI Base
13. Crea componenti UI riutilizzabili nella cartella ui/:
    - Button.jsx: componente button con varianti (primario, secondario, ghost)
    - Input.jsx: campo input stilizzato
    - Card.jsx: contenitore card per contenuti
14. Crea il componente ChatMessage.jsx per visualizzare i singoli messaggi.
15. Implementa lo stile differenziato per messaggi utente vs AI usando Tailwind.
16. Aggiungi supporto per formattazione markdown nelle risposte AI.
17. Crea il componente loading/typing per quando l'AI sta generando risposta.

## Fase 5: Interfaccia Chat
17. Sviluppa ChatInterface.jsx con area messaggi e input utente.
18. Implementa la funzionalità di invio messaggi e visualizzazione risposte.
19. Aggiungi auto-scroll quando arrivano nuovi messaggi.
20. Implementa pulsante per accedere alla dashboard.

## Fase 6: Componenti Configurazione
21. Crea ModelSelector.jsx con dropdown dei modelli disponibili.
22. Implementa TemperatureSlider.jsx con slider interattivo e tooltip.
23. Sviluppa InstructionEditor.jsx per modificare le istruzioni al modello.
24. Aggiungi validazione input e feedback visivo.

## Fase 7: Dashboard
25. Assembla ConfigPanel.jsx integrando i componenti di configurazione.
26. Crea la pagina Dashboard.jsx con layout responsive.
27. Implementa salvataggio configurazione e navigazione alla chat.
28. Aggiungi preview delle impostazioni attuali.

## Fase 8: Home Page
29. Completa Home.jsx integrando ChatInterface a schermo intero.
30. Aggiungi indicatore del modello e configurazione attuale.
31. Implementa pulsante di accesso rapido alla dashboard.
32. Ottimizza per visualizzazione mobile e desktop.

## Fase 9: Miglioramenti UI/UX
33. Implementa tema chiaro/scuro.
34. Aggiungi animazioni di transizione tra pagine.
35. Migliora feedback visivo durante caricamento/errori.
36. Ottimizza responsive design per vari dispositivi.

## Fase 10: Testing e Rifinitura
37. Testa la comunicazione con OpenRouter API.
38. Verifica il corretto salvataggio/caricamento delle configurazioni.
39. Controlla la gestione degli errori API e UI.
40. Risolvi eventuali bug e problemi di prestazioni.

## Fase 11: Documentazione
41. Aggiorna README.md con istruzioni di installazione e utilizzo.
42. Aggiungi commenti al codice per migliorare leggibilità.
43. Documenta l'integrazione con OpenRouter API.
44. Prepara una breve guida utente per l'app.

## Fase 12: Deploy
45. Prepara l'app per il deployment (build ottimizzata).
46. Configura environment variables per API keys.
47. Esegui deploy su piattaforma hosting (Vercel, Netlify, ecc.).
48. Testa l'applicazione in ambiente di produzione.