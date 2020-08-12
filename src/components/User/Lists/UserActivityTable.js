import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
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

const UserActivityTable = (props) => {
  const classes = useStyles();

  useEffect(() => {
    console.log("use Eff");
  }, []);

  const [tableData, setTableData] = useState([
    {
      userId: "3322344",
      email: "adsp16@gmail.com",
      mobile: "0788389834",
      loginTime: "12.34AM",
      loginDate: "23/05/2020",
      loginLocal: "Dublin, IRL",
    },
  ]);

  return (
    <div className={classes.root}>
      <MaterialTable
        columns={tableCols}
        data={tableData}
        title="Customer LogIns"
      />
    </div>
  );
};

export default UserActivityTable;
