import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
export const booksRoutes = express.Router();


booksRoutes.post('/', async (req: Request, res: Response) => {
    const bookData = req.body;
    const newBook = await Book.create(bookData);

    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook,
    });
});


booksRoutes.get('/', async (req: Request, res: Response) => {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10', page = '1' } = req.query;

    const query: any = {};
    if (filter) {
        query.genre = filter;
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sort === 'asc' ? 1 : -1;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber);

    res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        meta: {
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber)
        },
        data: books,
    });
});


booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return
    }
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
});


booksRoutes.put('/:bookId', async (req: Request, res: Response) => {

    const { bookId } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });

    if (!updatedBook) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return
    }

    res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
    });
});



booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
        });
        return
    }
    res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
    });
});

