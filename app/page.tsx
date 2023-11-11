'use client'
import GenreList from "./genres/page";
import SearchBar from "./searchBar";
import Carousels from "./carousel";
import Footer from "./footer";
import Navbar from "./Navbar/page";
import Category from "./api/category";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <div className="flex flex-col items-center">
        <SearchBar />
        <Navbar />
        <Carousels />
        <Category />
        <GenreList />
        <Footer />
      </div>
    </main>
  );
}