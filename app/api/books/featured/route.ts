import { NextResponse } from "next/server";
import booksData from "../../../data/books.json";

const books = booksData.books;

export async function GET() {
  if (!books || books.length === 0) {
    return NextResponse.json({ error: "No books available" }, { status: 404 });
  }

  const featuredBooks = books.filter((book) => book.featured === true);

  if (featuredBooks.length === 0) {
    return NextResponse.json(
      { message: "No featured books found" },
      { status: 404 }
    );
  }

  return NextResponse.json(featuredBooks);
}
