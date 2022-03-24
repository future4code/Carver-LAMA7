import { ShowRepository } from "../business/ShowRepository";
import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase implements ShowRepository{
    protected TABLE_NAME = "Shows_Lama"
    insert = async (show: Show) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert({
                    id: show.id,
                    week_day: show.week_day,
                    start_time: show.start_time,
                    end_time: show.end_time,
                    band_id: show.band_id
                })
            return show
        } catch (error: any) {
            throw new Error("erro ao adicionar show no banco de dados aaa")
        }
    }
    getAllShows = async () => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
                .select()
            if (!result) {
                return null
            }
            return result
        } catch (error: any) {
            throw new Error("erro ao tentar buscar shows no banco de dados")
        }
    }
    getAllShowsByDay = async (week_day: string) => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
                .select()
                .where({week_day})
            if (!result) {
                return null
            }
            return result
        } catch (error: any) {
            throw new Error("erro ao tentar buscar shows no banco de dados")
        }
    }
}