import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('datamaster_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Admin login check
    if (email === 'sagbosavio28@gmail.com' && password === 'savio2023') {
      const adminUser = {
        id: 'admin-1',
        email: 'sagbosavio28@gmail.com',
        name: 'Administrateur',
        role: 'admin'
      };
      localStorage.setItem('datamaster_user', JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true, user: adminUser };
    }
    
    // Regular user login (for future Supabase integration)
    const regularUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role: 'user'
    };
    localStorage.setItem('datamaster_user', JSON.stringify(regularUser));
    setUser(regularUser);
    return { success: true, user: regularUser };
  };

  const register = (name, email, password) => {
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('datamaster_user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem('datamaster_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
