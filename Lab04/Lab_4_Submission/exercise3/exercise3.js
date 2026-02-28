const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");
const deleteBtn = document.getElementById("deleteBtn");

let users = [];

function render(userArray) {
  userGrid.innerHTML = "";

  userArray.forEach((user) => {
    userGrid.innerHTML += `
      <article class="user-card">
        <h3>${user.first_name ?? ""}</h3>
        <p>first_name: ${user.first_name ?? ""}</p>
        <p>user_group: ${user.user_group ?? ""}</p>
        <p>id: ${user.id ?? ""}</p>
      </article>
    `;
  });
}

async function retrieveData() {
  const url = "https://69a25b16be843d692bd144b1.mockapi.io/users_api";
  try {
    const response = await fetch(url);
    const data = await response.json();
    users = data;
    console.log(users);
    render(users);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

viewToggleBtn.addEventListener("click", () => {
  userGrid.classList.toggle("grid-view");
  userGrid.classList.toggle("list-view");
});

sortByGroupBtn.addEventListener("click", () => {
  users.sort((a, b) => a.user_group - b.user_group);
  render(users);
});

sortByIdBtn.addEventListener("click", () => {
  users.sort((a, b) => Number(a.id) - Number(b.id));
  render(users);
});

async function deleteUser(id) {
  const url = `https://69a25b16be843d692bd144b1.mockapi.io/users_api/${id}`;

  try {
    await fetch(url, { method: "DELETE" });

    // update local array + re-render
    users = users.filter((u) => u.id !== String(id));
    render(users);
  } catch (err) {
    console.error("Delete failed:", err);
  }
}

deleteBtn.addEventListener("click", () => {
  const id = deleteIdInput.value.trim();
  if (id === "") return;
  deleteUser(id);
  deleteIdInput.value = "";
});

retrieveData();
