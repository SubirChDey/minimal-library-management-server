import mongoose, { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];


const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, enum: genres, required: true },
        isbn: { type: String, required: true, unique: true },
        description: { type: String },
        copies: { type: Number, required: true, min: 0 },
        available: { type: Boolean, default: true },
    },
    {
        timestamps: true,
        versionKey: false
    }


);

bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};

bookSchema.pre('save', function (next) {
    this.available = this.copies > 0;
    next();
});

export const Book = model<IBook>('Book', bookSchema);
