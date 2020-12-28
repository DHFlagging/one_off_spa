import React, { useEffect } from "react";
import { Menu, Layout } from "antd";
import { connect } from "react-redux";
function LeftSider(props) {
  useEffect(() => {}, []);
  return (
    <Layout.Sider
      collapsible
      collapsed={props.collapse}
      onCollapse={props.setCollapse}
    >
      <Menu style={{ height: "86vh" }}>
        <Menu.Item key="1" title="" icon={<></>}></Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const mapStateToProps = (state) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LeftSider);
