import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1E3A8A] font-bold text-2xl">DM</span>
              </div>
              <span className="text-2xl font-bold text-white">DataMaster</span>
            </div>
            <p className="text-gray-200 mb-6 max-w-md">
              Votre plateforme de formation de référence. Découvrez nos cours et formations 
              en Data Science, Design, Musique et bien plus encore.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100095420502191" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/datamaster_1?igsh=OWZpYjlqY2I0ampo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Liens Rapides</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-200 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/courses" className="text-gray-200 hover:text-white transition-colors">Formations</Link></li>
              <li><Link to="/certificates" className="text-gray-200 hover:text-white transition-colors">Certificats</Link></li>
              <li><Link to="/contact" className="text-gray-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-gray-200">datamaster557@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-gray-200">+228 93 83 60 08</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-gray-200">+228 93 86 42 69</span>
              </li>
              <li>
                <a 
                  href="https://chat.whatsapp.com/F2NCzMfbwgRBgfq32EPfOp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#25D366] hover:text-[#20BD5A] font-medium"
                >
                  <span>Rejoindre WhatsApp</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-200">
            © {currentYear} DataMaster. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
