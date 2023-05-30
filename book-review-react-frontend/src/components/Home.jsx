import useLogout from "../hooks/useLogout";
import Rating from "./Rating";

const Home = () => {
  const logout = useLogout();

  return (
    <section className="section-bg">
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <a href="/search" className="btn btn-link">
        Search
      </a>
      <a href="/mybooks" className="btn btn-link">
        My Books
      </a>
      <a href="/myreviews" className="btn btn-link">
        My Reviews
      </a>
      <a href="/myauthors" className="btn btn-link">
        My Authors
      </a>
      <div className="flexGrow">
        <button
          className="btn btn-primary navbar-btn text-white w-100 p-2"
          onClick={logout}
        >
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default Home;
