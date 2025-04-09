import { Link } from 'react-router-dom';
import ConfigPanel from '../components/ConfigPanel';

const Dashboard = () => {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <header className="bg-white border-bottom shadow-sm py-3 px-4">
        <div className="container-fluid d-flex justify-content-between align-items-center" style={{ maxWidth: '1200px' }}>
          <h1 className="h3 mb-0">Configurazioni</h1>
          <Link
            to="/"
            className="btn btn-primary btn-sm px-3 py-2"
          >
            Torna alla Chat
          </Link>
        </div>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center p-3 p-md-4">
        <div className="w-100" style={{ maxWidth: '1200px' }}>
          <ConfigPanel />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 