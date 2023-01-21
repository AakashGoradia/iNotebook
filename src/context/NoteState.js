import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    // const s1 = {
    //     "name": "Aakash",
    //     "class": "TE IT"
    // }

    // const [state, setState] = useState(s1);

    // const update=()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "Krish",
    //             "class": "TE BFM"
    //         })
    //     }, 5000);
    // }

    const notesInitial  = [
        {
          "_id": "62f08c44fe2856342ccd39d4",
          "user": "62ed7b246e1d547f5f800f0f",
          "title": "Title 2",
          "description": "My second note",
          "tag": "personal",
          "date": "2022-08-08T04:08:36.283Z",
          "__v": 0
        },
        {
          "_id": "63cbc7a088b68be560296799",
          "user": "62ed7b246e1d547f5f800f0f",
          "title": "Checking Note",
          "description": "Just to check the delete endpoint",
          "tag": "to check",
          "date": "2023-01-21T11:08:16.555Z",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;