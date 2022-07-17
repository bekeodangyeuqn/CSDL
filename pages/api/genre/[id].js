import conn from '../../../lib/db'

export default async function genreHandler(req, res) {
    const {
      query: { id },
      method,
      body
    } = req

    const genreData = {
        genreId: body.genreId,
        name: body.name
    }
  
    switch (method) {
      case 'GET':
        try {
            let query = 'SELECT * FROM genres WHERE genre_id = $1;'
            let values = [id]
            let result = await conn.query(query, values)
            if (result.rows[0]) res.status(200).json(result.rows)
            else res.status(400).json(`Genre with id ${id} cannot be found!`)
        } catch (error) {
            console.log(error)
            res.status(500).json("Something went wrong, try again!")
        }
        break
      case 'PATCH':
        try {
            let query = 'SELECT * FROM genres WHERE genre_id = $1'
            let values = [id]
            let isExisted = await conn.query(query, values)
            if (isExisted.rows[0]) {
                try {
                    // make sure "name" is not blank from FE
                    let query = 'UPDATE genres SET name = $1 WHERE genre_id = $2'
                    let values = [
                        genreData.name,
                        id
                    ]
                    let result = await conn.query(query, values)
                    res.status(200).json(`Genre with id ${id} has been updated!`)
                } catch (error) {
                    console.log(error)
                    res.status(500).json("Something went wrong, try again!")
                }
            } else {
                res.status(400).json(`Genre with id ${id} cannot be found!`)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json("Something went wrong, try again!")
        }
        break
        case 'DELETE':
            try {
                let query = 'SELECT * FROM genres WHERE genre_id = $1'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        let query = 'DELETE FROM genres WHERE genre_id = $1'
                        let values = [id]
                        let result = await conn.query(query, values)
                        res.status(200).json(`Genre with id ${id} has been deleted!`)
                    } catch (error) {
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`Genre with id ${id} cannot be found!`)
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