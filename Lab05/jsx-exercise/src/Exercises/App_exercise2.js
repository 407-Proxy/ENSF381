import "./App.css";
import Controls from "./Controls";
import Footer from "./Footer";
import UserList from "./UserList";

function App() {
  let currentYear = new Date().getFullYear();
  let isLoggedIn = true;

  return (
    <div>
      <h1>ENSF-381: Full Stack Web Development</h1>
      <p>React Components</p>
      <p>Current Year: {currentYear}</p>
      {isLoggedIn ? (
        <div>
          <p>Welcome back!</p>
          <section>
            <Controls />
          </section>
          <section>
            <h2>User List</h2>
            <UserList />
          </section>
            <Footer />
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}

export default App;
