import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import userStore from "../stores/userStore";
import { formatProfileName } from "../utils/formatProfileName";
import NotificationImage from "../images/notification.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ collapsed, setCollapsed }) => {
  const { userDetails, setUserDetails } = userStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserDetails(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const items = (
    <Menu className="profile-items">
      <Link to={`/team-member/${userDetails?._id}`} className="list-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
        </svg>
        <p>Profile</p>
      </Link>
      <div onClick={handleLogout} className="list-item mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path>
        </svg>
        <p>Logout</p>
      </div>
    </Menu>
  );

  const notificationDiv = (
    <Menu className="notification-container">
      <h3 className="border-b text-slate-600 pb-2">Notifications</h3>
      <div className="flex flex-col items-center justify-center">
        <img className="mt-14 w-5/6" src={NotificationImage} alt="" />
        <p className="text-[16px] font-semibold  text-[#3030fb] mt-7">
          No New Notifications!
        </p>
        <p className="text-[15px] mt-1 mb-5">Stay tuned for more updates!</p>
      </div>
    </Menu>
  );

  return (
    <nav className="flex justify-between items-center pr-6">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />

      <div className="flex items-center">
        <Dropdown
          overlay={notificationDiv}
          placement="bottomRight"
          trigger={["click"]}
          arrow
        >
          <div style={{ width: "22px", cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#64748b"
            >
              <path d="M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM9 21H15V23H9V21Z"></path>
            </svg>
          </div>
        </Dropdown>

        <Link
          to="/about-onetask"
          className="ml-4"
          style={{ width: "26px", cursor: "pointer" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#64748b"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z"></path>
          </svg>
        </Link>

        <Dropdown overlay={items} placement="bottomRight" >
          <div className="nav-profile ml-4">
            {userDetails?.profilePhoto ? (
              <img src={userDetails?.profilePhoto} alt="" />
            ) : (
              <p>{formatProfileName(userDetails)}</p>
            )}
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
