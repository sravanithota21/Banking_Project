
import React, { useContext, useEffect, useRef, useState } from 'react';
import { VscEye, VscTrash } from 'react-icons/vsc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from './DIT BANK.png';
import { pdfjs } from 'react-pdf';
import JSZip, { files } from 'jszip';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { MyContext } from './MyContextProvider';
import ModalComponent from './ModalComponent';


const UploadFile = () => {
  const location = useLocation();
  const { account } = location.state;
  // console.log(account);
  // const {selectedCustomer}=location.state.data;
  // console.log(selectedCustomer)
  const [selectedCustomer, setSelectedCustomer] = useState(location.state.data);
  const [uploadedFile, setUploadedFile] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({ files: [] });

  const { myData, update } = useContext(MyContext);

  let navigate = useNavigate();
  // useEffect(() => {
  //   if (location.state && location.state.data) {
  //       // setSelectedCustomer(location.state.data); // Remove this line
  //   }
  // }, [location.state]);

  useEffect(() => {
    if (!selectedCustomer) {
      setSelectedCustomer(location.state.data);
    }
  }, [location.state.data, selectedCustomer]);

  const [duplicateFiles, setDuplicateFiles] = useState([]);

  useEffect(() => {
    if (duplicateFiles.length > 0) {
      Swal.fire({
        title: 'Duplicate Files',
        html: `<p>The following files already exist:</p><ul>${duplicateFiles.map((file) => `<li>${file}</li>`).join('')}</ul>`,
      });
    }
  }, [duplicateFiles]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...formValues.files];
    const newDuplicateFiles = [];

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
          } else {
            newDuplicateFiles.push(fileInfo.name);
          }
          if (i === files.length - 1) {
            setDuplicateFiles(newDuplicateFiles); // Set duplicate files only after processing all files
            setFormValues({ ...formValues, files: updatedFiles });
            // resetFileInput();
          }
        } else if (file.name.endsWith('.zip')) {
          const reader = new FileReader();
          reader.onload = async (event) => {
            const zip = new JSZip();
            await zip.loadAsync(event.target.result);
            await Promise.all(
              Object.keys(zip.files).map(async (fileName) => {
                const zipEntry = zip.files[fileName];
                const entryFileType = fileName.split('.').pop().toLowerCase();
                if (['pdf', 'jpg', 'jpeg', 'png'].includes(entryFileType)) {
                  const blob = await zipEntry.async('blob');

                  const fileInfo = {
                    name: fileName,
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
                  } else {
                    newDuplicateFiles.push(fileInfo.name);
                  }
                }
              })
            );
            if (i === files.length - 1) {
              setDuplicateFiles(newDuplicateFiles); // Set duplicate files only after processing all files
              setFormValues({ ...formValues, files: updatedFiles });
              // resetFileInput();
            }
          };
          reader.readAsArrayBuffer(file);
        }
      } else {
        console.error('File type not supported:', fileType);
      }
    }
    resetFileInput();
  };


  const handleSubmit = (e, accountNumber) => {
    e.preventDefault();

    // Helper function to compare files by name and type
    const areFilesEqual = (file1, file2) => {
      return file1.name === file2.name;
    };

    const newData = myData.map((obj) => {
      if (obj.Ac === accountNumber) {
        let updatedFiles;
        if (obj.files) {
          updatedFiles = [
            ...obj.files,
            ...formValues.files.filter(
              (file) =>
                !obj.files.some((existingFile) =>
                  areFilesEqual(existingFile, file)
                )
            ),
          ];

          // Check if any files were filtered out, indicating duplicates
          const duplicates = formValues.files.filter((file) =>
            obj.files.some((existingFile) => areFilesEqual(existingFile, file))
          );

          if (duplicates.length > 0) {
            // Alert the user about duplicate files
            alert(`Duplicate files detected: ${duplicates.map(file => file.name).join(", ")}`);
          }
        } else {
          updatedFiles = formValues.files;
        }
        setSelectedCustomer({ ...selectedCustomer, files: updatedFiles });

        return { ...obj, files: updatedFiles };
      }
      return obj;
    });
    update(newData);

    navigate("/Customer", { state: { updatedData: newData, account: accountNumber } });

    console.log("hi", myData);
  };


  const handleFileDelete = (index, e) => {
    e.preventDefault();
    const newFiles = formValues.files.filter((file, i) => i !== index);
    setFormValues({ ...formValues, files: newFiles });
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const getPageCount = async (file) => {
    const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
    return pdf.numPages;
  };
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  const openModal = (file) => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedFile(null);
    setModalIsOpen(false);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  let num = 1;
  return (
    <div>
      <nav className='nav'>
        <img src={logo} alt='logo' width={100} height={100} />
        <NavLink className='back menu' to={-1}>
          Home
        </NavLink>
      </nav>
      <form>
        <label>
          Files:
          <input type="file" name="files" multiple ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png,.zip" onChange={handleFileChange} />
        </label>
        <ModalComponent isOpen={modalIsOpen} closeModal={closeModal} selectedFile={selectedFile} />

        {formValues.files && formValues.files.length > 0 ? (
          <div>
            <table style={{ margin: '50px', "marginLeft": "200px" }}>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>File Type</th>
                  <th>File Size</th>
                  <th>Pages</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {formValues.files.map((file, index) => {
                  const fileType = file.name.split('.').pop();
                  const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
                  return (
                    <tr key={index}>
                      <td>{file.name.split('.').slice(0, -1).join('.')}</td>
                      <td>{file.type.split('/')[1]}</td>
                      <td>{formatBytes(file.size)}</td>
                      {/* <td>{(file.size / (1024 * 1024)).toFixed(2)} MB</td> */}
                      <td>{file.pages}</td>
                      <td>
                        <VscEye onClick={() => openModal(file)} />

                        <VscTrash onClick={(e) => handleFileDelete(index, e)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button onClick={(e) => handleSubmit(e, selectedCustomer.Ac)}>Upload</button>

          {/* <button type="button" onClick={saveChanges}>Save</button> */}
        </div>
      </form>
      {/* <button type='button' onClick={handleViewUploadedFiles}>
        View Uploaded Files
      </button> */}

      {selectedCustomer && selectedCustomer.files && selectedCustomer.files.length > 0 ? (

        <ul>
          <h3>Uploaded Files:</h3>
          {selectedCustomer.files.map((file, index) => (
            <li key={index}>{num++} . {file.name}</li>
          ))}
        </ul>

      ):(
        <p>No files uploaded.</p>
      )}
    </div>
  );
};

export default UploadFile;