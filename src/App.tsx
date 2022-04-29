import { Layout } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import SideTable from "./components/table/table";
import "./App.css";

function App() {
  return (
    <>
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <Sider className="sider">
          <SideTable />
        </Sider>
        <Layout>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
