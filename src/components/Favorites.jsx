import { useGlobalContext } from '../context'
import React, { Component }  from 'react';


const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()

  return <section className="favorites">
    <div className="favorites-content">
      <h5>Favorites</h5>
      <div className="favorites-container">
        {favorites.map((item) => {
          const { id, strMealThumb: image } = item;

          return <div key={id} className="favorite-item" >
            <img src={image} className="favorites-img img" onClick={() => selectMeal(id, true)} />
            <button className='remove-btn' onClick={() => removeFromFavorites(id)}>remove</button>
          </div>
        })}
      </div>
    </div>
  </section>
}


export default Favorites