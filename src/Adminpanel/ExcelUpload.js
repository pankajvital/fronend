import React, { useState } from 'react';
import { urlbc } from '../components/Constants';

const ExcelUpload = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Update the selected file without triggering the upload immediately
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch(`${urlbc}/upload`, {
          method: 'POST',
          body: formData,
        });

        // Handle the response as needed
        console.log('File uploaded successfully:', response);

        // Set the state to indicate that a file has been uploaded
        setFileUploaded(true);

        // Reset the fileUploaded state after 5 seconds
        setTimeout(() => {
          setFileUploaded(false);
        }, 5000);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <br />
      <input type="file" onChange={handleFileChange} />
      <button className="btn btn-success" onClick={handleFileUpload}>
        Upload
      </button>
      {fileUploaded && (
        <div>
          <p className='text-success'>File uploaded successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
