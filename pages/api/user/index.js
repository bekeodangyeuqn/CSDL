import conn from '../../../lib/db'

// create new user
export default async function userHandler(req, res) {
    const { method, body } = req

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
        password: body.password
    }

    switch (method) {
        case 'GET':
            try {
                // const query = 'SELECT user_id, first_name, last_name, dob, gender, email, address, borrow_times, img_url, tel FROM users;' duh... actually dont send the password :)
                let query = 'SELECT * FROM users;'
                let result = await conn.query(query)
                res.status(200).json(result.rows)
            } catch (error) {
                console.log(error)
                res.status(500).res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'POST':
            try {
                let query = 'INSERT INTO users(first_name, last_name, dob, gender, tel, email, address, img_url, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)'
                let values = [
                    userData.firstName,
                    userData.lastName,
                    userData.dob,
                    userData.gender,
                    userData.tel,
                    userData.email,
                    userData.address,
                    userData.imgUrl,
                    userData.password
                ]
                let result = await conn.query(
                    query,
                    values
                );
                console.log("Result: ", result)
                res.status(200).json(`User ${userData.firstName + ' ' + userData.lastName} has been created!`)
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