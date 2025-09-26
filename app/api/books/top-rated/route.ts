import { NextResponse } from "next/server";
import booksData from "../../../data/books.json";

const books = booksData.books;

export async function GET() {
  if (!books || books.length === 0) {
    return NextResponse.json({ error: "No books available" }, { status: 404 });
  }

  const topBooks = books
    .map((book) => ({
      ...book,
      score: book.rating * book.reviewCount,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return NextResponse.json(topBooks);
}
