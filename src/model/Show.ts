export enum SHOW_DAYS {
    SEXTA = 'sexta',
    SABADO = 'sábado',
    DOMINGO = 'domingo'
}

export type AddShowDTO = {
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
}

export class Show{
    constructor(
        private _id: string,
        private _week_day: string,
        private _start_time: number,
        private _end_time: number,
        private _band_id: string
    ){}
    public get band_id(): string {
        return this._band_id
    }
    public set band_id(value: string) {
        this._band_id = value
    }
    public get end_time(): number {
        return this._end_time
    }
    public set end_time(value: number) {
        this._end_time = value
    }
    public get start_time(): number {
        return this._start_time
    }
    public set start_time(value: number) {
        this._start_time = value
    }
    public get week_day(): string {
        return this._week_day
    }
    public set week_day(value: string) {
        this._week_day = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}