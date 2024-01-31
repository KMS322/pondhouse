import React, { useState } from "react";
const ContactS1 = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [selectedTime, setSelectedTime] = useState("선택");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [check, setCheck] = useState(false);
  const handleInput = (e, inputType) => {
    const value = e.target.value;
    if (inputType === "name") {
      setName(value);
    } else if (inputType === "tel") {
      setTel(value);
    } else if (inputType === "day") {
      setDay(value);
    } else if (inputType === "time") {
      setTime(value);
    } else if (inputType === "location") {
      setLocation(value);
    } else if (inputType === "content") {
      setContent(value);
    } else if (inputType === "check") {
      setCheck(value);
    }
  };

  const handleTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const sendForm = () => {};
  return (
    <div className="contact_s1">
      <div className="article_container">
        <p>CONTACT</p>
        <div className="input_container">
          <p>상담요청항목</p>
          <div className="input_box">
            <p>
              이름 <sup>*</sup>
            </p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                handleInput(e, "name");
              }}
              required
              placeholder="이름을 입력해 주세요."
            />
          </div>
          <div className="input_box">
            <p>
              전화번호 <sup>*</sup>
            </p>
            <input
              type="tel"
              name="tel"
              value={tel}
              onChange={(e) => {
                handleInput(e, "tel");
              }}
              required
              placeholder="전화번호를 입력해 주세요."
            />
          </div>
          <div className="input_box">
            <p>
              예식 날짜 <sup>*</sup>
            </p>
            <input
              type="day"
              name="day"
              value={day}
              onChange={(e) => {
                handleInput(e, "day");
              }}
              required
              placeholder="YYYY.MM.DD"
            />
          </div>
          <div className="input_box">
            <p>
              예식 시간 <sup>*</sup>
            </p>
            <div className="sub_input_box">
              <select value={selectedTime} onChange={handleTime}>
                <option value="select">선택</option>
                <option value="am">오전</option>
                <option value="pm">오후</option>
              </select>
              <input
                type="text"
                name="time"
                value={time}
                onChange={(e) => {
                  handleInput(e, "time");
                }}
                required
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="input_box">
            <p>
              예식장 위치 <sup>*</sup>
            </p>
            <input
              type="location"
              name="location"
              value={location}
              onChange={(e) => {
                handleInput(e, "location");
              }}
              required
              placeholder="주소를 입력해 주세요."
            />
          </div>
          <div className="input_box textarea_box">
            <p>
              상담내용 <sup>*</sup>
            </p>
            <textarea
              value={content}
              onChange={(e) => {
                handleInput(e, "content");
              }}
              placeholder="내용을 입력해 주세요."
            />
          </div>
          <div className="check_box">
            {check ? (
              <img
                src="/images/checkOn.png"
                alt=""
                onClick={() => {
                  setCheck(false);
                }}
              />
            ) : (
              <img
                src="/images/checkOff.png"
                alt=""
                onClick={() => {
                  setCheck(true);
                }}
              />
            )}
            <p>
              개인정보취급방침에 동의합니다. <sup>*</sup>
            </p>
          </div>
          <div className="submit_btn" onClick={sendForm}>
            문의하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactS1;
