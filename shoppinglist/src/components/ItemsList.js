import Item from "./Item";
import './Items.css';

const ItemsList = props => {

    if (props.items.length > 0)
        return (
            <ul id='list'>
                {props.items.map(item =>
                    <Item delete={props.delete} toggle={props.toggle} key={item.id} item={item} />
                )}
                {props.total > 0 &&
                    <div id='total'>Ukupno:{' '}
                        {props.undefinedPrices > 0 && <span>više od </span>}
                        <span> <span id='sum'>{props.total.toFixed(2)}</span> din.</span>
                    </div>}
            </ul>
        )
    else return (
        <div className='empty'>
            <span className='material-icons'>
                add_shopping_cart
            </span>
            <p>
                Dodajte proizvode za kupovinu
            </p>
        </div>
    )
}

export default ItemsList;