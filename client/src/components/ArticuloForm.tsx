import { useState } from 'react';

interface Props {
  token: string;
  refreshList: () => void;
}

export default function ArticuloForm({ token, refreshList }: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/articulos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, descripcion, cantidad, precio })
      });
      if (res.ok) {
        setNombre('');
        setDescripcion('');
        setCantidad(0);
        setPrecio(0);
        refreshList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h3>Crear Nuevo Artículo</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        <input type="number" placeholder="Cantidad" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} required />
        <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(Number(e.target.value))} required step="0.01" />
        <button type="submit">Guardar Artículo</button>
      </form>
    </div>
  );
}
