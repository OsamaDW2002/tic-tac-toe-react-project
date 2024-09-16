import {useState} from "react";
export default function Player({name: initialName, symbol, isActive, onChangeName}){
    const [PlayerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    let displayButton = <span className='player-name'>{PlayerName}</span>;
    let buttonName = 'Edit';
    function editHandler(){
        setIsEditing(isEditing =>!isEditing);
        if (isEditing)
            onChangeName(symbol, PlayerName);
    }

    function handelChange(event){
        setPlayerName(event.target.value);
    }

    if(isEditing){
        buttonName = 'Save';
        displayButton = (
            <input type="text" required value={PlayerName} onChange={handelChange} />
        );
    }
    return(
        <li className={isActive ? 'active': undefined}>
        <span className="player">
          <li>
              {displayButton}
              <span className="player-symbol">{symbol}</span>
          </li>
        </span>
        <button onClick={editHandler}>{buttonName}</button>
        </li>
    )
}