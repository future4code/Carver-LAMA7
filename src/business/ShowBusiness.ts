import { BandDatabase } from '../data/BandDatabase'
import { ShowDatabase } from '../data/ShowDatabase'
import { AddShowDTO, Show} from '../model/Show'
import { USER_ROLES } from '../model/User'
import { Authenticator } from '../services/Authenticator'
import { IdGeneration } from '../services/IdGenerator'
import { ShowRepository } from './ShowRepository'

export class ShowBusiness {
    private showDatabase: ShowRepository
    private idGenerator: IdGeneration
    private authenticator: Authenticator
    private bandDatabase: BandDatabase
    constructor(showDataImplementation: ShowRepository) {
        this.showDatabase= showDataImplementation
        this.idGenerator = new IdGeneration()
        this.authenticator = new Authenticator()
        this.bandDatabase = new BandDatabase()

    }
    async createShow(input: AddShowDTO, token: string) {

        const tokenData = this.authenticator.getTokenData(token)
        const id = this.idGenerator.generateId()
        const { week_day, start_time, end_time, band_id } = input

        if (tokenData.role !== USER_ROLES.ADMIN) {
            throw new Error('Apenas administradores podem registrar um show')
        }

        if (!week_day || !start_time || !end_time || !band_id) {
            throw new Error('Verifique se todos os campos estão preenchidos')
        }

        if (start_time < 8 || end_time > 23 || start_time >= end_time || start_time > 22 || end_time < 9) {
            throw new Error('Os Shows devem ser entre as 8h as 23h')
        }

        if (!Number.isInteger(start_time) || !Number.isInteger(end_time)) {
            throw new Error('O tempo de inicio e fim devem ser em horários em ponto, por exemplo, das 10h as 11h e não 10:30 as 11:30')
        }
        
     

        const band = await this.bandDatabase.findBandByIdOrName(band_id)
        if (!band) {
            throw new Error('Banda não encontrada')
        }

        const show = new Show(
            id,
            week_day,
            start_time,
            end_time,
            band_id
        )
        await this.showDatabase.insert(show)
        return true

    }
}