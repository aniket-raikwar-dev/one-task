import React from "react";
import { Select } from "antd";

const CustomPrioritySelect = ({ value, onChange, options, ...props }) => {
  const tagRender = (props) => {
    const { label, value } = props;
    const option = options.find((opt) => opt.value === value);
    return (
      <div className="priority" style={{ backgroundColor: option.color }}>
        {label}
      </div>
    );
  };

  return (
    <Select {...props} value={value} onChange={onChange} tagRender={tagRender}>
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          <div className="priority" style={{ backgroundColor: option.color }}>
            {option.label}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default CustomPrioritySelect;
