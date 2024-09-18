import React from "react";
import { Modal } from "antd";
import ConfirmationImg from "../images/confirmation.svg";

const ConfirmationModal = ({
  title,
  isModalOpen,
  handleCancel,
  handleDelete,
}) => {
  return (
    <div>
      <Modal
        title={`Delete ${title}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="w-full flex items-center flex-col">
          <img className="w-2/5 my-12" src={ConfirmationImg} alt="" />
          <h3 className="font-bold text-lg text-[#3030fb]">Are You Sure!</h3>
          <h3 className="font-semibold text-lg">
            You want to Delete the {title}?
          </h3>
        </div>

        <div className="flex justify-center mt-10 mb-4">
          <div
            style={{ width: "90px" }}
            className="btn-create"
            onClick={handleCancel}
          >
            No
          </div>
          <div
            style={{ width: "90px" }}
            className="btn-create delete ml-4"
            onClick={handleDelete}
          >
            Yes
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
