import { csrfFetch } from "./csrf";

const GET_SPOTS = "spotsState/get_spots";
const ONE_SPOT = "spotsState/one_spot";
const CREATE_SPOT = "spotsState/create_spot";

export const loadSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});
export const oneSpot = (spot) => ({
  type: ONE_SPOT,
  spot,
});

export const createOneSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    // console.log("SPOTS RESPONSE", spots);

    dispatch(loadSpots(spots));
  }
};

export const createSpot = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const { resSpot } = await response.json();
    console.log("RESONSE CREATE SPOT", resSpot);
    dispatch(createOneSpot(resSpot));
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(oneSpot(spot));
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
    case ONE_SPOT:
      newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    case CREATE_SPOT:
      newState = { ...state };
      newState.spots[action.spot.id] = action.spot;
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
