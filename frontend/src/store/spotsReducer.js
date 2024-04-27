import { csrfFetch } from "./csrf";

// Types
const GET_SPOTS = "spotsState/get_spots";
const ONE_SPOT = "spotsState/one_spot";
const USER_SPOTS = "spotsState/user_spots";
const CREATE_SPOT = "spotsState/create_spot";
const UPDATE_SPOT = "spotsState/update_spot";
const DELETE_SPOT = "spotsState/delete_spot";

// Action Creator
export const loadSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});
export const oneSpot = (spot) => ({
  type: ONE_SPOT,
  spot,
});
export const userSpots = (spots) => ({
  type: USER_SPOTS,
  spots,
});
export const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});
export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

// Thunk
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    // console.log("SPOTS RESPONSE", spots);
    dispatch(loadSpots(spots));
  }
};
export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const spots = await response.json();

    dispatch(userSpots(spots));
    // console.log("HITTING USER SPOTS THUNK");
  } else {
    throw new Error("Error fetching Spots");
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  // console.log("REPSONSE GET ONE", response);
  if (response.ok) {
    const spot = await response.json();
    dispatch(oneSpot(spot));
  }
};

export const createNewSpot = (spot, images) => async (dispatch, getState) => {
  const state = getState(); // getting the info of the logged in user
  const user = state.session.user; // have to use getState here to get the current user's info
  // const ownerId = user?.id;

  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  const createSpotImage = async (spotId, url, preview) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, preview }),
    });
    if (res.ok) {
      const imageData = await res.json();
      return { url: imageData.url, preview: true };
    }
    return null;
  };

  if (res.ok) {
    const data = await res.json();
    const spotImages = [];
    const previewImage = await createSpotImage(
      data.id,
      images.previewImage,
      true
    );
    spotImages.push(previewImage);
    const imageKeys = ["image1", "image2", "image3", "image4"];
    for (const key of imageKeys) {
      const imageUrl = images[key];
      if (imageUrl) {
        const spotImage = await createSpotImage(data.id, imageUrl, false);
        spotImages.push(spotImage);
      }
    }
    data.SpotImages = spotImages;
    data.Owner = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
    };
    dispatch(createSpot(data));
    dispatch(getOneSpot(data.id));
    console.log("DATA HEERE", data);
    return data;
  }
};

export const updateCurrSpot = (newSpot, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSpot),
  });

  if (res.ok) {
    const createdSpot = await res.json();
    dispatch(updateSpot(createdSpot));
    dispatch(getOneSpot(spotId));
    return createdSpot;
  }
};

export const deleteCurrSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data.spotId));
    dispatch(getUserSpots());
  }
};

// Reducer
const initialState = { spots: {} };

const spotsReducer = (state = initialState, action) => {
  let newState = {};
  const deleteState = { ...state };
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
    case USER_SPOTS:
      newState = { ...state };
      newState.spots = {}; // clears all existing spots
      action.spots.Spots.forEach(
        (eachSpot) => (newState.spots[eachSpot.id] = eachSpot)
      );
      return newState;
    case CREATE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    case UPDATE_SPOT:
      newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    case DELETE_SPOT:
      delete deleteState[action.spotId];
      return deleteState;
    default:
      return state;
  }
};

export default spotsReducer;
