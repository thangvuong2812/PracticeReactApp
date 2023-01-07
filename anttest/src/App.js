import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import TodoFeature from "./features/Todo";
import Home from "./features/Todo/pages/Home";
const { Header, Content, Sider } = Layout;
const items1 = ["Home", "Todolist", "More"].map((item, index) => ({
  key: index,
  label: item,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const App = () => {
  const [selectKey, setSelectKey] = useState("0");
  let location = useLocation();

  useEffect(() => {
    const selectedItem = items1.find(item => item.label.toLowerCase() === location.pathname.replace("/", "").toLowerCase());
    console.log(selectedItem);
    setSelectKey(selectedItem?.key.toString());
    // setSelectKey()
  }, []);
  const handleSelectKey = (e) => {
    setSelectKey(e.key);
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectKey]}
          onSelect={handleSelectKey}
        
        >
          {
            items1.map(item => 
              <Menu.Item key={item.key}>
                <Link to={"/"+item.label}>{item.label}</Link>
              </Menu.Item>
            )
          }
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["2"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{location.pathname.replace("/", "").toLocaleUpperCase()}</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Redirect from="/home" to="/" exact />
              <Route path="/" exact>
                <Home/>
              </Route>
              <Route path="/todolist">
                <TodoFeature/>
              </Route>

              <Route>
                <NotFound/>
              </Route>
            </Switch>
            
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
} 

export default App;
