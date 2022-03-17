import { ShowRepository } from "../business/ShowRepository";
import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase implements ShowRepository{
    protected TABLE_NAME = "Shows_Lama"
    insert = async (show: Show) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert(show)
            return show
        } catch (error: any) {
            throw new Error("erro ao adicionar show no banco de dados")
        }
    }
    getAllShows = async () => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
                .select()
            if (!result[0]) {
                return null
            }
            return Show.toShowModel(result[0])
        } catch (error: any) {
            throw new Error("erro ao tentar buscar shows no banco de dados")
        }
    }
}