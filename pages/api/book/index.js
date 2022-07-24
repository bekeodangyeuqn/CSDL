import conn from '../../../lib/db'

export default async function bookHandler(req, res) {
    const { method, body } = req

    const bookData = {
        bookId: body.bookId,
        name: body.name,
        publisher: body.publisher,
        publishDate: body.publishDate,
        importDate: body.importDate,
        quantity: body.quantity,
        imgUrls: body.imgUrls,
        borrowedTimes: body.borrowedTimes,
        genresList: body.genresList,
        genresList: body.genresList
    }

    switch (method) {
        case 'GET':
            try {
                let query = `
                select r1.book_id as "bookId", r1.name, r3.publisher, r1.publish_date as "publishDate",
                    r1.import_date as "importDate", r1.quantity, r1.img_url as "imgUrls", r1.borrowed_times as "borrowedTimes",
                    r1.authors_list as "authorsList", r2.genres_list as "genresList" from 
                    (SELECT books.*, json_agg(authors.*) as authors_list
                    FROM books 
                   	    left join books_authors using (book_id)
					    left join authors using (author_id)
                    group by (book_id)) as r1,
                    (SELECT books.*, json_agg(genres.*) as genres_list
                    FROM books 
                   	    left join books_genres using (book_id)
					    left join genres using (genre_id)
                    group by (book_id)) as r2,
                    (SELECT books.*, row_to_json(publishers.*) as publisher
                    FROM books 
                        left join publishers using (publisher_id)
                    group by (book_id, publishers.*)) as r3	
                    where r1.book_id = r2.book_id and r1.book_id = r3.book_id;
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