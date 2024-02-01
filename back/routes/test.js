const express = require("express");
const bcrypt = require("bcrypt");
const {
  User,
  UserIndividual,
  UserResume,
  UserBusiness,
  BusinessApplication,
} = require("../models");
const router = express.Router();
const xlsx = require("xlsx");
const path = require("path");

const filePath1 = path.resolve(__dirname, "./dummyIndividual.xlsx");
const filePath2 = path.resolve(__dirname, "./dummyBusiness.xlsx");
function readExcelFile1(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw error;
  }
}
function processExcelData1(data) {
  return data.map((row) => {
    return {
      user_member_id: String(row["user_id"]),
      user_member_pw: String(row["user_pw"]),
      userType: String(row["userType"]),
      user_member_name: String(row["user_name"]),
      user_member_num: String(row["생년월일"]),
      user_member_jibunAddress: String(row["user_jibunAddress"]),
      user_member_tel: String(row["user_tel"]),
      user_member_email: String(row["user_email"]),
      user_member_career: String(row["경력"]),
      user_member_workType: String(row["근무형태"]),
      user_resume_hopeStartYear: String(row["시작연도"]),
      user_resume_hopeStartMonth: String(row["시작월"]),
      user_resume_hopeStartDay: String(row["시작일"]),
      user_resume_school: String(row["대학교"]),
      user_resume_schoolMajor: String(row["학과"]),
    };
  });
}
function generateObjectArrayFromExcel1(filePath) {
  const excelData = readExcelFile1(filePath);
  const processedData = processExcelData1(excelData);
  return processedData;
}

function readExcelFile2(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    throw error;
  }
}
function processExcelData2(data) {
  return data.map((row, index) => {
    if (index < 10) {
      return {
        user_member_id: String(row["user_id"]),
        user_member_pw: String(row["user_pw"]),
        userType: String(row["userType"]),
        business_member_companyName: String(row["companyName"]),
        business_member_jibunAddress: String(row["jibunAddress"]),
        business_member_tel: String(row["tel"]),
        business_member_email: String(row["email"]),
        business_application_name: String(row["채용제목"]),
        business_application_career: String(row["경력"]),
        business_application_careerMin: String(row["최소경력"]),
        business_application_careerMax: String(row["최대경력"]),
        business_application_workPlace: String(row["workPlace"]),
        business_application_startYear: String(row["시작연도"]),
        business_application_startMonth: String(row["시작월"]),
        business_application_startDay: String(row["시작일"]),
        business_application_rank1: String(row["rank1"]),
        business_application_rank2: String(row["rank2"]),
        business_application_rank3: String(row["rank3"]),
        business_application_rank4: String(row["rank4"]),
      };
    }
  });
}
function generateObjectArrayFromExcel2(filePath) {
  const excelData = readExcelFile2(filePath);
  const processedData = processExcelData2(excelData);
  return processedData;
}

