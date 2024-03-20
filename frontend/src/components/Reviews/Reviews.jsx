import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviewsReducer";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewsState);
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, spotId]);

  console.log("REVIEWS", reviews);

  const reviewsArray = Object.values(reviews?.reviews || []);

  return (
    <div className="reviews-container">
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
