import React from 'react';
import {sampleData} from '../sampleData.js';
import axios from 'axios';

class BirdList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      isPidgeon: null
    };
    this.loadFromServer = this.loadFromServer.bind(this)
    this.patchBird = this.patchBird.bind(this)
    this.deleteBird = this.deleteBird.bind(this)
  }

  componentDidMount() {
    this.loadFromServer()
  }

  loadFromServer() {
    axios.get('api/pidgeons')
      .then(pidgeons => this.setState({list: pidgeons.data}))
      .catch(err => console.log(err))
  }

  patchBird(e, bird) {
    if (e.target.id === 'name') {
      let change = prompt('please enter an edit');
      if (change.length === 0 || change === undefined || change === null) {
        window.alert('please enter an edit!');
      } else {
        axios.patch('api/pidgeons', { _id: bird._id, [e.target.id] : change})
          .then(() => this.loadFromServer())
          .catch(err => console.log(err))
      }
    } else if (e.target.id === 'like') {
      if (bird.isPidgeon !== true) {
        window.alert('this is not a pidgeon, you can\'t like this prediction')
      } else {
        axios.patch('/api/pidgeons', { _id: bird._id, liked: !bird.liked})
        .then(() => this.loadFromServer())
        .catch(err => console.log(err))
      }
    } else {
      axios.patch('api/pidgeons', { _id: bird._id, isPidgeon: !bird.isPidgeon})
        .then(() => this.loadFromServer())
        .catch(err => console.log(err))
    }
  }

  deleteBird(_id) {
    axios.delete('api/pidgeons', {params: {_id}})
      .then(() => this.loadFromServer())
      .catch(err => console.log(err))
  }

  render(){
    return (
      <div>
        <h1>Pidgeon Tests</h1>
          <div className="bird-list">
            {this.state.list ?
            <div>{this.state.list.map(bird =>
              <div className="entry" key={bird._id}>
                <div className="entry-image-wrapper">
                  <img className="entry-image" src={bird.url} alt="bird(?)" />
                </div>
                <div className="entry-text">
                  <div className="entry-name">
                    <h3 id="name" onClick={e => this.patchBird(e, bird)}>{bird.name}</h3>
                  </div>
                  <div className="entry-category">
                    <h4 id="isPidgeon" onClick={e => this.patchBird(e, bird)}>{bird.isPidgeon ? 'Is pidgeon' : 'Not a pidgeon'}</h4>
                    <h4 id="percent">Confidence: {bird.percent.$numberDecimal}</h4>
                  </div>
                  <button id="like" onClick={e => this.patchBird(e, bird)}>{bird.liked ? 'I HATE this bird' : 'I LOVE this bird'}</button>
                  <button onClick={() => this.deleteBird(bird._id)}>Delete This Entry</button>
                </div>
              </div>
            )}
            </div>
            : null}

          </div>
      </div>
    )
  }
}

export default BirdList;