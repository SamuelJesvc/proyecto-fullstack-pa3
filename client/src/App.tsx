import { useState, useEffect } from 'react';
import { Articulo } from './types/types';
import AuthForm from './components/AuthForm';
import ArticuloForm from './components/ArticuloForm';
import ArticuloList from './components/ArticuloList';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  useEffect(() => {
    if (token) {
      fetchArticulos();
    }
  }, [token]);

  const fetchArticulos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/articulos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setArticulos(data);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setArticulos([]);
  };

  if (!token) {
    return (
      <div className="container">
        <h2>Bienvenido al Sistema</h2>
        <AuthForm setToken={(t) => {
          localStorage.setItem('token', t);
          setToken(t);
        }} />
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestión de Artículos</h2>
        <button onClick={handleLogout} style={{ width: '100px', backgroundColor: '#6c757d' }}>Salir</button>
      </div>
      <ArticuloForm token={token} refreshList={fetchArticulos} />
      <ArticuloList articulos={articulos} token={token} refreshList={fetchArticulos} />
    </div>
  );
}

export default App;
