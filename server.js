/* Tabamo, Euan Jed S.
2023-10822
March 4, 2025
CMSC 100 C1L
*/

import express from "express";
import { appendFileSync, readFileSync } from "node:fs";

// Express
const app = express();
const port = 3000;

// Relative path to data
const booksData = "./books.txt";

// Use json middleware and urlencoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Function that handles add book
 * @param {Object} req the request
 * @param {Object} res the response
 */
function addBook(req, res) {
	const { bookName, isbn, author, year } = req.body;
	// Validate request body
	if (!bookName || !isbn || !author || !year) {
		return res.send({ success: false });
	}

	// Read lines from database
	try {
		const file = readFileSync(booksData, "utf-8");
		const lines = file.split("\n");
		lines.pop(); // Remove empty entry

		for (const line of lines) {
			if (line.split(",")[1] === isbn) {
				return res.send({ success: false });
			}
		}
	} catch (err) {}

	// Append to file
	try {
		appendFileSync(
			booksData,
			`${bookName.trim()},${isbn.trim()},${author.trim()},${year.trim()}\n`,
		);
		// Send response that transaction is successful
		return res.send({ success: true });
	} catch (err) {
		return res.send({ success: false });
	}
}

/**
 * Retrieves the details of a single book using ISBN and Author as search criteria
 * @param {Object} req the request
 * @param {Object} res the response
 */
function findByIsbnAuthor(req, res) {
	const isbnQuery = req.query.isbn;
	const authorQuery = req.query.author;

	if (!isbnQuery || !authorQuery) {
		return res.send("Error: invalid parameters");
	}

	// Read lines from database
	try {
		const file = readFileSync(booksData, "utf-8");
		const lines = file.split("\n");
		lines.pop(); // Remove empty entry

		for (const line of lines) {
			const [bookName, isbn, author, year] = line.split(",");
			if (isbn === isbnQuery && author === authorQuery) {
				return res.send(
					`Book: ${bookName}<br>ISBN: ${isbn}<br>Author: ${author}<br>Year: ${year}`,
				);
			}
		}
	} catch (err) {}

	// No match
	return res.send("Oops! There are no entries that match that criteria.");
}

function findByAuthor(req, res) {
	const authorQuery = req.query.author;

	let books = "";

	if (!authorQuery) {
		return res.send("Error: invalid author");
	}

	// Read lines from database
	try {
		const file = readFileSync(booksData, "utf-8");
		const lines = file.split("\n");
		lines.pop(); // Remove empty entry

		for (const line of lines) {
			const [bookName, isbn, author, year] = line.split(",");
			if (author === authorQuery) {
				books += `Book: ${bookName}<br>ISBN: ${isbn}<br>Author: ${author}<br>Year: ${year}<br>`;
			}
		}
	} catch (err) {}

	// No match
	if (books.length === 0) {
		return res.send("Oops! There are no entries that match that criteria.");
	}

	// Respond with all books
	return res.send(books);
}

// POST method at add-book
app.post("/add-book", addBook);

// GET method at find-by-isbn-author
app.get("/find-by-isbn-author", findByIsbnAuthor);

// GET method at find-by-author
app.get("/find-by-author", findByAuthor);

// Listen for requests
app.listen(port, () => {
	console.log(`Server started at port ${3000}`);
});
