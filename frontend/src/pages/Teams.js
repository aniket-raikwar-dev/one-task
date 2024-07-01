import React from "react";
import { Table } from "antd";
import Female2 from "../images/female2.png";
import SearchBar from "../components/SearchBar";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <div className="table-assigned">
        <div>
          <img src={Female2} alt="" />
        </div>
        <div>{text}</div>
      </div>
    ),
  },
  {
    title: "Role",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Project",
    dataIndex: "task",
    key: "task",
    render: (text) => <a href="#">{text}</a>,
  },
  // {
  //   title: "Priority",
  //   dataIndex: "priority",
  //   key: "priority",
  //   render: (text) => <div className="table-priority">{text}</div>,
  // },
  {
    title: "Manager",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Phone",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Location",
    dataIndex: "status",
    key: "status",
  },
];

const Teams = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      priority: "High",
      task: "New York No. 1 Lake Park",
      status: "Done",
    },
    {
      key: "2",
      name: "Jim Green",
      priority: "Low",
      task: "London No. 1 Lake Park",
      status: "Discussion",
    },
    {
      key: "3",
      name: "Joe Black",
      priority: "Normal",
      task: "Sidney No. 1 Lake Park",
      status: "Paused",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Teams</h2>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className="scrollabel-container">
        <div>
          <Table
            columns={columns}
            dataSource={data}
            rowClassName={() => "custom-table-row"}
          />
        </div>
      </div>
    </div>
  );
};

export default Teams;
