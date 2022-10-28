import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../Form/Form";
import loading from "../../assets/loading.gif";
import { NavBar } from "../NavBar/NavBar";
import { cleanNewAnimal } from "../../redux/actions/actions";
import "./createNewAnimal.css";

export function CreateNewAnimal() {
  const newAnimalState = useSelector((state) => state.newAnimal);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(`Me desmonté????`);
    dispatch(cleanNewAnimal());
  }, []);

  return (
    <div>
      <div>
        {newAnimalState.pure ? <Form /> : null}
        {newAnimalState.loading ? (
          <div>
            <img src={loading} alt="loading gif" />
          </div>
        ) : null}
        {newAnimalState.newAnimal ? <div>{newAnimalState.msg} </div> : null}
        {newAnimalState.error ? (
          <div className="error-msg-div">{newAnimalState.error}</div>
        ) : null}
      </div>
    </div>
  );
}
