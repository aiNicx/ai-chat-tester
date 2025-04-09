import { useState } from 'react';
import { MODELS } from '../services/modelConfig';
import { useChatContext } from '../contexts/ChatContext';

const ModelSelector = () => {
  const { model, setModel } = useChatContext();
  const [showInfo, setShowInfo] = useState(false);
  const [selectedModelInfo, setSelectedModelInfo] = useState(null);
  
  const handleChange = (e) => {
    setModel(e.target.value);
  };
  
  const handleModelInfo = (e, modelData) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedModelInfo(modelData);
    setShowInfo(true);
  };
  
  const closeInfo = () => {
    setShowInfo(false);
    setSelectedModelInfo(null);
  };
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">Seleziona Modello</label>
      <div className="relative">
        <select
          value={model}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {MODELS.map((modelOption) => (
            <option key={modelOption.id} value={modelOption.id}>
              {modelOption.name} ({modelOption.provider})
            </option>
          ))}
        </select>
      </div>
      
      <div className="mt-2 text-sm">
        <button
          onClick={(e) => handleModelInfo(e, MODELS.find(m => m.id === model))}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Informazioni sul modello
        </button>
      </div>
      
      {/* Modal informazioni modello */}
      {showInfo && selectedModelInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedModelInfo.name}</h2>
              <button 
                onClick={closeInfo}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <p><strong>Provider:</strong> {selectedModelInfo.provider}</p>
              <p><strong>Descrizione:</strong> {selectedModelInfo.description}</p>
              <p><strong>Limite token:</strong> {selectedModelInfo.maxTokens.toLocaleString()}</p>
              <p><strong>Velocità risposta:</strong> {selectedModelInfo.responseSpeed}</p>
              <p><strong>Costo per 1K token input:</strong> ${selectedModelInfo.costPer1kTokensInput}</p>
              <p><strong>Costo per 1K token output:</strong> ${selectedModelInfo.costPer1kTokensOutput}</p>
            </div>
            
            <button
              onClick={closeInfo}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector; 