import { BandBusiness } from "../src/business/BandBusiness"
import { BandDatabase } from "../src/data/BandDatabase"
import { CustomError } from "../src/error/CustomError"
import { RegisterBandDTO } from "../src/model/Band"
import { BandDatabaseMock } from "./mocks/bandDatabasemock"
import { HashGeneratorMock } from "./mocks/hashGeneratorMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"
import { TokenGeneratorMock } from "./mocks/tokenGeneratorMock"

const bandDatabaseMock = new BandBusiness(
    new IdGeneratorMock(),
    new TokenGeneratorMock(),
    new BandDatabaseMock() as any
)

describe("Teste end point registerBand", () => {

    test("Retornar falha caso o input name estiver vazio", async () => {
        expect.assertions
        try {
            const band: RegisterBandDTO = {
                name: "",
                music_genre: "Tester",
                responsible: "Tester"
            }
            await bandDatabaseMock.register(band, "token")
        } catch (error: any) {
            expect(error.message).toEqual("Esta banda já existe")
            expect(error.code).toBe(409)
        }
    })
})

