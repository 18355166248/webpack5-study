import { useNavigate } from "react-router-dom";
import * as styles from "./index.module.scss";
import { Button } from "antd";
import { isFunction } from "../../utils/base";

const Home = () => {
  const navigate = useNavigate();

  function goSettings() {
    isFunction(navigate) && navigate("/settings");
  }

  return (
    <>
      <div className={styles.home}>首页6</div>
      <div className="global-class">global-class</div>
      <div className={styles.home222}>home222</div>
      <div className="mt-10">
        <Button type="primary" onClick={goSettings}>
          进入设置页面
        </Button>
      </div>
    </>
  );
};

export default Home;
