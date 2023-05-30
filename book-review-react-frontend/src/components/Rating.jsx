import styles from "./Rating.module.css";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useToken from "../hooks/useToken";
import { axios } from "../Constants";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { SPRINGBOOT_SERVER_URL } from "../Constants";

const Rating = (props) => {
  const [rating, setRating] = useState(props.data.rating);
  const [review, setReview] = useState(props.data.review);
  const [hover, setHover] = useState(null);
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState("");
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setRating(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHover(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
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

  const updateHandler = (props) => {
    setLoading(true);
    const data = {
      userReviewId: props.data.userReviewId,
      rating: rating,
      review: review,
    };

    axios
      .put(SPRINGBOOT_SERVER_URL + `api/userreviews/update`, data, config)
      .then((response) => {
        console.log(response);
        setStatus("Successfully updated.");
        props.onRefresh();
        setLoading(false);
        setOpenModal(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const deleteHandler = (props) => {
    setLoading(true);
    axios
      .delete(
        SPRINGBOOT_SERVER_URL +
          `api/userreviews/delete/${props.data.userReviewId}`,
        config
      )
      .then((response) => {
        console.log(response);
        setStatus("Successfully deleted.");
        props.onRefresh();
        setLoading(false);
        setOpenModal(true);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div>
      <div className={styles.container}>
        Rating:
        <div className={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hover || rating) > index ? "#FFBA5A" : "#a9a9a9"}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
        <textarea
          placeholder="What's your review?"
          className={styles.textbox}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="row p-3">
          <div className="col-6">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => updateHandler(props)}
            >
              Update
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteHandler(props)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
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
export default Rating;
