import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import {
  OPEN_LIBRARY_BOOK_URL,
  OPEN_LIBRARY_COVER_URL,
  SPRINGBOOT_SERVER_URL,
} from "../Constants";
import { axios } from "../Constants";
import useToken from "../hooks/useToken";
import useAuth from "../hooks/useAuth";

const Search = () => {
  const BOOK_DETAIL_URL = "http://localhost:3000/bookdetail";
  const AUTHOR_URL = "http://localhost:3000/author/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { token } = useToken();
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");

  const searchHandler = () => {
    setLoading(true);
    axios
      .get(OPEN_LIBRARY_BOOK_URL + search)
      .then((response) => {
        const result = response?.data?.docs;
        const filteredArray = result.filter((book) => book.isbn !== undefined);
        setSearchResults(filteredArray);
      })
      .then(() => setLoading(false))
      .catch((err) => setError(err));
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

  if (!searchResults) {
    return null;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  };

  const addBookHandler = (book) => {
    setLoading(true);
    const data = {
      booktitle: book.title,
      bookkey: book.key,
      bookisbn: book.isbn[0],
      authorname: book.author_name[0],
      firstyrpublish: book.first_publish_year,
    };
    // Check if book is already saved in database
    axios
      .get(SPRINGBOOT_SERVER_URL + `api/userbooks/${data.bookisbn}`, config)
      .then((response) => {
        // Save book to database if it does not exist
        if (!response.data) {
          addBook(data);
          setStatus("Successfully added.");
        } else {
          setStatus("Book already added.");
        }
        setLoading(false);
        setOpenModal(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  // Save book to database
  const addBook = (data) => {
    axios
      .post(SPRINGBOOT_SERVER_URL + "api/userbooks/add", data, config)
      .then((response) => console.log(response))
      .catch((err) => setError(err));
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
        <h1 className="h3">Book Search</h1>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-primary navbar-btn text-white"
            onClick={() => searchHandler()}
          >
            Search
          </button>
        </form>
        <br />
        <br />
        {searchResults.map((item, i) => {
          return (
            <div key={i}>
              <div className="row mb-4 border">
                <div className="col-md-3 col-lg-2 order-md-first bg-light">
                  <img
                    className="img-fluid mx-auto d-block"
                    width="200px"
                    alt={item.title}
                    src={OPEN_LIBRARY_COVER_URL + item.isbn[0] + `-M.jpg`} //{`https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-M.jpg`}
                  />
                </div>

                <div className="col-md-9 col-lg-10 ps-md-3 ps-lg-10">
                  <a
                    href={
                      BOOK_DETAIL_URL +
                      item.key +
                      "/" +
                      item.isbn[0] +
                      "/" +
                      item.author_name
                    }
                    className="text-info text-decoration-none"
                  >
                    <h1 className="h5 pt-2">{item.title}</h1>
                  </a>

                  <div className="row p-3">
                    <div className="col-6">
                      First published in {item.first_publish_year}
                    </div>
                    <div className="col-6">ISBN: {item.isbn[0]} </div>
                  </div>
                  <div className="row p-3">
                    <div className="col-6">
                      Author: &nbsp;
                      <a
                        href={AUTHOR_URL + item.author_name}
                        className="text-info text-decoration-none"
                      >
                        {item.author_name}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addBookHandler(item)}
                  >
                    Add to List
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

export default Search;
