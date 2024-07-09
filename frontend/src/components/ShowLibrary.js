import React from "react";
import { useParams } from "react-router-dom";

const ShowLibrary = () => {
  const { libraryId } = useParams(); // Получение значения параметра "libraryId" из URL

  return (
    <>
      <p>Полученный ID библиотеки: {libraryId}</p>
      {/* Другой код страницы ShowLibrary */}
    </>
  );
};

export default ShowLibrary;