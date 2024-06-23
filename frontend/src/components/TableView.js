import React from "react";
import { Table } from "antd";
import Female2 from "../images/female2.png"

const columns = [
  {
    title: "Task",
    dataIndex: "task",
    key: "task",
    render: (text) => <a href="">{text}</a>,
  },
  {
    title: "Assigned",
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
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    render: (text) => <div className="table-priority">{text}</div>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const TableView = () => {
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
    <div className="mt-3">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TableView;
