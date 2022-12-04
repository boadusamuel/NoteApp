import { React } from "react";

export default function NoteCard({ onScroll, listInnerRef, notes }) {
  return (
    <div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        {notes.map((note, index) => {
          return (
            <div
              key={index}
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <p>Title: {note.title}</p>
              <p>Body: {note.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
