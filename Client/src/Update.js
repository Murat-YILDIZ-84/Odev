import { useState, useEffect } from "react";
import { getToken, useToken } from "./Api";
import "./Config";

export default () => {
  const [update, setUpdate] = useState("");

  useEffect(() => {
    //Update per Two Second
    const interval = setInterval(() => {
      //const token = getToken();
      //global.Config.response.scriptResult = useToken(token);

      setUpdate(update == "" ? "Getting Data (Test )" : "");
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  });

  return <span>{update}</span>;
};
