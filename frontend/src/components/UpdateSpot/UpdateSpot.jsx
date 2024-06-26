import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrSpot, getOneSpot } from "../../store/spotsReducer";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateSpot.css";

export default function UpdateSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
  const { spotId } = useParams();

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  const spotsObj = useSelector((state) => state.spotsState);
  const spots = Object.values(spotsObj.spots);
  let spot = spots.find((spot) => spot.id === Number(spotId));

  // console.log("ALL VALUES OF SPOTS OBJECT HERE =====> ", spots);
  // console.log("SPOT INFO HERE ======>", spot);
  // console.log("SPOT INFO HERE ======>", spot.lat);

  // const currSpot = dispatch(getOneSpot(spotId));
  // console.log("CURRENT SPOT HERE ======>", currSpot[spotId]);

  const [country, setCountry] = useState(spot.country || "");
  const [lat, setLat] = useState(spot.lat || "");
  const [lng, setLng] = useState(spot.lng || "");
  const [address, setAddress] = useState(spot.address || "");
  const [city, setCity] = useState(spot.city || "");
  const [state, setState] = useState(spot.state || "");
  const [description, setDescription] = useState(spot.description || "");
  const [name, setName] = useState(spot.name || "");
  const [price, setPrice] = useState(spot.price || "");
  const [previewImage, setPreviewImage] = useState(spot.previewImage || "");
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  useEffect(() => {
    const errors = {};
    if (!country.length) errors.country = "Country is required";
    if (!lat || lat < -90 || lat > 90) errors.lat = "Latitude is required";
    if (!lng || lng < -180 || lng > 180) errors.lng = "Longitude is required";
    if (!address.length) errors.address = "Address is required";
    if (!city.length) errors.city = "City is required";
    if (!state.length) errors.state = "State is required";
    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";
    if (!name.length) errors.name = "Name is required";
    if (!price || price < 0) errors.price = "Price is required";
    if (!previewImage.length) errors.previewImage = "Preview image is required";
    setValidationErrors(errors);
  }, [
    country,
    lat,
    lng,
    address,
    city,
    state,
    description,
    name,
    price,
    previewImage,
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const newSpot = {
      country,
      lat,
      lng,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    // dispatch(updateCurrSpot(newSpot, spotId));
    const submit = await dispatch(updateCurrSpot(newSpot, spotId));

    if (submit) {
      dispatch(getOneSpot(submit.id));
      navigate(`/spots/${submit.id}`);
    }
  };

  return (
    <div className="whole-form-container">
      <h1 className="form-name">Update Spot</h1>
      <form className="new-form-container" onSubmit={handleSubmit}>
        <div className="new form new-location">
          <h2>Where&apos;s your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <span className="column">
            <label>
              Country
              <input
                className="new-input"
                value={country}
                placeholder="Country"
                type="text"
                onChange={(e) => setCountry(e.target.value)}
              />
            </label>
            <div style={{ color: "red" }}>
              {hasSubmitted && validationErrors.country}
            </div>
            <label>
              Street Address
              <input
                className="new-input"
                value={address}
                placeholder="Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <div style={{ color: "red" }}>
              {hasSubmitted && validationErrors.address}
            </div>
          </span>
          <span className="city-state">
            <label>
              City
              <input
                className="new-input"
                value={city}
                placeholder="City"
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
              ,
            </label>
            <div style={{ color: "red" }}>
              {hasSubmitted && validationErrors.city}
            </div>
            <label>
              State
              <input
                className="new-input"
                value={state}
                placeholder="STATE"
                type="text"
                onChange={(e) => setState(e.target.value)}
              />
            </label>
            <div style={{ color: "red" }}>
              {hasSubmitted && validationErrors.state}
            </div>
          </span>
          <span className="lat-lng">
            <label>
              Latitude
              <input
                type="number"
                value={lat}
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
              />
              ,
            </label>
            <div style={{ color: "red" }}>
              {hasSubmitted && validationErrors.lat}
            </div>
            <label>
              Longitude
              <input
                type="number"
                value={lng}
                placeholder="Longitude"
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
            <div style={{ color: "red" }}>
              {hasSubmitted && validationErrors.lng}
            </div>
          </span>
        </div>
        <div className="new form new-description">
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <label>
            <textarea
              className="new-input describe-new"
              value={description}
              type="text"
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div style={{ color: "red" }}>
            {hasSubmitted && validationErrors.description}
          </div>
        </div>
        <div className="new form new-title">
          <h2>Create a title for your spot</h2>
          <p>
            Catch your guest&apos;s attention with a spot title that highlights
            what makes your place special.
          </p>
          <input
            className="new-input"
            value={name}
            type="text"
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{ color: "red" }}>
            {hasSubmitted && validationErrors.name}
          </div>
        </div>
        <div className="new form new-price">
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <span className="price-span">
            $
            <input
              className="price-input"
              value={price}
              type="number"
              placeholder="Price per night (USD)"
              onChange={(e) => setPrice(e.target.value)}
            />
          </span>
          <div style={{ color: "red" }}>
            {hasSubmitted && validationErrors.price}
          </div>
        </div>
        <div className="new form new-photos-container">
          <h2>Liven up your spot with photos</h2>
          <p> Submit a link to at least one photo to publish your spot.</p>
          <span className="column photo-urls">
            <input
              value={previewImage}
              type="url"
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            <div style={{ color: "red" }}>
              {hasSubmitted && validationErrors.previewImage}
            </div>
            {/* <label className="column photo-urls">
              <input
                type="url"
                value={image1}
                placeholder="Image URL"
                onChange={(e) => setImage1(e.target.value)}
              />
              {
                <span className="errors">
                  <span>
                    {imageErrors.find((error) => error.includes("Image 2"))}
                  </span>
                </span>
              }
            </label>
            <label className="column photo-urls">
              <input
                type="url"
                value={image2}
                placeholder="Image URL"
                onChange={(e) => setImage2(e.target.value)}
              />
              {
                <span className="errors">
                  <span>
                    {imageErrors.find((error) => error.includes("Image 3"))}
                  </span>
                </span>
              }
            </label>
            <label className="column photo-urls">
              <input
                type="url"
                value={image3}
                placeholder="Image URL"
                onChange={(e) => setImage3(e.target.value)}
              />
              {
                <span className="errors">
                  <span>
                    {imageErrors.find((error) => error.includes("Image 4"))}
                  </span>
                </span>
              }
            </label>
            <label className="column photo-urls">
              <input
                type="url"
                value={image4}
                placeholder="Image URL"
                onChange={(e) => setImage4(e.target.value)}
              />
              {
                <span className="errors">
                  <span>
                    {imageErrors.find((error) => error.includes("Image 5"))}
                  </span>
                </span>
              }
            </label> */}
          </span>
        </div>
        <button className="create-spot-button">Update Spot</button>
      </form>
    </div>
  );
}
