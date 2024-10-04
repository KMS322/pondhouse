import "../../css/eventPopup.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POPUP_REQUEST } from "../../reducers/popup";
const EventPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const { popup } = useSelector((state) => state.popup);
  useEffect(() => {
    dispatch({
      type: LOAD_POPUP_REQUEST,
    });
  }, []);
  return (
    <div className="eventPopup">
      <img onClick={onClose} src="/popups/btn_popup_delete.png" alt="" />
      <img src={`/popups/${popup && popup.img_src}`} alt="" />
    </div>
  );
};

export default EventPopup;
