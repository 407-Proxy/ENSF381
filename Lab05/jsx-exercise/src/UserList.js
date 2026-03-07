import users from "./users";

const UserList = () => {
  return (
    <div>
      {users.map((user) => (
        <article key={user.id}>
          <h3>{user.first_name}</h3>
          <p>User Group: {user.user_group}</p>
          <p>ID: {user.id}</p>
        </article>
      ))}
    </div>
  );
};

export default UserList;