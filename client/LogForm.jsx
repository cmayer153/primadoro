import React, { useEffect, useState } from 'react';
import './fashion.css';

function LogForm({entry, submit, closeModal}) {
  if (entry === null) {
    return (null)
  }
  // is this violating a hooks rule here? (putting it after the null check?)
  const [myEntry, setMyEntry] = useState({...entry});


  const handleChange = (e) => {
    switch (e.target.name) {
      case 'description':
        setMyEntry((myEntry) => {return {...myEntry, description: e.target.value}});
        break;
      case 'workRating':
        setMyEntry((myEntry) => {return {...myEntry, workRating: e.target.value}});
        break;
      default:
        console.log('My God, what have I done?');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(myEntry);
    closeModal();
  }

  return (
    <div className="primadoro-log-form">
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <textarea className="primadoro-log-form-description" type="text" name="description" value={myEntry.description} onChange={handleChange}/>
      </label>
      <label>
        Rating:
        <input type="text" name="workRating" value={myEntry.workRating} onChange={handleChange}/>
      </label>
      <input type="submit" value="Save Log" />
    </form>
    </div>
  )
}

export default LogForm;