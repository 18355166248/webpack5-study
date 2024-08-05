import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <div className="py-10 px-10 bg-rose-100 text-cyan-900 text-2xl font-bold">
        公共区域
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
