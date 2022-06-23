import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home, About, Store } from './pages';

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/store' element={<Store />} />
      </Routes>
    </Container>
  );
}

export default App;
