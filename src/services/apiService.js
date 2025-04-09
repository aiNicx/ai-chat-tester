import axios from 'axios';
import { getModelById } from './modelConfig';

// Ottieni le variabili d'ambiente
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://openrouter.ai/api/v1';
const ENV_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// Timeout predefinito per le richieste (15 secondi)
const DEFAULT_TIMEOUT = 15000;

/**
 * Configura axios con l'API key
 * @param {string} apiKey - OpenRouter API key
 * @returns {Object} - Istanza axios configurata
 */
const createApiClient = (apiKey) => {
  return axios.create({
    baseURL: API_BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'AI Chat Tester'
    }
  });
};

/**
 * Ottieni l'API key da localStorage o dalle variabili d'ambiente
 * @returns {string} - API key
 */
export const getApiKey = () => {
  // Prima cerca in localStorage
  const localStorageKey = localStorage.getItem('openrouter_api_key');
  if (localStorageKey) return localStorageKey;
  
  // Altrimenti usa la variabile d'ambiente
  return ENV_API_KEY || '';
};

/**
 * Invia un messaggio al modello AI e riceve una risposta
 * @param {string} apiKey - OpenRouter API key
 * @param {string} modelId - ID del modello da utilizzare
 * @param {Array} messages - Array di messaggi nella conversazione
 * @param {Object} options - Opzioni aggiuntive (temperature, instructions, ecc.)
 * @returns {Promise} - Promise con la risposta
 */
export const sendMessage = async (apiKey, modelId, messages, options = {}) => {
  // Usa l'API key fornita o prendi quella da getApiKey()
  const actualApiKey = apiKey || getApiKey();
  
  if (!actualApiKey) {
    throw new Error('API key non fornita');
  }

  const apiClient = createApiClient(actualApiKey);
  const model = getModelById(modelId);

  // Prepara le opzioni della richiesta
  const { temperature = model.defaultTemperature, instructions = '' } = options;

  // Helper per formattare i messaggi per l'API (content come array)
  const formatMessagesForApi = (msgs, instr) => {
    const formatted = msgs.map(msg => ({
      role: msg.role,
      content: typeof msg.content === 'string'
        ? [{ type: 'text', text: msg.content }] // Converte stringa in array
        : Array.isArray(msg.content)
          ? msg.content // Lascia l'array com'è (es. per immagini)
          : [{ type: 'text', text: String(msg.content) }] // Fallback sicuro
    }));
    // Aggiunge le istruzioni di sistema all'inizio se fornite
    if (instr) {
      return [{ role: 'system', content: [{ type: 'text', text: instr }] }, ...formatted];
    }
    return formatted;
  };

  // Formatta i messaggi prima di inviarli
  const conversationMessages = formatMessagesForApi(messages, instructions);

  try {
    const response = await apiClient.post('/chat/completions', {
      model: modelId,
      messages: conversationMessages,
      temperature,
      max_tokens: Math.min(model.maxTokens, 4000) // Limitiamo per sicurezza
    });

    return response.data;
  } catch (error) {
    console.error('Errore nella richiesta API:', error);
    
    // Gestione errori specifici
    if (error.response) {
      // Errori di risposta dal server (4xx, 5xx)
      const status = error.response.status;
      const errorData = error.response.data;
      
      if (status === 401) {
        throw new Error('API key non valida o scaduta (401)');
      } else if (status === 429) {
        throw new Error('Limite di richieste superato (429). Riprova più tardi.');
      } else if (status === 402) {
        // Errore specifico per pagamento richiesto
        throw new Error('Errore 402: Pagamento richiesto o credito insufficiente per questo modello su OpenRouter.');
      } else {
        // Tenta di fornire un messaggio di errore più dettagliato dal server
        const errorMessage = errorData?.error?.message || JSON.stringify(errorData?.error) || errorData?.error || `Status Code ${status}`;
        throw new Error(`Errore dal server (${status}): ${errorMessage}`);
      }
    } else if (error.request) {
      // Errori di timeout o di rete
      throw new Error('Impossibile contattare il server. Verifica la connessione');
    } else {
      // Altri errori (es. configurazione richiesta)
      throw error;
    }
  }
};

/**
 * Controllo validità API key
 * @param {string} apiKey - OpenRouter API key
 * @returns {Promise<boolean>} - Promise con risultato validità
 */
export const validateApiKey = async (apiKey) => {
  if (!apiKey) return false;
  
  const apiClient = createApiClient(apiKey);
  
  try {
    await apiClient.get('/models');
    return true;
  } catch {
    return false;
  }
};

export default {
  sendMessage,
  validateApiKey,
  getApiKey
};