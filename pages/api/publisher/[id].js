import conn from '../../../lib/db'

export default async function PublisherHandler(req, res) {
    const {
        query: { id },
        method,
        body
    } = req

    const publisherData = {
        publisherId: body.publisherId,
        name: body.name,
        address: body.address,
        email: body.email,
        tel: body.tel
    }

    switch (method) {
        case 'GET':
            try {
                let query = 'SELECT * FROM publishers WHERE publisher_id = $1;'
                let values = [id]
                let result = await conn.query(query, values)
                if (result.rows[0]) res.status(200).json(result.rows)
                else res.status(400).json(`Publisher with id ${id} cannot be found!`)
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'PATCH':
            try {
                let query = 'SELECT * FROM publishers WHERE publisher_id = $1'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        // make sure all attributes is not blank from FE
                        let query = 'UPDATE publishers SET (name, address, email, tel) = ($1, $2, $3, $4) WHERE publisher_id = $5'
                        let values = [
                            publisherData.name,
                            publisherData.address,
                            publisherData.email,
                            publisherData.tel,
                            id
                        ]
                        let result = await conn.query(query, values)
                        res.status(200).json(`Publisher with id ${id} has been updated!`)
                    } catch (error) {
                        console.log(error)
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`Publisher with id ${id} cannot be found!`)
                }
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'DELETE':
            try {
                let query = 'SELECT * FROM publishers WHERE publisher_id = $1'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        let query = 'DELETE FROM publishers WHERE publisher_id = $1'
                        let values = [id]
                        let result = await conn.query(query, values)
                        res.status(200).json(`Publisher with id ${id} has been deleted!`)
                    } catch (error) {
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`Publisher with id ${id} cannot be found!`)
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