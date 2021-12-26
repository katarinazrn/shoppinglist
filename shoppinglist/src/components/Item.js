import './Items.css';

const Item = props => {
    return (
        <div className='item'>
            <label data-html2canvas-ignore id={props.item.isBought ? 'checked' : null}>
                <input type='checkbox' checked={props.item.isBought} onChange={() => props.toggle(props.item)} />
                <span className='material-icons'>
                    done
                </span>
            </label>
            <span id='itemName'>{props.item.name}</span>
            <div id='right'>
                {props.item.price > 0 && <span>{props.item.price } din.</span>} 
                <span>x{props.item.amount}</span>
                <span className='material-icons delete' data-html2canvas-ignore
                    onClick={() => props.delete(props.item)}>
                    delete
                </span>
            </div>
        </div>
    )
}

export default Item;