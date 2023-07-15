import React, { useEffect, useState } from "react";
import { SlActionRedo } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import userimg from "../assets/userimg.jpg";
import {
  getAllUsers,
  setIsUpdated,
  updateUser,
} from "../slices/AdminUsersSlice";
import Loading from "./Loading";
import "../styles/Users.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GrEdit } from "react-icons/gr";

const Users = () => {
  const { allUsers, status, isUpdated, isDeleted } = useSelector(
    (state) => state.allUsersReducer
  );
  
  const userState = useSelector((state) => state.userReducer);
  const user = userState.user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isUpdated) {
      toast.success("User updated successfully");
      dispatch(setIsUpdated(false));
    }

    dispatch(getAllUsers());
  }, [isUpdated]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="users-cont">
      <div>
        {allUsers.length === 0 ? (
          <h2>No Users Found</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Photo</th>
                <th>Role</th>
                <th>Since</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(({ _id, photo, name, role, createdAt }) => {
                return (
                  <tr>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>
                      <img src={photo} alt="user image" />
                    </td>
                    <td>{role}</td>
                    <td>{createdAt}</td>
                    <td className="icons">
                      <Link
                        onClick={() => {
                          if (user._id === _id) {
                            toast.info("Admin can't change its role");
                            return;
                          }
                          dispatch(updateUser(_id));
                        }}
                      >
                        <GrEdit />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
