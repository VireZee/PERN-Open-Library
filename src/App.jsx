import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';

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