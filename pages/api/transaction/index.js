import conn from '../../../lib/db'

export default async function transactionHandler(req, res) {
    const { method, body } = req

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
                let query = `SELECT * FROM getalltrans();`
                let result = await conn.query(query)
                res.status(200).json(result.rows)
            } catch (error) {
                console.log(error)
                res.status(500).res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'POST':
            try {
                let query = `SELECT createTransaction($1, $2, $3, $4, $5);`
                let values = [
                    transactionData.userId,
                    transactionData.librarianId,
                    transactionData.transDate,
                    transactionData.expiredDate,
                    transactionData.bookIds,
                ]
                let result = await conn.query(
                    query,
                    values
                );
                console.log("Result: ", result)
                res.status(200).json(`A new transaction has been created!`)
            }
            catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
};