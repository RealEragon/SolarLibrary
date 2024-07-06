import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userData, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-3xl font-bold mb-4">Профиль пользователя</h2>
      {userData && (
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Информация о пользователе</div>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Идентификатор:</span> {userData.id}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Ник:</span> {userData.nickname}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
          </div>
          <div className="px-6 py-4">
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Выйти из профиля
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;