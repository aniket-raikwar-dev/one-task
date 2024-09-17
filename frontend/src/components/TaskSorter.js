import React, { useState } from "react";
import { Dropdown, Menu, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";

const TaskSorter = ({ teamMembers, selectedMembers, setSelectedMembers }) => {
  const handleCheckboxChange = (value) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((member) => member !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  console.log("selectedMembers: ", selectedMembers);

  const menu = (
    <Menu>
      {teamMembers?.map((member) => (
        <Menu.Item key={member.value}>
          <Checkbox
            checked={selectedMembers.includes(member.value)}
            onChange={() => handleCheckboxChange(member.value)}
          >
            <div className="flex items-center mt-1">
              {member?.profile ? (
                <img
                  className="w-6 h-6 rounded-full bg-[#3030fb]"
                  src={member?.profile}
                  alt=""
                />
              ) : (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#3030fb] text-white text-xs">
                  {`${member?.label.split(" ")[0][0]}${
                    member?.label.split(" ")[1][0]
                  }`}
                </div>
              )}

              <p className="ml-2">{member?.label}</p>
            </div>
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown.Button
      overlay={menu}
      icon={<DownOutlined />}
      // trigger={["click"]}
      style={{
        width: "125px",
      }}
      className="task-sorter"
    >
      Sort
    </Dropdown.Button>
  );
};

export default TaskSorter;
