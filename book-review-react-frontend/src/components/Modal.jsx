import styles from "./Modal.module.css";
import { useRef, useState, useEffect } from "react";

const Modal = ({ handleClose, show, children }) => {
  return (
    <div>
      {show ? (
        <div className={`${styles.modal} ${styles.displayBlock}`}>
          <section className={styles.modalMain}>
            <button
              type="button"
              className="btn btn-link"
              onClick={handleClose}
            >
              Close
            </button>
            <br />
            <div className={styles.message}>
              <h4>{children}</h4>
            </div>
          </section>
        </div>
      ) : (
        <div className={`${styles.modal} ${styles.displayNone}`}></div>
      )}
    </div>
  );
};

export default Modal;
