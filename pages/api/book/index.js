import conn from '../../../lib/db'

export default async function bookHandler(req, res) {
    const { method, body } = req

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
                SELECT books.*, array_agg(distinct books_genres.genre_id) as genres, array_agg(distinct books_authors.author_id) as authors
                FROM books 
                    left join books_genres using (book_id)
                    left join books_authors using (book_id)
                group by (book_id)
                `
                let result = await conn.query(query)
                res.status(200).json(result.rows)
            } catch (error) {
                console.log(error)
                res.status(500).res.status(500).json("Something went wrong, try again!")
            }
            break
        case 'POST':
            try {
                let query = `select addbook($1, $2, $3, $4, $5, $6, $7, $8);`
                let values = [
                    bookData.publisherId,
                    bookData.name,
                    bookData.publishDate,
                    bookData.importDate,
                    bookData.quantity,
                    bookData.imgUrls,
                    bookData.genreIds,
                    bookData.authorIds
                ]
                let result = await conn.query(
                    query,
                    values
                );
                console.log("Result: ", result)
                res.status(200).json(`Book ${bookData.name} has been created!`)
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