import { useEffect, useState } from "react";

export const userCurrentTime = () => {
  const [time, setTime] = useState(
    new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    let interval: NodeJS.Timeout = setInterval(() => {
      setTime(
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return time;
};
