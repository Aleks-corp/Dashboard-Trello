import { FiPlus } from "react-icons/fi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchBoards } from "../../redux/boards/board.thunk";
import { selectBoard, selectBoards } from "../../redux/selectors";
import HeaderBoardSelect from "./HeaderSelect";
import styles from "./Header.module.css";
import BoardAddContainer from "./BoardAddContainer";
import BoardEditContainer from "./BoardEditContainer";
import ListAddContainer from "./ListAddContainer";

function Header() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);
  const boards = useAppSelector(selectBoards);
  const activeBoard = useAppSelector(selectBoard);

  const [isOpenAddBoard, setIsOpenAddBoard] = useState(false);
  const [isOpenEditBoard, setIsOpenEditBoard] = useState(false);
  const [isOpenThumbBoard, setIsOpenThumbBoard] = useState(false);

  const [isOpenAddList, setIsOpenAddList] = useState(false);

  return (
    <header className={styles.HeaderContainer}>
      <div className={styles.ButtonContainer}>
        {boards.length !== 0 && <HeaderBoardSelect boards={boards} />}
        {activeBoard && (
          <div className={styles.TitleWrapper}>
            <p className={styles.TitleName}>{activeBoard.name}</p>
            <button
              type="button"
              onClick={() => setIsOpenThumbBoard(!isOpenThumbBoard)}
            >
              <FiMoreVertical />
            </button>
            {isOpenThumbBoard && (
              <BoardEditContainer
                id={activeBoard.id}
                onEdit={() => setIsOpenEditBoard(true)}
                onClose={() => setIsOpenThumbBoard(false)}
              />
            )}
          </div>
        )}

        <div className={styles.ButtonWrapper}>
          {!isOpenAddBoard && !isOpenEditBoard && (
            <button
              className={styles.HeaderButton}
              color="dark"
              type="button"
              onClick={() => setIsOpenAddBoard(!isOpenAddBoard)}
            >
              <FiPlus width={24} />
              <p>Create new desk</p>
            </button>
          )}
          {isOpenAddBoard && (
            <BoardAddContainer
              board={{ name: "", id: "" }}
              onClose={() => setIsOpenAddBoard(false)}
            />
          )}
          {isOpenEditBoard && activeBoard && (
            <BoardAddContainer
              board={{ name: activeBoard.name, id: activeBoard.id }}
              onClose={() => setIsOpenEditBoard(false)}
            />
          )}
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <button
          className={[styles.HeaderButton, styles.HeaderButtonDark].join(" ")}
          type="button"
        >
          <FaArrowRotateLeft width={24} />

          <p className="HeaderButtonText">History</p>
        </button>
        {activeBoard && (
          <div className={styles.ButtonWrapper}>
            {!isOpenAddList ? (
              <button
                className={styles.HeaderButton}
                color="dark"
                type="button"
                onClick={() => setIsOpenAddList(!isOpenAddList)}
              >
                <FiPlus width={24} />
                <p>Create new list</p>
              </button>
            ) : (
              <ListAddContainer
                boardName={activeBoard.name}
                onClose={() => setIsOpenAddList(false)}
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
