import React, { useState } from 'react';

const Authorization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Логика регистрации
      console.log('Регистрация:', { email, password, confirmPassword });
    } else {
      // Логика авторизации
      console.log('Авторизация:', { email, password });
    }
  };

  const toggleRegistration = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? 'Регистрация' : 'Авторизация'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegistering && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                Подтверждение пароля:
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Подтвердите ваш пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isRegistering ? 'Зарегистрироваться' : 'Войти'}
            </button>
            <button
              type="button"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={toggleRegistration}
            >
              {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authorization;