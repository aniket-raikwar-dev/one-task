import React from "react";
import { Select } from "antd";

const CustomTeamSelect = ({ value, onChange, options, ...props }) => {
  const tagRender = (props) => {
    const { label, value, onClose } = props;
    const option = options?.find((opt) => opt?.value === value);
    return (
      <div className="flex py-1 items-center">
        <img
          className="w-6 h-6 rounded-full mr-3"
          src={option?.profile}
          alt=""
        />
        <span>{label}</span>
        <span onClick={onClose} style={{ marginLeft: 8, cursor: "pointer" }}>
          x
        </span>
      </div>
    );
  };

  return (
    <Select {...props} value={value} onChange={onChange} tagRender={tagRender}>
      {options?.map((option) => (
        <Select.Option key={option?.value} value={option?.value}>
          <div className="flex py-1 items-center">
            <img
              className="w-6 h-6 rounded-full mr-3"
              src={option?.profile}
              alt=""
            />
            {option?.label}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default CustomTeamSelect;
