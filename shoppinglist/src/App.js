import './App.css';
import NewItem from './components/NewItem';
import ItemsList from './components/ItemsList';
import { useEffect, useState } from 'react';
import Actions from './components/Actions';
import ToPrint from './components/ToPrint';

const App = () => {

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [undefinedPrices, setUndefinedPrices] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('items')) {
      setItems(JSON.parse(localStorage.getItem('items')));

      let t = 0;
      JSON.parse(localStorage.getItem('items')).forEach(item => {
        t += (item.price * item.amount);
        if (item.price == 0) {
          setUndefinedPrices(prev => prev + 1);
        }
      });
    }
    else {
      localStorage.setItem('items', '');
      localStorage.setItem('maxId', 0);
    }

  }, [])


  const toggle = item => {
    item.isBought = !item.isBought;
    setItems(prevItems => {
      let newItems = [...prevItems];
      newItems.map(x => x.id != item.id ? x : item);
      localStorage.setItem('items', JSON.stringify(newItems));
      return newItems;
    })
  }

  const addItem = item => {
    item.id = parseInt(localStorage.getItem('maxId')) + 1;
    localStorage.setItem('maxId', item.id);

    if (item.price == 0) {
      setUndefinedPrices(prev => prev + 1);
    }
    else {
      setTotal(prev => prev + item.price * item.amount);
    }

    setItems(prevItems => {
      let newItems = [...prevItems];
      newItems.push(item);
      localStorage.setItem('items', JSON.stringify(newItems));
      return newItems;
    })
  }

  const deleteItem = item => {

    if (item.price == 0) {
      setUndefinedPrices(prev => prev - 1);
    }
    else {
      setTotal(prev => prev - item.price * item.amount);
    }

    setItems(prevItems => {
      let newItems = [...prevItems];
      newItems = newItems.filter(x => x.id != item.id);
      localStorage.setItem('items', JSON.stringify(newItems));
      return newItems;
    })
  }

  const clearAll = () => {
    setItems([]);
    localStorage.setItem('items', '');
    setTotal(0);
    setUndefinedPrices(0);
  }
  
  return (
    <div id='container'>
      <h1>Shopping List</h1>
      <Actions clearAll={clearAll} />
      <NewItem addItem={addItem} />
      <ItemsList delete={deleteItem} total={total} toggle={toggle}
        undefinedPrices={undefinedPrices} items={items} />
    </div>
  );
}

export default App;