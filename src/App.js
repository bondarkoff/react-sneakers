import React from "react";
import axios from "axios";
import {Route, Routes} from 'react-router-dom'

import Card from "./components/Card";
import Header from "./Header";
import Drawer from "./components/Drawer";

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
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj])
  }

  const onAddToFavourite = (obj) => {
    axios.post('https://63a71f697989ad3286ea25c4.mockapi.io/favourites', obj);
    setFavourites(prev => [...prev, obj])
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

      {/* <Routes>
        <Route path="/favourites" exact>Eto Testovaya infa</Route>
      </Routes> */}

      <div className="content p-40">  
        <div className="d-flex align-center justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." type="text" />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <Card title={item.title} 
            key={index}
            price={item.price} 
            imageUrl={item.imageUrl} 
            onFavourite={(obj) => onAddToFavourite(obj)} 
            onPlus={(obj) => onAddToCart(obj)}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
