import InstructionCategory from './InstructionCategory';
import InstructionPreview from './InstructionPreview';
import { useChatContext } from '../../contexts/ChatContext';

const InstructionModuleSelector = () => {
  const { instructions, setInstructions } = useChatContext();

  const handleCustomChange = (e) => {
    setInstructions({ custom: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <InstructionCategory 
          category="base"
          title="Istruzioni Base"
          description="Seleziona il comportamento generale dell'assistente"
        />
        <InstructionCategory
          category="tone"
          title="Stile di Comunicazione"
          description="Scegli il tono delle risposte"
        />
        <InstructionCategory
          category="domain"
          title="Dominio di Competenza"
          description="Specifica l'area di competenza"
        />
        <InstructionCategory
          category="persona"
          title="Personalità"
          description="Scegli lo stile di personalità"
        />
        <div>
          <h3 className="text-lg font-semibold mb-1">Istruzioni Personalizzate</h3>
          <textarea
            className="w-full p-2 border rounded h-24"
            value={instructions.custom || ''}
            onChange={handleCustomChange}
            placeholder="Aggiungi istruzioni personalizzate..."
          />
        </div>
      </div>
      <div>
        <InstructionPreview />
      </div>
    </div>
  );
};

export default InstructionModuleSelector;