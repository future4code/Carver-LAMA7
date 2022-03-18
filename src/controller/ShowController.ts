import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDatabase";
import { AddShowDTO } from "../model/Show";

export class ShowController {
    private showBusiness: ShowBusiness
    constructor() {
        this.showBusiness = new ShowBusiness(
            new ShowDatabase()
        )
    }
    createShow = async (req: Request, res: Response) => {
        const token = req.headers.authorization as string
        const { week_day, start_time, end_time, band_id } = req.body

        const input: AddShowDTO = {
            week_day,
            start_time,
            end_time,
            band_id
        }

        try {
            const result = await this.showBusiness.createShow(input, token)
            if(!result){
                throw new Error('Falha na marcação de show')
            }
            res.status(201).send({message: 'Show registrado', result})

        } catch (error: any) {
            switch(error.message){
                case "Apenas administradores podem registrar um show'":
                    res.status(401).send({message: error.message, msg:'Apenas administradores podem registrar um show'})
                    break
                case "Verifique se todos os campos estão preenchidos":
                    res.status(401).send({message: error.message, msg:'Verifique se todos os campos estão preenchidos'})
                    break
                case "Os Shows devem ser entre as 8h as 23h":
                    res.status(409).send({message: error.message, msg:'Os Shows devem ser entre as 8h as 23h"'})
                    break
                case "O tempo de inicio e fim devem ser em horários em ponto, por exemplo, das 10h as 11h e não 10:30 as 11:30":
                    res.status(401).send({message: error.message, msg:'O tempo de inicio e fim devem ser em horários em ponto, por exemplo, das 10h as 11h e não 10:30 as 11:30'})
                default:
                    res.status(400).send({message: error.message, msg:'Ocorreu um erro interno'})
            }
        }

    }
}

