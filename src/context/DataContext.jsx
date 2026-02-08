import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

const initialCourses = [
  {
    id: 1,
    title: 'Formation Complète Data Science',
    description: 'Maîtrisez la science des données de A à Z avec Python, Machine Learning et Deep Learning',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    category: 'DataMaster',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/formation-complete-data-science',
    duration: '3 mois',
    level: 'Débutant à Avancé',
    instructor: 'DataMaster Team'
  },
  {
    id: 2,
    title: 'CS50: Introduction to Computer Science',
    description: 'Le célèbre cours de Harvard pour apprendre les fondamentaux de la programmation',
    price: 0,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
    category: 'Harvard',
    source: 'harvard',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/cs50-introduction-computer-science',
    duration: '12 semaines',
    level: 'Débutant',
    instructor: 'Harvard University'
  },
  {
    id: 3,
    title: 'Analytics Vidhya: Machine Learning Basics',
    description: 'Apprenez les bases du Machine Learning avec des projets pratiques',
    price: 0,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
    category: 'Analytics Vidhya',
    source: 'analytics_vidhya',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/analytics-vidhya-machine-learning',
    duration: '6 semaines',
    level: 'Intermédiaire',
    instructor: 'Analytics Vidhya'
  },
  {
    id: 4,
    title: 'Solfege pour Débutants',
    description: 'Apprenez les bases de la théorie musicale et du solfège',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400',
    category: 'Musique',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/solfege-debutants',
    duration: '4 semaines',
    level: 'Débutant',
    instructor: 'DataMaster Team'
  },
  {
    id: 5,
    title: 'UI/UX Design Masterclass',
    description: 'Devenez un expert en design dinterfaces utilisateur et expérience utilisateur',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    category: 'Design UI/UX',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/ui-ux-design-masterclass',
    duration: '8 semaines',
    level: 'Tous niveaux',
    instructor: 'DataMaster Team'
  },
  {
    id: 6,
    title: 'Montage Vidéo & Design Graphique',
    description: 'Maîtrisez le montage vidéo et la création graphique professionnelle',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400',
    category: 'Montage Vidéo',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/montage-video-design-graphique',
    duration: '6 semaines',
    level: 'Intermédiaire',
    instructor: 'DataMaster Team'
  },
  {
    id: 7,
    title: 'Création de Contenu Digital',
    description: 'Apprenez à créer du contenu engageant pour les réseaux sociaux',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
    category: 'Création de Contenu',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/creation-contenu-digital',
    duration: '4 semaines',
    level: 'Débutant',
    instructor: 'DataMaster Team'
  },
  {
    id: 8,
    title: 'CS50: Web Programming with Python and JavaScript',
    description: 'Apprenez le développement web avec Python et JavaScript',
    price: 0,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    category: 'Harvard',
    source: 'harvard',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/cs50-web-programming',
    duration: '12 semaines',
    level: 'Intermédiaire',
    instructor: 'Harvard University'
  },
  {
    id: 9,
    title: 'Analytics Vidhya: Deep Learning Specialization',
    description: 'Devenez expert en Deep Learning avec TensorFlow et PyTorch',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    category: 'Analytics Vidhya',
    source: 'analytics_vidhya',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/analytics-vidhya-deep-learning',
    duration: '10 semaines',
    level: 'Avancé',
    instructor: 'Analytics Vidhya'
  },
  {
    id: 10,
    title: 'Initiation aux Instruments de Musique',
    description: 'Découvrez plusieurs instruments et commencez à jouer',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
    category: 'Musique',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/initiation-instruments-musique',
    duration: '6 semaines',
    level: 'Débutant',
    instructor: 'DataMaster Team'
  },
  {
    id: 11,
    title: 'Formation Voix et Chant',
    description: 'Développez votre voix et apprenez les techniques de chant',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    category: 'Musique',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/formation-voix-chant',
    duration: '8 semaines',
    level: 'Tous niveaux',
    instructor: 'DataMaster Team'
  },
  {
    id: 12,
    title: 'Adobe Creative Suite Complet',
    description: 'Maîtrisez Photoshop, Illustrator, Premiere Pro et After Effects',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=400',
    category: 'Montage Vidéo',
    source: 'datamaster',
    shopLink: 'https://hxlybyvr.mychariow.shop/product/adobe-creative-suite',
    duration: '10 semaines',
    level: 'Intermédiaire',
    instructor: 'DataMaster Team'
  }
];

const initialAnnouncements = [
  {
    id: 1,
    title: 'Nouvelle Formation: IA & Machine Learning',
    content: 'Nous sommes ravis de vous annoncer le lancement de notre nouvelle formation complète en Intelligence Artificielle et Machine Learning. Inscrivez-vous dès maintenant!',
    date: '2024-01-15',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Promotion Spéciale: -20% sur toutes les formations',
    content: 'Profitez de notre promotion exceptionnelle. Toutes les formations sont à -20% jusquà la fin du mois!',
    date: '2024-01-10',
    type: 'promotion',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Ateliers Gratuits ce Weekend',
    content: 'Rejoignez-nous pour des ateliers gratuits de découverte en Data Science et Design UI/UX. Inscription requise.',
    date: '2024-01-08',
    type: 'event',
    priority: 'low'
  }
];

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem('datamaster_courses');
    return stored ? JSON.parse(stored) : initialCourses;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const stored = localStorage.getItem('datamaster_announcements');
    return stored ? JSON.parse(stored) : initialAnnouncements;
  });

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('datamaster_favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const [certificates, setCertificates] = useState(() => {
    const stored = localStorage.getItem('datamaster_certificates');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('datamaster_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('datamaster_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('datamaster_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('datamaster_certificates', JSON.stringify(certificates));
  }, [certificates]);

  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setCourses([...courses, newCourse]);
    return newCourse;
  };

  const updateCourse = (id, updatedData) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, ...updatedData } : course
    ));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const addAnnouncement = (announcement) => {
    const newAnnouncement = {
      ...announcement,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    return newAnnouncement;
  };

  const updateAnnouncement = (id, updatedData) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, ...updatedData } : a
    ));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const toggleFavorite = (courseId) => {
    if (favorites.includes(courseId)) {
      setFavorites(favorites.filter(id => id !== courseId));
    } else {
      setFavorites([...favorites, courseId]);
    }
  };

  const addCertificate = (certificate) => {
    const newCertificate = {
      ...certificate,
      id: Date.now(),
      issuedAt: new Date().toISOString()
    };
    setCertificates([...certificates, newCertificate]);
    return newCertificate;
  };

  const getFavoritedCourses = () => {
    return courses.filter(course => favorites.includes(course.id));
  };

  const getCertificatesByUser = (userEmail) => {
    return certificates.filter(cert => cert.userEmail === userEmail);
  };

  const value = {
    courses,
    announcements,
    favorites,
    certificates,
    addCourse,
    updateCourse,
    deleteCourse,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    toggleFavorite,
    addCertificate,
    getFavoritedCourses,
    getCertificatesByUser
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
