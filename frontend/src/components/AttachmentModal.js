import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Loader from "../images/loader.gif";
import {
  CheckOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message, Upload } from "antd";

const AttachmentModal = ({
  setImageFile,
  isOpen,
  closeModal,
  handleAttachedImage,
  attachLoader,
  isImageUploaded,
  setIsImageUploaded,
}) => {
  const [loading, setLoading] = useState(false);
  // const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handlePhotoUpload = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    const file = info.file.originFileObj;
    setImageFile(file);
    setTimeout(() => {
      setIsImageUploaded(true);
      setLoading(false);
    }, 500);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLargerThan5Mb = file.size / 1024 / 1024 < 5;
    if (!isLargerThan5Mb) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLargerThan5Mb;
  };

  const uploadButton = (
    <button type="button" className="attach-upload-btn">
      {loading ? (
        <LoadingOutlined className="text-2xl" />
      ) : (
        <PlusOutlined className="text-2xl" />
      )}
      <div className="mt-2 font-semibold">Upload Image</div>
      <p className="mt-1">(accepted only PNG and JPG format)</p>
    </button>
  );

  return (
    <div>
      <Modal
        title={`Attach Image`}
        open={isOpen}
        footer={null}
        onCancel={closeModal}
      >
        <div className="attach-modal">
          <Upload
            name="avatar"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handlePhotoUpload}
            accept=".png,.jpg,.jpeg"
          >
            {isImageUploaded ? (
              <div className="image-attached-success">
                <CheckOutlined className="check-icon" />
              </div>
            ) : (
              uploadButton
            )}
          </Upload>
          <div className="w-[470px] flex justify-end mt-4">
            <button
              style={{ width: "100px" }}
              className="btn-create"
              onClick={handleAttachedImage}
            >
              {attachLoader ? (
                <img className="w-10" src={Loader} alt="" />
              ) : (
                "Save Image"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AttachmentModal;
