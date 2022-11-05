import React from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { NoteFormEdit } from "./NoteFormEdit";
import loading from "../../assets/loading.gif";
import { cleanUpdatedNote } from "../../redux/actions/note-actions/note-actions";

export function NoteModalEdit(props) {
  const updatedNote = useSelector((state) => state.updatedNote);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`useEffect de ModalEdit...`);
    // dispatch(cleanUpdateAnimal());
  }, []);

  if (!props.show) {
    return null;
  }

  function closeModal(e) {
    e.preventDefault();
    props.setShowValue(false);
    dispatch(cleanUpdatedNote());
  }

  return (
    <div>
      {/* <div className="absolute fixed top-10 left-0 right-0 bg-white/95"> */}
      <div>
        {updatedNote.pure ? (
          <NoteFormEdit
            note={props.note}
            closeModal={closeModal}
            setNoteToEdit={props.setNoteToEdit}
          />
        ) : null}
        {updatedNote.loading ? (
          <div className="modal-response">
            <img src={loading} alt="loading gif" />
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
        {updatedNote.updated ? (
          <div className="modal-response">
            {updatedNote.msg}{" "}
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
        {updatedNote.updated === 0 ? <div>Oops! {updatedNote.msg}</div> : null}
        {updatedNote.error ? (
          <div className="modal-response">
            {updatedNote.error}{" "}
            <div>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        ) : null}
      </div>
      {/* <div className="modal-footer"></div>
      <button onClick={closeModal}>X</button> */}
    </div>
  );
}