import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFile, FaDownload } from "react-icons/fa";
import axios from "axios";

const ShowLibrary = () => {
  const { libraryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [documents, setDocuments] = useState([]);
  const [library, setLibrary] = useState([]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5161/api/document/library/${libraryId}`)
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Ошибка при получении данных");
        setIsLoading(false);
      });
  }, [libraryId]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5161/api/library/${libraryId}`)
      .then((response) => response.json())
      .then((data) => {
        setLibrary(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Ошибка при получении данных");
        setIsLoading(false);
      });
  }, [libraryId]);

  const handleUploadFile = () => {
    setShowModal(true);
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const closePopup = () => {
    setSelectedDocument(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", selectedFile.name);
      formData.append("libraryId", libraryId);

      try {
        await axios.post("http://127.0.0.1:5161/api/document", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Файл успешно загружен!");
        closeModal();
        window.location.reload();
      } catch (error) {
        console.log("Ошибка при загрузке файла:", error);
      }
    }
  };

  const handleDownload = async (documentId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5161/api/document/${documentId}/download`, {
        responseType: 'arraybuffer',
      });
  
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
  
      const contentTypeMap = {
        'text/plain': 'txt',
        'application/pdf': 'pdf',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
      };
  
      const contentType = response.headers['content-type'];
      const fileExtension = contentTypeMap[contentType] || 'bin';
  
      const filename = response.headers['content-disposition'] ? response.headers['content-disposition'].split('filename=')[1] : `document-${documentId}.${fileExtension}`;
  
      link.download = filename;
      link.click();
    } catch (error) {
      console.log('Ошибка при скачивании файла:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Документы библиотеки {libraryId}</h2>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          {documents.length === 0 ? (
            <p className="text-gray-500 text-lg">
              Эта библиотека не содержит никаких файлов
            </p>
          ) : (
            <>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-100 border">Название</th>
                    <th className="py-2 px-4 bg-gray-100 border">Тип контента</th>
                    <th className="py-2 px-4 bg-gray-100 border">Дата загрузки</th>
                    <th className="py-2 px-4 bg-gray-100 border">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => (
                    <tr
                      key={document.id}
                      onClick={() => handleDocumentClick(document)}
                      className="cursor-pointer"
                    >
                      <td className="py-2 px-4 border">
                        <FaFile className="inline-block mr-2" />
                        {document.title}
                      </td>
                      <td className="py-2 px-4 border">{document.contentType}</td>
                      <td className="py-2 px-4 border">
                        {new Date(document.uploadDate).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(document.id); // Pass the documentId as an argument
                        }}
                      >
                        <FaDownload />
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUploadFile}
      >
        Загрузить файл
      </button>

      {selectedDocument && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">{selectedDocument.title}</h3>
            <p className="text-gray-700">ID: {selectedDocument.id}</p>
            <p className="text-gray-500 mb-4">{selectedDocument.contentType}</p>
            <p className="text-gray-700">{selectedDocument.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closePopup}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Загрузить новый файл</h3>
            <input
              type="file"
              className="mb-4"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleFileUpload}
            >
              Загрузить
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowLibrary;