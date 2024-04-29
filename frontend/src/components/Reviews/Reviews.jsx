import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviewsReducer";
import { DeleteReview } from "../DeleteReview/DeleteReview";
import OpenModalButton from "../OpenModalButton";
import "./Reviews.css";
import { CreateReview } from "../CreateReview/CreateReview";
import { FaStar } from "react-icons/fa";

const Reviews = ({ avgStarRating, numReviews }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewsState);
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spotsState[spotId]);
  // console.log("SPOT DATA =====>", spot);
  // console.log("OWNER ID =====>", spot.ownerId);

  const user = useSelector((state) => state.session.user);
  // console.log("USER ======>", user.id);

  const reviewsArray = Object.values(reviews);

  if (reviewsArray.length > 0) {
    reviewsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, spotId]);

  // console.log("REVIEWS ARRAY", reviewsArray);

  if (
    // !reviewsArray ||
    // !reviewsArray.length ||
    reviewsArray.some((review) => !review.User)
  ) {
    return <div>Loading...</div>;
  }

  let alreadyHasReview;
  if (user) {
    alreadyHasReview = reviewsArray.some(
      (review) => review.User.id === user.id
    );
  }
  let isOwner;
  if (user) {
    if (user.id == spot.ownerId) {
      isOwner = true;
    }
  }

  let reviewText = isOwner
    ? "No Reviews Yet"
    : "Be the first to post a review!";

  return (
    <div className="reviews-container">
      <div className="rating-info">
        <p>
          <FaStar className="fa-star" />
          {avgStarRating}
        </p>
        {numReviews > 0 && (
          <>
            <p>·</p>
            <p>{`${numReviews} ${numReviews === 1 ? "review" : "reviews"}`}</p>
          </>
        )}
      </div>
      {user && !alreadyHasReview && !isOwner && (
        <div className="post-review-bttn">
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<CreateReview />}
          />
        </div>
      )}
      {reviewsArray.length === 0 ? (
        <p>{reviewText}</p>
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
            {user && review.userId === user.id && (
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
