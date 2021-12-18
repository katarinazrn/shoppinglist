import './Actions.css'

const Actions = props => {
    return (
        <div id='actions'>
            <button onClick={props.clearAll}>Clear All </button>
            <span>|</span>
            <button onClick={props.clearAll}>Print</button>
        </div>
    )
}

export default Actions;