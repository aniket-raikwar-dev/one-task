import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Female2 from "../images/female2.png";
import SearchBar from "../components/SearchBar";
import api from "../api";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div className="table-assigned">
        <div className="profile">
          <img src={record?.profilePhoto} alt={text} />
        </div>
        <div>{text}</div>
      </div>
    ),
  },
  {
    title: "Role",
    dataIndex: "techRole",
    key: "techRole",
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    render: (text) => <a href="#">{text || "Not Assigned"}</a>,
  },

  {
    title: "Manager",
    dataIndex: "manager",
    key: "manager",
    render: (text) => text || "-",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
];

const Teams = () => {
  const [teamsData, setTeamsData] = useState([]);

  const getProjectTeamsData = async () => {
    try {
      const resp = await api.get("/users/all");
      console.log("all user resp: ", resp);
      const { data } = resp?.data;
      const formattedData = data.map((item, index) => ({
        key: index,
        profilePhoto: item.profilePhoto,
        name: item.fullName,
        techRole: item.techRole,
        project: item.project,
        manager: item.manager,
        phone: item.phone,
        location: item.location,
      }));
      setTeamsData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectTeamsData();
  }, []);

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
            dataSource={teamsData}
            rowClassName={() => "custom-table-row"}
          />
        </div>
      </div>
    </div>
  );
};

export default Teams;
