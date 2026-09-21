import abData, { DataScheme } from "ab-data";
import { abdFields as f } from "ab-data";
import { abData_Espada_ECore_DB } from "./db.ts";
import { abData_Espada_ECore_Types } from "./types.ts";

export default function abData_Espada_ECore(ds: DataScheme, tableId: number): 
        void {
    abData_Espada_ECore_DB(ds, tableId);
    abData_Espada_ECore_Types(ds);
}

export {
    abData_Espada_ECore_DB,
    abData_Espada_ECore_Types,
};