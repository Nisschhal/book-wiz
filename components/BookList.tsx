import React from "react";
import BookCard from "@/components/BookCard";

interface Props {
  title: string;
  books: Book[];
  className?: string;
}

const BookList = ({ title, books, className }: Props) => {
  if (books.length < 2) return;

  return (
    <section className={className}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};
export default BookList;
