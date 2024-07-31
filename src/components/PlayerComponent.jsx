import React, { useState } from 'react';

const PlayerComponent = ({ player, onDraftChange }) => {
  const [draftedByUser, setDraftedByUser] = useState(player.draftedByUser);
  const [draftedByOther, setDraftedByOther] = useState(player.draftedByOther);

  const handleDraftByUser = () => {
    fetch(`http://localhost:5000/player/${player._id}/draft/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftedBy: 'user' }),
    })
      .then(response => response.json())
      .then(data => {
        setDraftedByUser(true);
        onDraftChange(); // Notify parent component to refresh data
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDraftByOther = () => {
    fetch(`http://localhost:5000/player/${player._id}/draft/other`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ draftedBy: 'other' }),
    })
      .then(response => response.json())
      .then(data => {
        setDraftedByOther(true);
        onDraftChange(); // Notify parent component to refresh data
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <tr style={{ backgroundColor: draftedByUser ? 'green' : draftedByOther ? 'yellow' : 'white' }}>
      <td>{player.rank}</td>
      <td>{player.name}</td>
      <td>{player.position}</td>
      <td>{player.positionRank}</td>
      <td>{player.team}</td>
      <td>{player.bye}</td>
      <td>
        <button onClick={handleDraftByUser} disabled={draftedByUser || draftedByOther}>
          Draft by Me
        </button>
        <button onClick={handleDraftByOther} disabled={draftedByUser || draftedByOther}>
          Draft by Other
        </button>
      </td>
    </tr>
  );
};

export default PlayerComponent;