router.post("/addCompany", async (req, res, next) => {
  const companys = generateObjectArrayFromExcel2(filePath2);

  try {
    const companiesToAdd = companys.slice(0, 10);
    for (const company of companiesToAdd) {
      const hashedPassword = await bcrypt.hash(company.user_member_pw, 12);

      const addedCompany = await User.create({
        userType: company.userType,
        user_member_id: company.user_member_id,
        user_member_pw: hashedPassword,
      });

      let business_workType = "";
      switch (company.business_application_workPlace) {
        case "사업자 주소와 동일 (출근)":
          business_workType = "출퇴근";
          break;
        case "재택 근무 가능":
          business_workType = "재택";
          break;
        case "출근·재택 병행":
          business_workType = "모두가능";
          break;
        default:
          business_workType = null;
          break;
      }
      await UserBusiness.create({
        business_member_companyName: company.business_member_companyName,
        business_member_jibunAddress: company.business_member_jibunAddress,
        business_member_tel: company.user_member_tel,
        business_member_email: company.user_member_email,
        business_member_workType: business_workType,
        BusinessId: addedCompany.id,
      });

      await BusinessApplication.create({
        business_application_name: company.business_application_name,
        business_application_career: company.business_application_career,
        business_application_careerMin: company.business_application_careerMin,
        business_application_careerMax: company.business_application_careerMax,
        business_application_workPlace: company.business_application_workPlace,
        business_application_startYear: company.business_application_startYear,
        business_application_startMonth:
          company.business_application_startMonth,
        business_application_startDay: company.business_application_startDay,
        business_application_rank1: company.business_application_rank1,
        business_application_rank2: company.business_application_rank2,
        business_application_rank3: company.business_application_rank3,
        business_application_rank4: company.business_application_rank4,
        BusinessId: addedCompany.id,
      });
    }
    res.status(200).send("Companys added");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/addUser", async (req, res, next) => {
  try {
    const users = generateObjectArrayFromExcel1(filePath1);
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.user_member_pw, 12);

      const addedUser = await User.create({
        userType: user.userType,
        user_member_id: user.user_member_id,
        user_member_pw: hashedPassword,
      });

      await UserIndividual.create({
        user_member_name: user.user_member_name,
        user_member_jibunAddress: user.user_member_jibunAddress,
        user_member_tel: user.user_member_tel,
        user_member_email: user.user_member_email,
        user_member_career: user.user_member_career,
        user_member_workType: user.user_member_workType,
        user_member_num: user.user_member_num,
        IndividualId: addedUser.id,
      });

      await UserResume.create({
        user_resume_hopeStartYear: user.user_resume_hopeStartYear,
        user_resume_hopeStartMonth: user.user_resume_hopeStartMonth,
        user_resume_hopeStartDay: user.user_resume_hopeStartDay,
        user_resume_school: user.user_resume_school,
        user_resume_schoolMajor: user.user_resume_schoolMajor,
        user_resume_hopeCompany: user.user_member_workType,
        IndividualId: addedUser.id,
      });
    }

    res.status(200).send("Users added");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/addDummy", async (req, res, next) => {
  try {
    let addedUser;
    const users = generateObjectArrayFromExcel1(filePath1);
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.user_member_pw, 12);

      addedUser = await User.create({
        userType: user.userType,
        user_member_id: user.user_member_id,
        user_member_pw: hashedPassword,
      });

      await UserIndividual.create({
        user_member_name: user.user_member_name,
        user_member_jibunAddress: user.user_member_jibunAddress,
        user_member_tel: user.user_member_tel,
        user_member_email: user.user_member_email,
        user_member_career: user.user_member_career,
        user_member_workType: user.user_member_workType,
        user_member_num: user.user_member_num,
        IndividualId: addedUser.id,
      });

      await UserResume.create({
        user_resume_hopeStartYear: user.user_resume_hopeStartYear,
        user_resume_hopeStartMonth: user.user_resume_hopeStartMonth,
        user_resume_hopeStartDay: user.user_resume_hopeStartDay,
        user_resume_school: user.user_resume_school,
        user_resume_schoolMajor: user.user_resume_schoolMajor,
        user_resume_hopeCompany: user.user_member_workType,
        IndividualId: addedUser.id,
      });
    }
    const companys = generateObjectArrayFromExcel2(filePath2);
    const companiesToAdd = companys.slice(0, 10);
    if (addedUser) {
      for (const company of companiesToAdd) {
        const hashedPassword = await bcrypt.hash(company.user_member_pw, 12);

        const addedCompany = await User.create({
          userType: company.userType,
          user_member_id: company.user_member_id,
          user_member_pw: hashedPassword,
        });

        let business_workType = "";
        switch (company.business_application_workPlace) {
          case "사업자 주소와 동일 (출근)":
            business_workType = "출퇴근";
            break;
          case "재택 근무 가능":
            business_workType = "재택";
            break;
          case "출근·재택 병행":
            business_workType = "모두가능";
            break;
          default:
            business_workType = null;
            break;
        }
        await UserBusiness.create({
          business_member_companyName: company.business_member_companyName,
          business_member_jibunAddress: company.business_member_jibunAddress,
          business_member_tel: company.user_member_tel,
          business_member_email: company.user_member_email,
          business_member_workType: business_workType,
          BusinessId: addedCompany.id,
        });

        await BusinessApplication.create({
          business_application_name: company.business_application_name,
          business_application_career: company.business_application_career,
          business_application_careerMin:
            company.business_application_careerMin,
          business_application_careerMax:
            company.business_application_careerMax,
          business_application_workPlace:
            company.business_application_workPlace,
          business_application_startYear:
            company.business_application_startYear,
          business_application_startMonth:
            company.business_application_startMonth,
          business_application_startDay: company.business_application_startDay,
          business_application_rank1: company.business_application_rank1,
          business_application_rank2: company.business_application_rank2,
          business_application_rank3: company.business_application_rank3,
          business_application_rank4: company.business_application_rank4,
          BusinessId: addedCompany.id,
        });
      }
    }

    res.status(200).send("Dummy added");
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
