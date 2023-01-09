import React from "react";
import axios from "axios";
import {Route, Routes} from 'react-router-dom'

import Header from "./Header";
import Drawer from "./components/Drawer";

import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites"

import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favourites, setFavourites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, favouritesResponse ] = await Promise.all([
          axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/items'), 
          axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/cart'), 
          axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/favourites') 
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных :(')
        console.error(error)
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://63a71f697989ad3286ea25c4.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj])
        const {data} = await axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/cart/', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item, id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину.')
      console.error(error)
    }
  }

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://63a71f697989ad3286ea25c4.mockapi.io/favourites/${obj.id}`)
        setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/favourites', obj);
        setFavourites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки.')
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://63a71f697989ad3286ea25c4.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(id)))
    } catch (error) {
      alert('Ошибка при удалении товара из корзины.')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
   <AppContext.Provider value={{ cartItems, favourites, items, isItemAdded, onAddToFavourite, setCartOpened, setCartItems, onAddToCart }}> 
      <div className="wrapper clear"> 
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" exact element ={
            <Home 
              items={items} 
              cartItems={cartItems}
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput} 
              onAddToFavourite={onAddToFavourite} 
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />}>
          </Route>
          <Route path="/favourites" exact element={
            <Favourites 
              items={favourites}
            />}>
          </Route>
          <Route path="/orders" exact element={
            <Orders />}>
          </Route>
        </Routes>

      </div>
   </AppContext.Provider>
  );
}

export default App;
