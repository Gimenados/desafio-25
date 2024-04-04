import React, { useState } from 'react';

function App() {
  // Definición del estado para almacenar las notas
  const [notes, ColocarNota] = useState([]);
  // Estados para almacenar el título y contenido de la nueva nota
  const [title, ColocarTitulo] = useState('');
  const [content, ColocarContenido] = useState('');

  // Función para agregar una nueva nota
  const AgregarNota = () => {
    // Verificar si tanto el título como el contenido no están vacíos
    if (title.trim() !== '' && content.trim() !== '') {
      // Agregar la nueva nota al estado de notas
      ColocarNota([...notes, { id: Date.now(), title, content, favorite: false }]);
      // Limpiar los campos de título y contenido
      ColocarTitulo('');
      ColocarContenido('');
    } else {
      // Mostrar una alerta si alguno de los campos está vacío
      alert('Por favor, ingrese un título y contenido para la nota.');
    }
  };

  // Función para editar una nota existente
  const EditarNota = (id, newTitle, newContent) => {
    // Mapear sobre las notas y actualizar la nota correspondiente
    const ActualizarNota = notes.map(note =>
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    );
    // Actualizar el estado de las notas
    ColocarNota(ActualizarNota);
  };

  // Función para eliminar una nota
  const EliminarNota = id => {
    // Filtrar las notas para eliminar la nota con el ID correspondiente
    const ActualizarNota = notes.filter(note => note.id !== id);
    // Actualizar el estado de las notas
    ColocarNota(ActualizarNota);
  };

  // Función para marcar/desmarcar una nota como favorita
const Favorito = id => {
  // Mapear sobre las notas y cambiar el estado de favorito de la nota correspondiente
  const ActualizarNota = notes.map(note =>
    note.id === id ? { ...note, favorite: !note.favorite, emoji: note.favorite ? '' : '⭐' } : note
  );
  // Actualizar el estado de las notas
  ColocarNota(ActualizarNota);
};


  return (
    <div className='container'>
      <h1>Notas</h1>
      <div className='container_data'>
        {/* Campos de entrada para título y contenido de la nueva nota */}
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => ColocarTitulo(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={e => ColocarContenido(e.target.value)}
        />
        {/* Botón para agregar una nueva nota */}
        <button className='button' onClick={AgregarNota}>Agregar Nota</button>
    </div>
    {notes.map(note => (
  <li className='lista' key={note.id}>
    {/* Título y contenido de la nota */}
    <h3>
      {note.title}
      {note.emoji} {/* Muestra el emoji aquí */}
    </h3>
    <p>{note.content}</p>
    {/* Botón para editar la nota */}
    <button className='button' onClick={() => EditarNota(note.id, prompt('Nuevo título', note.title), prompt('Nuevo contenido', note.content))}>Editar</button>
    {/* Botón para eliminar la nota */}
    <button className='button' onClick={() => EliminarNota(note.id)}>Eliminar</button>
    {/* Botón para marcar/desmarcar como favorita la nota */}
    <button className='button' onClick={() => Favorito(note.id)}>
      {note.favorite ? 'Desmarcar favorito' : 'Marcar como favorito'}
    </button>
  </li>
))}

    </div>
  );
}

export default App;
