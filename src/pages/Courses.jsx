import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const { courses } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState(searchParams.get('source') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['all', 'DataMaster', 'Harvard', 'Analytics Vidhya', 'Musique', 'Design UI/UX', 'Montage Vidéo', 'Création de Contenu'];
  const sources = [
    { value: 'all', label: 'Toutes les Sources' },
    { value: 'datamaster', label: 'DataMaster', color: 'bg-primary-600' },
    { value: 'harvard', label: 'Harvard', color: 'bg-red-600' },
    { value: 'analytics_vidhya', label: 'Analytics Vidhya', color: 'bg-orange-500' }
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = selectedSource === 'all' || course.source === selectedSource;
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceRange === 'free') matchesPrice = course.price === 0;
      else if (priceRange === 'paid') matchesPrice = course.price > 0;
      
      return matchesSearch && matchesSource && matchesCategory && matchesPrice;
    });
  }, [courses, searchTerm, selectedSource, selectedCategory, priceRange]);

  const handleSourceChange = (source) => {
    setSelectedSource(source);
    if (source !== 'all') {
      setSearchParams({ source });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Formations
          </h1>
          <p className="text-xl text-gray-200">
            Découvrez nos formations de qualité et developpez vos compétences
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Source Filter */}
              <select
                value={selectedSource}
                onChange={(e) => handleSourceChange(e.target.value)}
                className="input-field w-auto"
              >
                {sources.map(source => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field w-auto"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes les Catégories' : category}
                  </option>
                ))}
              </select>

              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="input-field w-auto"
              >
                <option value="all">Tous les Prix</option>
                <option value="free">Gratuit</option>
                <option value="paid">Payant</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-500'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-500'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredCourses.length} formation{filteredCourses.length !== 1 ? 's' : ''} trouvée{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucune formation trouvée
              </h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
