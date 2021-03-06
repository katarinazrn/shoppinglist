import { useRef } from 'react';
import './NewItem.css';

const NewItem = props => {
    const nameRef = useRef();
    const priceRef = useRef();
    const amountRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();

        const item = {};
        item.name = nameRef.current.value.trim();
        item.price = priceRef.current.value;
        item.amount = amountRef.current.value;
        item.isBought = false;

        if (item.amount === '') {
            item.amount = 1;
        }

        if (item.price === '') {
            item.price = 0;
        }
        else{
            item.price=parseFloat(item.price)
        }

        if (item.name !== '') {
            props.addItem(item);
            nameRef.current.value = '';
            priceRef.current.value = null;
            amountRef.current.value = null;
        }
    }

    return (
        <form id='new' onSubmit={handleSubmit}> 
            <input className='input' placeholder='Novi proizvod...' id='name' ref={nameRef} type='text'  />
            <div className='tooltip input'>
                <input id='price' placeholder='0 din.' ref={priceRef} type='number' step='.01' />
                <span>Cena po jedinici</span>
            </div>
            <div className='tooltip input'>
                <input id='amount' placeholder='x1' ref={amountRef} type='number' step='1' />
                <span>Količina</span>
            </div>
            <button type='submit'>Dodaj</button>
        </form>
    )
}

export default NewItem;