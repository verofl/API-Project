import { deleteCurrSpot } from "../../store/spotsReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSpot.css";
import { useNavigate } from "react-router-dom";

export const DeleteSpot = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const navigate = useNavigate();

  // console.log(spot.id);
  const deleteEvent = (e) => {
    e.preventDefault();
    dispatch(deleteCurrSpot(spot.id));
    closeModal();
    navigate("/spots/current");
    window.location.reload();
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div>
        <button onClick={deleteEvent}> Yes(Delete Spot)</button>
        <button onClick={closeModal}>No (Keep Spot)</button>
      </div>
    </div>
  );
};
