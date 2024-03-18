import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { BookList } from './components/BookList';
import { AddBooks } from './components/AddBooks';
import { AuthorList } from './components/AuthorList';
import { AddAuthors } from './components/AddAuthors';
import { EditBooks } from './components/EditBooks';
import { EditAuthors } from './components/EditAuthors';
import { NotFoundPage } from './components/NotFoundPage';

function App() {
  const navigate = useNavigate()

  return (
    <div className="App">
      <header>
      <div className="insignia">Library Admin Dashboard</div>
        <nav className="nav">
          <button onClick={() => navigate("/books")}>Books</button>
          <button onClick={() => navigate("/books/add")}>Add Books</button>
          <button onClick={() => navigate("/authors")}>Authors</button>
          <button onClick={() => navigate("/authors/add")}>Add Authors</button>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<AddBooks />} />
        <Route path="/books/edit/:bookId" element={<EditBooks />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/authors/add" element={<AddAuthors />} />
        <Route path="/authors/edit/:authorId" element={<EditAuthors />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
