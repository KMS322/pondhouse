import React, { useRef, useEffect } from "react";
const MainS3 = () => {
  const mainS3Ref = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPosition = (115 * window.innerWidth) / 100;

      if (scrollPosition >= triggerPosition && mainS3Ref.current) {
        mainS3Ref.current.classList.add("animate");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="main_s3" ref={mainS3Ref}>
      <div className="article_container">
        <div className="text_box">
          <p>기쁜날 초대주셔서 감사합니다.</p>
          <p>POND HOUSE</p>
          <div className="sub_text_box">
            <p>폰드하우스에 찾아주시는 모든 분들과 </p>
            <p>이야기 나누고 싶습니다.</p>
            <p>여러분들의 이야기를 들려주시면</p>
            <p>아름답고, 선명하게 담아서 선물드리겠습니다.</p>
            <p>감사합니다.</p>
          </div>
        </div>
        <img src="/images/main_s3.jpg" alt="" />
      </div>
    </div>
  );
};

export default MainS3;
