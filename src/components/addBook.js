import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Select } from "antd";
import axios from "axios";
import { connect } from "react-redux";

function AddBook(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [link, setLink] = useState("");
  const [pages, setPages] = useState("");
  const test = useParams();
  const { Option } = Select;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getBook = async () => {
  //     await axios
  //       .get(
  //         `http://68.178.162.203:8080/application-test-v1.1/books/${test.test}`
  //       )
  //       .then(function (response) {
  //         if (response.status == 200) {
  //           console.log(response.data);
  //         }
  //         // setAllbooks(response.data.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  //   getBook();
  // }, []);

  const checkInput = () => {
    let numReg = /^[0-9]*$/;
    if (title == "") return alert("Please enter title");
    if (author == "") return alert("Please enter author");
    if (year == "") return alert("Please enter year");
    if (year.length < 4) return alert("Please enter year in 4 digit");
    if (year !== "" && numReg.test(year) === false)
      return alert("Please enter a valid year");
    if (country == "") return alert("Please select country");
    if (language == "") return alert("Please enter language");
    if (link == "") return alert("Please enter link");
    if (pages == "") return alert("Please enter pages");
    if (pages !== "" && numReg.test(pages) === false)
      return alert("Please enter a valid pages");

    if (test.test == "addNewBook") addItem();
    else editItem();
  };

  const addItem = async () => {
    try {
      const addItem = await axios({
        method: "POST",
        url: `http://68.178.162.203:8080/application-test-v1.1/books`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          title: title,
          author: author,
          year: year,
          country: country,
          language: language,
          link: link,
          pages: pages,
        }),
      });
      console.log(addItem);
      if (addItem.data.message == "Data Added Successfully") {
        alert("Book Details added");
        navigate(-1);
      }
    } catch (err) {
      if (err.response.status === 404) {
        console.log("Resource could not be found!");
      } else {
        console.log(err.response.data);
      }
    }
  };

  const editItem = async () => {
    try {
      const newData = {
        title: title,
        author: author,
        year: year,
        country: country,
        language: language,
        link: link,
        pages: pages,
      };

      const response = await axios.put(
        `http://68.178.162.203:8080/application-test-v1.1/books/${test.test}`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data.message == "Data Edited Successfully") {
        alert("Book Details updated");
        navigate(-1);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("Resource could not be found!");
      } else {
        console.error("Error:", err);
      }
    }
  };
  return (
    <div>
      <p>Add a to book to library</p>
      <Input
        placeholder="Enter Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        style={{ width: "50%", margin: 10 }}
      />
      <Input
        placeholder="Enter Author"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        style={{ width: "50%", margin: 10 }}
      />
      <Input
        placeholder="Enter Year"
        onChange={(e) => setYear(e.target.value)}
        value={year}
        style={{ width: "50%", margin: 10 }}
        maxLength={4}
      />
      <Select
        style={{ width: "50%" }}
        value={country}
        onChange={(value) => {
          setCountry(value);
        }}
      >
        <Option value="">Select</Option>
        {props.common.countryArray.map((value) => (
          <Option value={value.value}>{value.value}</Option>
        ))}
      </Select>
      <Input
        placeholder="Enter Language"
        onChange={(e) => setLanguage(e.target.value)}
        value={language}
        style={{ width: "50%", margin: 10 }}
      />
      <Input
        placeholder="Enter Link"
        onChange={(e) => setLink(e.target.value)}
        value={link}
        style={{ width: "50%", margin: 10 }}
      />
      <Input
        placeholder="Enter Pages"
        onChange={(e) => setPages(e.target.value)}
        value={pages}
        style={{ width: "50%", margin: 10 }}
        maxLength={4}
      />
      <Button type="primary" onClick={() => checkInput()}>
        {test.test == "addNewBook" ? "Add Book Details" : "Edit Book Details"}
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
