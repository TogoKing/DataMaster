import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

// Initial courses - Empty for admin to add their own
const initialCourses = [];

const initialAnnouncements = [
  {
    id: 1,
    title: 'Bienvenue sur DataMaster',
    content: 'Découvrez nos formations de qualité en Data Science, Design, Musique et bien plus. Inscrivez-vous dès maintenant !',
    date: new Date().toISOString().split('T')[0],
    type: 'announcement',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Nouvelles Formations Bientôt Disponibles',
    content: 'Restez connectés pour découvrir nos nouvelles formations en Développement Web, Intelligence Artificielle et plus encore.',
    date: new Date().toISOString().split('T')[0],
    type: 'announcement',
    priority: 'medium'
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
