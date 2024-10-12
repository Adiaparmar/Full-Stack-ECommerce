import { HiDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingdownIcon from "@mui/icons-material/TrendingDown";
const DashboardBox = (props) => {
  return (
    <div
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
      }}
    >
      {props.grow === true ? (
        <span className="chart">
          <TrendingUpIcon />
        </span>
      ) : (
        <span className="chart">
          <TrendingdownIcon />
        </span>
      )}
      <div className="d-flex w-100">
        <div className="col1">
          <h4 className="text-white mb-0">Total Users</h4>
          <span className="text-white">277</span>
        </div>

        <div className="ml-auto">
          {props.icon ? (
            <span className="icon">{props.icon ? props.icon : ""}</span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="d-flex align-items-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">Last Month</h6>
        <Button className="ml-auto toggleIcons">
          <HiDotsVertical />
        </Button>
      </div>
    </div>
  );
};

export default DashboardBox;
