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
		console.log(lines);

		for (const line of lines) {
			console.log(line.split());
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

// POST method at add-book
app.post("/add-book", addBook);

// Listen for requests
app.listen(port, () => {
	console.log(`Server started at port ${3000}`);
});
