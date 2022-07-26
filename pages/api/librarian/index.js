import conn from '../../../lib/db'

export default async function userHandler(req, res) {
    const { method, body } = req

    switch (method) {
        case 'GET':
            try {
                let query = 'SELECT librarian_id as "librarianId", first_name as "firstName", last_name as "lastName" FROM librarians;'
                let result = await conn.query(query);
                res.status(200).json(result.rows)
            } catch (error) {
                console.log(error)
                res.status(500).res.status(500).json("Something went wrong, try again!")
            }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
};