import Card from "../Card"

function Home ({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavourite, onAddToCart, cartItems, isLoading}) {
    
    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (     
            <Card 
                key={index}
                onFavourite={(obj) => onAddToFavourite(obj)} 
                onPlus={(obj) => onAddToCart(obj)}
                added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
                loading={isLoading}
                {... item}
            />
        ));
    }

    return (
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
                {renderItems()}
            </div>
      </div>
    )
}

export default Home