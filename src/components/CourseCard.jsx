import { Heart, Clock, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const CourseCard = ({ course }) => {
  const { toggleFavorite, favorites } = useData();
  const { user } = useAuth();
  const isFavorite = favorites.includes(course.id);

  const formatPrice = (price) => {
    if (price === 0) return 'Gratuit';
    return `${price.toLocaleString()}`;
  };

  const getSourceBadge = (source) => {
    const badges = {
      datamaster: { bg: 'bg-primary-600', text: 'DataMaster' },
      harvard: { bg: 'bg-red-600', text: 'Harvard' },
      analytics_vidhya: { bg: 'bg-orange-500', text: 'Analytics Vidhya' }
    };
    return badges[source] || badges.datamaster;
  };

  const badge = getSourceBadge(course.source);

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`${badge.bg} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
            {badge.text}
          </span>
        </div>
        <button
          onClick={() => user ? toggleFavorite(course.id) : null}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
          disabled={!user}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
            {course.category}
          </span>
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(course.price)}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{course.instructor}</span>
          </div>
        </div>
        
        <a
          href={course.shopLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center block"
        >
          Suivre
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
