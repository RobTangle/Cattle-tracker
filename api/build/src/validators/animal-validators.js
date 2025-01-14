"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTypeOfAnimal = exports.checkAnimal = void 0;
const animal_types_1 = require("../types/animal-types");
const generic_validators_1 = require("./generic-validators");
// CHECK ANIMAL :
// This function is the main function that validates the data received in the request for a POST of a new animal or a PUT for updating an Animal.
// It uses many other auxiliary functions to make sure all the data from the request is valid before trying to store a new Animal instance in the Data Base.
// This function not only checks de data, but algo parses de name by forcing an toLowerCase() so the names are saved in all lower cases for a couple of different reasons regarding speed, performance and better practices.
function checkAnimal(bodyFromReq) {
    try {
        console.log(`Checking Animal...`);
        const checkedAnimal = {
            id_senasa: checkId(bodyFromReq.id_senasa),
            type_of_animal: checkTypeOfAnimal(bodyFromReq.type_of_animal),
            breed_name: checkBreedName(bodyFromReq.breed_name),
            location: checkLocation(bodyFromReq.location),
            weight_kg: checkWeight(bodyFromReq.weight_kg),
            name: checkName(bodyFromReq.name),
            device_type: checkDeviceType(bodyFromReq.device_type),
            device_number: checkDeviceNumber(bodyFromReq.device_number),
            image_1: checkImage(bodyFromReq.image_1),
            image_2: checkImage(bodyFromReq.image_2),
            image_3: checkImage(bodyFromReq.image_3),
            comments: checkComments(bodyFromReq.comments),
            birthday: checkBirthday(bodyFromReq.birthday),
            is_pregnant: checkIsPregnant(bodyFromReq.is_pregnant),
            delivery_date: checkDeliveryDate(bodyFromReq.delivery_date),
        };
        return checkedAnimal;
    }
    catch (error) {
        console.log(`Error en fn checkNewAnimal. ${error.message}`);
        throw new Error(error.message);
    }
}
exports.checkAnimal = checkAnimal;
// CHECK DEVICE_TYPE :
function checkDeviceType(argFromReq) {
    if ((0, generic_validators_1.isStringBetween1And50CharsLong)(argFromReq)) {
        return argFromReq.toLowerCase();
    }
    else {
        throw new Error(`El tipo de dispositivo "${argFromReq}" es inválido.`);
    }
}
// CHECK DEVICE_NUMBER :
function checkDeviceNumber(argFromReq) {
    if ((0, generic_validators_1.isStringXCharsLong)(8, argFromReq)) {
        return argFromReq;
    }
    else {
        throw new Error(`El código de dispositivo "${argFromReq}" es inválido.`);
    }
}
// CHECK ID_SENASA :
function checkId(idFromReq) {
    if ((0, generic_validators_1.isValidSenasaId)(idFromReq)) {
        return idFromReq;
    }
    else {
        throw new Error(`El id "${idFromReq}" ingresado es inválido.`);
    }
}
// CHECK TYPE OF ANIMAL:
function isValidTypeOfAnimal(argument) {
    return Object.values(animal_types_1.ITypeOfAnimal).includes(argument);
}
exports.isValidTypeOfAnimal = isValidTypeOfAnimal;
function checkTypeOfAnimal(argFromReq) {
    if (isValidTypeOfAnimal(argFromReq)) {
        return argFromReq;
    }
    else {
        throw new Error(`El tipo de animal "${argFromReq}" ingresado es inválido.`);
    }
}
// CHECK BREED NAME :
function checkBreedName(breedNameFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(breedNameFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1And50CharsLong)(breedNameFromReq)) {
        return breedNameFromReq.toLowerCase();
    }
    throw new Error(`El valor ingresado como raza (breed name) no es válido. Ingrese una cadena de texto o deje el valor vacío.`);
}
// CHECK LOCATION :
function checkLocation(locationFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(locationFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1And50CharsLong)(locationFromReq)) {
        return locationFromReq.toLowerCase();
    }
    throw new Error(`El valor ingresado '${locationFromReq}' como location es inválido.`);
}
// CHECK WEIGHT_KG :
function checkWeight(argFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(argFromReq)) {
        return undefined;
    }
    let parsedArg = Math.round(Number(argFromReq));
    if (parsedArg && typeof parsedArg === "number" && parsedArg > 0) {
        return parsedArg;
    }
    throw new Error(`The weight_kg "${argFromReq}" is invalid.`);
}
// CHECK NAME: (also forces lower cases)
function checkName(argFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(argFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1AndXCharsLong)(200, argFromReq)) {
        return argFromReq.toLowerCase();
    }
    else {
        throw new Error(`The name "${argFromReq}" es invalid.`);
    }
}
// CHECK IMAGE :
function checkImage(imageFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(imageFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isValidURLImage)(imageFromReq)) {
        return imageFromReq;
    }
    throw new Error(`La imagen ingresada '${imageFromReq}' no es válida.`);
}
// CHECK COMMENTS :
function checkComments(commentsFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(commentsFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringBetween1AndXCharsLong)(3000, commentsFromReq)) {
        return commentsFromReq;
    }
    throw new Error(`El comentario ingresado es inválido. Ingrese un valor falso, o un string entre 1 y 3000 caracteres.`);
}
//! CHECK BIRTHDAY : (corregir validación de Date con librería externa)
function checkBirthday(birthdayFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(birthdayFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringXCharsLong)(10, birthdayFromReq)) {
        return birthdayFromReq;
    }
    throw new Error(`Error al validar el birthday.`);
}
// CHECK IS PREGNANT :
function checkIsPregnant(isPregnantFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(isPregnantFromReq)) {
        return undefined;
    }
    if (isPregnantFromReq === true || isPregnantFromReq === false) {
        return isPregnantFromReq;
    }
    if (isPregnantFromReq === "true") {
        return true;
    }
    if (isPregnantFromReq === "false") {
        return false;
    }
    throw new Error(`El dato ingresado '${isPregnantFromReq}' como 'isPregnant' es inválido.`);
}
//! CHECK DELIVERY DATE : (corregir validación de Date con librería externa)
function checkDeliveryDate(deliveryDateFromReq) {
    if ((0, generic_validators_1.isFalsyArgument)(deliveryDateFromReq)) {
        return undefined;
    }
    if ((0, generic_validators_1.isStringXCharsLong)(10, deliveryDateFromReq)) {
        return deliveryDateFromReq;
    }
    throw new Error(`La fecha de parto '${deliveryDateFromReq} no es válida.`);
}
