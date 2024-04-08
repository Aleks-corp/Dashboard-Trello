import { useEffect } from "react";
import { createPortal } from "react-dom";
import { closeModal } from "../../redux/modal/modalSlice";
import { selectIsModalOpen } from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IoClose } from "react-icons/io5";

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
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#00000080] z-100"
      onClick={handleBackdropClick}
    >
      <div className="relative pt-10 rounded-3xl overflow-hidden bg-[#e1e1e1] max-w-calcmodw max-h-calcmodh">
        <div className="absolute top-0 left-0 w-full h-10 bg-[#4b5066]"></div>
        <button
          className="absolute top-0 right-3 flex justify-center items-center rounded-md p-2 text-white hover:text-[#8990a7]"
          type="button"
          onClick={() => {
            dispatch(closeModal());
            clearModal();
          }}
        >
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
