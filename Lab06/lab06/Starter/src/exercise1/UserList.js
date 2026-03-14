import UserCard from "./UserCard";

function UserList({ users, viewMode }) {
  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
<<<<<<< HEAD
    <div className={viewMode === 'grid' ? 'user-grid' : 'user-list'}>
=======
    <div className={viewMode === "grid" ? "user-grid" : "user-list"}>
>>>>>>> ba63da3 (Exercise 1 complete)
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserList;