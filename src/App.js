import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post('https://rk-mern-learn.herokuapp.com/add-friend', {
      name: name,
      age: age,
    }).then((res) => {
      setListOfFriends([...listOfFriends, { _id: res.data._id, name: name, age: age}])
    })
  }

  useEffect(() => {
    Axios.get('https://rk-mern-learn.herokuapp.com/read').then((res) => {
      setListOfFriends(res.data);
    }).catch(() => {
      console.log("Err")
    })
  }, [])
  
  const updateFriend = (id) => {
    const newAge = prompt("Enter new Age: ");

    Axios.put('https://rk-mern-learn.herokuapp.com/update', { newAge: newAge, id: id })
      .then(
        () => {
          setListOfFriends(listOfFriends.map((val) => {
            return val._id === id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          }))
        }
      )
  }

  const deleteFriend = (id) => {
    Axios.delete(`https://rk-mern-learn.herokuapp.com/delete/${id}`)
      .then(
        () => {
          setListOfFriends(listOfFriends.filter((val) => {
            return val._id !== id
          }))
      }
    )
  }

  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder="friend name" onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="friend age" onChange= {(e)=> setAge(e.target.value)} />
        <button onClick = {addFriend}>Add friend</button>
      </div>
      <div className="listOfFriends">
        {listOfFriends.map((val, key) => {
          return (
            <div className="friendContainer" key={key}>
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
              </div>
                <button onClick={() => updateFriend(val._id)} >Update</button>
                <button onClick={() => deleteFriend(val._id)} id="removeBtn">Delete</button>
            </div>
          )
      })}
      </div>
    </div>
  );
}

export default App;
