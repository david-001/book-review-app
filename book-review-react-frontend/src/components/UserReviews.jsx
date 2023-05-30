import { useState, useEffect } from "react";
import Rating from "./Rating";
import Modal from "./Modal";
import useToken from "../hooks/useToken";
import { axios } from "../Constants";
import { SPRINGBOOT_SERVER_URL } from "../Constants";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const fetchReviews = () => {
    setLoading(true);
    axios
      .get(SPRINGBOOT_SERVER_URL + `api/userreviews`, config)
      .then((response) => {
        setLoading(false);
        setReviews(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="section-bg">
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      </section>
    );
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  const refreshHandler = () => {
    fetchReviews();
  };

  return (
    <div>
      <section className="section-bg">
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
        <h1 className="h3">My Reviews</h1>
        {reviews.map((item, i) => {
          return (
            <div key={i}>
              <div className="row mb-4 border">
                <div className="col-md-9 col-lg-10 ps-md-3 ps-lg-10">
                  <h1 className="h5 pt-2">{item.bookTitle}</h1>
                  <Rating data={item} onRefresh={refreshHandler} />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <div>
        <Modal
          show={openModal}
          handleClose={() => setOpenModal(false)}
          children={status}
        />
      </div>
    </div>
  );
};

export default UserReviews;
