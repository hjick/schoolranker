import React, { useState, useEffect } from "react";
import AllSchoolPresenter from "./AllSchoolPresenter";
import axios from "axios";

const AllSchoolContainer = () => {
  const [schoolLists, setSchoolLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolListsPerPage] = useState(10);
  const [schoolTerm, setSchoolTerm] = useState("");
  const [searchSchoolLists, setSearchSchoolLists] = useState([]);

  useEffect(() => {
    const fetchSchoolLists = async () => {
      setIsLoading(true);
      const res = await axios.get("/api/users/get/schoolList");
      const sortedSchoolLists = res.data.sort(
        (a, b) => b.totalScore - a.totalScore
      );
      setSchoolLists(sortedSchoolLists);
      setIsLoading(false);
    };
    fetchSchoolLists();
  }, []);

  const schoolTermHandler = (e) => {
    const { value } = e.target;
    setSchoolTerm(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let searchSchool = [];

    for (let [index, school] of schoolLists.entries()) {
      const theSchool = school.school.includes(schoolTerm);
      if (theSchool) {
        searchSchool.push({ rank: index + 1, ...school });
      }
    }
    if (searchSchool.length > 0) {
      setIsLoading(false);
      setSearchSchoolLists(searchSchool);
    } else {
      setIsLoading(false);
      setSchoolTerm("");
      alert("등록된 학교가 아니에요 !");
    }
    // setIsLoading(true);
    // const res = await axios.get(`/api/users/get/schoolList/${schoolTerm}`);
    // console.log(res);
    // if (res.data.length > 0) {
    //   const sortedSchoolLists = res.data.sort(
    //     (a, b) => b.totalScore - a.totalScore
    //   );
    //   setSchoolLists(sortedSchoolLists);
    //   setIsLoading(false);
    // } else {
    //   alert("등록된 학교가 없어요 !");
    //   setIsLoading(false);
    // }
  };

  // Get current posts
  const indexOfLastPost = currentPage * schoolListsPerPage;
  const indexOfFirstPost = indexOfLastPost - schoolListsPerPage;
  const currentSchoolLists = schoolLists.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <AllSchoolPresenter
      schoolLists={schoolLists}
      currentSchoolLists={currentSchoolLists}
      isLoading={isLoading}
      schoolListsPerPage={schoolListsPerPage}
      paginate={paginate}
      currentPage={currentPage}
      schoolTerm={schoolTerm}
      schoolTermHandler={schoolTermHandler}
      handleSubmit={handleSubmit}
      searchSchoolLists={searchSchoolLists}
    />
  );
};

export default AllSchoolContainer;
