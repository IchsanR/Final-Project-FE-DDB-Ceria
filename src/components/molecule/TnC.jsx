import React, { useState } from "react";
import style from "../../assets/styles/Components.module.css";

function Modal({ setOpenModal }) {
  return (
    <div className={`${style.modalBackground}`}>
      <div className={`${style.modalContainer}`}>
        <div className={`${style.title}`}>
          <h1>Terms and Conditions</h1>
        </div>
        <div className={`${style.body}`}>
        <p>
Website Usage
<br />
1.1. By accessing and using this website, you agree to comply with all the terms and conditions stated below. If you do not agree with these terms and conditions, please do not use this website.
</p>
<p>
1.2. You are fully responsible for any actions taken through your account on this website. You must maintain the confidentiality of your account information and provide accurate and up-to-date information.
</p>
<p>
1.3. We reserve the right to modify or discontinue this website, including the terms and conditions, at any time without prior notice. You agree that we shall not be liable for any changes, discontinuance, or unavailability of this website.
</p>
</div>
        <div className={`${style.footer}`}>
          <button className={`${style.cancelBtn}`} onClick={() => setOpenModal(false)}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function ParentComponent() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Buka Modal</button>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
}

export default Modal;
