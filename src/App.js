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
      const itemsResponse = await axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/items');
      const cartResponse = await axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/cart');
      const favouritesResponse = await axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/favourites');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavourites(favouritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://63a71f697989ad3286ea25c4.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/cart', obj);
      setCartItems(prev => [...prev, obj])
    }
  }

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://63a71f697989ad3286ea25c4.mockapi.io/cart/${obj.id}`)
        setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/favourites', obj);
        setFavourites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки.')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://63a71f697989ad3286ea25c4.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter((item) => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
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
