import { Band } from "../../src/model/Band";
import { bandMock, bandMock2 } from "./bandMock";

export class BandDatabaseMock{
    public async insert(band: Band): Promise<Band> {
        return bandMock
    }
    public async findBandByName(name: string): Promise<Band | null>{
        if(name === "name_mockado"){
            return bandMock
        } else if(name === "name_mockado2"){
            return bandMock2
        }else{
            return null
        }
    }
    public async findBandById(id: string): Promise<Band | null> {
        if(id === "id_mockado"){
            return bandMock
        } else if(id === "id_mockado2"){
            return bandMock2
        }else{
            return null
        }
    }
}