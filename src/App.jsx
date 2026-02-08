import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Certificates from './pages/Certificates';
import Favorites from './pages/Favorites';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
