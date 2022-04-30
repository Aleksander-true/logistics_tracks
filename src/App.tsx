import { useState } from "react";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SideTable from "./components/table/table";
import Map from "./components/map/map";
import { INIT_SIDER_WITH } from "./constants";
import "./App.css";

function App() {
  const [isPulling, setIsPulling] = useState(false);
  const [slderWith, setSlderWith] = useState(INIT_SIDER_WITH);
  const onMove = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    if (isPulling) {
      setSlderWith(event.pageX);
    }
  };

  const PullHandle = () => (
    <div className="pull" onMouseDown={() => setIsPulling(true)}></div>
  );

  return (
    <Layout
      hasSider
      className="layout"
      onMouseMove={onMove}
      onMouseUp={() => setIsPulling(false)}
    >
      <Sider className="sider" width={slderWith}>
        <SideTable />
      </Sider>
      <Layout>
        <Content className="content">
          <Map />
          <PullHandle />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
