import { useState } from 'react';

interface Props {
  setToken: (token: string) => void;
}

export default function AuthForm({ setToken }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      if (isLogin) {
        setToken(data.token);
      } else {
        alert('Registro exitoso. Ahora inicia sesión.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h3>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isLogin ? 'Ingresar' : 'Registrar'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: '#007bff' }}>
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </div>
  );
}
