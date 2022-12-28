import Card from "../Card"

function Favourites ({items, onAddToFavourite }) {
    return (
        <div className="content p-40">  
            <div className="d-flex align-center justify-between">
                <h1>Мои Закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
            {items.map((item, index) => (
                <Card 
                    key={index}
                    favourited={true}
                    onFavourite={onAddToFavourite}
                    {... item}
                />
            ))}
            </div>
      </div>
    )
}

export default Favourites