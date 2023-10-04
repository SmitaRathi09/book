import React, { useEffect } from "react";
import ListBooks from "./listBooks";
import ListBooksPagination from "./listBooksPagination";
import { connect } from "react-redux";

function HomePage(props) {
  const countryArray = [
    {
      text: "India",
      value: "India",
    },
    {
      text: "US",
      value: "US",
    },
    {
      text: "UK",
      value: "UK",
    },
  ];

  useEffect(() => {
    props.setData({ countryArray: countryArray });
  }, []);
  return (
    <div>
      <p style={{ fontWeight: "bold", margin: 10 }}>Welcome to book library</p>
      <ListBooks />
      <p style={{ fontWeight: "bold", margin: 10 }}>Welcome to book library</p>
      <ListBooksPagination />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    common: state.common,
    bill: state.bill,
    quot: state.quot,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setData: (data) => dispatch({ type: "SET_DATA", payload: data }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
