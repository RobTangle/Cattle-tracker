import sequelize, { Op } from "sequelize";
import db from "../../models";
import { IAnimal, ITypeOfAnimal } from "../../types/animal-types";

export function typesOfAnimalsToArray(): string[] {
  try {
    let typesParsedToArray: string[] = Object.values(ITypeOfAnimal);
    return typesParsedToArray;
  } catch (error: any) {
    console.log(`Error en fn typesOfAnimalsToArray. ${error.message}`);
    throw new Error(error.message);
  }
}

export async function getAndParseIsPregnantQuery(
  userId: any, //! cambiar a STRING
  status: boolean,
  order: string
) {
  try {
    // Si status de is_pregnant es falso:
    if (!status) {
      const listOfAnimalsNotPregnant: IAnimal[] = await db.Animal.findAll({
        where: {
          is_pregnant: false,
          // UserId: userId,
        },
      });
      return {
        listLength: listOfAnimalsNotPregnant.length,
        list: listOfAnimalsNotPregnant,
      };
    }
    // Si order es un valor válido, buscar los animales que están embarazados y en orden:
    if (order === "ASC" || order === "DESC" || order === "NULLS FIRST") {
      const listOfAnimalsOrdered: IAnimal[] = await db.Animal.findAll({
        where: {
          is_pregnant: true,
          // UserId: userId,
        },
        order: [["delivery_date", order]],
      });
      return {
        listLength: listOfAnimalsOrdered.length,
        list: listOfAnimalsOrdered,
      };
    }
    // Si el valor de orden es falsy, buscar todos los animales embarazados:
    if (!order && status === true) {
      const listOfAnimalsPregnant: IAnimal[] = await db.Animal.findAll({
        where: {
          is_pregnant: status,
          // UserId: userId,
        },
      });
      return {
        listLength: listOfAnimalsPregnant.length,
        list: listOfAnimalsPregnant,
      };
    }
  } catch (error: any) {
    console.log(`Error en fn aux getAndParseIsPregnantQuery. ${error.message}`);
    throw new Error(
      `Error al buscar y parsear con queries relacionados a animales preñados o no preñados.`
    );
  }
}

export async function getObjOfAnimalsByRace(userId: string) {
  try {
    const breedNamesArrObjs = await db.Animal.findAll({
      attributes: [
        "breed_name",
        [sequelize.fn("count", sequelize.col("breed_name")), "cnt"],
      ],
      group: ["breed_name"],
    });

    let arrayOfRaces: any[] = [];
    breedNamesArrObjs.forEach((elem: any) => {
      arrayOfRaces.push(elem.breed_name);
    });

    console.log("arrayOfRaces = ", arrayOfRaces);

    let objWithAnimalsByRaceAndCount = {};
    for (let i = 0; i < arrayOfRaces.length; i++) {
      objWithAnimalsByRaceAndCount = {
        ...objWithAnimalsByRaceAndCount,
        [arrayOfRaces[i]]: await db.Animal.findAndCountAll({
          where: {
            breed_name: arrayOfRaces[i],
            // UserId: userId
          },
        }),
      };
    }

    return objWithAnimalsByRaceAndCount;
  } catch (error: any) {
    console.log(`Error en fn aux getObjOfAnimalsByRace. ${error.message}`);
    // THROW NEW ERROR ?
  }
}

export async function getObjOfAnimalsByLocation(userId: string) {
  try {
    let objOfAnimalsByLocation = {};

    const locationsArrObjs = await db.Animal.findAll({
      attributes: [
        "location",
        [sequelize.fn("count", sequelize.col("location")), "cnt"],
      ],
      group: ["location"],
    });
    // console.log(locationsArrObjs);

    let arrayOfLocations: any[] = [];
    locationsArrObjs.forEach((elem: any) => {
      arrayOfLocations.push(elem.location);
    });
    console.log("arrayOfLocations ", arrayOfLocations);

    for (let i = 0; i < arrayOfLocations.length; i++) {
      const element = arrayOfLocations[i];
      objOfAnimalsByLocation = {
        ...objOfAnimalsByLocation,
        [element]: await db.Animal.findAndCountAll({
          where: {
            location: element,
            // UserId: userId
          },
        }),
      };
    }
    return objOfAnimalsByLocation;
  } catch (error: any) {
    console.log(`Error en fn aux getObjOfAnimalsByLocation. ${error.message}`);
    // THROW NEW ERROR ?
  }
}

