<<<<<<< HEAD
import { useEffect, useState } from 'react';
import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';

function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('none');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setUsers(sampleUsers);
  }, []);

  function handleDeleteClick(userId) {
    if (!userId) return;

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== String(userId))
    );
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users].sort((a, b) => {
      if (a.user_group !== b.user_group) {
        return a.user_group - b.user_group;
      }
      return Number(a.id) - Number(b.id);
    });

    setUsers(sortedUsers);
    setSortBy('group');
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users].sort(
      (a, b) => Number(a.id) - Number(b.id)
    );

    setUsers(sortedUsers);
    setSortBy('id');
  }

  function handleViewToggleClick() {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
=======
import { useEffect, useState } from "react";
import Controls from "./Controls";
import UserList from "./UserList";

const API_URL = "https://69a25b16be843d692bd144b1.mockapi.io/users_api";

function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  async function handleDeleteClick(userId) {
    if (!userId) return;

    const existingUser = users.find(
      (user) => String(user.id) === String(userId),
    );
    if (!existingUser) {
      console.error("No matching user found for id:", userId);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) =>
        prevUsers.filter((user) => String(user.id) !== String(userId)),
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users].sort(
      (a, b) => Number(a.user_group) - Number(b.user_group),
    );
    setUsers(sortedUsers);
    setSortBy("group");
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users].sort((a, b) => Number(a.id) - Number(b.id));
    setUsers(sortedUsers);
    setSortBy("id");
  }

  function handleViewToggleClick() {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
>>>>>>> ba63da3 (Exercise 1 complete)
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
<<<<<<< HEAD
        <p className="page-intro">Current sort: {sortBy}</p>
        <p className="page-intro">Current view: {viewMode}</p>
=======
        <p className="page-intro">
          View users and delete a user by ID from the API.
        </p>
>>>>>>> ba63da3 (Exercise 1 complete)
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
<<<<<<< HEAD
=======
        <p className="page-intro">
          Current sort: {sortBy} | View: {viewMode}
        </p>
>>>>>>> ba63da3 (Exercise 1 complete)
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;