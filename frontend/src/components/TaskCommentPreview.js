import React, { useEffect, useRef, useState } from "react";
import Loader from "../images/loader.gif";
import { Empty } from "antd";

const TaskCommentPreview = ({
  taskData,
  userDetails,
  commentText,
  setCommentText,
  addCommentOnTask,
  handleDeleteComment,
  handleUpdateComment,
}) => {
  const [loader, setLoader] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [newCommentAdded, setNewCommentAdded] = useState(false);

  const lastCommentRef = useRef(null);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment._id);
    setUpdatedText(comment.text);
  };

  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleSaveClick = async () => {
    setLoader(true);
    await handleUpdateComment(updatedText, editingCommentId);
    setLoader(false);
    setEditingCommentId(null);
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
  };

  const handleAddComment = async () => {
    await addCommentOnTask();
    setNewCommentAdded(true);
  };

  useEffect(() => {
    if (lastCommentRef.current && newCommentAdded) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
      setNewCommentAdded(false);
    }
  }, [taskData?.comments]);

  return (
    <div>
      <p className="font-bold mb-4">Comments :</p>

      {taskData?.comments?.length === 0 ? (
        <div className="w-full flex justify-center ">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description="No Comment Available"
          />
        </div>
      ) : (
        taskData?.comments?.map((comment, index) => (
          <div
            key={comment?._id}
            ref={index === taskData.comments.length - 1 ? lastCommentRef : null}
          >
            <div className="user-comment-box">
              <div className="flex justify-between items-start">
                <div className="flex">
                  <div className="comment-profile">
                    <img src={comment?.user?.profilePhoto} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-[13px] text-[#3030fb]">
                      {comment?.user?.fullName}
                    </p>
                    <p
                      style={{ marginTop: "-2px" }}
                      className="text-[11px] text-[#797878]"
                    >
                      {comment?.user?.techRole}
                    </p>
                  </div>
                </div>

                {userDetails?._id === comment?.user?._id && (
                  <div className="flex mt-1">
                    <div
                      className="comment-icons mr-4 hover:text-[#3030fb]"
                      onClick={() => handleEditClick(comment)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                      </svg>
                    </div>
                    <div
                      className="comment-icons  hover:text-[red]"
                      onClick={() => handleDeleteComment(comment?._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="ml-[50px] mt-0.5">
                {editingCommentId === comment._id ? (
                  <textarea
                    type="text"
                    className="comment-edit-input"
                    value={updatedText}
                    onChange={handleTextChange}
                  />
                ) : (
                  <p className="comment-edit-input">{comment?.text}</p>
                )}
              </div>
              {editingCommentId === comment._id && (
                <div className="w-full flex justify-end mt-4">
                  <button
                    onClick={handleCancelClick}
                    style={{ width: "100px" }}
                    className="btn-create delete mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClick}
                    style={{ width: "100px" }}
                    className="btn-create"
                  >
                    {loader ? (
                      <img className="w-10" src={Loader} alt="" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              )}
            </div>
            {taskData?.comments?.length - 1 !== index && (
              <div className="comment-line"></div>
            )}
          </div>
        ))
      )}

      <div className="flex items-center mt-10 pl-3">
        <div className="comment-profile">
          <img src={userDetails?.profilePhoto} alt="" />
        </div>
        <div className="comment-box">
          <input
            type="text"
            placeholder="Add a comment here..."
            className="comment-input"
            value={commentText}
            name="commentText"
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="btn-link" onClick={handleAddComment}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCommentPreview;
