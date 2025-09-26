// Get & Post /api/books
import { NextRequest,NextResponse } from 'next/server';
import booksData from '../../data/books.json';
import authUsers from '../../data/authUsers.json';

let books = booksData.books;

function isAuthenticated(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return null;

    const token = authHeader.replace(/^Bearer\s+/i, "");
    return authUsers.users.find((user:any) => user.token === token) || null;
}

export async function GET(req: NextRequest) {
    return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
    const user = isAuthenticated(req);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body= await req.json();
    const { title, author, description, price } = body;
    if (!title || !author || !description || !price) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newBook = {
        id: (books.length + 1).toString(),
        ...body,
        datePublished: body.datePublished || new Date().toISOString().split('T')[0],
        featured: body.featured || false
    };

    books.push(newBook);
    return NextResponse.json({
        message: 'Book added successfully', book: newBook
    }, { status: 201 });

}