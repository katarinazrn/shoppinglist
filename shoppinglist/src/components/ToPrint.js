import './ToPrint.css';

const ToPrint = props => {
    return (
        <ul id='listToPrint'>
            {props.items.map(item =>
                <li>
                    {item.name}
                    <div>
                        {item.price > 0 && <span>${item.price}</span>}
                        <span>x{item.amount}</span>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default ToPrint;