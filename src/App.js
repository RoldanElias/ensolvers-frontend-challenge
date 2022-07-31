import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList'
import Search from './components/Search';
import Header from './components/Header'

const App = () => {

  const getNotes = () => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );
    return savedNotes?.notes ?? [];
  };

  const [notes, setNotes] = useState(getNotes());

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify({ notes })
    );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return <div className="container">
    <Header />
    <Search handleSearchNote={setSearchText} />
    <NotesList
      notes={notes.filter((note) =>
        note.text.toLowerCase().includes(searchText)
      )}
      handleAddNote={addNote}
      handleDeleteNote={deleteNote}
    />
  </div>
};

export default App;