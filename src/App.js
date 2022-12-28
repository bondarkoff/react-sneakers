import React from "react";
import axios from "axios";
import {Route, Routes} from 'react-router-dom'

import Header from "./Header";
import Drawer from "./components/Drawer";
import Home from "./components/pages/Home";
import Favourites from "./components/pages/Favourites"

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favourites, setFavourites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/items').then(res => {
      setItems(res.data);
    });
    axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    });
    axios.get('https://63a71f697989ad3286ea25c4.mockapi.io/favourites').then(res => {
      setFavourites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj])
  }

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://63a71f697989ad3286ea25c4.mockapi.io/favourites/${obj.id}`);
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

  return (
    <div className="wrapper clear"> 
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" exact element ={
          <Home 
            items={items} 
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            onChangeSearchInput={onChangeSearchInput} 
            onAddToFavourite={onAddToFavourite} 
            onAddToCart={onAddToCart}
          />}>
        </Route>
        <Route path="/favourites" exact element={
          <Favourites 
            items={favourites}
            onAddToFavourite={onAddToFavourite}
          />}>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
