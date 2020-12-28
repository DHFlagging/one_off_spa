import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
function InitialLoad(props) {
  useEffect(() => {}, []);
  return <></>;
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InitialLoad);
