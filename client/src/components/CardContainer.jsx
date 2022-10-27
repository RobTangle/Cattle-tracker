import React from "react";
import { AnimalCard } from "./AnimalCard/AnimalCard";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "./NavBar/NavBar";
import { getAllAnimals } from "../redux/actions/actions";
export function CardContainer(props) {
  const userAnimalsState = useSelector((state) => state.userAnimals);
  const dispatch = useDispatch();
  const tokenAccess = localStorage.getItem("tokenCattleTracker");

  React.useEffect(() => {
    console.log(`en el useEffect`);
    console.log(`TOKEN ACCESS = `);
    console.log(tokenAccess);
    dispatch(getAllAnimals(tokenAccess));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div>
        {userAnimalsState?.length === 0 ? (
          <div>No hay ningún animal para mostrar </div>
        ) : (
          userAnimalsState.map((animal) => (
            <AnimalCard animal={animal} key={animal.id_senasa} />
          ))
        )}
      </div>
    </>
  );
}
