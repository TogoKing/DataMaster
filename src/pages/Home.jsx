import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, TrendingUp, Play } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import AnnouncementCard from '../components/AnnouncementCard';

const BACKGROUND_IMAGE = 'https://i.pinimg.com/736x/46/1a/8d/461a8dbdedcdbaeeb71ffca70c606fa0.jpg';

const Home = () => {
  const { courses, announcements } = useData();
  const { user } = useAuth();

  const featuredCourses = courses.slice(0, 4);
  const recentAnnouncements = announcements.slice(0, 3);

  const stats = [
    { icon: BookOpen, value: courses.length > 0 ? courses.length + '+' : '0+', label: 'Formations' },
    { icon: Users, value: '1000+', label: 'Apprenants' },
    { icon: Award, value: '20+', label: 'Certificats Délivrés' },
    { icon: TrendingUp, value: '95%', label: 'Taux de Satisfaction' }
  ];

  const categories = [
    { name: 'DataMaster', count: 0, icon: '📊' },
    { name: 'Harvard', count: 0, icon: '🎓' },
    { name: 'Analytics Vidhya', count: 0, icon: '📈' },
    { name: 'Musique', count: 0, icon: '🎵' },
    { name: 'Design UI/UX', count: 0, icon: '🎨' },
    { name: 'Montage Vidéo', count: 0, icon: '🎬' },
    { name: 'Création de Contenu', count: 0, icon: '📱' }
  ];

  // Count courses per category
  categories.forEach(cat => {
    cat.count = courses.filter(c => c.category === cat.name).length;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative pt-16 min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={BACKGROUND_IMAGE} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 to-[#2563EB]/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Formez-vous avec les{' '}
                <span className="text-[#F59E0B]">Meilleurs</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Découvrez nos formations de qualité en Data Science, Design, Musique et bien plus. 
                Apprenez à votre rythme et validez vos compétences avec des certificats reconnus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses" className="btn-primary flex items-center justify-center space-x-2">
                  <span>Découvrir les Formations</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {!user && (
                  <Link to="/register" className="px-6 py-3 bg-[#F59E0B] text-white rounded-lg font-semibold hover:bg-[#D97706] transition-all duration-300 shadow-lg flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Commencer Gratuitement</span>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20">
                  <stat.icon className="w-8 h-8 mb-2 text-[#F59E0B]" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-gray-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Announcements Section */}
      {recentAnnouncements.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Dernières Annonces
              </h2>
              <Link to="/contact" className="text-[#1E3A8A] hover:text-[#2563EB] font-medium">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Nos Catégories de Formations
          </h2>
          {courses.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {categories.filter(c => c.count > 0).map((category) => (
                <Link
                  key={category.name}
                  to={`/courses?category=${category.name}`}
                  className="flex flex-col items-center p-4 rounded-xl hover:shadow-lg transition-all bg-gray-50 hover:bg-white border border-gray-100"
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="font-medium text-gray-900 text-center">{category.name}</span>
                  <span className="text-sm text-gray-500">{category.count} formations</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg mb-4">Aucune formation disponible pour le moment.</p>
              <p className="text-gray-400">Revenez bientôt ou contactez-nous pour plus d'informations.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Courses */}
      {courses.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Formations en Vedette
              </h2>
              <Link to="/courses" className="text-[#1E3A8A] hover:text-[#2563EB] font-medium">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à Commencer Votre Voyage ?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Rejoignez des milliers d'apprenants et développez vos compétences avec nos formations de qualité.
          </p>
          {!user && (
            <Link to="/register" className="inline-flex items-center space-x-2 bg-[#F59E0B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#D97706] transition-all shadow-lg">
              <span>Créer un Compte Gratuit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
