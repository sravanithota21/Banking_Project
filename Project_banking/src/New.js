import React, { useRef } from "react";
import { useState } from "react";

import Modal from 'react-modal';
import JSZip from "jszip";
// import database from './Addmission.json';
import { BsEyeFill, BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { pdfjs } from "react-pdf";

const Admission = () => {


  const [data, setData] = useState({});

  const [files, setFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [duplicate,setDuplicate]=useState(false);
  const [uploadedFile,setUploadedFile]=useState([]);
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({files: []});
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handlechange = async (e) => {
    
    const { name, value,formValues } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
    const files = Array.from(e.target.files);
  const updatedFiles = [...formValues.files];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const fileSize = file.size;

      if (
        fileType === 'application/pdf' ||
        fileType === 'image/jpeg' ||
        fileType === 'image/png' ||
        file.name.endsWith('.zip')
      ) {
        if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
          const fileInfo = {
            name: file.name,
            type: fileType,
            size: fileSize,
            pages: 1,
            url: URL.createObjectURL(file),
          };

          const isDuplicate = updatedFiles.some(
            (existingFile) => existingFile.name === fileInfo.name
          );

          if (!isDuplicate) {
            updatedFiles.push(fileInfo);
            setFormValues({ ...formValues, files: updatedFiles });
          } else {
            Swal.fire({
              title: 'File already exists',
              timer: 1000,
            });
          }
        } else if (file.name.endsWith('.zip')) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            const zip = new JSZip();
            await zip.loadAsync(event.target.result);
            zip.forEach(async (relativePath, zipEntry) => {
              const entryFileType = zipEntry.name.split('.').pop().toLowerCase();
              if (['pdf', 'jpg', 'jpeg', 'png'].includes(entryFileType)) {
                const blob = await zipEntry.async('blob');
                const fileInfo = {
                  name: zipEntry.name,
                  type: zipEntry.dir
                    ? 'directory'
                    : entryFileType === 'pdf'
                    ? 'application/pdf'
                    : `image/${entryFileType}`,
                  size: zipEntry.dir ? '-' : blob.size,
                  url: zipEntry.dir ? 'directory' : URL.createObjectURL(blob),
                };

                const isDuplicate = updatedFiles.some(
                  (existingFile) =>
                    existingFile.name === fileInfo.name
                );

                if (!isDuplicate) {
                  updatedFiles.push(fileInfo);
                  setFormValues({ ...formValues, files: updatedFiles });
                } else {
                  Swal.fire({
                    title: 'File already exists',
                    timer: 1000,
                  });
                }
              }
            });
          };
          reader.readAsArrayBuffer(file);
        }
      } else {
        console.error('File type not supported:', fileType);
      }
    }

    resetFileInput();
  };

  // ... (rest of your existing functions)
  const handleUpload = async (event) => {
    const uploadedFiles = event.target.files;
  
    for (let i = 0; i < uploadedFiles.length; i++) {
      const newFile = uploadedFiles[i];
      const isDuplicate = formValues.files.some((file) => file.name === newFile.name);
      if (isDuplicate) {
        Swal.fire({
          title: "Duplicate file detected!",
          text: "This file already exists in the list.",
          icon: "warning",
          confirmButtonText: "OK",
      });
        
        continue;
      }
      if(!isDuplicate){
        if (newFile.type === 'application/pdf') {
        const pdfPages = await countPdfPages(newFile);
        const fileToAdd = {
          name: newFile.name,
          size: newFile.size,
          type: newFile.type,
          pages: pdfPages,
          url: URL.createObjectURL(newFile),
        };
      
        setFiles((prevFiles) => [...prevFiles, fileToAdd]);
      } else if (isImage(newFile)) {
        const fileToAdd = {
          name: newFile.name,
          size: newFile.size,
          type: newFile.type,
          pages: 1,
          url: URL.createObjectURL(newFile),
        };
        setFiles((prevFiles) => [...prevFiles, fileToAdd]);
      } else if (newFile.name.endsWith('.zip')) {
        await handleZipFile(newFile); 
      } else {
        
        alert('Only PDFs, images, and ZIP files are allowed.');
      }
    }
  }
  };


  const countPdfPages = async (pdfFile) => {
    try {
      const data = new Uint8Array(await pdfFile.arrayBuffer());
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      const pdf = await pdfjs.getDocument({ data }).promise;
      return pdf.numPages;
    } catch (error) {
      console.error('Error counting PDF pages', error);
      return 0;
    }
  };

  const isImage = (file) => {
    return file.type.startsWith('image/');
  };
  const isZip = (file) => {
    return /^(image\/|application\/pdf)/.test(file.type);
  };

  const handleZipFile = async (zipFile) => {
    const zip = new JSZip();

    try {
      const zipContents = await zip.loadAsync(zipFile);
      const unzippedFileNames = Object.keys(zipContents.files);

      const unzippedFilesData = await Promise.all(
        unzippedFileNames.map(async (fileName) => {
          const fileData = await zipContents.files[fileName].async('uint8array');
          if (isImageFile(fileName)) {
            const imageBlob = new Blob([fileData], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
            return {
              name: fileName,
              size: imageBlob.size,
              type: 'image/jpeg',
              pages: 1,
              url: imageUrl,
            };
          } else if (isPdfFile(fileName)) {
            const pdfBlob = new Blob([fileData], { type: 'application/pdf' });
            const pdfPages = await countPdfPages(pdfBlob);
            const pdfUrl = URL.createObjectURL(pdfBlob);
            return {
              name: fileName,
              size: pdfBlob.size,
              type: 'application/pdf',
              pages: pdfPages,
              url: pdfUrl,
            };
          }
          return null;
        })
      );

      const validFilesData = unzippedFilesData.filter((fileData) => {
        if (!fileData) return false;

        const isDuplicate = formValues.files.some(
          (existingFile) => existingFile.name === fileData.name
        );

        if (isDuplicate) {
          Swal.fire({
            title: 'Duplicate file detected!',
            text: 'This file already exists in the list.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
        }

        return !isDuplicate;
      });

      setFormValues({
        ...formValues,
        files: [...formValues.files, ...validFilesData],
      });
    } catch (error) {
      console.error('Error unzipping file:', error);
    }
  };
  
    const isImageFile = (fileName) => {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
      const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
      return imageExtensions.includes(extension);
    };
  
    const isPdfFile = (fileName) => {
      return fileName.toLowerCase().endsWith('.pdf');
    };
  
  
   
    async function saveFile(file, folderHandle) {
      try {
          const fileHandle = await folderHandle.getFileHandle(file.name, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(file.data); // Assuming file.data contains the file content
          await writable.close();
          
          alert(`File ${file.name} saved successfully`);
      } catch (err) {
          console.error(`Error saving file ${file.name}:`, err);
      }
  }
  
    
  const openModal = (file) => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedFile(null);
    setModalIsOpen(false);
  };

  const removeFile = (i) => {
      if (!formValues || !formValues.files) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to retrieve this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      
    }).then((result) => {
      if (result.isConfirmed) {
        setFormValues([...formValues.filter((_, index) => index !== i)]);
        Swal.fire({
          title: "Deleted!",
          text: "Your record has been deleted.",
          icon: "success",
          timer: 1000,
        });
      }
    });
  };


  const handlesubmit = (event) => {
    event.preventDefault();
   

    Swal.fire({
      position: "middle",
      icon: "success",
      title: "Successfully Submitted",
      showConfirmButton: false,
      timer: 1000
    });
    const newData = {
      ...data,
      files: formValues
    };


    // database.push(newData);
    
    setData({
      firstName: "",
      lastName: "",
      fullAddress: "",
      contactNumber1: "",
      gender: " ",
      dateOfBirth: "",
      class: "",
      city: "",
      pinCode: "",
      fatherName: "",
      motherName: "",
      contactNumber2: "",
      schoolName: "",
      lastClass: "",
      yearOfPassing: "",
      grade: "",
    })
    setFormValues([]);
  }

  const getPageCount = async (file) => {
    const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
    return pdf.numPages;
  };
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...formValues.files];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const fileSize = file.size;
      if (fileType === 'application/pdf' ||
          fileType === 'image/jpeg' ||
          fileType === 'image/png' ||
          file.name.endsWith('.zip')) {
        if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
          const fileInfo = {
            name: file.name,
            type: fileType,
            size: fileSize,
            pages: fileType === 'application/pdf' ? await getPageCount(file) : 1,
            url: URL.createObjectURL(file)
          };
          const isDuplicate = updatedFiles.some(
            (existingFile) =>
              existingFile.name === fileInfo.name &&
              existingFile.size === fileInfo.size
          );
          if (!isDuplicate) {
            updatedFiles.push(fileInfo);
            setFormValues({ ...formValues, files: updatedFiles });
          } else {
            Swal.fire({
              title: 'File already exists',
              timer: 1000,
            });
          }
        } else if (file.name.endsWith('.zip')) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            const zip = new JSZip();
            await zip.loadAsync(event.target.result);
            zip.forEach(async (relativePath, zipEntry) => {
              const entryFileType = zipEntry.name.split('.').pop().toLowerCase();
              if (['pdf', 'jpg', 'jpeg', 'png'].includes(entryFileType)) {
                const blob = await zipEntry.async('blob');
                const fileInfo = {
                  name: zipEntry.name,
                  type: zipEntry.dir ? 'directory' : entryFileType === 'pdf' ? 'application/pdf' : `image/${entryFileType}`,
                  size: zipEntry.dir ? '-' : blob.size,
                  pages: entryFileType === 'pdf' ? await getPageCount(blob) : 1,
                  url: zipEntry.dir ? 'directory' : URL.createObjectURL(blob)
                };
                const isDuplicate = updatedFiles.some(
                  (existingFile) =>
                    existingFile.name === fileInfo.name &&
                    existingFile.size === fileInfo.size
                );
                if (!isDuplicate) {
                  updatedFiles.push(fileInfo);
                  setFormValues({ ...formValues, files: updatedFiles });
                } else {
                  Swal.fire({
                    title: 'File already exists',
                    timer: 1000,
                  });
                }
              }
            });
          };
          reader.readAsArrayBuffer(file);
        }
      } else {
        console.error('File type not supported:', fileType);
      }
    }
    resetFileInput();
  };
  return (
    <div  >
      <div class="container">
        
        <div class="centered">ADMISSION</div>
      </div>
      <div className="adm">
        <form onSubmit={handlesubmit}>
          <h2>Admission Form</h2>
          <center><label>Please fill in all the required fields (marked with *)</label></center>
          <h3>Personal Details: </h3>
          <label>First Name*: <input type="text" id="input" name="firstName" required value={data.firstName} onChange={handlechange} /></label>&emsp;
          <label>Last Name*: <input type="text" id="input" name="lastName" required value={data.lastName} onChange={handlechange} /></label><br></br>
          <label>Gender*:  </label><select onChange={handlechange} required value={data.gender} name="gender" id="input2">
            <option >Select</option>
            <option > Male</option>
            <option >Female</option>
          </select>&emsp;
          <label>Data Of Birth*: <input type="date" id="input" required name="dateOfBirth" value={data.dateOfBirth} onChange={handlechange} /></label><br></br>
          <label>Class*: <input type="text" id="input" name="class" required value={data.class} onChange={handlechange} /></label><br></br>
          <label>Full Address*: <input type="text" id="input1" name="fullAddress" required value={data.fullAddress} onChange={handlechange} /></label><br></br>
          <label>City*: <input type="text" id="input" name="city" required value={data.city} onChange={handlechange} /></label>&emsp;
          <label>Pin Code*: <input type="number" id="number" name="pinCode" required value={data.pinCode} onChange={handlechange} /></label><br></br>
          <h3>Parents Details: </h3>
          <label>Father's Name*: <input type="text" id="input" name="fatherName" value={data.fatherName} required onChange={handlechange} /></label>&emsp;
          <label>Mother's Name*: <input type="text" id="input" name="motherName" value={data.motherName} onChange={handlechange} required /></label><br></br>
          <label>Contact Number 1*: <input type="number" id="number" name="contactNumber1" required value={data.contactNumber1} onChange={handlechange} /></label>&emsp;
          <label>Contact Number 2*: <input type="number" id="number" name="contactNumber2" required value={data.contactNumber2} onChange={handlechange} /></label><br></br>
          <h3>Previous School Details: </h3>
          <label>School Name*: <input type="text" id="input" name="schoolName" value={data.schoolName} required onChange={handlechange} /></label>&emsp;
          <label>Last Class*: <input type="text" id="input" name="lastClass" value={data.lastClass} required onChange={handlechange} /></label>&emsp;
          <label>Year Of Passing*: <input type="number" id="number" name="yearOfPassing" value={data.yearOfPassing} required onChange={handlechange} /></label>&emsp;
          <label>Grade*: </label>
          <select onChange={handlechange} required value={data.grade} name="grade" id="input2">
            <option>Select Grade</option>
            <option > A+</option>
            <option >A</option>
            <option >B</option>
            <option >C</option>
            <option >D</option>
          </select>
          <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="File Preview Modal"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      {selectedFile && (
        <div>
          {selectedFile.type && selectedFile.type.startsWith('image/') ? (
            <center><img src={selectedFile.url} alt="Preview" className="modal-image" /></center>
          ) : (
            <iframe title="Preview" src={selectedFile.url} className="modal-iframe" />
          )}
          
        </div>
      )}
    </Modal>

          {/* <input type="file"  multiple ref={fileInputRef} accept="image/*,.pdf, .zip" value={data.file} onChange={handlechange} />
           */}
           
      <label>
        Files:
        <input type="file" name="files" multiple ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png,.zip" onChange={handleFileChange} />
      </label>
          {formValues.files.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th className="expand3">File Name</th>
                <th className="expand4">Type</th>
                <th className="expand3">Size</th>
                <th className="expand4">Pages</th>
                <th className="expand1" >ACTION</th>
              </tr>
            </thead>
            {formValues.files.map((val, index) => {
              const fileType = val.name.split('.').pop();
              const fileNameWithoutExtension = val.name.split('.').slice(0, -1).join('.');
              return (

                <tbody key={index}>
                  <tr>
                    <td id="table">{fileNameWithoutExtension}</td>
                    <td id="table">{fileType}</td>
                    <td id="table">{(val.size / (1024 * 1024)).toFixed(2)} MB</td>
                    <td id="table">{val.pages}</td>
                    <td id="table">
                      <BsEyeFill className="view-btn" onClick={() => openModal(val)} />&emsp;
                      <BsFillTrashFill className="delete-btn" onClick={() => removeFile(index)} />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          )}
          <br></br><br></br>
          <input id='btn' type="submit" value="click to save" ></input><br></br>
        </form>
      </div>
    </div>
  );
};
export default Admission;









