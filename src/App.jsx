import React from 'react';
import Navbar from './components/app/Navbar';
import Home from './components/app/Home';

const App = () => {
  return (
    <>
      <header className="fixed w-screen">
        <Navbar />
      </header>
      <Home />
    </>
  )
}
export default App;