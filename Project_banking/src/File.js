import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import data from '../product.json';
// import './productdetails.css';
import JSZip from 'jszip';
import Swal from 'sweetalert2';
import { FaEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import table from '../file.json';



function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const details = [...data];
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({files: []});

  const navigate = useNavigate();
  useEffect(() => {
    const productData = location.state?.product || details.find(p => p.id === id);
    if (productData) {
      setProduct(productData);
      setFormValues({
        files: productData.files || [],
      });
    } else {
      setProduct(null);
    }
  }, [id]);
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const saveChanges = () => {
    if (product) {
      const updatedProduct = { ...product, ...formValues };
      const index = details.findIndex(p => p.product_name === product.product_name);
      data[index] = updatedProduct;
      setProduct(updatedProduct);
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedProduct.files || []));
      setFormValues({
        product_name: updatedProduct.product_name,
        price: updatedProduct.price,
        image_url: updatedProduct.image_url,
        Quantity: updatedProduct.Quantity,
        isProductAvailable: updatedProduct.isProductAvailable,
        files: updatedProduct.files || [],
      });
      localStorage.setItem('uploadedFiles', JSON.stringify(updatedProduct.files));
      table.push(updatedProduct.files);

    }
  };
 
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
  
  const handleFileDelete = (index, e) => {
    e.preventDefault();
    const newFiles = formValues.files.filter((file, i) => i !== index);
    setFormValues({ ...formValues, files: newFiles });
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
   <div className='detail'>
      <form className='form'>
      
        <label>
          Files:
          <input type="file" name="files" multiple ref={fileInputRef} accept=".pdf,.jpg,.jpeg,.png,.zip" onChange={handleFileChange} />
        </label>
        <button type="button" onClick={saveChanges}>Save</button>
      </form>
      <div>
        <table id='table'>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Size</th>
              <th>type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {formValues.files.map((file, index) => (

              <tr key={file.key}>
                <td>{file.name.split('.').slice(0, -1).join('.')}</td>
                <td>{parseFloat(file.size / (1024 ** 2)).toPrecision(2)} MB</td>
                <td>{file.type.split('/')[1]}</td>
                <td>
                  <FaEye onClick={() => window.open(file.url)} />
                  <RiDeleteBin6Line id='delete' onClick={(e) => handleFileDelete(index, e)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button id='nav' on Click={() => navigate('/')}>Home</button>

    </div>

  );
}
export default ProductDetails;
