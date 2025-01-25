import { config } from "dotenv";
import ImageKit from "imagekit";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { books } from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

export const dummyBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy / Fiction",
    rating: 4,
    coverUrl: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
    coverColor: "#1c1f40",
    description:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
    totalCopies: 20,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death. A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help / Productivity",
    rating: 5,
    coverUrl: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
    coverColor: "#fffdf6",
    description:
      "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
    totalCopies: 99,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
  },
  {
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    genre: "Computer Science / JavaScript",
    rating: 3,
    coverUrl:
      "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#f8e036",
    description:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
    totalCopies: 9,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophy / Adventure",
    rating: 5,
    coverUrl:
      "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#ed6322",
    description:
      "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
    totalCopies: 78,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-Help / Productivity",
    rating: 4,
    coverUrl: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
    coverColor: "#ffffff",
    description:
      "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
    totalCopies: 23,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Computer Science / Programming",
    rating: 2,
    coverUrl:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    coverColor: "#080c0d",
    description:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
    totalCopies: 56,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "Computer Science / Programming",
    rating: 4,
    coverUrl:
      "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#100f15",
    description:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
    totalCopies: 25,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance / Self-Help",
    rating: 5,
    coverUrl:
      "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#ffffff",
    description:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
    totalCopies: 10,
    videoUrl:
      "https://www.shutterstock.com/shutterstock/videos/3482284603/preview/stock-footage-new-book-opening-green-screen-k-video-animation-chrome-key.webm",
    summary:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
  },
];

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

async function uploadToImageKit(url: string, fileName: string, folder: string) {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName: fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.error(`Error uploading ${fileName} to ImageKit:`, error);
    throw error;
  }
}

async function seed() {
  console.log("Seeding books...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers",
      );

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos",
      );

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });

      console.log(`Added book: ${book.title}`);
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding books:", error);
  }
}

seed();
