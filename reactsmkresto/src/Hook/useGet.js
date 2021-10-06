//import { cleanup } from "@testing-library/react";
import { useState, useEffect } from "react";
//import React from 'react';
import { link } from "../Axios/Link";

const useGet = (url) => {
  const [isi, setIsi] = useState([]);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const request = await link.get(url);
  //       setIsi(request.data);
  //     }
  //     fetchData();
  //   }, [isi]);

  useEffect(() => {
    let ambil = true;
    async function fetchData() {
      const res = await link.get(url);
      if (ambil) {
        setIsi(res.data);
      }
    }
    fetchData();
    return () => {
      ambil = false;
    };
  }, [isi]);
  return [isi];
};

export default useGet;
