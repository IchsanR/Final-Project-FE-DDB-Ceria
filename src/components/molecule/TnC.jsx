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
            Berikut ini adalah contoh syarat dan ketentuan umum yang dapat digunakan sebagai referensi:
          </p>
          <p>
            Penggunaan Situs Web
            <br />
            1.1. Dengan mengakses dan menggunakan situs web ini, Anda menyetujui untuk mematuhi semua syarat dan ketentuan yang tercantum di bawah ini. Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap jangan gunakan situs web ini.
          </p>
          <p>
            1.2. Anda bertanggung jawab penuh atas segala tindakan yang dilakukan melalui akun Anda pada situs web ini. Anda harus menjaga kerahasiaan informasi akun Anda dan memberikan informasi yang akurat dan terkini.
          </p>
          <p>
            1.3. Kami berhak untuk mengubah atau menghentikan situs web ini, termasuk syarat dan ketentuan, kapan saja tanpa pemberitahuan sebelumnya. Anda setuju bahwa kami tidak akan bertanggung jawab atas segala perubahan, penghentian, atau ketidaktersediaan situs web ini.
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