import { useState, useRef, useEffect } from 'react';
import { useChatContext } from '../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import { createMessage } from '../utils/formatters';
import { getModelById } from '../services/modelConfig';
import { sendMessage, getApiKey } from '../services/apiService';

const ChatInterface = () => {
  const { 
    messages, 
    addMessage, 
    model, 
    temperature, 
    instructions,
    loading,
    setLoading,
    setError
  } = useChatContext();
  
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(getApiKey());
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Auto-scroll quando arrivano nuovi messaggi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };
  
  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openrouter_api_key', apiKey);
      setShowApiKeyInput(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }
    
    // Crea e aggiungi il messaggio utente
    const userMessage = createMessage('user', input);
    addMessage(userMessage);
    setInput('');
    
    // Focus sull'input dopo l'invio
    inputRef.current?.focus();
    
    // Prepara i messaggi da inviare all'API
    const apiMessages = messages.concat(userMessage).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    setLoading(true);
    
    try {
      const response = await sendMessage(
        apiKey,
        model,
        apiMessages,
        {
          temperature,
          instructions
        }
      );
      
      // Estrai e aggiungi la risposta dell'AI
      const aiContent = response.choices[0]?.message?.content || 'Nessuna risposta ricevuta.';
      const aiMessage = createMessage('assistant', aiContent);
      addMessage(aiMessage);
    } catch (error) {
      console.error('Errore nell\'invio del messaggio:', error);
      setError(error.message);
      
      // Messaggio di errore visibile all'utente
      const errorMessage = createMessage(
        'assistant', 
        `Si è verificato un errore: ${error.message}`
      );
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="d-flex flex-column h-100 bg-light dark:bg-dark">
      {/* API Key Modal */}
      {showApiKeyInput && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3 p-3">
          <div className="bg-white dark:bg-dark rounded-4 p-4 w-100 shadow-lg" style={{ maxWidth: '500px' }}>
            <h2 className="h5 fw-bold mb-3">API Key Richiesta</h2>
            <p className="mb-3 text-secondary">Inserisci la tua API key di OpenRouter per continuare.</p>
            <input
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              className="form-control form-control-lg mb-3"
              placeholder="Inserisci API Key"
            />
            <button
              onClick={saveApiKey}
              className="btn btn-primary btn-lg w-100"
            >
              Salva API Key
            </button>
          </div>
        </div>
      )}
      
      {/* Area Messaggi */}
      <div className="flex-grow-1 overflow-auto px-3 py-4" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="container-fluid" style={{ maxWidth: '900px' }}>
          {messages.length === 0 ? (
            <div className="text-center py-5">
              <div className="display-6 mb-3 text-primary">👋 Benvenuto!</div>
              <p className="lead mb-4 text-secondary">Inizia la conversazione con l'AI!</p>
              <div className="d-flex justify-content-center gap-2 flex-wrap">
                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                  Modello: {getModelById(model).name}
                </span>
                <span className="badge bg-primary-subtle text-primary px-3 py-2">
                  Temperature: {temperature.toFixed(1)}
                </span>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage key={msg.id || msg.timestamp} message={msg} />
            ))
          )}
          
          {loading && <ChatMessage message={{ role: 'assistant', content: '' }} isLoading={true} />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-top bg-white dark:bg-dark shadow-lg">
        <div className="container-fluid" style={{ maxWidth: '900px' }}>
          <form onSubmit={handleSubmit} className="p-3">
            <div className="input-group input-group-lg">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Scrivi un messaggio..."
                className="form-control border-2"
                style={{ borderRadius: '1rem 0 0 1rem' }}
              />
              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary px-4 ${loading ? 'disabled' : ''}`}
                style={{ borderRadius: '0 1rem 1rem 0' }}
              >
                <i className="bi bi-send-fill"></i>
                <span className="d-none d-sm-inline ms-2">Invia</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 