import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { OPEN_LIBRARY_COVER_URL, OPEN_LIBRARY_API_URL } from "../Constants";
import axios from "axios";

const BookDetail = () => {
  const AUTHOR_URL = "http://localhost:3000/author/";
  const { key, isbn, author } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailResults, setDetailResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(OPEN_LIBRARY_API_URL + "/works/" + key + ".json")
      .then((response) => {
        const result = response?.data;
        setDetailResults(result);
      })
      .then(() => setLoading(false))
      .catch((err) => setError(err));
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

  if (!detailResults) {
    return null;
  }

  return (
    <div>
      <section className="section-bg">
        <h1 className="h3">Book Detail</h1>
        <div className="row mb-4 border">
          <div className="col-md-3 col-lg-2 order-md-first bg-light">
            <img
              className="img-fluid mx-auto d-block"
              width="200px"
              alt={detailResults.title}
              src={OPEN_LIBRARY_COVER_URL + isbn + `-L.jpg`} //{`https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-M.jpg`}
            />
          </div>

          <div className="col-md-9 col-lg-10 ps-md-3 ps-lg-10">
            <h1 className="h5 pt-2">{detailResults.title}</h1>

            <div className="row p-3">
              Description:
              <br />
              {detailResults.description}
              {/* {detailResults.description !== undefined
                ? detailResults.description
                : null} */}
            </div>
            <div className="row p-3">
              Author: &nbsp;
              <a
                href={AUTHOR_URL + author}
                className="text-info text-decoration-none"
              >
                {author}
              </a>
            </div>
            <div className="row p-3">
              Excerpt:
              {/* {detailResults.excerpts?.slice(0, 1)?.map((exc, i) => {
                return <p key={i}>{exc.excerpt}</p>;
              })} */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetail;
