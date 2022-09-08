import { useGlobalContext } from './context'
import './App.css'
import React, { Component }  from 'react';

import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'
export default function App() {
  const { showModal, favorites } = useGlobalContext()

  return (
  <>
      <Search />
      {favorites.length > 0 && <Favorites />}

      <Meals />
      {showModal && <Modal />}
</>

  );
}
