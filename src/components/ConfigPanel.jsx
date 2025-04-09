import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '../contexts/ChatContext';
import ModelSelector from './ModelSelector';
import TemperatureSlider from './TemperatureSlider';
import InstructionEditor from './InstructionEditor';
import Button from './ui/Button';
import { getApiKey } from '../services/apiService';

const ConfigPanel = () => {
  const { clearChat } = useChatContext();
  const [apiKey, setApiKey] = useState(getApiKey());
  const [showSuccess, setShowSuccess] = useState(false);
  
  const navigate = useNavigate();
  
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };
  
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openrouter_api_key', apiKey);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };
  
  const handleClearChat = () => {
    if (window.confirm('Sei sicuro di voler cancellare tutta la conversazione?')) {
      clearChat();
    }
  };
  
  const handleBackToChat = () => {
    navigate('/');
  };
  
  return (
    <div className="d-flex flex-column gap-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title h5 mb-4">Impostazioni Modello AI</h2>
          
          <div className="mb-4">
            <ModelSelector />
          </div>
          
          <div className="mb-4">
            <TemperatureSlider />
          </div>
          
          <div className="mb-4">
            <InstructionEditor />
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <h2 className="card-title h5 mb-3">API Key</h2>
          <p className="text-muted small mb-3">
            Per utilizzare l'app è necessaria una API key di OpenRouter.
            {import.meta.env.VITE_OPENROUTER_API_KEY && (
              <span className="d-block mt-1 text-success">
                Una API key è configurata nell'ambiente. Puoi comunque sovrascriverla qui.
              </span>
            )}
          </p>
          
          <div className="mb-3">
            <label className="form-label">
              OpenRouter API Key
            </label>
            <div className="input-group mb-2">
              <input
                type="password"
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="Inserisci API Key"
                className="form-control"
              />
              <button
                onClick={handleSaveApiKey}
                className="btn btn-primary"
              >
                Salva
              </button>
            </div>
            {showSuccess && (
              <div className="alert alert-success py-1 px-3 small mt-2">API key salvata con successo!</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-between mt-3">
        <Button 
          variant="danger"
          onClick={handleClearChat}
        >
          Cancella Chat
        </Button>
        
        <Button 
          variant="primary"
          onClick={handleBackToChat}
        >
          Torna alla Chat
        </Button>
      </div>
    </div>
  );
};

export default ConfigPanel; 