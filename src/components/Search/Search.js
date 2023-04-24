import React, { useState, useRef, useEffect } from "react";
import PopperWrapper from "~/components/Popper/Wrapper";
import AccountItem from "~/features/accounts/components/AccountItem";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { FaSearch, FaSpinner, FaTimesCircle } from "react-icons/fa";
import styles from "./Search.module.scss";
import { searchService } from "~/services/searchService";
import { useDebounce } from "use-debounce";
import axios from "axios";


function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchValue] = useDebounce(searchValue, 500);

  const searchInput = useRef(null);

  const handleSearchValue = (e) => {
    const searchValue = e.target.value;
    if (searchValue[0] !== " ") {
      setSearchValue(e.target.value);
    }
  };

  const handleClear = () => {
    setSearchResult([]);
    setSearchValue("");
    searchInput.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
    setSearchValue("");
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  useEffect(() => {
    if (!debounceSearchValue.trim()) {
      setSearchResult([]);
      return;
    }

    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    });
    const Get = async (url, options = {}) => {
      try {
        const response = await axiosInstance.get(url, options);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    };


    const GetSearch = async (q, type = "less") => {
      try {
        const res = await Get("users/search", {
          params: {
            q,
            type,
          },
        });
        // console.log('response:  ',res);
        // return res.data;
        return res;
      } catch (err) {
        console.log(err);
      }
    };

    const fetchApi = async () => {
      setIsLoading(true);

      const result = await GetSearch(debounceSearchValue);
      setSearchResult(result);

      setIsLoading(false);
    };

    fetchApi();
  }, [debounceSearchValue]);

  return (
    <div>
      <Tippy
        visible={showResult && searchResult.length > 0}
        interactive
        onClickOutside={handleHideResult}
        render={(attrs) => (
          <div className={styles.search_results} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <div className={styles.search_title}>Account</div>
              {searchResult.map((item) => (
                <AccountItem
                  user={item}
                  key={item._id}
                  onClick={handleHideResult}
                />
              ))}
            </PopperWrapper>
          </div>
        )}
      >
        <form className={styles.navbar_search}>
          <input
            value={searchValue}
            className={styles.navbar_search_input}
            type="text"
            placeholder="Search accounts and videos"
            onChange={handleSearchValue}
            ref={searchInput}
            onFocus={handleShowResult}
          ></input>
          {searchValue && !isLoading && (
            <button className={styles.clear} onClick={handleClear}>
              <FaTimesCircle />
            </button>
          )}
          {isLoading && <FaSpinner className={styles.loading} />}
          <span className={styles.navbar_search_line}></span>
          <button className={styles.navbar_search_icon}>
            <FaSearch />
          </button>
        </form>
      </Tippy>
    </div>
  );
}

export default Search;
