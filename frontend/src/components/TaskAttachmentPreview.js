import React from "react";
import { Empty } from "antd";
import { Link } from "react-router-dom";

const TaskAttachmentPreview = ({
  taskData,
  openAttachModal,
  handleDeleteAttachment,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[15px]">Attachment :</p>
        <div className="btn-task-icon ml-5" onClick={openAttachModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
          </svg>
          Image
        </div>
      </div>
      <div className="attachment-container mt-1">
        {taskData?.attachments?.length === 0 ? (
          <div className="w-full flex justify-center">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              description="No Attachment Available"
            />
          </div>
        ) : (
          taskData?.attachments?.map((file) => (
            <div key={file?.id} class="attach-box">
              <div>
                <div className="attach-image">
                  <img src={file?.imageUrl} alt="" />
                </div>
                <h4 className="text-[12px] font-semibold px-1 pt-0.5">
                  {file?.name}
                </h4>
              </div>
              <div className="attach-content">
                <div
                  onClick={() => handleDeleteAttachment(file?.id)}
                  className="hover:text-[#FF0000]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
                  </svg>
                </div>
                <Link
                  to={file?.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-[12px] cursor-pointer hover:text-[#3030fb]">
                    view
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskAttachmentPreview;
