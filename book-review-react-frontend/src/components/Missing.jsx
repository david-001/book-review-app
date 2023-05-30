import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <section className="section-bg">
      <article>
        <h1>Oops!</h1>
        <p>Page Not Found</p>
        <div className="flexGrow">
          <Link to="/">Please register</Link>
        </div>
      </article>
    </section>
  );
};

export default Missing;
