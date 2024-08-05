import { FC } from "react";
import * as styles from "./index.module.scss";
import { Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import { isFunction } from "../../utils/base";

interface SettingsProps {}

const Settings: FC<SettingsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function back() {
    console.log(111, location);
    navigate(-1);
  }
  function setting() {
    isFunction(message.success) && message.success("设置成功");
  }
  return (
    <div className={cn(styles.settings, "mt-10 pl-10")}>
      <div className="mb-10">
        <Button onClick={back}>返回</Button>
      </div>
      <div>
        <Button type="primary" onClick={setting}>
          设置
        </Button>
      </div>
    </div>
  );
};

export default Settings;
