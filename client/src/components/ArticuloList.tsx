import { Articulo } from '../types/types';

interface Props {
  articulos: Articulo[];
  token: string;
  refreshList: () => void;
}

export default function ArticuloList({ articulos, token, refreshList }: Props) {
  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este artículo?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/articulos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        refreshList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Lista de Artículos</h3>
      {articulos.length === 0 ? <p>No hay artículos registrados.</p> : null}
      {articulos.map(art => (
        <div key={art._id} className="articulo-card">
          <div>
            <strong>{art.nombre}</strong> - ${art.precio} (Cant: {art.cantidad})
            <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#555' }}>{art.descripcion}</p>
          </div>
          <button className="btn-delete" onClick={() => handleDelete(art._id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
