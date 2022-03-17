import { BandRepository } from "../business/BandRepository";
import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase implements BandRepository{
    protected TABLE_NAME = "Bands_Lama"
    insert = async (band: Band) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert(band)
            return band
        } catch (error: any) {
            throw new Error("Erro ao registrar banda no banco de dados")
        }
    }
    findBandByName = async (name: string) => {
        try {
            const result = await BandDatabase.connection(this.TABLE_NAME)
                .select()
                .where({name})
            if (!result[0]) {
                return null
            }
            return Band.toBandModel(result[0])
        } catch (error: any) {
            throw new Error("Erro ao buscar banda pelo nome no banco de dados")
        }
    }
    findBandByIdOrName = async (id: string) => {
        try {
            const result = await BandDatabase.connection(this.TABLE_NAME)
                .select()
                .where({id})
            if (!result[0]) {
                return null
            }
            return Band.toBandModel(result[0])
        } catch (error: any) {
            throw new Error("Erro ao buscar banda pelo nome no banco de dados")
        }
    }
}