import { forwardRef } from 'react';
import './ToPrint.css';

export const ToPrint = forwardRef((props,printRef) => {
    return (
        <ul ref={printRef} id='listToPrint'>
            <h1>Shopping List</h1>
            {props.items.map(item =>
                <li key={item.id}>
                    <span>{item.name}</span>
                    <div>
                        {item.price > 0 && <span>${item.price} </span>}
                        <span>x{item.amount}</span>
                    </div>
                    <span id='complete'></span>
                </li>
            )}
            {props.total > 0 &&
                <div id='total'>Total:
                    {props.undefinedPrices > 0 && ' >'}
                    ${props.total}</div>}
        </ul>
    )
})
