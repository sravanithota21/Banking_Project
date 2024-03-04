
import React from 'react';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';

const ModalComponent = ({ isOpen, closeModal, selectedFile }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="File Preview Modal"
            overlayClassName="overlay"
            className="modal-file"
        >
            <div>
                <button onClick={closeModal}>Close</button>
                {selectedFile && (
                    <div>
                        {selectedFile.type && selectedFile.type.startsWith('image/') ? (
                            <img src={selectedFile.url} alt="Preview" className="modal-image" />
                        ) : selectedFile.type === 'application/pdf' ? (
                            // <Document file={selectedFile.url}>
                            //     <Page pageNumber={1} />
                            // </Document>
                            <Document file={selectedFile.url}>
                            {[...Array(selectedFile.numPages).keys()].map((pageNumber) => (
                                <Page key={pageNumber + 1} pageNumber={pageNumber + 1} />
                            ))}
                        </Document>
                        ) : (
                            <iframe title="Preview" src={selectedFile.url} className="modal-iframe" />
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalComponent;





// import React from 'react';
// import Modal from 'react-modal';

// const ModalComponent = ({ isOpen, closeModal, selectedFile }) => {
//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={closeModal}
//             contentLabel="File Preview Modal"
//             overlayClassName="overlay"
//             className="modal-file"
//         >
//             <div>
//                 <button onClick={closeModal}>x</button>
//                 {selectedFile && (
//                     <div>
//                         {selectedFile.type && selectedFile.type.startsWith('image/') ? (
//                             <img src={selectedFile.url} alt="Preview" className="modal-image" />
//                         ) : (
//                             <iframe title="Preview" src={selectedFile.url} className="modal-iframe" />
//                         )}
//                     </div>
//                 )}
//             </div>
//         </Modal>
//     );
// };

// export default ModalComponent;