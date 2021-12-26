import './App.css';
import NewItem from './components/NewItem';
import ItemsList from './components/ItemsList';
import { useEffect, useState } from 'react';
import Actions from './components/Actions';
import html2canvas from 'html2canvas';
import Options from './components/Options';

const App = () => {

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [undefinedPrices, setUndefinedPrices] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {

    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'));
    }
    else {
      localStorage.setItem('theme', 'light');
    }

  }, []);


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

      setTotal(t);

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

  const download = () => {
    const bg = theme == 'dark' ? 'rgb(17, 6, 37)' : 'light';
    html2canvas(document.getElementById('list'),
      { backgroundColor: bg })
      .then(canvas => {
        let anchorTag = document.createElement("a");
        document.body.appendChild(anchorTag);
        anchorTag.download = "list.jpg";
        anchorTag.href = canvas.toDataURL();
        anchorTag.click();
      });
  }

  const changeTheme = () => {
    setTheme(prev => prev == 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', localStorage.getItem('theme') == 'dark' ? 'light' : 'dark');
  }

  return (
    <div id='wrapper' theme={theme}>
      <div id='top'>
        <div id='container' >
          <Options theme={theme} changeTheme={changeTheme} />
          <h1>Spisak za kupovinu </h1>
          <Actions items={items}
            undefinedPrices={undefinedPrices}
            total={total}
            clearAll={clearAll}
            download={download} />
          <NewItem addItem={addItem} />
        </div>
      </div>
      <div id='container' >
        <ItemsList delete={deleteItem} total={total} toggle={toggle}
          undefinedPrices={undefinedPrices} items={items} />
      </div>
    </div>
  );
}

export default App;
