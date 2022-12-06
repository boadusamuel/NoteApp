import { React } from "react";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import {useStore} from "../store/NoteStore";


export default function NoteCard({ index, note, editNote }) {

  const deleteNote = useStore((state) => state.deleteNote);

  return (
    <div key={index} style={{ maxWidth: "500px" }} className="mt-4">
      <Card className="">
  
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.body}</Card.Text>
         
         <div className="d-flex justify-content-between">
          <div className="cursor-pointer" onClick={(e) => editNote(note)}>
          <FontAwesomeIcon icon={faPencil} />
          </div>
          <div className="cursor-pointer" onClick={(e) => deleteNote(note.id)}>
          <FontAwesomeIcon icon={faTrash} className="text-danger"/>
          </div>
         </div>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <p>Created: {format(new Date(note.createdAt), 'YYY-mm-dd H:mma')}</p>
          <p>Updated: {format(new Date(note.updatedAt), 'YYY-mm-dd H:mma')}</p>
        </Card.Footer>
      </Card>
    </div>
  );
}
