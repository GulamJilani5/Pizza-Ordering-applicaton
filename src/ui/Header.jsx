import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
export default function Header() {
  return (
    <header className="bg-yellow-400 uppercase px-4 py-3 sm:px-6 border-b border-stone-200 flex items-center justify-between">
      <Link to="/" className="tracking-widest">Pizza Ordering App</Link>
      <SearchOrder />
      <Username/>
    </header>
  );
}
