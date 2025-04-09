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

  // Aggiungi le istruzioni come messaggio di sistema se fornite
  const conversationMessages = instructions
    ? [{ role: 'system', content: instructions }, ...messages]
    : messages;

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
        throw new Error('API key non valida o scaduta');
      } else if (status === 429) {
        throw new Error('Limite di richieste superato. Riprova più tardi');
      } else {
        throw new Error(`Errore dal server: ${errorData.error || status}`);
      }
    } else if (error.request) {
      // Errori di timeout o di rete
      throw new Error('Impossibile contattare il server. Verifica la connessione');
    } else {
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