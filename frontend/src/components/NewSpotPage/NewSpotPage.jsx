import "./NewSpotPage.css";
import { createSpot } from "../../store/spotsReducer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function SpotForm() {
  const [validationErrors, setValidationErrors] = useState({});
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="whole-form-container">
      <h1>Create a New Spot</h1>
      <form className="new-form-container">
        <div className="new form new-location">
          <h2>Where's your place located?</h2>
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
                required
              />
            </label>
            <label>
              Street Address
              <input
                className="new-input"
                value={street}
                placeholder="Address"
                type="text"
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </label>
          </span>
          <span className="city-state">
            <label>
              City
              <input
                // className="city-state-input"
                value={city}
                placeholder="City"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              ,
            </label>
            <label>
              State
              <input
                // className="city-state-input"
                value={state}
                placeholder="STATE"
                type="text"
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>
          </span>
          <span className="lat-lng">
            <label>
              Latitude
              <input
                value={lat}
                type="number"
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
              />
              ,
            </label>
            <label>
              Longitude
              <input
                value={lng}
                type="number"
                placeholder="Longitude"
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
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
              className="new-input"
              value={description}
              type="text"
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="new form new-title">
          <h2>Create a title for your spot</h2>
          <p>
            Catch your guest's attention with a spot title that highlights what
            makes your place special.
          </p>
          <input
            className="new-input"
            value={title}
            type="text"
            placeholder="Name of your spot"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
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
              required
            />
          </span>
        </div>
        <div className="new form new-photos-container">
          <h2>Liven up your spot with photos</h2>
          <p> Submit a link to at least one photo to publish your spot.</p>
          <span className="column photo-urls">
            <input type="url" placeholder="Preview Image URL" />
            <input type="url" placeholder="Image URL" />
            <input type="url" placeholder="Image URL" />
            <input type="url" placeholder="Image URL" />
            <input type="url" placeholder="Image URL" />
          </span>
        </div>
        <button className="create-spot-button">Create Spot</button>
      </form>
    </div>
  );
}
