import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
export default function AppLayout() {
  const navigation = useNavigation();
  //console.log(navigation);

  const isLoadng = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows[auto_1fr_auto]">
      {isLoadng && <Loader />}
      <Header />
      <div className="overflow-scroll">
      <main className="mx-auto max-w-3xl">
        {/* Outlet basically contains all the child routes of the App component.
        It renders the current route selected.*/}
        <Outlet />
      </main>
      </div>
      <CartOverview />
    </div>
  );
}
