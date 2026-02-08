import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, TrendingUp, Play } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import AnnouncementCard from '../components/AnnouncementCard';

const Home = () => {
  const { courses, announcements } = useData();
  const { user } = useAuth();

  const featuredCourses = courses.slice(0, 4);
  const recentAnnouncements = announcements.slice(0, 3);

  const stats = [
    { icon: BookOpen, value: '50+', label: 'Formations' },
    { icon: Users, value: '1000+', label: 'Apprenants' },
    { icon: Award, value: '20+', label: 'Certificats Délivrés' },
    { icon: TrendingUp, value: '95%', label: 'Taux de Satisfaction' }
  ];

  const categories = [
    { name: 'DataMaster', count: 4, color: 'bg-primary-600', icon: '📊' },
    { name: 'Harvard', count: 2, color: 'bg-red-600', icon: '🎓' },
    { name: 'Analytics Vidhya', count: 2, color: 'bg-orange-500', icon: '📈' },
    { name: 'Musique', count: 3, color: 'bg-purple-600', icon: '🎵' },
    { name: 'Design UI/UX', count: 1, color: 'bg-pink-600', icon: '🎨' },
    { name: 'Montage Vidéo', count: 2, color: 'bg-teal-600', icon: '🎬' },
    { name: 'Création de Contenu', count: 1, color: 'bg-indigo-600', icon: '📱' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 pt-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Formez-vous avec les{' '}
                <span className="text-secondary-400">Meilleurs</span>
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
                  <Link to="/register" className="btn-secondary flex items-center justify-center space-x-2 border-white text-white hover:bg-white/10">
                    <Play className="w-5 h-5" />
                    <span>Commencer Gratuitement</span>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                  <stat.icon className="w-8 h-8 mb-2 text-secondary-400" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/courses?category=${category.name}`}
                className="flex flex-col items-center p-4 rounded-xl hover:shadow-lg transition-all bg-gray-50 hover:bg-white"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium text-gray-900 text-center">{category.name}</span>
                <span className="text-sm text-gray-500">{category.count} formations</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Formations en Vedette
            </h2>
            <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à Commencer Votre Voyage ?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Rejoignez des milliers d'apprenants et développez vos compétences avec nos formations de qualité.
          </p>
          {!user && (
            <Link to="/register" className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
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
