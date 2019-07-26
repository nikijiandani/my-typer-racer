import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  });
  
  return data;
}