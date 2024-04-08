import { FiPlus } from "react-icons/fi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { fetchBoards } from "../../redux/boards/board.thunk";
import { selectBoard, selectBoards } from "../../redux/selectors";
import HeaderBoardSelect from "./HeaderSelect";
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
    <header className="flex flex-wrap justify-between items-center w-full h-20 max-w-7xl my-0 mx-auto px-4 py-7">
      <div className="flex items-center gap-2.5">
        {boards.length !== 0 && <HeaderBoardSelect boards={boards} />}
        {activeBoard && (
          <div className="relative flex gap-2.5">
            <p className="ml-2.5 text-lg font-semibold">{activeBoard.name}</p>
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

        <div className="relative">
          {!isOpenAddBoard && !isOpenEditBoard && (
            <button
              className="flex justify-center items-center border border-solid border-[#8990a7] py-2 px-4 rounded hover:bg-[#8990a7] text-[#353845] hover:text-[#f6f7f9]"
              color="dark"
              type="button"
              onClick={() => setIsOpenAddBoard(!isOpenAddBoard)}
            >
              <FiPlus width={24} />
              <p className="text-sm font-semibold ml-2">Create new desk</p>
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
      <div className="flex item-center gap-2.5">
        <button
          className="flex justify-center items-center bg-[#555b74] border border-solid border-[#8990a7] py-2 px-4 rounded hover:bg-[#8990a7] text-[#f6f7f9] hover:text-[#f6f7f9]"
          type="button"
        >
          <FaArrowRotateLeft width={24} />

          <p className="text-sm font-semibold ml-2">History</p>
        </button>
        {activeBoard && (
          <div className="relative w-[158px]">
            {!isOpenAddList ? (
              <button
                className="flex justify-center items-center border border-solid border-[#8990a7] py-2 px-4 rounded hover:bg-[#8990a7] text-[#353845] hover:text-[#f6f7f9]"
                color="dark"
                type="button"
                onClick={() => setIsOpenAddList(!isOpenAddList)}
              >
                <FiPlus width={24} />
                <p className="text-sm font-semibold ml-2">Create new list</p>
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
