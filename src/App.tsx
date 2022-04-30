import { Layout } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import SideTable from "./components/table/table";
import Map from "./components/map/map";
import "./App.css";

function App() {
  return (
    <>
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <Sider className="sider">
          <SideTable />
        </Sider>
        <Layout>
          <Content>
            <Map />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
