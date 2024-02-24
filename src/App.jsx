import React from 'react';
import Navbar from './components/core/Navbar';
import Home from './components/core/Home';

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