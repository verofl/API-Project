import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviewsState/get_reviews";
const CREATE_REVIEW = "reviewsState/create_review";
const DELETE_REVIEW = "reviewsState/delete_review";

export const loadReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  // console.log("REVIEWS RESPONSE", spotId);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
  } else {
    throw new Error("Error fetching reviews");
  }
};

export const createNewReview = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  const createdReview = await res.json();
  dispatch(createReview(createdReview));
  dispatch(loadReviews(spotId));
  return createdReview;
};

export const deleteCurrReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(data.reviewId));
  }
};

// const initialState = { reviews: {} };

const reviewsReducer = (state = {}, action) => {
  const deleteState = { ...state };
  switch (action.type) {
    case GET_REVIEWS: {
      const newReviews = {};
      try {
        action.reviews.Reviews.forEach(
          (eachReview) => (newReviews[eachReview.id] = eachReview)
        );
      } catch {
        console.error("Error fetching reviews");
      }
      return newReviews;
    }
    case CREATE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case DELETE_REVIEW:
      delete deleteState[action.reviewId];
      return deleteState;
    default:
      return state;
  }
};

export default reviewsReducer;
