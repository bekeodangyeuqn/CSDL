import conn from '../../../lib/db'

export default async function transactionHandler(req, res) {
    const {
        query: { id },
        method,
        body
    } = req

    const transactionData = {
        transactionId: body.transactionId,
        userId: body.userId,
        librarianId: body.librarianId,
        transDate: body.transDate,
        expiredDate: body.expiredDate,
        status: body.status,
        hasPenalty: body.hasPenalty,
        penaltyDescription: body.penaltyDescription,
        bookIds: body.bookIds
    }

    switch (method) {
        case 'GET':
            try {
                let query = `SELECT * FROM getTransById($1);`
                let values = [id]
                let result = await conn.query(query, values)
                if (result.rows[0]) res.status(200).json(result.rows)
                else res.status(400).json(`Transaction with id ${id} cannot be found!`)
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'PATCH':
            try {
                let query = 'SELECT * FROM getTransById($1);'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        let query = 'SELECT updatetransaction($1, $2, $3, $4, $5, $6, $7, $8, $9);'
                        let values = [
                            id,
                            transactionData.userId,
                            transactionData.librarianId,
                            transactionData.transDate,
                            transactionData.expiredDate,
                            transactionData.status,
                            transactionData.hasPenalty,
                            transactionData.penaltyDescription,
                            transactionData.bookIds
                        ]
                        let result = await conn.query(query, values)
                        res.status(200).json(`Transaction with id ${id} has been updated!`)
                        // res.send(values)
                    } catch (error) {
                        console.log(error)
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`Transaction with id ${id} cannot be found!`)
                }
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'DELETE':
            try {
                let query = 'SELECT * FROM getTransById($1);'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        let query = 'SELECT deleteTransaction($1)'
                        let values = [id]
                        let result = await conn.query(query, values)
                        res.status(200).json(`Transaction with id ${id} has been deleted!`)
                    } catch (error) {
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`Transaction with id ${id} cannot be found!`)
                }
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}