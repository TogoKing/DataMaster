import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DM</span>
              </div>
              <span className="text-xl font-bold text-white">DataMaster</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Votre plateforme de formation de référence. Découvrez nos cours et formations 
              en Data Science, Design, Musique et bien plus encore.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100095420502191" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/datamaster_1?igsh=OWZpYjlqY2I0ampo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Formations</Link></li>
              <li><Link to="/certificates" className="hover:text-white transition-colors">Certificats</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>datamaster557@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+228 93 83 60 08</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+228 93 86 42 69</span>
              </li>
              <li>
                <a 
                  href="https://chat.whatsapp.com/F2NCzMfbwgRBgfq32EPfOp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300"
                >
                  <span>Rejoindre WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} DataMaster. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
