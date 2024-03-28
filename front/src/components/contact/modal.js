import "../../css/modal.css";
import "../../css/modal_mobile.css";

const Modal = ({ data }) => {
  return (
    <div className="modal">
      {data === "success" ? (
        <>
          <img src="/images/icon_success.png" alt="" />
          <p>정상적으로 문의가 접수되었습니다.</p>
        </>
      ) : data === "fail" ? (
        <>
          <img src="/images/icon_fail.png" alt="" />
          <p>
            미기입 된 항목이 있습니다.
            <br />
            항목을 기입하고 다시 시도해 주세요.
          </p>
        </>
      ) : data === "loading" ? (
        <>
          <img src="/images/icon_fail.png" alt="" />
          <p>
            메일을 보내는 중 입니다. <br />
            잠시만 기다려 주세요.
          </p>
        </>
      ) : (
        <>
          <img src="/images/icon_fail.png" alt="" />
          <p>개인정보취급방침에 동의해주세요.</p>
        </>
      )}
    </div>
  );
};

export default Modal;
