import { createContext, useContext, useReducer, useEffect } from 'react';

// Valori iniziali
const initialState = {
  messages: [],
  model: 'gpt-4',
  temperature: 0.7,
  instructions: {
    base: 'default',
    tone: null,
    domain: null,
    persona: null,
    custom: ''
  },
  loading: false,
  error: null
};

// Tipi di azioni
const ActionTypes = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_MODEL: 'SET_MODEL',
  SET_TEMPERATURE: 'SET_TEMPERATURE',
  SET_INSTRUCTIONS: 'SET_INSTRUCTIONS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_CHAT: 'CLEAR_CHAT'
};

// Reducer
const chatReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case ActionTypes.SET_MODEL:
      return {
        ...state,
        model: action.payload
      };
    case ActionTypes.SET_TEMPERATURE:
      return {
        ...state,
        temperature: action.payload
      };
    case ActionTypes.SET_INSTRUCTIONS:
      return {
        ...state,
        instructions: {
          ...state.instructions,
          ...action.payload
        }
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ActionTypes.CLEAR_CHAT:
      return {
        ...state,
        messages: []
      };
    default:
      return state;
  }
};

// Crea il contesto
const ChatContext = createContext(null);

// Provider
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Carica stato da localStorage al mount
  useEffect(() => {
    const savedState = localStorage.getItem('chatState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Migra dal vecchio formato (stringa) al nuovo (oggetto)
        const instructions = typeof parsedState.instructions === 'string'
          ? { custom: parsedState.instructions }
          : parsedState.instructions;
          
        // Aggiorniamo solo le impostazioni, non i messaggi
        dispatch({ type: ActionTypes.SET_MODEL, payload: parsedState.model });
        dispatch({ type: ActionTypes.SET_TEMPERATURE, payload: parsedState.temperature });
        dispatch({ type: ActionTypes.SET_INSTRUCTIONS, payload: instructions });
        // Stato caricato e migrato con successo
      } catch (error) {
        console.error('Errore nel parsing dello stato salvato:', error);
      }
    }
  }, []);

  // Salva impostazioni in localStorage quando cambiano
  useEffect(() => {
    const stateToSave = {
      model: state.model,
      temperature: state.temperature,
      instructions: state.instructions
    };
    localStorage.setItem('chatState', JSON.stringify(stateToSave));
    // Stato salvato con successo
  }, [state.model, state.temperature, state.instructions]);

  // Azioni
  const addMessage = (message) => {
    dispatch({ type: ActionTypes.ADD_MESSAGE, payload: message });
  };

  const setModel = (model) => {
    dispatch({ type: ActionTypes.SET_MODEL, payload: model });
  };

  const setTemperature = (temperature) => {
    dispatch({ type: ActionTypes.SET_TEMPERATURE, payload: temperature });
  };

  const setInstructions = (instructions) => {
    // Supporta sia il vecchio formato (stringa) che il nuovo (oggetto)
    if (typeof instructions === 'string') {
      dispatch({
        type: ActionTypes.SET_INSTRUCTIONS,
        payload: { custom: instructions }
      });
    } else {
      dispatch({ type: ActionTypes.SET_INSTRUCTIONS, payload: instructions });
    }
  };

  const setLoading = (isLoading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const clearChat = () => {
    dispatch({ type: ActionTypes.CLEAR_CHAT });
  };

  const value = {
    ...state,
    addMessage,
    setModel,
    setTemperature,
    setInstructions,
    setLoading,
    setError,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Hook personalizzato per usare il contesto
/**
 * Hook personalizzato per usare il contesto
 * @returns {{
 *   messages: Array<{role: string, content: string}>,
 *   model: string,
 *   temperature: number,
 *   instructions: {
 *     base: string|null,
 *     tone: string|null,
 *     domain: string|null,
 *     persona: string|null,
 *     custom: string
 *   },
 *   loading: boolean,
 *   error: string|null,
 *   addMessage: Function,
 *   setModel: Function,
 *   setTemperature: Function,
 *   setInstructions: Function,
 *   setLoading: Function,
 *   setError: Function,
 *   clearChat: Function
 * }}
 */
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext deve essere usato all\'interno di un ChatProvider');
  }
  return context;
};

export default ChatContext; 