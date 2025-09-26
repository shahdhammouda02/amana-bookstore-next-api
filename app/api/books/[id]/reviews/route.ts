import { NextRequest, NextResponse } from "next/server";
import booksData from "../../../../data/books.json";
import reviewsData from "../../../../data/reviews.json";

const books = booksData.books;
const reviews = reviewsData.reviews;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const book = books.find((b) => b.id === id);
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const bookReviews = reviews.filter((r) => r.bookId === id);
  if (bookReviews.length === 0) {
    return NextResponse.json(
      { message: "No reviews found for this book" },
      { status: 404 }
    );
  }
  return NextResponse.json({ book: book.title, reviews: bookReviews });
}
