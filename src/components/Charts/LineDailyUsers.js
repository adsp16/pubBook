import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { Paper, Button } from "@material-ui/core";
import moment from "moment";
import { db } from "../../firebase/config";

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

const LineDailyUsers = () => {
  const [chartData, setchartData] = useState({});
  const [dateRange, setdateRange] = useState([]);
  const [totalSignIn, setTotalSignIn] = useState([]);

  useEffect(() => {
    const dates = [...Array(7)].map((_, i) => {
      const d = moment(new Date()).subtract(i, "days").format("D/M/YY");
      console.log(i);
      return d;
    });

    console.log(dates);

    setchartData((prevState) => ({
      labels: dates,
      datasets: [
        {
          data: [32, 33, 67, 55, 30, 90, 21],
          borderWidth: 4,
        },
      ],
    }));
  }, []);

  const getData = () => {
    const todayDate = new Date();
    const sevenDay = moment(todayDate).subtract(7, "days").toDate();

    todayDate.setHours(23, 59, 59, 999);
    sevenDay.setHours(0, 0, 0, 0);

    db.collection("user")
      .orderBy("loginAt")
      .startAt(sevenDay)
      .endAt(todayDate)
      .get()
      .then((snapShot) => {
        const formArr = snapShot.docs.map((item) => {
          return item.data();
        });

        // const newArr = formArr.map((item) => {});
      })
      .catch((err) => console.log(err));
  };

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
