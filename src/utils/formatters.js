/**
 * Formatta un timestamp in un formato leggibile (HH:MM)
 * @param {number|string|Date} timestamp - Timestamp da formattare
 * @returns {string} - Stringa formattata
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Formatta una data in formato completo (GG/MM/AAAA HH:MM)
 * @param {number|string|Date} timestamp - Timestamp da formattare
 * @returns {string} - Stringa formattata
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Crea un messaggio con struttura standardizzata
 * @param {string} role - Ruolo (user o assistant)
 * @param {string} content - Contenuto del messaggio
 * @returns {Object} - Oggetto messaggio
 */
export const createMessage = (role, content) => {
  return {
    role,
    content,
    timestamp: Date.now(),
    id: generateId()
  };
};

/**
 * Genera un ID casuale
 * @returns {string} - ID univoco
 */
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Tronca un testo alla lunghezza massima specificata
 * @param {string} text - Testo da troncare
 * @param {number} maxLength - Lunghezza massima
 * @returns {string} - Testo troncato
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

export default {
  formatTime,
  formatDate,
  createMessage,
  truncateText
}; 