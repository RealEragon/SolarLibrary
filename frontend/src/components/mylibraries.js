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

  const [showModal, setShowModal] = useState(false);
  const [newLibrary, setNewLibrary] = useState({
    createdDate: new Date(),
    name: '',
    description: '',
    isPublic: false,
    categoryId: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setNewLibrary((prevLibrary) => ({...prevLibrary, userId: userData.id }));
    }
  }, [userData]);

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
    navigate(`/library/${libraryId}`);
  };

  const handleCreateLibrary = () => {
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`http://127.0.0.1:5161/api/library`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLibrary),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log('Ошибка при создании библиотеки');
      });
  };
  
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setNewLibrary((prevLibrary) => ({ ...prevLibrary, [name]: checked }));
    } else {
      setNewLibrary((prevLibrary) => ({ ...prevLibrary, [name]: value }));
    }
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
          {libraries.length > 0 ? (
            libraries.map((item) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 border text-center">
                You don't have any libraries.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-center">Create New Library</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={newLibrary.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description:</label>
              <textarea
                name="description"
                value={newLibrary.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block mb-1 font-medium">Category:</label>
              <select
                name="categoryId"
                value={newLibrary.categoryId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPublic"
                checked={newLibrary.isPublic}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <label className="ml-2">Is public</label>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
              >
                Create Library
              </button>
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded ml-4"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      )}

      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 ml-4" onClick={handleCreateLibrary}>
        New library
      </button>
    </>
  );
};

export default MyLibraries;