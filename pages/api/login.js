import conn from '../../lib/db'

export default async function loginHandler(req, res) {
    const {
        method,
        body
    } = req

    const loginData = {
        email: body.email,
        password: body.password,
        role: body.role
    }

    switch (method) {
        case 'POST':
            try {
                var result = {}
                if (loginData.role === 'user') {
                    let query = 'SELECT * FROM users WHERE email = $1'
                    let values = [loginData.email]
                    result = await conn.query(query, values)
                }
                else if (loginData.role === 'librarian' || loginData.role === 'admin') {
                    let query = 'SELECT * FROM librarians WHERE email = $1'
                    let values = [loginData.email]
                    result = await conn.query(query, values)
                }
                console.log(result.rows[0])
                if (!result.rows[0]) res.status(404).json(`No user with email ${loginData.email} found!`)
                if (result.rows[0].password !== loginData.password) res.status(401).json('Wrong password!')
                res.status(200).send({
                    ...result.rows[0],
                    role: loginData.role
                })
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