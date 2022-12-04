import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";

export default function Note() {
  const [notes, setNote] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [isLastList, setIsLastList] = useState(false);
  const listInnerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/v1.0/notes?page=${currentPage}&size=10`
      );

      if (!response.data.success) {
        throw new Error("Something went wrong");
      } else {
        let data = response.data.data;
        if (!data.notes.length) {
          setIsLastList(true);
          return;
        }
        setPreviousPage(currentPage);
        setNote([...notes, ...data.notes]);
      }
    };
    if (!isLastList && previousPage !== currentPage) {
      fetchData();
    }
  }, [currentPage, previousPage, notes, isLastList]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  return (
    <NoteCard
    onScroll={onScroll}
    listInnerRef={listInnerRef}
    notes={notes}
  />
  );
}
