const express = require('express');
const router = express.Router();
const Admin = require('../Models/Admin');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Book = require('../Models/Book');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/createadmin', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }
        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        //  Create a new user
        admin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
        })

        const data = {
            admin: {
                id: admin.id
            }
        }
        const adminToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, adminToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, admin.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials " })
        }

        const data = {
            admin: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})

router.post('/addbook', async (req, res) => {
    try {
        const { bookID, bookName, author, available, issuedDate, returnDate, fine, issuerName, issuerEmail } = req.body;

        const book = new Book({
            bookID, bookName, author, available, issuedDate, returnDate, fine, issuerName, issuerEmail
        })
        const savedBook = await book.save()
        res.json(savedBook)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})


router.get('/getallbooks', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})

router.put('/updatebook/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Not Found");
        }
        const { available, issuedDate, returnDate, fine, issuerName, issuerEmail } = req.body;
        book.available = available;
        book.issuedDate = issuedDate;
        book.returnDate = returnDate;
        book.fine = fine;
        book.issuerName = issuerName;
        book.issuerEmail = issuerEmail;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})

router.get('/getallbooks/:id', async (req, res) => {
    try {
        const book = await User.findById(req.params.id);
        if (!book) {
            return res.status(404).send("Not Found");
        }
        res.json(book);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})

router.get('/availablebooks', async (req, res) => {
    try {
        const books = await Book.find({ available: true });
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})

router.get('/issuedbooks', async (req, res) => {
    try {
        const books = await Book.find({ available: false });
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occur");
    }
})

router.put('return/:id', async (req, res) => {
try {
    const book = await Book.findById(req.params.id);
    if (!book) {
        return res.status(404).send("Not Found");
    }
    const { available, issuedDate, returnDate, fine, issuerName, issuerEmail } = req.body;
    book.available = true;
    book.issuedDate = "Not issued";
    book.returnDate = "Not issued";
    book.fine = fine;
    book.issuerName = "Not issued";
    book.issuerEmail = "Not issued";

    const updatedBook = await book.save();
    res.json(updatedBook);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error occur");
}
})

module.exports = router;