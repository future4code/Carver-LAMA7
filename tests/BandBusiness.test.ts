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

describe("Testing endpoint BandBusiness findBandByName", () => {

    test("Should catch error when name band is not registered", async () => {
        expect.assertions
        try {
            const band: RegisterBandDTO = {
                name: "name_mockado",
                music_genre: "music_mockado",
                responsible: "responsible_mockado"
            }
            await bandDatabaseMock.register(band, "token")
        } catch (error: any) {
            console.log("asdfasfasdf", error.message)
            expect(error.message).toEqual("Esta banda já existe")
            expect(error.code).toBe(409)
        }
    })
})

