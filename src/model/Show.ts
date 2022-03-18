

export enum ShowDays {
    SEXTA = 'sexta',
    SABADO = 'sábado',
    DOMINGO = 'Domingo'
}

export type AddShowDTO = {
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
}

export class Show{
    constructor(
        private id: string,
        private week_day: string,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ){}
    static toShowModel(data: any): Show {
        return new Show(data.id, data.week_day, data.start_time, data.end_time, data.band_id)
    }
    public getId(){
        return this.id
    }
    public getWeekDay(){
        return this.week_day
    }
    public getStartTime(){
        return this.start_time
    }
    public getEndTime(){
        return this.end_time
    }
    public getBandId(){
        return this.band_id
    }
}