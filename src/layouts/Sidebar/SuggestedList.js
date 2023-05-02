import React, { useEffect, useState } from "react";
import ListAccount from "~/features/accounts/components/ListAccount";
import { getUsersService } from "~/features/accounts/services/getUsersService";

import axios from "axios";



function SuggestedList() {
  const [perpage, setPerpage] = useState(5);
  const [suggestedList, setSuggestedList] = useState([]);

  const handleSeeMore = () => {
    if (perpage != 20) {
      setPerpage((prev) => prev + 5);
    } else {
      setPerpage(5);
    }
    // console.log(perpage);
  };

  // const axiosInstance = axios.create({
  //   baseURL: import.meta.env.VITE_BASE_URL,
  // });

  // const Get = async (url, options = {}) => {
  //   try {
  //     const response = await axiosInstance.get(url, options);
  //     return response.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  // const SuggestedList = async (page = 1, perpage = 5) => {
  //   try {
  //     const res = await Get("users/suggested", {
  //       params: {
  //         page,
  //         per_page: perpage,
  //       },
  //     });
  //     // console.log(res);
  //     return res;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const fetchSuggestedList = async () => {
  //     const suggestedList = await SuggestedList(1, perpage);
  //     if (suggestedList.length == 0) { 
  //       return setPerpage(5);
  //     }
  //     setSuggestedList(suggestedList);
  //   };

  //   fetchSuggestedList();
  // }, [perpage]);

  useEffect(() => {
    const fetchSuggestedList = async () => {
      const suggestedList = await getUsersService.suggestedList(1, perpage);
      if (suggestedList.length == 0) {
        return setPerpage(5);
      }
      setSuggestedList(suggestedList);
    };

    fetchSuggestedList();
  }, [perpage]);


  return (
    <ListAccount
      title="Suggested accounts"
      list={suggestedList}
      onClick={handleSeeMore}
      perpage={perpage}
    />
  );
}

export default SuggestedList;
