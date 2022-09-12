import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()


const allMealsUrl = 'http://localhost:9292/meals'
// const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else {
    favorites = []
  }
  return favorites
}

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    }
    catch (e) {

      console.log(e.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])


  // const fetchRandomMeal = () => {
  //   fetchMeals(randomMealUrl)
  // }

  const selectMeal = (id, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.id === id);
    } else {
      meal = meals.find((meal) => meal.id === id);
    }
    setSelectedMeal(meal);
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  const addToFavorites = (id) => {
    const meal = meals.find((meal) => meal.id === id);
    const alreadyFavorite = favorites.find((meal) => meal.id === id);
    if (alreadyFavorite) return
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((meal) => meal.id !== id);
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  return (
    <AppContext.Provider
      value={{ loading, meals, setSearchTerm, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }