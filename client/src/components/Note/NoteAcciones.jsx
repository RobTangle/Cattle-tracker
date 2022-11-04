// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch } from "react-redux";

import { ModalEdit } from "../Modal/ModalEdit";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import {
  deleteNote,
  getNotesFromUser,
} from "../../redux/actions/note-actions/note-actions";

export function NoteAcciones({ note }) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("tokenCattleTracker");
  const [showValue, setShowValue] = React.useState(false);
  //eslint-disable-next-line
  // function handleDelete(e) {
  //   // console.log(e);
  //   console.log(`Eliminando animal con id ${e.target.value}`);
  //   const note_id = e.target.value;
  //   console.log(note_id);
  //   dispatch(deleteNote(note_id, accessToken));
  //   dispatch(getNotesFromUser(accessToken));
  // }

  function handleDeleteWithPrompt(e) {
    console.log(e.target);
    let confirmPrompt = prompt(
      "Para confirmar la eliminación, escriba 'ELIMINAR'."
    );
    if (
      confirmPrompt === "ELIMINAR" ||
      confirmPrompt === "eliminar" ||
      confirmPrompt === "Eliminar"
    ) {
      console.log(`Eliminando animal con id ${e.target.value}`);
      const note_id = e.target.value;
      console.log(note_id);
      dispatch(deleteNote(note_id, accessToken));
      dispatch(getNotesFromUser(accessToken));
    } else {
      console.log(
        `No se ha eliminado al animal porque confirmPrompt == ${confirmPrompt}`
      );
    }
  }

  function showModal(e) {
    e.preventDefault();
    setShowValue(true);
  }

  return (
    <div className="flex gap-3">
      <button className="btn-details" value={note?.id}>
        <Link to="/home/details">
          <TbListDetails />
        </Link>
      </button>
      <button className="btn-edit" value={note?.id} onClick={showModal}>
        <BiEditAlt />
      </button>
      <button
        className="btn-delete"
        value={note?.id}
        onClick={handleDeleteWithPrompt}
      >
        {/* <MdDeleteOutline /> */} X
      </button>
      <ModalEdit show={showValue} setShowValue={setShowValue} animal={note} />
    </div>
  );
}