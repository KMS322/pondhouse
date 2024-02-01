import "../css/subHeader.css";
// import { useDispatch } from "react-redux";
// import { LOAD_DUMMY_REQUEST } from "../reducers/adminUser";
const SubHeader = ({ data }) => {
  // const dispatch = useDispatch();
  // const addDummy = () => {
  //   console.log("btn clicked");
  //   dispatch({
  //     type: LOAD_DUMMY_REQUEST,
  //   });
  // };

  return (
    <div className="subHeader">
      <div className="box">
        {/* <img src="/images/subHeader_img.png" alt="" onClick={addDummy} /> */}
        <img src="/images/subHeader_img.png" alt="" />
        <p>페이지 관리자</p>
      </div>
      <p>{data}</p>
    </div>
  );
};

export default SubHeader;
