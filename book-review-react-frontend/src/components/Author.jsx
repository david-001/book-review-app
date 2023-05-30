import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { OPEN_LIBRARY_AUTHOR_URL } from "../Constants";
import axios from "axios";

const Author = () => {
  const { author } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorResults, setAuthorResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(OPEN_LIBRARY_AUTHOR_URL + author)
      .then((response) => {
        const result = response?.data?.docs[0];
        console.log(result);
        setAuthorResults(result);
      })
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      <section className="section-bg">
        <h1 className="h3">Author</h1>
        Author: &nbsp; {author} <br />
        Top Work: &nbsp; {authorResults.top_work} <br />
        Work Count: &nbsp; {authorResults.work_count} <br />
        Top Subjects: <br />
        <ul>
          {authorResults.top_subjects?.map((subject, i) => {
            return <li key={i}>{subject}</li>;
          })}
        </ul>
      </section>
    </div>
  );
};

export default Author;
