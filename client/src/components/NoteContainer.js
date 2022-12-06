import { React, useState, useRef, useEffect } from "react";
import NoteCard from "./NoteCard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useStore } from "../store/NoteStore";

export default function NoteContainer({ onScroll, listInnerRef, notes }) {
  const [show, setShow] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); clearErrorText()};
  const id = useRef();
  const title = useRef();
  const body = useRef();

  const createNote = useStore((state) => state.addNote);
  const updateNote = useStore((state) => state.updateNote);
  const titleError = useStore((state) => state.titleError);
  const clearErrorText = useStore((state) => state.clearErrorText);


  const handleUpdateNote = async () => {
    console.log(id.current.value)
    console.log(title.current.value)
    if (id.current.value) {
      const payload = {
        id: id.current.value,
        title: title.current.value,
        body: body.current.value,
      };
  
      await updateNote(payload);
    }
  }

  const handleSaveNote = async () => {
    const payload = {
      title: title.current.value,
      body: body.current.value,
    };
    
    await createNote(payload);

    if (sessionStorage.getItem("addedNote")) {
      handleClose();
      sessionStorage.removeItem("addedNote");
    }
  };

  useEffect(() => {
    if (noteToEdit.id && title && body) {
      setShow(true);

      if (show) {
        id.current.value = noteToEdit.id;
        title.current.value = noteToEdit.title;
        body.current.value = noteToEdit.body;
        setNoteToEdit({});
      }
    }
  }, [show, title, body, setNoteToEdit, noteToEdit]);

  return (
    <>
      <div
        className="container-fluid scrollable"
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <div className="row fixed">
          <div className="col-lg-12">
            <Button
              variant="primary"
              className="mt-4 position-fixed-top"
              onClick={handleShow}
            >
              Add Note
            </Button>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div
            className="col-lg-12"
            style={{
              overflowY: "hidden !important",
              height: "500px !important",
            }}
          >
            <div>
              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{id.current ? 'Edit Note' : 'Add Note'}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Add a title"
                          autoFocus
                          ref={title}
                          onChange={handleUpdateNote}
                        />
                        <Form.Control
                          className="d-none"
                          type="text"
                          ref={id}                     
                        />
                        <span className="text-danger">{titleError}</span>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                          as="textarea"
                          ref={body}
                          onChange={handleUpdateNote}
                          controlid="body"
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                   { !id.current && !id.current?.value ? <Button variant="primary" onClick={handleSaveNote}>
                      Save
                    </Button> : ''}
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
          <div className="row flex">
            {notes.map((note, index) => {
              return (
                <div className="col-sm-12 col-lg-2 col-md-3 mx-3" key={index}>
                  <NoteCard
                    index={index}
                    note={note}
                    editNote={setNoteToEdit}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
