import { Link } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import { useChatContext } from '../contexts/ChatContext';
import { getModelById } from '../services/modelConfig';

const Home = () => {
  const { model, temperature } = useChatContext();
  const modelInfo = getModelById(model);
  
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="bg-white border-bottom shadow-sm py-3 px-4">
        <div className="container-fluid d-flex justify-content-between align-items-center" style={{ maxWidth: '1200px' }}>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <h1 className="h4 mb-0 fw-bold">AI Chat Tester</h1>
            <div className="d-none d-sm-flex ms-3 gap-2">
              <span className="badge bg-light text-dark px-3 py-2">
                {modelInfo.name}
              </span>
              <span className="badge bg-light text-dark px-3 py-2">
                Temp: {temperature.toFixed(1)}
              </span>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="btn btn-primary btn-sm px-3 py-2"
          >
            Configurazioni
          </Link>
        </div>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center p-0">
        <div className="w-100 h-100" style={{ maxWidth: '1200px' }}>
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};

export default Home; 