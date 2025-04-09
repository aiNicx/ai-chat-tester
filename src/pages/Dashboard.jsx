import { Link } from 'react-router-dom';
import ConfigPanel from '../components/ConfigPanel';

const Dashboard = () => {
  return (
    <div className="min-vh-100 p-3 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Configurazioni</h1>
          <Link 
            to="/" 
            className="btn btn-primary"
          >
            Torna alla Chat
          </Link>
        </div>
        
        <ConfigPanel />
      </div>
    </div>
  );
};

export default Dashboard; 