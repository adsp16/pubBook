import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Paper, Button } from "@material-ui/core";
import moment from "moment";
import { db } from "../../firebase/config";

const LineDailyUsers = () => {
  const [chartData, setchartData] = useState({});
  const [dateRange, setdateRange] = useState([]);
  const [totalSignIn, setTotalSignIn] = useState([]);

  const getData = () => {
    const todayDate = moment().startOf("day");
    const endDate = moment().add(7, "d").endOf("day");
    const uTdate = todayDate.unix(todayDate);
    const uEdate = endDate.unix(endDate);

    const tryDate = new Date();
    const tryEDate = new Date().setHours(0, 0, 0, 0);
    const newDat1 = tryDate.setHours(23, 59, 59, 999);

    console.log(tryDate);
    console.log(tryEDate);
    console.log(newDat1);

    db.collection("user")
      .orderBy("loginAt")
      .startAt(tryDate)
      .endAt(tryEDate)
      .get()
      .then((snapShot) => {
        console.log(snapShot.docs);
      })
      .catch((err) => console.log(err));
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            autoskip: true,
            maxTicksLimit: 10,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  const chart = () => {
    setchartData({
      labels: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      datasets: [
        {
          data: [32, 33, 67, 55, 30],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <Paper>
        <div>
          <Button variant="contained" onClick={getData}>
            Get Data
          </Button>
          <Line data={chartData} options={chartOptions}></Line>
        </div>
      </Paper>
    </div>
  );
};

export default LineDailyUsers;
