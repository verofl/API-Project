import { csrfFetch } from "./csrf";

const GET_SPOTS = "spotsState/get_spots";

export const loadSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    // console.log("SPOTS RESPONSE", spots);

    dispatch(loadSpots(spots));
  }
};

const initialState = { spots: {} };

const spotsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SPOTS:
      newState = { ...state };
      action.spots.Spots.forEach(
        (eachSpot) => (newState.spots[eachSpot.id] = eachSpot)
      );
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
