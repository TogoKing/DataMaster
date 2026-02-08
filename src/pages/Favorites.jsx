import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import CourseCard from '../components/CourseCard';

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getFavoritedCourses } = useData();
  const favoritedCourses = getFavoritedCourses();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-20 h-20 text-secondary-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mes Favoris
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Connectez-vous pour sauvegarder vos formations favorites
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
                Mes Favoris
              </h1>
              <p className="text-xl text-gray-200">
                {favoritedCourses.length} formation{favoritedCourses.length !== 1 ? 's' : ''} sauvegardée{favoritedCourses.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Link 
              to="/courses" 
              className="hidden md:flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span>Voir toutes les formations</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {favoritedCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoritedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              {/* CTA */}
              <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Prêt à Commencer ?
                </h2>
                <p className="text-gray-200 mb-6">
                  Consultez notre boutique pour accéder à toutes nos formations
                </p>
                <a
                  href="https://hxlybyvr.mychariow.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <span>Accéder à la Boutique</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucune formation sauvegardée
              </h3>
              <p className="text-gray-500 mb-6">
                Ajoutez des formations à vos favoris pour les retrouver facilement
              </p>
              <Link to="/courses" className="btn-primary">
                Découvrir les Formations
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
