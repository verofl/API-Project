import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviewsReducer";
import { DeleteReview } from "../DeleteReview/DeleteReview";
import OpenModalButton from "../OpenModalButton";
import "./Reviews.css";
import { CreateReview } from "../CreateReview/CreateReview";

const Reviews = ({ avgStarRating, numReviews }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewsState);
  const { spotId } = useParams();
  // const spot = useSelector((state) => state.spotsState[spotId]);

  const user = useSelector((state) => state.session.user);
  console.log("USER ======>", user.id);

  const reviewsArray = Object.values(reviews);

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, spotId]);

  console.log("REVIEWS ARRAY", reviewsArray);

  if (
    !reviewsArray ||
    !reviewsArray.length ||
    reviewsArray.some((review) => !review.User)
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reviews-container">
      <div className="rating-info">
        <p>
          <i className="fa-solid fa-star"></i>
          {avgStarRating}
        </p>
        <p>{`${numReviews} ${numReviews === 1 ? "review" : "reviews"}`}</p>
      </div>
      <div className="post-review-bttn">
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<CreateReview />}
        />
      </div>
      {reviewsArray.length === 0 ? (
        <p>No Reviews Yet</p>
      ) : (
        reviewsArray.map((review) => (
          <div key={review.id} className="each-review">
            <h4>{review.User.firstName}</h4>
            <p>
              {new Date(review.createdAt).toLocaleString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>{review.review}</p>
            {review.userId === user.id && (
              <div className="review-delete">
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeleteReview review={review} />}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
