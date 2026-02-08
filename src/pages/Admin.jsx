import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  BookOpen, Bell, Users, Settings, LogOut, 
  Plus, Trash2, Eye, Upload, Image, X, CheckCircle
} from 'lucide-react';

const Admin = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { courses, announcements, addCourse, updateCourse, deleteCourse, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();
  const [activeTab, setActiveTab] = useState('courses');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: 'DataMaster',
    source: 'datamaster',
    shopLink: '',
    duration: '',
    level: 'Débutant',
    instructor: 'DataMaster Team'
  });

  // Announcement form state
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    type: 'announcement',
    priority: 'medium'
  });

  if (!user || !isAdmin) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseForm({ ...courseForm, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setCourseForm({ ...courseForm, image: '' });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    addCourse({
      ...courseForm,
      price: parseFloat(courseForm.price) || 0
    });
    setShowCourseModal(false);
    resetCourseForm();
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      price: '',
      image: '',
      category: 'DataMaster',
      source: 'datamaster',
      shopLink: '',
      duration: '',
      level: 'Débutant',
      instructor: 'DataMaster Team'
    });
    setImagePreview(null);
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    addAnnouncement(announcementForm);
    setShowAnnouncementModal(false);
    setAnnouncementForm({
      title: '',
      content: '',
      type: 'announcement',
      priority: 'medium'
    });
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      deleteCourse(id);
    }
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      deleteAnnouncement(id);
    }
  };

  const tabs = [
    { id: 'courses', label: 'Formations', icon: BookOpen, count: courses.length },
    { id: 'announcements', label: 'Annonces', icon: Bell, count: announcements.length },
    { id: 'users', label: 'Utilisateurs', icon: Users, count: 1 },
    { id: 'settings', label: 'Paramètres', icon: Settings, count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 w-64 h-screen bg-white shadow-lg z-40 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Admin</p>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </div>
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 mt-8 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Formations</h1>
                <button
                  onClick={() => {
                    resetCourseForm();
                    setShowCourseModal(true);
                  }}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter une Formation</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Formation</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img src={course.image} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-gray-900">{course.title}</p>
                              <p className="text-sm text-gray-500">{course.duration}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{course.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">
                            {course.price === 0 ? 'Gratuit' : `${course.price.toLocaleString()} CFA`}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.source === 'datamaster' ? 'bg-primary-100 text-primary-700' :
                            course.source === 'harvard' ? 'bg-red-100 text-red-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {course.source === 'datamaster' ? 'DataMaster' : course.source === 'harvard' ? 'Harvard' : 'Analytics Vidhya'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleDeleteCourse(course.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Annonces</h1>
                <button
                  onClick={() => setShowAnnouncementModal(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter une Annonce</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.type === 'promotion' ? 'bg-green-100 text-green-700' :
                          announcement.type === 'event' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {announcement.type === 'promotion' ? 'Promotion' : announcement.type === 'event' ? 'Événement' : 'Annonce'}
                        </span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.priority === 'high' ? 'bg-red-100 text-red-700' :
                          announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {announcement.priority === 'high' ? 'Haute' : announcement.priority === 'medium' ? 'Moyenne' : 'Basse'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 mb-4">{announcement.content}</p>
                    <p className="text-sm text-gray-500">Publiée le {announcement.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Gestion des Utilisateurs</h1>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600">Fonctionnalité en cours de développement...</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h1>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600">Fonctionnalité en cours de développement...</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Ajouter une Formation</h2>
              <button 
                onClick={() => {
                  setShowCourseModal(false);
                  resetCourseForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    required
                    className="input-field"
                    placeholder="Titre de la formation"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    required
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Description de la formation"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix (CFA)</label>
                  <input
                    type="number"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                    className="input-field"
                    placeholder="0 pour gratuit"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="DataMaster">DataMaster</option>
                    <option value="Harvard">Harvard</option>
                    <option value="Analytics Vidhya">Analytics Vidhya</option>
                    <option value="Musique">Musique</option>
                    <option value="Design UI/UX">Design UI/UX</option>
                    <option value="Montage Vidéo">Montage Vidéo</option>
                    <option value="Création de Contenu">Création de Contenu</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <select
                    value={courseForm.source}
                    onChange={(e) => setCourseForm({ ...courseForm, source: e.target.value })}
                    className="input-field"
                  >
                    <option value="datamaster">DataMaster</option>
                    <option value="harvard">Harvard</option>
                    <option value="analytics_vidhya">Analytics Vidhya</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="input-field"
                    placeholder="Ex: 6 semaines"
                  />
                </div>
                
                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image de la formation</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Aperçu" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Image uploadée
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="text-center cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Cliquez pour sélectionner une image</p>
                        <p className="text-sm text-gray-500">ou glissez-déposez une image ici</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lien Boutique</label>
                  <input
                    type="url"
                    value={courseForm.shopLink}
                    onChange={(e) => setCourseForm({ ...courseForm, shopLink: e.target.value })}
                    required
                    className="input-field"
                    placeholder="https://hxlybyvr.mychariow.shop/..."
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowCourseModal(false);
                    resetCourseForm();
                  }} 
                  className="flex-1 btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Ajouter une Annonce</h2>
              <button 
                onClick={() => setShowAnnouncementModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  required
                  className="input-field"
                  placeholder="Titre de l'annonce"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                <textarea
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  required
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Contenu de l'annonce..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={announcementForm.type}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="announcement">Annonce</option>
                    <option value="promotion">Promotion</option>
                    <option value="event">Événement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                    className="input-field"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                <button type="button" onClick={() => setShowAnnouncementModal(false)} className="flex-1 btn-secondary">
                  Annuler
                </button>
                <button type="submit" className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Publier</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
