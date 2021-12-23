import { forwardRef } from 'react';
import './ToPrint.css';

export const ToPrint = forwardRef((props, printRef) => {
    return (
        <ul download ref={printRef} id='listToPrint'>
            <h1>Spisak za kupovinu</h1>
            {props.items.map(item =>
                <li key={item.id}>
                    <span>{item.name}</span>
                    <div>
                        {item.price > 0 && <span>{item.price}din. </span>}
                        <span>X{item.amount}</span>
                    </div>
                    <span id='complete'></span>
                </li>
            )}
            {props.total > 0 &&
                <div id='total'>Ukupno:
                    {props.undefinedPrices > 0 && ' više od '}{props.total}din.
                </div>}
        </ul>
    )
})
