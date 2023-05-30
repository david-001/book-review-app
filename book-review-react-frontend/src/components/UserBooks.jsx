import { useState, useEffect } from "react";
import Modal from "./Modal";
import useToken from "../hooks/useToken";
import { axios } from "../Constants";
import { OPEN_LIBRARY_COVER_URL, SPRINGBOOT_SERVER_URL } from "../Constants";
import { useNavigate } from "react-router-dom";

const UserBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const BOOK_DETAIL_URL = "http://localhost:3000/bookdetail";
  const AUTHOR_URL = "http://localhost:3000/author/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useToken();
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const fetchBooks = () => {
    axios
      .get(SPRINGBOOT_SERVER_URL + `api/userbooks`, config)
      .then((response) => {
        console.log(response);
        setBooks(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    fetchBooks();
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

  const addReviewHandler = (book) => {
    const data = {
      userBookId: book.userBookId,
      bookTitle: book.bookTitle,
      rating: 1,
      review: "",
    };

    // Check if review was already saved in database.
    axios
      .get(SPRINGBOOT_SERVER_URL + `api/userreviews/${data.userBookId}`, config)
      .then((response) => {
        // Only save review if it was not already saved
        if (response.data === "") {
          addReview(data);
          navigate("/myreviews");
        } else {
          setStatus("Item already added.");
        }
        setOpenModal(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  // Save Review to database
  const addReview = (data) => {
    axios
      .post(SPRINGBOOT_SERVER_URL + `api/userreviews/add`, data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const addAuthorHandler = (book) => {
    const data = {
      userBookId: book.userBookId,
      bookTitle: book.bookTitle,
      authorName: book.authorName,
    };
    // Check if author was already saved in database.
    axios
      .get(SPRINGBOOT_SERVER_URL + `api/userauthors/${data.userBookId}`, config)
      .then((response) => {
        // Only save author if it was not already saved
        if (response.data === "") {
          console.log(response);
          addAuthor(data);
          navigate("/myauthors");
        } else {
          setStatus("Item already added.");
        }
        setOpenModal(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  // Save author to database
  const addAuthor = (data) => {
    axios
      .post(SPRINGBOOT_SERVER_URL + `api/userauthors/add`, data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const deleteBookHandler = (book) => {
    setLoading(true);
    axios
      .delete(
        SPRINGBOOT_SERVER_URL + `api/userbooks/delete/${book.userBookId}`,
        config
      )
      .then((response) => {
        console.log(response);
        setStatus("Book deleted.");
        setLoading(false);
        fetchBooks();
        setOpenModal(true);
      })
      .catch((err) => {
        setError(err);
      });
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
        <h1 className="h3">My Books</h1>
        {books.map((item, i) => {
          return (
            <div key={i}>
              <div className="row mb-4 border">
                <div className="col-md-3 col-lg-2 order-md-first bg-light">
                  <img
                    className="img-fluid mx-auto d-block"
                    width="200px"
                    alt={item.bookTitle}
                    src={OPEN_LIBRARY_COVER_URL + item.bookIsbn + `-M.jpg`}
                  />
                </div>

                <div className="col-md-9 col-lg-10 ps-md-3 ps-lg-10">
                  <a
                    href={
                      BOOK_DETAIL_URL +
                      item.bookKey +
                      "/" +
                      item.bookIsbn +
                      "/" +
                      item.authorName
                    }
                    className="text-info text-decoration-none"
                  >
                    <h1 className="h5 pt-2">{item.bookTitle}</h1>
                  </a>

                  <div className="row p-3">
                    <div className="col-6">
                      First published in {item.firstYrPublish}
                    </div>
                    <div className="col-6">ISBN: {item.bookIsbn} </div>
                  </div>
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
                  <div className="row p-3">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => addReviewHandler(item)}
                      >
                        Add Review
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => addAuthorHandler(item)}
                      >
                        Add Author
                      </button>
                    </div>
                  </div>
                  <div className="row p-3">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteBookHandler(item)}
                      >
                        Delete Book
                      </button>
                    </div>
                  </div>

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

export default UserBooks;
