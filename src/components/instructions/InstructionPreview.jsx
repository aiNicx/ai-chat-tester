import { useChatContext } from '../../contexts/ChatContext';
import { combineInstructions } from '../../services/instructionService';
import { useState } from 'react';

const InstructionPreview = () => {
  const { instructions } = useChatContext();
  const [copied, setCopied] = useState(false);

  const combined = combineInstructions(instructions);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border p-4 rounded-lg bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Anteprima Istruzioni</h3>
        <button
          className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => {
            navigator.clipboard.writeText(combined);
            handleCopy();
          }}
        >
          {copied ? 'Copiato!' : 'Copia'}
        </button>
      </div>
      <div className="text-sm whitespace-pre-line bg-white p-2 rounded">
        {combined || 'Nessuna istruzione selezionata'}
      </div>
    </div>
  );
};

export default InstructionPreview;