import React, { useRef, useEffect } from "react";
const MainS3 = () => {
  const mainS3Ref = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start your animation here (e.g., add a class to trigger CSS animation)
          entry.target.classList.add("animate"); // Assuming you have an 'animate' class in your CSS
          observer.unobserve(entry.target); // Stop observing once the animation is triggered
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (mainS3Ref.current) {
      observer.observe(mainS3Ref.current);
    }

    // Cleanup the observer when component unmounts
    return () => {
      if (mainS3Ref.current) {
        observer.unobserve(mainS3Ref.current);
      }
    };
  }, []);

  return (
    <div className="main_s3" ref={mainS3Ref}>
      <div className="article_container">
        <div className="text_box">
          <p>기쁜날 초대주셔서 감사합니다.</p>
          <p>POND HOUSE</p>
          <div className="sub_text_box">
            <p>폰드하우스에 찾아주시는 모든 분들과 이야기 나누고 싶습니다.</p>
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
