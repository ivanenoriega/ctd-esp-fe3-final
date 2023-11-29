import { faqsData } from 'dh-marvel/components/faqs/faqsData'
import { FaqsType } from 'dh-marvel/interfaces/types'
import { NextApiRequest, NextApiResponse } from 'next'

type Data = FaqsType[] | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "GET") {
        res.status(200).json(faqsData)
    } else {
        res.status(400).json({ message: "Método no permitido" })
    }
}
