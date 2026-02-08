import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, Heart, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: '/courses' },
    { name: 'Certificats', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo DataMaster avec DM */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">DM</span>
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-[#1E3A8A]' : 'text-white'}`}>
              DataMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : scrolled ? 'text-gray-700 hover:text-[#1E3A8A]' : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/favorites" className={`${scrolled ? 'text-gray-700' : 'text-gray-200'} hover:text-white`}>
                  <Heart className="w-5 h-5" />
                </Link>
                {isAdmin && (
                  <Link to="/admin" className={`${scrolled ? 'text-gray-700' : 'text-gray-200'} hover:text-white`}>
                    <span className="text-sm bg-[#F59E0B] text-white px-2 py-1 rounded font-medium">Admin</span>
                  </Link>
                )}
                <div className="relative group">
                  <button className={`flex items-center space-x-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                    <User className="w-5 h-5" />
                    <span className="hidden lg:block">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`font-medium ${scrolled ? 'text-gray-700 hover:text-[#1E3A8A]' : 'text-gray-200 hover:text-white'}`}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-[#F59E0B] text-white rounded-lg font-semibold hover:bg-[#D97706] transition-all duration-300 shadow-lg"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${scrolled ? 'text-[#1E3A8A]' : 'text-white'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/favorites" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Mes Favoris
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                      Administration
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="pt-4 space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 text-[#1E3A8A] border border-[#1E3A8A] rounded-lg">
                    Connexion
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 bg-[#1E3A8A] text-white rounded-lg">
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
