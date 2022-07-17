import conn from '../../../lib/db'

export default async function genreHandler(req, res) {
    const { method, body } = req

    const genreData = {
        genreId: body.genreId,
        name: body.name
    }

    switch (method) {
        case 'GET':
            try {
                let query = 'SELECT * FROM genres;'
                let result = await conn.query(query)
                res.status(200).json(result.rows)
            } catch (error) {
                console.log(error)
                res.status(500).res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'POST':
            try {
                let query = 'INSERT INTO genres(name) VALUES($1)'
                let values = [
                    genreData.name,
                ]
                let result = await conn.query(
                    query,
                    values
                );
                console.log("Result: ", result)
                res.status(200).json(`Genre ${genreData.name} has been created!`)
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