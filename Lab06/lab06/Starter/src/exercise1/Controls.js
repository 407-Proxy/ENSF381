import { useState } from "react";

function Controls({
  onDeleteClick,
  onSortByGroupClick,
  onSortByIdClick,
  onViewToggleClick,
}) {
  const [deleteId, setDeleteId] = useState("");

  return (
    <div className="controls-row">
      <div className="delete-controls">
        <label htmlFor="delete-id-input">Delete by ID</label>
        <input
          id="delete-id-input"
          type="number"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button
          className="btn btn-danger"
<<<<<<< HEAD
          onClick={() => {
            onDeleteClick(deleteId);
            setDeleteId('');
          }}
=======
          onClick={() => onDeleteClick(deleteId)}
>>>>>>> ba63da3 (Exercise 1 complete)
        >
          Delete
        </button>
      </div>

      <div className="other-controls">
<<<<<<< HEAD
        <button
          className="btn"
          onClick={onSortByGroupClick}
        >
          Sort by Group
        </button>

        <button
          className="btn"
          onClick={onSortByIdClick}
        >
          Sort by ID
        </button>

        <button
          className="btn"
          onClick={onViewToggleClick}
        >
=======
        <button className="btn" onClick={onSortByGroupClick}>
          Sort by Group
        </button>
        <button className="btn" onClick={onSortByIdClick}>
          Sort by ID
        </button>
        <button className="btn" onClick={onViewToggleClick}>
>>>>>>> ba63da3 (Exercise 1 complete)
          Grid / List View
        </button>
      </div>
    </div>
  );
}

export default Controls;