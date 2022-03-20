import { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../error/CustomError";
import { Band, RegisterBandDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGeneration } from "../services/IdGenerator";

export class BandBusiness {
    constructor(
        private idGenerator: IdGeneration,
        private authentication: Authenticator,
        private bandDatabase: BandDatabase) { }
    register = async (input: RegisterBandDTO, token: string) => {
        const { name, music_genre, responsible } = input
        const id = this.idGenerator.generateId()

        if (!name || !music_genre || !responsible) {
            throw new Error("Preencha todos os campos")
        }
        const tokenExist = this.authentication.getTokenData(token)
        if (!tokenExist) {
            throw new Error("Token inválido")
        }
        if (tokenExist.role !== "ADMIN") {
            throw new Error("Este usuário não tem altorização para registrar uma banda")
        }
        const bandExist = await this.bandDatabase.findBandByName(name)
        if (bandExist) {
            throw new CustomError("Esta banda já existe", 409)
        }

        const band = new Band(
            id,
            name,
            music_genre,
            responsible
        )

        await this.bandDatabase.insert(band)

        return true
    }
    findBandByIdOrName = async (token: string, id: string, name: string) => {
        const tokenExist = this.authentication.getTokenData(token)
        if (!tokenExist) {
            throw new Error("Token inválido")
        }

        if (id) {
            const result = await this.bandDatabase.findBandById(id)
            if (!result) {
                throw new Error("Banda não encontrada")
            }
            return result
        } else if (name) {

            const result = await this.bandDatabase.findBandByName(name)

            if (!result) {
                throw new Error("Banda não encontrada")
            }
            return result
        } else {
            return null
        }
    }
}