import { FC } from "react";

interface pagincationProps {
  numOfPages: number;
  pageNum: number;
  next:()=>void
  previous:()=>void
}

const Pagination: FC<pagincationProps> = ({ numOfPages,pageNum,next,previous }) => {
  return (
    <>
      <div className="join gap-[0.3rem]">
        <button className="join-item btn btn-primary border-[0.01rem] border-primary-text rounded-2xl" onClick={previous}>«</button>
        <button className="join-item btn btn-primary border-[0.01rem] border-primary-text rounded-2xl cursor-text">{pageNum}</button>
        <button className="join-item btn btn-primary border-[0.01rem] border-primary-text rounded-2xl" onClick={next}>»</button>
      </div>
    </>
  );
};

export default Pagination;
