import { useEffect } from "react";
import { createPortal } from "react-dom";
import { closeModal } from "../../redux/modal/modalSlice";
import { selectIsModalOpen } from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IoClose } from "react-icons/io5";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

interface PropChildren {
  children: React.ReactNode;
  clearModal: () => void;
}

export default function Modal({ children, clearModal }: PropChildren) {
  const isOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        dispatch(closeModal());
        clearModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clearModal, dispatch]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      dispatch(closeModal());
      clearModal();
    }
  };
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.ModalContainer}>
        <div className={styles.ModalHeader}></div>
        <button
          className={styles.ModalCloseBtn}
          type="button"
          onClick={() => dispatch(closeModal())}
        >
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
