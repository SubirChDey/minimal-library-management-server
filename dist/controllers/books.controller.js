"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const newBook = yield book_model_1.Book.create(bookData);
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook,
    });
}));
exports.booksRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    const sortOptions = {};
    sortOptions[sortBy] = sort === 'asc' ? 1 : -1;
    const books = yield book_model_1.Book.find(query)
        .sort(sortOptions)
        .limit(parseInt(limit));
    res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
    });
}));
exports.booksRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
}));
exports.booksRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const updateData = req.body;
    const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, { new: true });
    if (!updatedBook) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
    });
}));
exports.booksRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return;
    }
    res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
    });
}));
