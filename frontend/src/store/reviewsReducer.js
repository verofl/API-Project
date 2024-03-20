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
  } else {
    throw new Error("Error fetching reviews");
  }
};

// const initialState = { reviews: {} };

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const newReviews = { ...state };
      try {
        action.reviews.Reviews.forEach(
          (eachReview) => (newReviews[eachReview.id] = eachReview)
        );
      } catch {
        console.error("Error fetching reviews");
      }
      return newReviews;
    }

    default:
      return state;
  }
};

export default reviewsReducer;
