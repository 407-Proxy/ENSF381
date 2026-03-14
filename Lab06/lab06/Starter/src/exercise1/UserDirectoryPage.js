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
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
        <p className="page-intro">Current sort: {sortBy}</p>
        <p className="page-intro">Current view: {viewMode}</p>
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
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;