import { useEffect } from "react";
import { createPortal } from "react-dom";
import { selectIsLogsOpen, selectLogs } from "../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IoClose } from "react-icons/io5";
import { closeLogs } from "../../redux/action-logs/logsSlice";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

// interface PropChildren {
//   children: React.ReactNode;
// }

export default function History() {
  const isOpen = useAppSelector(selectIsLogsOpen);
  const logs = useAppSelector(selectLogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        dispatch(closeLogs());
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      dispatch(closeLogs());
    }
  };
  if (!isOpen && logs.length === 0) {
    return null;
  }

  return createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#00000080] z-100"
      onClick={handleBackdropClick}
    >
      <div className="absolute top-2 right-4 h-full pt-10 rounded overflow-hidden bg-[#e1e1e1] max-w-calcmodw max-h-calcmodh">
        <div className="absolute top-0 left-0 w-full flex items-center pl-4 h-10 bg-[#4b5066]">
          <p>History</p>
          <button
            className="absolute top-0 right-3 flex justify-center items-center rounded-md p-2 text-white hover:text-[#8990a7]"
            type="button"
            onClick={() => {
              dispatch(closeLogs());
            }}
          >
            <IoClose size={24} />
          </button>
        </div>
        <ul className="overflow-auto pl-2 h-full w-80">
          {logs.length !== 0 &&
            logs.map((log) => <li key={log.id}>{log.actionType}</li>)}
        </ul>
      </div>
    </div>,
    modalRoot
  );
}
