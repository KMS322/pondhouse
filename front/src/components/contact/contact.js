import "../../css/contact.css";
import "../../css/contact_mobile.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POPUP_REQUEST } from "../../reducers/popup";
import ContactS1 from "./contactS1";
import ContactS2 from "./contactS2";
import EventPopup from "./eventPopup";
const Contact = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();
  const { popup } = useSelector((state) => state.popup);
  const handleClose = () => {
    setOpenPopup(false);
  };
  useEffect(() => {
    dispatch({
      type: LOAD_POPUP_REQUEST,
    });
  }, []);
  useEffect(() => {
    if (popup && popup.active === "on") {
      setOpenPopup(true);
    }
  }, [popup]);
  return (
    <>
      <ContactS1 />
      <ContactS2 />
      {openPopup ? <EventPopup onClose={handleClose} /> : ""}
    </>
  );
};

export default Contact;
