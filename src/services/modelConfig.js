// Configurazione dei modelli disponibili su OpenRouter
export const MODELS = [
  {
    id: 'meta-llama/llama-4-maverick:free',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    description: 'Versione avanzata di Llama 4, ottimizzata per performance e creatività.',
    maxTokens: 256000,
    maxOutputTokens: 256000,
    defaultTemperature: 0.7,
    costPer1kTokensInput: 0.0,
    costPer1kTokensOutput: 0.0,
    responseSpeed: 'Veloce',
  },
  {
    id: 'meta-llama/llama-4-scout:free',
    name: 'Llama 4 Scout',
    provider: 'Meta',
    description: 'Versione leggera di Llama 4, ideale per compiti rapidi e semplici.',
    maxTokens: 9000,
    maxOutputTokens: 9000,
    defaultTemperature: 0.7,
    costPer1kTokensInput: 0.0,
    costPer1kTokensOutput: 0.0,
    responseSpeed: 'Molto Veloce',
  },
  {
    id: 'qwen/qwen2.5-vl-3b-instruct:free',
    name: 'Qwen 2.5 VL',
    provider: 'Alibaba',
    description: 'Modello multimodale con capacità di comprensione visiva e testuale.',
    maxTokens: 6144,
    defaultTemperature: 0.7,
    costPer1kTokensInput: 0.0,
    costPer1kTokensOutput: 0.0,
    responseSpeed: 'Veloce',
  },
  {
    id: 'deepseek/deepseek-chat-v3-0324:free',
    name: 'DeepSeek Chat v3',
    provider: 'DeepSeek',
    description: 'Modello conversazionale avanzato con ottime capacità di comprensione.',
    maxTokens: 8192,
    defaultTemperature: 0.7,
    costPer1kTokensInput: 0.0,
    costPer1kTokensOutput: 0.0,
    responseSpeed: 'Medio',
  },
  {
    id: 'google/gemma-3-12b-it:free',
    name: 'Gemma 3 12B IT',
    provider: 'Google',
    description: 'Modello italiano di Gemma, ottimizzato per la lingua italiana.',
    maxTokens: 8192,
    defaultTemperature: 0.7,
    costPer1kTokensInput: 0.0,
    costPer1kTokensOutput: 0.0,
    responseSpeed: 'Veloce',
  },
  {
    id: 'google/gemini-2.0-flash-thinking-exp:free',
    name: 'Gemini 2.0 Flash Thinking',
    provider: 'Google',
    description: 'Modello sperimentale con processo di pensiero potenziato e ragionamento avanzato.',
    maxTokens: 1048576,
    defaultTemperature: 0.7,
    costPer1kTokensInput: 0.0,
    costPer1kTokensOutput: 0.0,
    responseSpeed: 'Veloce',
  }
];

// Trova un modello per ID
export const getModelById = (id) => {
  return MODELS.find(model => model.id === id) || MODELS[0];
};

// Ottieni il modello predefinito
export const getDefaultModel = () => {
  return MODELS[0];
};

// Template di istruzioni predefiniti
export const INSTRUCTION_TEMPLATES = {
  base: 'Sei un assistente AI utile, onesto e innocuo.',
  creativo: 'Sei un assistente creativo che aiuta a generare idee uniche e innovative.',
  analitico: 'Sei un assistente analitico che fornisce spiegazioni dettagliate e logiche.',
  tutor: 'Sei un tutor paziente che spiega concetti in modo chiaro ed educativo.',
  conciso: 'Sei un assistente che fornisce risposte brevi e dirette al punto.'
};

export default { MODELS, getModelById, getDefaultModel, INSTRUCTION_TEMPLATES }; 