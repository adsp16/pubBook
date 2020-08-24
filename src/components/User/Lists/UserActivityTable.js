import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Box, Button, TextField } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTimeStamp } from "../../../helpers/moment";

// import useGetHttp from "../../../hooks/useHttp";
import { db } from "../../../firebase/config";
import { convTimestamp } from "../../../helpers/moment";
import { useStyles } from "./UserActivityTableJSS";

const tableCols = [
  { title: "User Id", field: "userId" },
  { title: "Email", field: "email" },
  { title: "Mobile", field: "mobile" },
  {
    title: "Time",
    field: "loginTime",
  },
  {
    title: "Date",
    field: "loginDate",
  },
  {
    title: "Location",
    field: "loginLocal",
  },
];

const UserActivityTable = ({ handleError }) => {
  const classes = useStyles();
  // const [httpData, callGetHttp] = useGetHttp();
  const [isLoading, setisLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setisLoading(true);

    db.collection("user")
      .orderBy("loginAt", "desc")
      .limit(20)
      .get()
      .then((snapShot) => {
        const mappedArr = snapShot.docs.map((result) => {
          console.log(result.id);
          const invData = result.data();
          const loginAt = convTimestamp(invData.loginAt.seconds);
          const { location } = invData;

          return {
            userId: result.id,
            email: invData.email ? invData.email : "No email",
            mobile: invData.mobile ? invData.mobile : "No mobile number",
            loginTime: loginAt.format("hh:mma"),
            loginDate: loginAt.format("D/M/YYYY"),
            loginLocal: `${location.city}, ${location.country_code}`,
          };
        });

        setTableData((prevState) => mappedArr);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const getCustomDateUsers = () => {
    console.log(startDate);
    console.log(endDate);

    if (startDate < endDate) {
      console.log("smartAttack");
      db.collection("user")
        .orderBy("loginAt")
        // .where("loginAt", ">=", startDate)
        // .where("loginAt", "<=", endDate)
        .startAt(startDate)
        .endAt(endDate)
        .get()
        .then((snapShot) => {
          const mArr = snapShot.docs.map((result) => {
            const invData = result.data();
            const loginAt = convTimestamp(invData.loginAt.seconds);
            const { location } = invData;

            return {
              userId: result.id,
              email: invData.email ? invData.email : "No email",
              mobile: invData.mobile ? invData.mobile : "No mobile number",
              loginTime: loginAt.format("hh:mma"),
              loginDate: loginAt.format("D/M/YYYY"),
              loginLocal: `${location.city}, ${location.country_code}`,
            };
          });
          setTableData(mArr);
        })
        .catch((err) => {
          console.log(err);
          handleError(err.message);
        });
    } else if (startDate.getTime() === endDate.getTime()) {
      const nSDate = startDate.setHours(0, 0, 0, 0);
      const nEDate = endDate.setHours(23, 59, 59, 999);

      db.collection("user")
        .orderBy("loginAt")
        .startAt(nSDate)
        .endAt(nEDate)
        .get()
        .then((snapShot) => {
          console.log(snapShot.docs);
          const mArr = snapShot.docs.map((result) => {
            const invData = result.data();
            const loginAt = convTimestamp(invData.loginAt.seconds);
            const { location } = invData;

            return {
              userId: result.id,
              email: invData.email ? invData.email : "No email",
              mobile: invData.mobile ? invData.mobile : "No mobile number",
              loginTime: loginAt.format("hh:mma"),
              loginDate: loginAt.format("D/M/YYYY"),
              loginLocal: `${location.city}, ${location.country_code}`,
            };
          });
          setTableData(mArr);
        })
        .catch((err) => {
          console.log(err);
          handleError(err.message);
          console.log("git merge");
        });
    } else {
      handleError("Start date must be before or the same as the end date ");
    }
  };

  const CustomDateInput = ({ value, onClick, labels }) => {
    // eslint-disable-next-line no-unused-expressions

    return (
      <TextField
        label={labels}
        type="text"
        defaultValue={value}
        onClick={onClick}
      />
    );
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Box my={2} display="flex" justifyContent="flex-end">
          <Box mr={2} display="flex" alignItems="center">
            <DatePicker
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartDate(date)}
              customInput={<CustomDateInput labels="Start Date" />}
            />
          </Box>
          <Box mr={2} display="flex" alignItems="center">
            <DatePicker
              id="endDate"
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<CustomDateInput labels="End Date" />}
            />
          </Box>
          <Box>
            <Button
              onClick={getCustomDateUsers}
              size="medium"
              variant="contained"
              color="primary"
            >
              Get Users
            </Button>
          </Box>
        </Box>
        <MaterialTable
          columns={tableCols}
          data={tableData}
          title="Customer Log ins"
          isLoading={isLoading}
          options={{
            headerStyle: {
              zIndex: 0,
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default UserActivityTable;
