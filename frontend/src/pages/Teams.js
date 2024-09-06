import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Female2 from "../images/female2.png";
import SearchBar from "../components/SearchBar";
import api from "../services/api";
import { Link } from "react-router-dom";

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
    title: "Projects",
    dataIndex: "projects",
    key: "project",
    render: (text) => (
      <div className="proj-assigned-box">Assigned: {text || 0}</div>
    ),
  },
  {
    title: "Phone No.",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Details",
    dataIndex: "view",
    key: "view",
    render: (text, record) => (
      <Link
        to={`/team-member/${record?.id}`}
        className="btn-create justify-between"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
        </svg>
        <p>View</p>
      </Link>
    ),
  },
];

const Teams = () => {
  const [teamsData, setTeamsData] = useState([]);

  const getAllTeamMembersData = async () => {
    try {
      const resp = await api.get("/users/all");
      console.log("all user resp: ", resp?.data?.data);
      const { data } = resp?.data;
      const formattedData = data.map((item, index) => ({
        key: index,
        profilePhoto: item.profilePhoto,
        name: item.fullName,
        techRole: item.techRole,
        projects: item.projects.length,
        phone: item.phone,
        location: item.location,
        id: item._id,
      }));
      setTeamsData(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeamMembersData();
  }, []);

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
