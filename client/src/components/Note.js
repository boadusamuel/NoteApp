import React, { useRef, useEffect } from "react";
import NoteContainer from "./NoteContainer";
import {useStore} from "../store/NoteStore";
export default function Note() {


  
  const notes = useStore((state) => state.notes);
  const addNotes = useStore((state) => state.addNotes)
  const currentPage= useStore((state) => state.currentPage);
  const previousPage= useStore((state) => state.previousPage);
  const isLastList= useStore((state) => state.isLastList);
  const setCurrentPage= useStore((state) => state.setCurrentPage);
  const listInnerRef = useRef();

  useEffect(() => {      
       if(currentPage === 1){
        addNotes(currentPage);
        setCurrentPage(currentPage);
       }

  }, [currentPage, addNotes, setCurrentPage]);
   

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        if (!isLastList && previousPage !== currentPage) {
          setCurrentPage(currentPage);
          addNotes(currentPage);
        }
      }
    }
  };


  return (
    <NoteContainer
    onScroll={onScroll}
    listInnerRef={listInnerRef}
    notes={notes}
  />
  );
}