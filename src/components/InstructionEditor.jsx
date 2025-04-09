import { useState, useEffect } from 'react';
import { useChatContext } from '../contexts/ChatContext';
import { INSTRUCTION_TEMPLATES } from '../services/modelConfig';

const InstructionEditor = () => {
  const { instructions, setInstructions } = useChatContext();
  const [localInstructions, setLocalInstructions] = useState(instructions);
  const [showTemplates, setShowTemplates] = useState(false);
  
  // Sincronizza lo stato locale quando cambia il contesto
  useEffect(() => {
    setLocalInstructions(instructions);
  }, [instructions]);
  
  const handleInputChange = (e) => {
    setLocalInstructions(e.target.value);
  };
  
  const handleSave = () => {
    setInstructions(localInstructions);
  };
  
  const handleTemplateSelect = (templateText) => {
    setLocalInstructions(templateText);
    setShowTemplates(false);
  };
  
  // Conta i caratteri e avvisa se superano una certa soglia
  const charCount = localInstructions.length;
  const maxChars = 1000;
  const isNearLimit = charCount > maxChars * 0.8;
  const isOverLimit = charCount > maxChars;
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium">Istruzioni per il Modello</label>
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Template
        </button>
      </div>
      
      <textarea
        value={localInstructions}
        onChange={handleInputChange}
        placeholder="Inserisci istruzioni personalizzate per guidare il comportamento del modello..."
        className={`w-100 p-3 border rounded-4 shadow-sm focus:outline-none focus:ring-3 min-vh-25 fs-6 ${
          isOverLimit
            ? 'border-danger focus:ring-danger'
            : 'focus:ring-primary'
        }`}
        style={{ minHeight: '220px', resize: 'vertical' }}
      />
      
      <div className="flex justify-between items-center mt-2">
        <span className={`text-xs ${
          isOverLimit 
            ? 'text-red-500' 
            : isNearLimit 
              ? 'text-yellow-500' 
              : 'text-gray-500'
        }`}>
          {charCount}/{maxChars} caratteri
        </span>
        
        <button
          onClick={handleSave}
          disabled={instructions === localInstructions || isOverLimit}
          className={`px-3 py-1 text-sm rounded ${
            instructions === localInstructions || isOverLimit
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          Salva
        </button>
      </div>
      
      {showTemplates && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 border rounded shadow-lg">
          <div className="p-2 border-b">
            <h3 className="text-sm font-medium">Template di Istruzioni</h3>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {Object.entries(INSTRUCTION_TEMPLATES).map(([key, text]) => (
              <li 
                key={key} 
                className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border-b"
                onClick={() => handleTemplateSelect(text)}
              >
                <div className="font-medium text-sm capitalize">{key}</div>
                <div className="text-xs text-gray-500 truncate">{text}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstructionEditor; 