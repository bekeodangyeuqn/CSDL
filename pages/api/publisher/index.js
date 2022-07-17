import conn from '../../../lib/db'

export default async function PublisherHandler(req, res) {
    const { method, body } = req

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
                let query = 'SELECT * FROM publishers;'
                let result = await conn.query(query)
                res.status(200).json(result.rows)
            } catch (error) {
                console.log(error)
                res.status(500).res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'POST':
            try {
                let query = 'INSERT INTO publishers(name, address, email, tel) VALUES($1, $2, $3, $4)'
                let values = [
                    publisherData.name,
                    publisherData.address,
                    publisherData.email,
                    publisherData.tel
                ]
                let result = await conn.query(
                    query,
                    values
                );
                console.log("Result: ", result)
                res.status(200).json(`Publisher ${publisherData.name} has been created!`)
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