export async function getObjOfAnimalsByDeviceType(userId: string) {
  try {
    let objOfAnimalsByDeviceType = {};
    let deviceTypesArrObjs = await db.Animal.findAll({
      attributes: [
        "device_type",
        [sequelize.fn("count", sequelize.col("device_type")), "cnt"],
      ],
      group: "device_type",
    });
    const deviceTypesArray: any[] = [];
    deviceTypesArrObjs.forEach((type: any) => {
      deviceTypesArray.push(type.device_type);
    });
    console.log(deviceTypesArray);

    for (let i = 0; i < deviceTypesArray.length; i++) {
      const element = deviceTypesArray[i];
      objOfAnimalsByDeviceType = {
        ...objOfAnimalsByDeviceType,
        [element]: await db.Animal.findAndCountAll({
          where: {
            device_type: element,
            // UserId: userId
          },
        }),
      };
    }
    console.log(objOfAnimalsByDeviceType);

    return objOfAnimalsByDeviceType;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsByDeviceType. ${error.message}`
    );
    // THROW NEW ERROR ?
  }
}

// GET ALL AND COUNT :
export async function getObjOfAllAnimalsAndCount(userId: string) {
  try {
    const allAnimalsAndCount = await db.Animal.findAndCountAll();
    return allAnimalsAndCount;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAllAnimalsAndCount. ${error.message}`
    );
  }
}

//! AUX FUNCTION GET OBJ OF ANIMALS PREGNANT :
export async function getObjOfAnimalsPregnant(userId: string) {
  try {
    let objOfAnimalsPregnant = await db.Animal.findAndCountAll({
      where: {
        is_pregnant: true,
        // UserId: userId
      },
    });
    return objOfAnimalsPregnant;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsPregnant. ${error.message}`
    );
    // THROW NEW ERROR ?
  }
}

//! AUX FUNCTION GET OBJ OF ANIMALS NOT PREGNANT :
export async function getObjOfAnimalsNotPregnant(userId: string) {
  try {
    let objOfAnimalsNotPregnant = await db.Animal.findAndCountAll({
      where: {
        [Op.or]: [{ is_pregnant: false }, { is_pregnant: null }],
        // UserId: userId
      },
    });
    return objOfAnimalsNotPregnant;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsNotPregnant. ${error.message}`
    );
    // THROW NEW ERROR ?
  }
}

//! AUX FUNCTION GET OBJ OF ANIMALS BY DEVICE TYPE :
export async function getObjOfAnimalsByTypeOfAnimal(userId: string) {
  try {
    let objOfAnimalsByType: any = {};
    let arrayDeTiposDeAnimales = Object.values(ITypeOfAnimal);
    console.log(arrayDeTiposDeAnimales);

    for (let i = 0; i < arrayDeTiposDeAnimales.length; i++) {
      const element = arrayDeTiposDeAnimales[i];
      objOfAnimalsByType = {
        ...objOfAnimalsByType,
        [element]: await db.Animal.findAndCountAll({
          where: {
            type_of_animal: element,
            // UserId: userId
          },
        }),
      };
      if (
        element == ITypeOfAnimal.Vaquillona ||
        element === ITypeOfAnimal.Vaca
      ) {
        let femaleAnimalsPregnant = await db.Animal.findAndCountAll({
          where: {
            is_pregnant: true,
            type_of_animal: element,
          },
          order: [["delivery_date", "ASC"]],
        });
        objOfAnimalsByType[element].pregnant = femaleAnimalsPregnant;
      }
    }

    return objOfAnimalsByType;
  } catch (error: any) {
    console.log(
      `Error en aux function getObjOfAnimalsByDeviceType. ${error.message}`
    );
  }
}

const stats = {
  numberOfTotalAnimals: 211,
  pregnant: { total: 11, list: [{}, {}] },
  notPregnant: { total: 76, list: [{}, {}, {}] },
  races: {
    ["Angus"]: { listLength: 3, list: [{}, {}, {}, {}] },
    ["Criolla"]: { listLength: 2, list: [{}, {}] },
    ["Sin especificar"]: { listLength: 2, list: [{}, {}] },
  },
  types: {
    ["Vaquillona"]: {
      listLength: 53,
      list: [{}, {}, {}, {}, {}],
      pregnants: 11,
    },
    ["Toro"]: { listLength: 8, list: [{}, {}] },
    ["Novillo"]: { listLength: 13, list: [{}, {}, {}] },
  },
  location: {
    ["Sector 2"]: { listLength: 7, list: [{}, {}, {}] },
    ["Lote-4"]: { listLength: 2, list: [{}, {}] },
    ["Sin especificar"]: { listLength: 4, list: [{}, {}] },
  },
  deviceType: {
    ["Ear Tag"]: { listLength: 34, list: [{}, {}, {}, {}] },
    ["Collar"]: { listLength: 9, list: [{}, {}] },
  },
};
