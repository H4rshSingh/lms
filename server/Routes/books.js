const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Book = require('../Models/Book');

// ROUTE 1 : Get All the notes using : GET "/api/auth/fetchallnotes".   Login required
router.get('/fetchallbooks', fetchuser, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user.id });
        res.json(books)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})


// ROUTE 2 : Add a new Note using : POST "/api/auth/addnote".   Login required
router.post('/addbook', fetchuser, async (req, res) => {
    try {
        const {bookID, bookName, author, available, issuedDate, returnDate, fine, issuerName, issuerEmail } = req.body;
        // If there are errors, return bad request and the error
        const book = new Book({
            bookID, bookName, author, available, issuedDate, returnDate, fine, issuerName, issuerEmail, user: req.user.id
        })
        const savedBook = await book.save()
        res.json(savedBook)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})


router.put('/updatebook/:id', fetchuser, async (req, res) => {
    const { available, issuedDate, returnDate, fine, issuerName, issuerEmail } = req.body;
    try {
        // Create a updatedBook object
        const updatedBook = {};
        if (available) { updatedBook.available = available };
        if (issuedDate) { updatedBook.issuedDate = issuedDate };
        if (returnDate) { updatedBook.returnDate = returnDate };
        if (fine) { updatedBook.fine = fine };
        if (issuerName) { updatedBook.issuerName = issuerName };
        if (issuerEmail) { updatedBook.issuerEmail = issuerEmail };

        // Find the note to be updated and update it
        let book = await Book.findById(req.params.id);
        if (!book) { return res.status(404).send("Not Found") }

        if (book.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        book = await Note.findByIdAndUpdate(req.params.id, { $set: updatedBook }, { new: true })
        res.json({ book });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
// router.delete('/deleteticket/:id',  async (req, res) => {
//     try {
//         // Find the note to be deleted and delete it
//         let ticket = await Ticket.findById(req.params.id);
//         if (!ticket) {
//             return res.status(404).send("Not Found");
//         }

//         ticket = await Ticket.findByIdAndDelete(req.params.id)
//         res.json({ "Success": "Ticket has been deleted", ticket: ticket })

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error occur");
//     }
// })

router.get('/issuedBooks', fetchuser, async (req, res) => {
    try {
        const books = await Book.find({ user: req.user.id, available: false });
        res.json(books)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})



module.exports = router