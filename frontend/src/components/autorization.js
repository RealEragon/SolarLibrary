import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Authorization = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (password !== confirmPassword) {
        setErrorMessage("Пароль и подтверждение пароля не совпадают");
        return;
      }

      fetch(`http://127.0.0.1:5161/api/user`, {
        method: "POST",
        body: JSON.stringify({
          nickname,
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 409) {
            throw new Error("Такой email уже используется");
          } else {
            throw new Error("Ошибка при регистрации");
          }
        })
        .then(data => {
          login(data);
          navigate('/profile');
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      fetch(`http://127.0.0.1:5161/api/user/login?email=${email}&password=${password}`)
        .then(response => response.json())
        .then(data => {
          login(data);
          navigate('/profile');
        })
        .catch(error => {
          setErrorMessage("Ошибка при авторизации");
        });
    }
  };

  const toggleRegistration = () => {
    setIsRegistering(!isRegistering);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isRegistering ? 'Регистрация' : 'Авторизация'}
          </h2>
          {errorMessage && (
            <div className="bg-red-500 text-white font-bold py-2 px-4 rounded mb-4">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="mb-4">
                <label htmlFor="nickname" className="block text-gray-700 font-bold mb-2">
                  Nickname:
                </label>
                <input
                  id="nickname"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Введите ваш nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
            )}
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
                  Подтвердите пароль:
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
                className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={toggleRegistration}
              >
                {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default Authorization;