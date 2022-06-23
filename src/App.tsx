import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home, About, Store } from './pages';
import { Navbar } from './components';

function App() {
  return (
    <>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/store' element={<Store />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
