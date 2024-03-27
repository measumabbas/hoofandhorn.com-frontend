import React, { useEffect, useState } from "react";
import "./style.css";
import { ArrowUp, ArrowDown } from "react-feather";
import Button from "../../../components/styled/Button/Button";
import { conditionalRender } from "../../../utills/conditionalRender";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../components/styled/PageLoader/PageLoader";
import { getDashboardDataForAdmin } from "../../../features/sellerDashboard/dashboardSlice";
import MyAreaChart from "../../sellerDashboard/Charts/AreaChart";
const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [active, setActive] = useState("Monthly");
  const {loading,error,data} = useSelector(state => state.dashboard)

  useEffect(()=>{
    dispatch(getDashboardDataForAdmin())
    
  },[dispatch])
  return (
    <div className="portal-dashboard" style={{background:'#fff'}}>
      {conditionalRender(
        loading,
        <PageLoader />,
        conditionalRender(
          !error,
          <>
            <div className="dashboard-stats-boxes mb-30">
              <div className="dashboard-stats-box">
                <h3>Total Users</h3>
                <div className="dashboard-stats-inner">
                  <StatsHead variant="blue" text={data?.totalUsers} />
                  {/* <StatsBadge value={2.5} isProfit={false} /> */}
                </div>
              </div>
              <div className="dashboard-stats-box">
                <h3>Total Products</h3>
                <div className="dashboard-stats-inner">
                  <StatsHead variant="blue" text={data?.totalProducts} dollar={false} />
                  {/* <StatsBadge value={2.5} isProfit={true} /> */}
                </div>
              </div>
              <div className="dashboard-stats-box">
                <h3>Total Orders</h3>
                <div className="dashboard-stats-inner">
                  <StatsHead text={data?.totalOrders} dollar={false} />
                  {/* <StatsBadge value={2.5} isProfit={false} /> */}
                </div>
              </div>
              <div className="dashboard-stats-box">
                <h3>Pending Products</h3>
                <div className="dashboard-stats-inner">
                  <StatsHead text={data?.pendingProducts} />
                  {/* <StatsBadge value={2.5} isProfit={true} /> */}
                </div>
              </div>
            </div>

            <div className="">
              <div className="">
                <div className="">
                  <div className="mb-30">
                    <DashboardHeading>Analytics</DashboardHeading>
                  </div>
                  <div className="graph-outer" >
                    <div className="portal-dashboard-area-chart" style={{width:'100%',height:'350px'}}>
                      <MyAreaChart data={data?.graph}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>,
          <h1>{error}</h1>
        )
      )}
    </div>
  );
};

function StatsHead({ variant = "black", text, dollar = false }) {
  return (
    <h2 style={{ color:'#fff',fontFamily:'Inter'}}>
      {dollar ? "$" : ""}
      {text}
    </h2>
  );
}

function StatsBadge({ value, isProfit }) {
  return (
    <div className="dashboard-stats-badge">
      {isProfit ? (
        <ArrowUp color="#30E702" size={15} />
      ) : (
        <ArrowDown color="#F60505" size={15} />
      )}
      <span style={{ color: `${isProfit ? "#30E702" : "#F60505"}` }}>
        {value}%
      </span>
    </div>
  );
}

function DashboardHeading({ children }) {
  return <h2 className="dashboard-heading">{children}</h2>;
}

function RevenueByService({ label, options }) {
  return (
    <div className="revenue-by-service-box">
      <div className="revenue-by-service-head">
        <span>{label}</span>
      </div>
      <div className="revenue-by-service-content">
        {options.map((option, index) => {
          return (
            <div className="revenue-by-service-option">
              <span>{option.title}</span>
              <span>${option.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TodayBookingsBadge({ value, label, percentage }) {
  return (
    <div className="today-bookings-badge">
      <div className="today-bookings-badge-top">
        <div className="today-bookings-badge-top-left">
          <DashboardHeading>{value}</DashboardHeading>
          <span>{label}</span>
        </div>
        <p>{percentage}%</p>
      </div>
      <div className="today-bookings-badge-line">
        <div
          className="today-bookings-badge-line-inner"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
export default Dashboard;
