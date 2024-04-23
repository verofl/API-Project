import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createNewReview } from "../../store/reviewsReducer";
import "./CreateReview.css";

export const CreateReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (review.length < 10) {
      errors.review = "Review needs a minimum of 10 characters";
    }
    if (stars === 0) {
      errors.stars = "Reviews needs a minimum of 1 star";
    }
    setValidationErrors(errors);
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const newReview = {
      review,
      stars,
    };
    const submit = await dispatch(createNewReview(spotId, newReview));

    // dispatch(getOneSpot(submit));
    if (submit) {
      closeModal;
      window.location.reload();
    }
  };

  const disableSubmit = review.length < 10;

  // console.log(spot.id);

  return (
    <div className="modal-confirmation">
      <div className="confirmation-text">
        <h1>How was your stay?</h1>
      </div>
      <label>
        <textarea
          className="new-review"
          value={review}
          type="text"
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
        />
      </label>
      <div style={{ color: "red" }}>
        {hasSubmitted && validationErrors.review}
      </div>
      <div className="new-star-rating">
        {[1, 2, 3, 4, 5].map((num) => (
          <i
            key={num}
            className={num <= stars ? "fa-solid fa-star" : "fa-regular fa-star"}
            onClick={() => setStars(num)}
          ></i>
        ))}
      </div>
      <div style={{ color: "red" }}>
        {hasSubmitted && validationErrors.stars}
      </div>
      <div className="button-cont">
        <div className="create-buttn">
          <button
            onClick={handleSubmit}
            className="yes-create"
            disabled={disableSubmit}
          >
            {" "}
            Submit Your Review
          </button>
        </div>
      </div>
    </div>
  );
};
