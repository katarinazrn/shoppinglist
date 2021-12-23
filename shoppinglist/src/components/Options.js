import '../App.css';

const Options = props => {
    return (

        <div id='theme'>
            {props.theme == 'dark' ?
                <span onClick={props.changeTheme} className="material-icons light">
                    light_mode
                </span>
                :
                <span onClick={props.changeTheme} className="material-icons dark">
                    dark_mode
                </span>
            }
        </div>
    )
}

export default Options;