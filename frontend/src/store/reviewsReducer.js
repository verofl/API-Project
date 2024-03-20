import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviewsState/get_reviews";

export const loadReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  console.log("REVIEWS RESPONSE", spotId);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
  }
};

const initialState = { reviews: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const newReviews = {};
      try {
        action.reviews.Reviews.forEach(
          (eachReview) => (newReviews[eachReview.id] = eachReview)
        );
        return { ...state, reviews: newReviews };
      } catch {
        return state;
      }
    }

    default:
      return state;
  }
};

export default reviewsReducer;
