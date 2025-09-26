import { NextRequest, NextResponse } from "next/server";
import booksData from "../../../data/books.json";

const books = booksData.books;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  if (!start_date || !end_date) {
    return NextResponse.json(
      {
        error:
          "Please provide both start_date and end_date in YYYY-MM-DD format.",
      },
      { status: 400 }
    );
  }

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const filteredBooks = books.filter((book) => {
    const bookDate = new Date(book.datePublished);
    return bookDate >= startDate && bookDate <= endDate;
  });

  return NextResponse.json(filteredBooks);
}
