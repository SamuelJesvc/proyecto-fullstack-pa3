const Articulo = require('../models/Articulo');

exports.getArticulos = async (req, res) => {
  try {
    // Solo listar los artículos del usuario autenticado
    const articulos = await Articulo.find({ usuario: req.userId });
    res.status(200).json(articulos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos', error: error.message });
  }
};

exports.createArticulo = async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, precio } = req.body;
    if (!nombre || !descripcion || cantidad === undefined || precio === undefined) {
      return res.status(400).json({ message: 'Faltan datos del artículo.' });
    }

    const nuevoArticulo = new Articulo({
      nombre, descripcion, cantidad, precio, usuario: req.userId
    });

    const savedArticulo = await nuevoArticulo.save();
    res.status(201).json(savedArticulo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear artículo', error: error.message });
  }
};

exports.deleteArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    // Verificar que el artículo pertenece al usuario antes de eliminar
    const deletedArticulo = await Articulo.findOneAndDelete({ _id: id, usuario: req.userId });
    
    if (!deletedArticulo) {
      return res.status(400).json({ message: 'Artículo no encontrado o no autorizado para eliminar.' });
    }
    
    res.status(200).json({ message: 'Artículo eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar artículo', error: error.message });
  }
};
