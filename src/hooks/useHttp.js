import { useState } from "react";
import axios from "axios";

const useGetHttp = (url) => {
  const [data, setData] = useState();
  console.log(url);

  // const callGetHttp = () => {
  //   axios
  //     .get(url)
  //     .then((result) => {
  //       setData(result);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return [data, callGetHttp];
};

export default useGetHttp;
