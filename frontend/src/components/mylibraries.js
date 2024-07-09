import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillFolder } from 'react-icons/ai';
import { AuthContext } from './AuthContext';

const MyLibraries = () => {
  const { userData, isAuthenticated } = useContext(AuthContext);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [libraries, setLibraries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      fetch(`http://127.0.0.1:5161/api/library/user/${userData.id}`)
        .then((response) => response.json())
        .then((data) => {
          setLibraries(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Ошибка при получении данных');
          setIsLoading(false);
        });
    }

    setIsAuthChecked(true);
  }, [userData]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5161/api/category`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        console.log(data)
      })
      .catch((error) => {
        console.log('Ошибка при получении данных');
      });
  }, [])

  const handleLogin = () => {
    navigate('/autorization');
  };

  const handleLibraryClick = (libraryId) => {
    console.log(`Нажата библиотека с ID: ${libraryId}`);
    navigate(`/library/${libraryId}`); // Переход на страницу `/library` с переданным ID библиотеки
    // Здесь вы можете выполнить необходимые действия, например, перенаправление на другую страницу с использованием navigate()
  };

  return (
    <>
      {!isAuthenticated && isAuthChecked && (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Please log in</h2>
            <p className="text-gray-600 mb-4">
              This feature requires you to be logged in. Please log in to access your libraries.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      )}

      <table className="table-auto w-full" style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Created Date</th>
            <th className="px-4 py-2 border">Access</th>
          </tr>
        </thead>
        <tbody>
          {libraries.map((item) => (
            <tr
            key={item.id}
            className="border-b"
            onClick={() => handleLibraryClick(item.id)}
            style={{ cursor: 'pointer' }}
            >
              <td className="px-4 py-2 border">
                <div className="flex items-center">
                  <AiFillFolder className="text-gray-500 mr-2" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </td>
              <td className="px-4 py-2 border">
                {categories.find(category => category.id === item.categoryId)?.name || 'Нет категории'}
              </td>
              <td className="px-4 py-2 border">
                {new Date(item.createdDate).toLocaleString()}
              </td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.isPublic ? 'Public' : 'Private'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MyLibraries;