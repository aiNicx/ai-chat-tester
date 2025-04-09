import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { ChatProvider } from './contexts/ChatContext';
import './App.css'

function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
