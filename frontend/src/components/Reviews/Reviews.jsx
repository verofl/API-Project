import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviewsReducer";

const Reviews = ({ avgStarRating, numReviews }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewsState);
  const { spotId } = useParams();

  const reviewsArray = Object.values(reviews);

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, spotId]);

  console.log("REVIEWS", reviews);

  return (
    <div className="reviews-container">
      <div className="rating-info">
        <p>
          <i className="fa-solid fa-star"></i>
          {avgStarRating}
        </p>
        <p>{`${numReviews} ${numReviews === 1 ? "review" : "reviews"}`}</p>
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
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
