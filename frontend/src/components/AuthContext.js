import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Проверяем наличие сохраненных данных аутентификации в локальном хранилище
    const savedUserData = localStorage.getItem('userData');
    const savedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (savedUserData && savedIsAuthenticated) {
      setUserData(JSON.parse(savedUserData));
      setIsAuthenticated(JSON.parse(savedIsAuthenticated));
    }
  }, []);

  const login = (data) => {
    setIsAuthenticated(true);
    setUserData(data);

    // Сохраняем данные аутентификации в локальном хранилище
    localStorage.setItem('userData', JSON.stringify(data));
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);

    // Удаляем данные аутентификации из локального хранилища
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};