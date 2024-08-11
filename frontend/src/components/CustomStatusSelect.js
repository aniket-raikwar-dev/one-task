import React from "react";
import { Select } from "antd";

const CustomStatusSelect = ({ value, onChange, options, ...props }) => {
  const tagRender = (props) => {
    const { label, value } = props;
    const option = options.find((opt) => opt.value === value);
    return <div style={{ color: option.color }}>{label}</div>;
  };

  return (
    <Select {...props} value={value} onChange={onChange} tagRender={tagRender}>
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          <div style={{ color: option.color }}>{option.label}</div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default CustomStatusSelect;
