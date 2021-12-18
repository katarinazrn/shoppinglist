import './Actions.css';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { ToPrint } from './ToPrint';

const Actions = props => {
    const componentRef = useRef();

    return (
        <div id='actions'>
            <button onClick={props.clearAll}>Clear All </button>
            <span>|</span>
            <ReactToPrint
                trigger={() => <button >Print</button>}
                content={() => componentRef.current}
            />
            <div style={{ display: 'none' }}>
                <ToPrint ref={componentRef} 
                total={props.total} undefinedPrices={props.undefinedPrices} 
                items={props.items} />
            </div>
        </div>
    )
}

export default Actions;