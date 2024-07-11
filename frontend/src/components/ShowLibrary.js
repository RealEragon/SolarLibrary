import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFile, FaDownload, FaTrash } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const ShowLibrary = () => {
  const { libraryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [documents, setDocuments] = useState([]);
  const [library, setLibrary] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);

  const [showDeleteLibraryModal, setShowDeleteLibraryModal] = useState(false);

  const [showActivitiesModal, setShowActivitiesModal] = useState(false);
  const [activities, setActivities] = useState([]);


  const { userData } = useContext(AuthContext);

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

  useEffect(() => {
    fetch(`http://127.0.0.1:5161/api/activity/library/${libraryId}`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
        console.log(data)
      })
      .catch((error) => {
        console.log("Error fetching activities:", error);
      });
  }, [libraryId]);

  const handleUploadFile = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5161/api/document/${selectedDocumentId}`);
      const fileName = response.data.title;
      await axios.delete(`http://127.0.0.1:5161/api/document/${selectedDocumentId}`);
      setShowDeleteModal(false);
      window.location.reload();
      handleCreateActivity(`Deleted document ${fileName} by ${userData.nickname}`, userData.id, libraryId);
    } catch (error) {
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = (documentId) => {
    setSelectedDocumentId(documentId);
    setShowDeleteModal(true);
  };

  const handleDeleteLibrary = async () => {
    setShowDeleteLibraryModal(true);
  };

  const handleConfirmDeleteLibrary = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5161/api/library/${libraryId}`);
      setShowDeleteLibraryModal(false);
      navigate('/libraries');
    } catch (error) {
      console.log("Ошибка при удалении библиотеки:", error);
    }
  };
  
  const handleCancelDeleteLibrary = () => {
    setShowDeleteLibraryModal(false);
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
        closeModal();
        window.location.reload();
        handleCreateActivity(`Uploaded document ${selectedFile.name} by ${userData.nikc}`, userData.id, libraryId);
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
  
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition ? contentDisposition.split('filename=')[1] : 'document';
      handleCreateActivity(`Downloaded document ${fileName} by ${userData.nickname}`, userData.id, libraryId);

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
  
      const filename = contentDisposition ? contentDisposition.split('filename=')[1] : `document-${documentId}.${fileExtension}`;
  
      link.download = filename;
      link.click();
    } catch (error) {
      console.log('Ошибка при скачивании файла:', error);
    }
  };

  const handleCreateActivity = async (name, userId, libraryId) => {
    try {
      await axios.post('http://127.0.0.1:5161/api/activity', {
        name,
        userId,
        libraryId,
      });
    } catch (error) {
      console.log('Error creating activity:', error);
    }
  };

  const handleShowActivities = () => {
    setShowActivitiesModal(true);
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Documents of libarry "{library.name}"</h2>

      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        {userData.id === library.userId && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleDeleteLibrary(library.id)}
          >
            Delete library
          </button>
        )}
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {documents.length === 0 ? (
            <p className="text-gray-500 text-lg">
              This library doesn't contain any documents
            </p>
          ) : (
            <>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-100 border">Name</th>
                    <th className="py-2 px-4 bg-gray-100 border">Content type</th>
                    <th className="py-2 px-4 bg-gray-100 border">Upload data</th>
                    <th className="py-2 px-4 bg-gray-100 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => (
                    <tr
                      key={document.id}
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
                          handleDownload(document.id);
                        }}
                      >
                        <FaDownload />
                      </button>
                      {userData.id == library.userId && (
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(document.id); 
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}

      {userData.id === library.userId && (
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleUploadFile}
          >
            Upload document
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
            onClick={handleShowActivities}
          >
            Activities
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Upload new document</h3>
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
              Upload
            </button>
            <button
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Delete this document?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this document?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteLibraryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Delete library?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this library?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleConfirmDeleteLibrary}
              >
                Delete
              </button>
              <button
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={handleCancelDeleteLibrary}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{showActivitiesModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
      <h3 className="text-2xl font-bold mb-4">Activities</h3>
      {activities && activities.length > 0 ? (
        <ul className="list-none mb-4">
          {activities.map((activity) => (
            <li key={activity.id} className="py-2 border-b border-gray-200">
              <div className="flex justify-between">
                <p className="text-lg">{activity.name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mb-4">
          <p className="text-lg text-gray-600">No activities found.</p>
          <p className="text-sm text-gray-500">It looks like you don't have any activities yet.</p>
        </div>
      )}
      <div className="flex justify-end">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
          onClick={() => setShowActivitiesModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ShowLibrary;