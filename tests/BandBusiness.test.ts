import { BandBusiness } from "../src/business/BandBusiness"
import { BandDatabase } from "../src/data/BandDatabase"
import { BandDatabaseMock } from "./mocks/bandDatabasemock"
import { HashGeneratorMock } from "./mocks/hashGeneratorMock"
import { IdGeneratorMock } from "./mocks/idGeneratorMock"
import { TokenGeneratorMock } from "./mocks/tokenGeneratorMock"

const bandDatabaseMock = new BandBusiness(
    new BandDatabaseMock()
)

describe("Testing endpoint BandBusiness findBandByName", () => {

    test("Should catch error when name band is not registered", async () => {
        expect.assertions
        try {
            const band = {
                name: "name_mockado",
                music_genre: "music_mockado",
                responsible: "responsible_mockado"
            }
            await bandDatabaseMock.register(band, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmYmVjZDAxLWNhZGYtNDdiNi1hMDFjLTNhNDIxOTk3OGNiYSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY0NzYzMDQyNSwiZXhwIjoxNjQ3NzE2ODI1fQ.RV719FVfuJXUCNjRfjw9N0zQnRCkJumnzHVd2ksgIpg")
        } catch (error: any) {
            expect(error.message).toEqual("Esta banda já existe")
            expect(error.statusCoded).toBe(409)
        }
    })
})

