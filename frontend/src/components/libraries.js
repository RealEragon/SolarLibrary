import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillFolder } from 'react-icons/ai';

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      fetch(`http://127.0.0.1:5161/api/library`)
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
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:5161/api/category`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log('Ошибка при получении данных');
      });
  }, [])

  return (
    <>
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
            <tr key={item.id} className="border-b">
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

export default Libraries;