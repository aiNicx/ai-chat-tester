import { useState, useEffect } from 'react';

const ChatMessage = ({ message, isLoading = false }) => {
  const { role, content, timestamp } = message;
  const isUser = role === 'user';
  const [formattedTime, setFormattedTime] = useState('');
  
  // Formatta il timestamp in un formato leggibile
  useEffect(() => {
    if (timestamp) {
      const date = new Date(timestamp);
      setFormattedTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [timestamp]);

  // Applica classe di allineamento in base al mittente
  const messageContainerClass = isUser 
    ? 'd-flex justify-content-end mb-4' 
    : 'd-flex justify-content-start mb-4';
  
  // Stili migliorati per i messaggi
  const messageBubbleClass = isUser
    ? 'bg-primary text-white rounded-4 p-3 shadow-sm'
    : 'bg-white dark:bg-dark text-dark dark:text-light border rounded-4 p-3 shadow-sm';
    
  // Rendering indicatore di caricamento
  if (isLoading) {
    return (
      <div className="d-flex justify-content-start mb-4">
        <div className="bg-white dark:bg-dark border rounded-4 p-3 shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <div className="spinner-grow spinner-grow-sm text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-primary" role="status" style={{animationDelay: '0.2s'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow spinner-grow-sm text-primary" role="status" style={{animationDelay: '0.4s'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Funzione per formattare il messaggio, sostituendo \n con <br />
  const formatContent = (text) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={messageContainerClass}>
      <div className="d-flex flex-column" style={{ maxWidth: '85%' }}>
        <div className={messageBubbleClass}>
          <div className="message-content" style={{ wordBreak: 'break-word' }}>
            {formatContent(content)}
          </div>
        </div>
        {formattedTime && (
          <span className="text-muted small mt-1 mx-2">
            {formattedTime}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage; 