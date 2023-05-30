import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import { axios } from "../Constants";
import Modal from "./Modal";
import { SPRINGBOOT_SERVER_URL } from "../Constants";

const UserAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const AUTHOR_URL = "http://localhost:3000/author/";

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const fetchAuthors = () => {
    setLoading(true);
    axios
      .get(SPRINGBOOT_SERVER_URL + `api/userauthors`, config)
      .then((response) => {
        setLoading(false);
        setAuthors(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const deleteHandler = (author) => {
    setLoading(true);
    axios
      .delete(
        SPRINGBOOT_SERVER_URL + `api/userauthors/delete/${author.userAuthorId}`,
        config
      )
      .then((response) => {
        console.log(response);
        setStatus("Successfully deleted.");
        fetchAuthors();
        setLoading(false);
        setOpenModal(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

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
        <h1 className="h3">My Authors</h1>
        {authors.map((item, i) => {
          return (
            <div key={i}>
              <div className="row mb-4 border">
                <div className="col-md-9 col-lg-10 ps-md-3 ps-lg-10">
                  <h1 className="h5 pt-2">{item.bookTitle}</h1>
                  <div className="row p-3">
                    <div className="col-6">
                      Author: &nbsp;
                      <a
                        href={AUTHOR_URL + item.authorName}
                        className="text-info text-decoration-none"
                      >
                        {item.authorName}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(item)}
                  >
                    Delete
                  </button>
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

export default UserAuthors;
