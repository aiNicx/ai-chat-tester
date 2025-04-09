import { useState, useEffect, useRef } from 'react';
import { useChatContext } from '../contexts/ChatContext';

const TemperatureSlider = () => {
  const { temperature, setTemperature } = useChatContext();
  const [sliderValue, setSliderValue] = useState(temperature);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef(null);
  
  // Per assicurarci che lo slider sia sempre aggiornato con il valore del contesto
  useEffect(() => {
    setSliderValue(temperature);
  }, [temperature]);
  
  // Aggiorna solo lo stato locale durante lo spostamento dello slider
  const handleSliderChange = (e) => {
    setSliderValue(parseFloat(e.target.value));
  };
  
  // Aggiorna il contesto quando lo slider viene rilasciato
  const handleSliderRelease = () => {
    setTemperature(sliderValue);
  };
  
  // Stile e posizione del tooltip
  const getTooltipStyle = () => {
    if (!sliderRef.current) return {};
    
    const sliderWidth = sliderRef.current.offsetWidth;
    const percentage = (sliderValue - 0) / (2 - 0); // Mappa la posizione tra 0 e 2
    const tooltipPosition = percentage * sliderWidth;
    
    return {
      left: `calc(${tooltipPosition}px)`,
      transform: 'translateX(-50%)'
    };
  };
  
  // Descrizioni per diversi livelli di temperature
  const getTemperatureDescription = () => {
    if (sliderValue <= 0.3) return 'Risposte molto prevedibili e coerenti';
    if (sliderValue <= 0.7) return 'Equilibrio tra creatività e coerenza';
    if (sliderValue <= 1.2) return 'Risposte più creative e varie';
    return 'Alta creatività e diversità, ma meno prevedibile';
  };
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Temperature: {sliderValue.toFixed(1)}</label>
      
      <div className="relative">
        <div 
          className="text-xs flex justify-between mb-1"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span>Preciso</span>
          <span>Bilanciato</span>
          <span>Creativo</span>
        </div>
        
        <div className="relative" ref={sliderRef}>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          
          {showTooltip && (
            <div 
              className="absolute -top-10 py-1 px-2 bg-gray-700 text-white text-xs rounded pointer-events-none"
              style={getTooltipStyle()}
            >
              {getTemperatureDescription()}
            </div>
          )}
        </div>
        
        <div className="flex justify-between text-xs mt-1">
          <span>0.0</span>
          <span>1.0</span>
          <span>2.0</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureSlider; 