import "./NewSpotPage.css";
import { createSpot } from "../../store/spotsReducer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function SpotForm() {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h1>Create a New Spot</h1>
      <form className="new-form-container">
        <div className="new-location">
          <h2>Where's your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <label>
            Country
            <input
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Street Address
            <input
              type="text"
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            Latitude
            <input
              type="text"
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </label>
          <label>
            Longitude
            <input
              type="text"
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="new-description">
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
      </form>
    </div>
  );
}
