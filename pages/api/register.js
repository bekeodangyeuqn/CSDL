import conn from '../../lib/db'

export default async function loginHandler(req, res) {
    const {
        method,
        body
    } = req

    const userData = {
        email: body.email,
        password: body.password,
        role: body.role,
        firstName: body.firstName,
        lastName: body.lastName,
        dob: body.dob,
        gender: body.gender,
        address: body.address,
        tel: body.tel,
        imgUrl: body.imgUrl
    }

    switch (method) {
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
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}