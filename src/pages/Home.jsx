import React from 'react'
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import About from "../Components/About";
import ListDonation from "../Components/ListDonation";


function Home() {
  return (
      <div className="Home">
        <Header />
        <Hero />
        <About />
        <ListDonation />
    </div>
  );
}

export default Home