import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../NavBar/NavBar";
import { CardPregnantStatistics } from "../CardContainer/CardPregnantStatistics";
import { FilterButtons } from "../FilterButtons.jsx/FilterButtons";
import { getStats } from "../../redux/actions/animal-actions/animal-actions";
import { DoughnutChart } from "../../charts/DoughnutChart";
import "./statistics.css";
import { PieChart } from "../../charts/PieChart";
import { VerticalBarChartPreg } from "../../charts/VerticalBarChartPreg";
import { VerticalBarChart } from "../../charts/VerticalBarChart";
import { CardFilterContainer } from "../CardContainer/CardFilterContainer";
import { PieChartTwoObj } from "../../charts/PieChartTwoObj";
import { FilterCustomBtn } from "../FilterButtons.jsx/FilterCustomBtn";

export function Statistics() {
  const token = localStorage.getItem("tokenCattleTracker");
  const dispatch = useDispatch();
  const statsState = useSelector((state) => state.stats);

  const [filters, setFilters] = useState({
    races: "",
    location: "",
    type_of_animal: "",
    pregnant: "",
    sex: "",
  });

  function handleFilterChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  React.useEffect(() => {
    dispatch(getStats(token));
  }, [dispatch, token]);

  return (
    <>
      <div className="max-w-7xl mx-auto ">
        <NavBar />
        <div className="lg:flex flex-col justify-center items-center">
          <h1 className="text-green text-3xl my-5">Estadísticas</h1>
          <br />
          <div className="lg:flex flex-col justify-center items-center">
            <h2 className="text-green text-2xl my-5">Razas</h2>
            <div className="graph400">
              {statsState.races && (
                <DoughnutChart
                  statsObj={statsState.races}
                  by="raza"
                  title="Raza"
                />
              )}
            </div>

            <div>
              {statsState.races && (
                <FilterButtons
                  filtersArray={Object.keys(statsState?.races)}
                  filters={filters}
                  setFilters={setFilters}
                  prop="races"
                />
              )}
            </div>
          </div>
          <div>
            {filters.races && (
              <CardFilterContainer
                animalsToRender={statsState.races[filters.races]?.rows}
              />
            )}
          </div>
          <br />
          <div className="lg:flex flex-col justify-center items-center">
            <h2 className="text-green text-2xl my-5">Localizaciones</h2>
            <div className="graph400">
              {statsState.location && (
                <PieChart
                  statsObj={statsState.location}
                  by="localización"
                  title="Localización"
                />
              )}
            </div>
            <div>
              {statsState?.location && (
                <FilterButtons
                  filtersArray={Object.keys(statsState?.location)}
                  filters={filters}
                  setFilters={setFilters}
                  prop="location"
                />
              )}
            </div>
          </div>
          <div>
            {filters.location && (
              <CardFilterContainer
                animalsToRender={statsState.location[filters.location]?.rows}
              />
            )}
          </div>
          <br />
          <div className="lg:flex flex-col justify-center items-center">
            <h2 className="text-green text-2xl my-5">Sexo</h2>
            <div className="graph400">
              {statsState.sex && (
                <PieChartTwoObj
                  statsObjOne={statsState.sex.male}
                  statsObjTwo={statsState.sex.female}
                  by="sexo"
                  title="Sexo del animal"
                  labels={["Macho", "Hembra"]}
                />
              )}
            </div>
            <div className="flex items-center gap-5 justify-center w-full my-5">
              <FilterCustomBtn
                tag="Machos"
                value={"male"}
                name="sex"
                onClick={handleFilterChange}
              />
              <FilterCustomBtn
                tag="Hembras"
                value="female"
                name="sex"
                onClick={handleFilterChange}
              />
              <FilterCustomBtn
                tag={"Limpiar"}
                value={""}
                name="sex"
                onClick={handleFilterChange}
              />
            </div>
          </div>
          <div>
            {filters.sex && statsState.sex && (
              <CardFilterContainer
                animalsToRender={statsState.sex[filters.sex].rows}
              />
            )}
          </div>

          <div className="lg:flex flex-col justify-center items-center">
            <h2 className="text-green text-2xl my-5">Tipos de animales</h2>

            <div className="graph600">
              {statsState.types && (
                <VerticalBarChart
                  statsObj={statsState.types}
                  by="tipo"
                  title="Tipo de animal"
                />
              )}
            </div>
            <div className="graph400">
              {statsState.types && (
                <PieChart
                  statsObj={statsState.types}
                  by="tipo"
                  title="Tipo de animal"
                />
              )}
            </div>
            <div>
              {statsState.types && (
                <FilterButtons
                  filtersArray={Object.keys(statsState.types)}
                  filters={filters}
                  setFilters={setFilters}
                  prop="type_of_animal"
                />
              )}
            </div>
          </div>
          <div>
            {filters.type_of_animal && statsState.types && (
              <CardFilterContainer
                animalsToRender={statsState.types[filters.type_of_animal].rows}
              />
            )}
          </div>
          <br />
          <div className="lg:flex flex-col justify-center items-center">
            <h2 className="text-green text-2xl my-5">
              Estado de embarazo de hembras
            </h2>
            <div className="graph600">
              {statsState.pregnant && (
                <VerticalBarChartPreg
                  statsObjPreg={statsState?.sex?.femalePregnant}
                  statsObjNotPreg={statsState?.sex?.femaleNotPregnant}
                />
              )}
            </div>
            <div className="flex items-center gap-5 justify-center w-full my-5">
              <FilterCustomBtn
                tag={"Preñadas"}
                value={"femalePregnant"}
                name="pregnant"
                onClick={handleFilterChange}
              />
              <FilterCustomBtn
                tag={"No preñadas"}
                value={"femaleNotPregnant"}
                name="pregnant"
                onClick={handleFilterChange}
              />
              <FilterCustomBtn
                tag={"Limpiar"}
                value={""}
                name="pregnant"
                onClick={handleFilterChange}
              />
            </div>
          </div>
          <div>
            {filters.pregnant && statsState?.sex[filters.pregnant] && (
              <CardFilterContainer
                animalsToRender={statsState.sex[filters.pregnant].rows}
              />
            )}
          </div>
          <br />
          <div className="lg:flex flex-col justify-center items-center">
            <h2 className="text-green text-2xl my-5">
              Próximos partos esperados
            </h2>
            <div>
              {statsState.pregnant && (
                <CardPregnantStatistics
                  animalsToRender={statsState?.pregnant?.rows}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
