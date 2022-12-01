import React, {useState, useEffect} from 'react';


export default function Note(){
    const [notes, setNote] = useState([]);


    const fetchData = async () => {
        const response = await fetch('/api/notes');
        if(!response.ok){
            throw new Error('Something went wrong');
        }else{       
            return response.json()
        }
    }

    useEffect(() => fetchData().then((data) => setNote(data.notes)).catch((e) => console.log(e)), [])

    return  (
       <div>
       {
        notes.map((note, index) => 
        {
            return (
                <div key={index}>
                     <p>{note.title}</p>
                     <p>{note.body}</p>
                </div>
            )
        }
        )
       }
       </div>
    );
}