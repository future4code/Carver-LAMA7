import { Band, RegisterBandDTO } from "../model/Band";

export interface BandRepository{
    insert(band: Band): Promise<Band>
    findBandByName(name: string): Promise<Band | null>
    findBandByIdOrName(id: string): Promise<Band | null>
}