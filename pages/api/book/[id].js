import conn from '../../../lib/db'

export default async function bookHandler(req, res) {
    const {
        query: { id },
        method,
        body
    } = req

    const bookData = {
        bookId: body.bookId,
        name: body.name,
        publisherId: body.publisherId,
        publishDate: body.publishDate,
        importDate: body.importDate,
        quantity: body.quantity,
        imgUrls: body.imgUrls,
        borrowedTimes: body.borrowedTimes,
        genreIds: body.genreIds,
        authorIds: body.authorIds
    }

    switch (method) {
        case 'GET':
            try {
                let query = `
            SELECT b.*, array_agg(distinct books_genres.genre_id) as genres, array_agg(distinct books_authors.author_id) as authors
                FROM (select * from books where book_id = $1) as b
                    left join books_genres using (book_id)
                    left join books_authors using (book_id)
                group by (b.book_id, b.publisher_id, b.name, b.publish_date, b.import_date, b.quantity, b.img_url, b.borrowed_times)
            `
                let values = [id]
                let result = await conn.query(query, values)
                if (result.rows[0]) res.status(200).json(result.rows)
                else res.status(400).json(`Book with id ${id} cannot be found!`)
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'PATCH':
            try {
                let query = 'SELECT * from books where book_id = $1;'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        let query = 'select updatebook($1, $2, $3, $4, $5, $6, $7, $8, $9);'
                        let values = [
                            id,
                            bookData.name,
                            bookData.publisherId,
                            bookData.publishDate,
                            bookData.importDate,
                            bookData.quantity,
                            bookData.imgUrls,
                            bookData.genreIds,
                            bookData.authorIds
                        ]
                        let result = await conn.query(query, values)
                        res.status(200).json(`Book with id ${id} has been updated!`)
                        // res.send(values)
                    } catch (error) {
                        console.log(error)
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`Book with id ${id} cannot be found!`)
                }
            } catch (error) {
                console.log(error)
                res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'DELETE':
            try {
                let query = 'SELECT * FROM books WHERE book_id = $1'
                let values = [id]
                let isExisted = await conn.query(query, values)
                if (isExisted.rows[0]) {
                    try {
                        let query = 'SELECT deletebook($1)'
                        let values = [id]
                        let result = await conn.query(query, values)
                        res.status(200).json(`Book with id ${id} has been deleted!`)
                    } catch (error) {
                        res.status(500).json("Something went wrong, try again!")
                    }
                } else {
                    res.status(400).json(`Book with id ${id} cannot be found!`)
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