import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Award, Download, Mail, Search, User } from 'lucide-react';
import { downloadCertificate, getCertificateBlob } from '../utils/certificateGenerator';

const Certificates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [certificates, setCertificates] = useState(() => {
    const stored = localStorage.getItem('datamaster_certificates');
    return stored ? JSON.parse(stored) : [];
  });
  const [newCertificate, setNewCertificate] = useState({
    userName: '',
    courseName: '',
    instructor: 'DataMaster Team',
    purchaseDate: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [generatedCert, setGeneratedCert] = useState(null);

  // For demo purposes, create a sample certificate if user is logged in
  const handleCreateCertificate = (e) => {
    e.preventDefault();
    
    const certificateId = `DM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const certificateData = {
      ...newCertificate,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      certificateId
    };

    // Generate certificate
    downloadCertificate(certificateData);
    setGeneratedCert(certificateData);
    
    // Save certificate
    const updatedCertificates = [...certificates, {
      ...certificateData,
      id: Date.now()
    }];
    setCertificates(updatedCertificates);
    localStorage.setItem('datamaster_certificates', JSON.stringify(updatedCertificates));
    
    setShowModal(false);
    setNewCertificate({
      userName: '',
      courseName: '',
      instructor: 'DataMaster Team',
      purchaseDate: ''
    });
  };

  const myCertificates = certificates.filter(cert => cert.userName.toLowerCase().includes(user?.name?.toLowerCase() || ''));

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Award className="w-20 h-20 text-secondary-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vos Certificats
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Connectez-vous pour accéder à vos certificats de formation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn-primary">
                Se connecter
              </Link>
              <Link to="/register" className="btn-secondary">
                Créer un compte
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Vos Certificats
              </h1>
              <p className="text-xl text-gray-200">
                Gérez et téléchargez vos certificats de formation
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Award className="w-5 h-5" />
              <span>Générer un Certificat</span>
            </button>
          </div>
        </div>
      </section>

      {/* Certificates List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un certificat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                  <p className="text-gray-600">Certificats Total</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                  <p className="text-gray-600">Téléchargements</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{user.name}</p>
                  <p className="text-gray-600">Propriétaire</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificates Grid */}
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates
                .filter(cert => 
                  cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  cert.courseName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((cert) => (
                <div key={cert.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4">
                    <Award className="w-12 h-12 text-white mx-auto" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {cert.courseName}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Nom:</strong> {cert.userName}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Formateur:</strong> {cert.instructor}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong>Date:</strong> {cert.date}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => downloadCertificate(cert)}
                        className="flex-1 btn-primary text-sm flex items-center justify-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => {
                          // Simulate email sending
                          alert(`Certificat envoyé à ${user.email || 'votre email'}`);
                        }}
                        className="flex-1 btn-secondary text-sm flex items-center justify-center space-x-1"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Award className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucun certificat disponible
              </h3>
              <p className="text-gray-500 mb-6">
                Achetez une formation sur notre boutique pour obtenir un certificat
              </p>
              <a
                href="https://hxlybyvr.mychariow.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Accéder à la Boutique
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Générer un Certificat
            </h2>
            <form onSubmit={handleCreateCertificate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet de l'apprenant
                </label>
                <input
                  type="text"
                  value={newCertificate.userName}
                  onChange={(e) => setNewCertificate({ ...newCertificate, userName: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Votre nom complet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formation suivie
                </label>
                <input
                  type="text"
                  value={newCertificate.courseName}
                  onChange={(e) => setNewCertificate({ ...newCertificate, courseName: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Nom de la formation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formateur
                </label>
                <input
                  type="text"
                  value={newCertificate.instructor}
                  onChange={(e) => setNewCertificate({ ...newCertificate, instructor: e.target.value })}
                  className="input-field"
                  placeholder="Nom du formateur"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'achat (sur la boutique)
                </label>
                <input
                  type="date"
                  value={newCertificate.purchaseDate}
                  onChange={(e) => setNewCertificate({ ...newCertificate, purchaseDate: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Générer PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
