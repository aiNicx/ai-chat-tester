import { Link } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import { useChatContext } from '../contexts/ChatContext';
import { getModelById } from '../services/modelConfig';

const Home = () => {
  const { model, temperature } = useChatContext();
  const modelInfo = getModelById(model);
  
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="bg-white shadow-sm border-bottom">
        <div className="container-fluid py-2 px-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h1 className="h4 mb-0 fw-bold">AI Chat Tester</h1>
              <div className="d-none d-sm-flex ms-3">
                <span className="badge bg-light text-dark me-2">
                  {modelInfo.name}
                </span>
                <span className="badge bg-light text-dark">
                  Temp: {temperature.toFixed(1)}
                </span>
              </div>
            </div>
            
            <Link 
              to="/dashboard" 
              className="btn btn-primary btn-sm"
            >
              Configurazioni
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow-1 container-fluid p-0">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Home; 