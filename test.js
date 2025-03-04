/* Tabamo, Euan Jed S.
2023-10822
March 4, 2025
CMSC 100 C1L
*/

import needle from "needle";
import { unlinkSync } from "node:fs";

const port = 3000;
const booksData = "./books.txt";
const addBookRoute = "/add-book";
const getBookIsbnAuthor = "/find-by-isbn-author";
const getBookAuthor = "/find-by-author";

// Delete books.txt first
try {
	unlinkSync(booksData);
} catch (err) {}

const addBookEndpoint = `http://localhost:${port}${addBookRoute}`;
const findByIsbnAuthorEndpoint = `http://localhost:${port}${getBookIsbnAuthor}`;
const findByAuthorEndpoint = `http://localhost:${port}${getBookAuthor}`;

const functions = [
	addValidBookTest,
	duplicateIsbnTest,
	addAnotherValidBookTest,
	emptyBookNameTest,
	emptyIsbnTest,
	emptyAuthorTest,
	missingBookNameTest,
	missingIsbnTest,
	missingAuthorTest,
	missingYearTest,
	addBooks,
	getHarryPotter1997,
	getJkRowling,
];

for (const func of functions) {
	console.log(func());
}

// Add a valid book
function addValidBookTest() {
	const data = {
		bookName: "Heartstopper #1: A Graphic Novel",
		isbn: "978-13-38617-43-6",
		author: "Alice Oseman",
		year: 2020,
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a duplicate valid book
function duplicateIsbnTest() {
	addValidBookTest();
}

// Adds another valid book
function addAnotherValidBookTest() {
	const data = {
		bookName: "Fellow Travelers",
		isbn: "978-03-07388-90-2",
		author: "Thomas Mallon",
		year: 2008,
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a book with an empty book name
function emptyBookNameTest() {
	const data = {
		bookName: "",
		isbn: "123-45-67890-12-3",
		author: "John Doe",
		year: 2025,
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a book with an empty isbn
function emptyIsbnTest() {
	const data = {
		bookName: "Non-existent Books",
		isbn: "",
		author: "John Doe",
		year: 1970,
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a book with an empty author
function emptyAuthorTest() {
	const data = {
		bookName: "Non-existent Books",
		isbn: "",
		author: "John Doe",
		year: 1970,
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a book with an missing book name
function missingBookNameTest() {
	const data = {
		isbn: "123-45-67890-12-3",
		author: "John Doe",
		year: 2025,
	};
	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a book with an missing isbn
function missingIsbnTest() {
	const data = {
		bookName: "Non-existent Books",
		author: "John Doe",
		year: 1970,
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a book with an missing author
function missingAuthorTest() {
	const data = {
		bookName: "Non-existent Books",
		isbn: "",
		year: 1970,
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Attempts to add a book with an missing year
function missingYearTest() {
	const data = {
		bookName: "Non-existent Books",
		isbn: "",
		author: "John Doe",
	};

	needle.post(addBookEndpoint, data, (err, res) => {
		console.log(res.body);
	});
}

// Adds some books needed for testing the GET endpoints
function addBooks() {
	needle.post(
		addBookEndpoint,
		{
			bookName: "Harry Potter and the Philosopher's Stone",
			isbn: "978-0-7475-3269-9",
			author: "J.K Rowling",
			year: 1997,
		},
		(err, res) => {
			console.log("Added: Harry Potter and the Philosopher's Stone");
		},
	);
	needle.post(
		addBookEndpoint,
		{
			bookName: "Harry Potter and the Chamber of Secrets",
			isbn: "0-7475-3849-2",
			author: "J.K Rowling",
			year: 1998,
		},
		(err, res) => {
			console.log("Added: Harry Potter and the Chamber of Secrets");
		},
	);
	needle.post(
		addBookEndpoint,
		{
			bookName: "The Little Prince",
			isbn: "978-0156012195",
			author: "Antoine De Saint-Exupéry",
			year: 1943,
		},
		(err, res) => {
			console.log("Added: The Little Prince");
		},
	);
}

function getHarryPotter1997() {
	needle.get(
		`${findByIsbnAuthorEndpoint}?isbn=978-0-7475-3269-9&author=J.K%20Rowling`,
		(err, res) => {
			console.log(res.body);
		},
	);
}

function getJkRowling() {
	needle.get(`${findByAuthorEndpoint}?author=J.K%20Rowling`, (err, res) => {
		console.log(res.body);
	});
}
