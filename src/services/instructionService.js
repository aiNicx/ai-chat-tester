import baseInstructions from '../data/instructions/base.json';
import toneInstructions from '../data/instructions/tone.json';
import domainInstructions from '../data/instructions/domain.json';
import personaInstructions from '../data/instructions/persona.json';

export const loadInstructions = (category) => {
  switch(category) {
    case 'base': return baseInstructions;
    case 'tone': return toneInstructions;
    case 'domain': return domainInstructions;
    case 'persona': return personaInstructions;
    default: return {};
  }
};

export const combineInstructions = (selected) => {
  const { base, tone, domain, persona, custom } = selected;
  let combined = '';
  
  if (base) combined += `${baseInstructions[base]}\n`;
  if (tone) combined += `${toneInstructions[tone]}\n`;
  if (domain) combined += `${domainInstructions[domain]}\n`;
  if (persona) combined += `${personaInstructions[persona]}\n`;
  if (custom) combined += `${custom}\n`;
  
  return combined.trim();
};

export const formatForAPI = (instructions) => {
  return {
    role: 'system',
    content: instructions
  };
};