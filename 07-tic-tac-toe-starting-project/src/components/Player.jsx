import { useState } from "react";

export default function Player({intialName, symbol, isActive})
{
    const [playerName, setPlayerName] = useState(intialName);
    const [isEditing, setIsEditing] = useState(false)

    function handleEditClick()
    {
        // setIsEditing(!isEditing) //Not best practice
        setIsEditing((editing) => !editing)
    }

    function handleChange(event){
        console.log(event)
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>    
    let btnCaption = 'Edit';

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        btnCaption = 'Save'
    }


    return (
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>              
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>        
    );
}