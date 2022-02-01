import { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

interface ErrorResponseType {
  error: string
}

interface SuccessResponseType {
  _id: string
  name: string
  email: string
  cellphone: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { name, email, cellphone }: SuccessResponseType = req.body

    const { db } = await connect()

    const lowerCaseEmail = email.toLowerCase()
    const emailAlreadyExists = await db.findOne({ email: lowerCaseEmail })
    if (emailAlreadyExists) {
      res.status(400).json({ error: `E-mail ${lowerCaseEmail} already exists` })
      return
    }

    const response = await db.insertOne({
      name,
      email: lowerCaseEmail,
      cellphone,
    })

    res.status(200).json(response.ops[0])
  } else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
