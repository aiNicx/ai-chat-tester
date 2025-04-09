import InstructionModuleSelector from './instructions/InstructionModuleSelector';

const InstructionEditor = () => {

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Configurazione Istruzioni</h2>
      <p className="text-sm text-gray-600">
        Personalizza il comportamento del modello selezionando dalle diverse categorie
      </p>
      
      <InstructionModuleSelector />
    </div>
  );
};

export default InstructionEditor;