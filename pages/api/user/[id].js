import conn from '../../../lib/db'

export default async function userHandler(req, res) {
    const {
      query: { id },
      method,
      body
    } = req

    const userData = {
        userId: body.userId,
        firstName: body.firstName,
        lastName: body.lastName,
        dob: body.dob,
        gender: body.gender,
        tel: body.tel,
        email: body.email,
        address: body.address,
        imgUrl: body.imgUrl,
    }
  
    switch (method) {
      case 'GET':
        try {
            let query = 'SELECT * FROM users WHERE user_id = $1;'
            let values = [id]
            let result = await conn.query(query, values)
            if (result.rows[0]) res.status(200).json(result.rows)
            else res.status(400).json(`User with id ${id} cannot be found!`)
        } catch (error) {
            console.log(error)
            res.status(500).json("Something went wrong, try again!")
        }
        break
      case 'PATCH':
        try {
            let query = 'SELECT * FROM users WHERE user_id = $1'
            let values = [id]
            let isExisted = await conn.query(query, values)
            if (isExisted.rows[0]) {
                try {
                    //Get all attributes except password and put into form in FE
                    let query = 'UPDATE users SET first_name = $1, last_name = $2, dob = $3, gender = $4, tel = $5, email = $6, address = $7, img_url = $8 WHERE user_id = $9'
                    let values = [
                        userData.firstName,
                        userData.lastName,
                        userData.dob,
                        userData.gender,
                        userData.tel,
                        userData.email,
                        userData.address,
                        userData.imgUrl,
                        id
                    ]
                    let result = await conn.query(query, values)
                    res.status(200).json(`User with id ${id} has been updated!`)
                } catch (error) {
                    console.log(error)
                    res.status(500).json("Something went wrong, try again!")
                }
            } else {
                res.status(400).json(`User with id ${id} cannot be found!`)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json("Something went wrong, try again! 2")
        }
        break
        case 'DELETE':
            try {
                let query = 'SELECT * FROM users WHERE user_id = $1'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        let query = 'DELETE FROM users WHERE user_id = $1'
                        let values = [id]
                        let result = await conn.query(query, values)
                        res.status(200).json(`User with id ${id} has been deleted!`)
                    } catch (error) {
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`User with id ${id} cannot be found!`)
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