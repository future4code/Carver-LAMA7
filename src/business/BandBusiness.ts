import { Band, RegisterBandDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGeneration } from "../services/IdGenerator";
import { BandRepository } from "./BandRepository";

export class BandBusiness {
    private bandDatabase: BandRepository
    private idGenerator: IdGeneration
    private authentication: Authenticator
    
    constructor(bandDataImplementation: BandRepository) {
        this.bandDatabase = bandDataImplementation
        this.idGenerator = new IdGeneration()
        this.authentication = new Authenticator()
    }
    register = async (input: RegisterBandDTO, token: string) => {
        const {name, music_genre, responsible} = input
        const id = this.idGenerator.generateId()

        if(!name || !music_genre || !responsible){
            throw new Error("Preencha todos os campos")
        }
        const tokenExist = this.authentication.getTokenData(token)
        if(!tokenExist){
            throw new Error("Token inválido")
        }
        if(tokenExist.role !== "ADMIN"){
            throw new Error("Este usuário não tem altorização para registrar uma banda")
        }
        const bandExist = await this.bandDatabase.findBandByName(name)
        if(bandExist){
            throw new Error("Esta banda já existe")
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
    findBandByIdOrName = async (token: string, id:string, name: string) => {
        const tokenExist = this.authentication.getTokenData(token)
        if(!tokenExist){
            throw new Error("Token inválido")
        }
        
        if(id){
            const result = await this.bandDatabase.findBandById(id)
            if(!result){
                throw new Error("Banda não encontrada")
            }
            return result
        }else if(name){
            
            const result = await this.bandDatabase.findBandByName(name)
            
            if(!result){
                throw new Error("Banda não encontrada")
            }
            return result
        }else{
            return null
        }
    }
}