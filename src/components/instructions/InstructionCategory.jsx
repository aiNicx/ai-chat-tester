import { useChatContext } from '../../contexts/ChatContext';
import PropTypes from 'prop-types';
import { loadInstructions } from '../../services/instructionService';

const InstructionCategory = ({ 
  category, 
  title, 
  description 
}) => {
  const { instructions, setInstructions } = useChatContext();

  const handleChange = (value) => {
    setInstructions({ 
      [category]: value === 'none' ? null : value 
    });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <select
        className="w-full p-2 border rounded"
        value={instructions[category] || 'none'}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="none">Nessuna selezione</option>
        {Object.entries(loadInstructions(category)).map(([key]) => (
          <option key={key} value={key}>
            {key.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
};

InstructionCategory.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default InstructionCategory;