import axios from "axios";
import create from "zustand";
import { produce } from "immer";

export const useStore = create((set) => ({
  notes: [],
  isLastList: false,
  currentPage: 1,
  previousPage: 0,
  titleError: "",
  addNote: async (payload) => {
    try {
      const response = await axios.post(
        "api/v1.0/notes",
        payload
      );
      if (response.data.success) {
        set(
          produce((state) => {
            sessionStorage.setItem("addedNote", true);
            state.notes.unshift(response.data.note);
            state.titleError = "";
          })
        );
      }
    } catch (err) {
      if (err.response) {
        set(
          produce((state) => {
            state.titleError = err.response.data.message;
          })
        );
      } else {
        console.log(err);
      }
    }
  },
  addNotes: async (currentPage) => {
    try {
      const response = await axios.get(
        `api/v1.0/notes?page=${currentPage}&size=20`
      );
      if (response.data.success) {
        let data = response.data.data;
        if (data.notes.length === 0) {
          set(
            produce((state) => {
              state.isLastList = true;
            })
          );

          return;
        }
        set(
          produce((state) => {
            state.previousPage = currentPage;
            state.notes.push(...data.notes);
          })
        );
      }
    } catch (err) {
      if (err.response) {
        set(
          produce((state) => {
            state.titleError = err.response.data.message;
          })
        );
      } else {
        console.log(err);
      }
    }
  },
  updateNote: async (payload) => {
    try {
      const response = await axios.put(
        `api/v1.0/notes/${payload.id}`,
        payload
      );
      if (response.status === 200) {
        set(
          produce((state) => {
            state.titleError = "";
            const updatedNote = response.data.note;
            const newState = state.notes.filter(
              (note) => note.id !== updatedNote.id
            );

            state.notes = [updatedNote, ...newState];
          })
        );
      }
    } catch (err) {
      console.log("🚀 ~ file: NoteStore.js:89 ~ updateNote: ~ err", err);
      set(
        produce((state) => {
          state.titleError = err.response.data.message;
        })
      );
    }
  },
  deleteNote: async (id) => {
    const response = await axios.delete(
      `api/v1.0/notes/${id}`
    );
    if (response.status === 204) {
      set(
        produce((state) => {
          const noteIndex = state.notes.findIndex((note) => note.id === id);
          state.notes.splice(noteIndex, 1);
        })
      );
    }
  },

  setCurrentPage: (currentPage) => {
    set(
      produce((state) => {
        state.currentPage = Number(currentPage) ? currentPage + 1 : 1;
      })
    );
  },

  clearErrorText: () => {
    set(
      produce((state) => {
        state.titleError = "";
      })
    );
  },
}));
