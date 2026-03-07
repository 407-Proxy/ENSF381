const Delete = () => {
  return (
    <div>
      <input type="text"></input>
      <button type="button">Delete</button>
    </div>
  );
};

const Controls = () => {
  return (
    <div>
      <Delete />
      <button type="button">Sort by Group</button>
      <button type="button">Sort by ID</button>
      <button type="button">Grid/List</button>
    </div>
  );
};

export default Controls;
