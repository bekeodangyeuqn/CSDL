import conn from '../../../lib/db'

export default async function authorHandler(req, res) {
    const { method, body } = req

    const authorData = {
        authorId: body.authorId,
        name: body.name,
        nationality: body.nationality
    }

    switch (method) {
        case 'GET':
            try {
                let query = 'SELECT * FROM authors;'
                let result = await conn.query(query)
                res.status(200).json(result.rows)
            } catch (error) {
                console.log(error)
                res.status(500).res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'POST':
            try {
                let query = 'INSERT INTO authors(name, nationality) VALUES($1, $2)'
                let values = [
                    authorData.name,
                    authorData.nationality
                ]
                let result = await conn.query(
                    query,
                    values
                );
                console.log("Result: ", result)
                res.status(200).json(`Author ${authorData.name} has been created!`)
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