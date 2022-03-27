import React from 'react';
import axios from 'axios';

class IsPidgeon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      model: null,
      birbName: '',
      imgUrl: '',
      show: false,
      loaded: false,
      tested: false,
      pidgeonResult: null
    };
    this.imgRef = React.createRef();
    this.isPidgeonTest = this.isPidgeonTest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleLoadNew = this.handleLoadNew.bind(this);
    this.postToServer = this.postToServer.bind(this);
  }

  isPidgeonTest(image) {
    //This function tests an image to see if it is a pidgeon.
    this.props.model.classify(image.current)
      .then(predictions => {
        this.setState({ model: predictions, tested: true });
        if (predictions[0].className === 'partridge') {
          this.setState({ pidgeonResult: true })
        } else {
          this.setState({ pidgeonResult: false})
        }
        // console.log( predictions[0].className === 'partridge' ? 'This is a Pidgeon' : 'This is not a Pidgeon');
        // console.log(predictions[0].className === 'partridge' ? 'Pidgeon Confidence: ' + predictions[0].probability : '');
        // //Yes I know a partridge is not a pidgeon,
        // //but I keep feeding the model Pidgeons and they keep coming out as partridges???
      })
      .catch(err => {
        console.log(err);
      })
  }

  postToServer() {
    console.log('were in post to server')
    if (this.state.birbName.length === 0 || this.state.birbName === undefined || this.state.birbName === null) {
      window.alert('please enter a name');
    } else {
      axios.post('api/pidgeons', {name: this.state.birbName, url: this.state.imgUrl, isPidgeon: this.state.pidgeonResult})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }

  handleLoad() {
    if (this.state.imgUrl !== null || this.state.imgUrl.length !== 0 || this.state.imgUrl !== undefined) {
      this.setState({ loaded: true, show: true })
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleLoadNew() {
    this.setState({
      loaded: false,
      imgUrl: '',
      tested: false,
      show: false,
      birbName: '',
      model: [],
    })
  }

  render(){
    return (
      <div>
        {this.state.tested ? null :
          <form>
            <input id="imgUrl" type="text" placeholder="please enter a url"
              onChange={e => this.handleChange(e)} />
            <input type="button" onClick={this.handleLoad} value="load a pigeon" />
          </form>
        }

        <h1>Is this a Pidgeon?</h1>
        <div>
          {this.state.show ?
            <div>
              <div className="img-wrapper">
                <img
                  src={this.state.loaded ? `${this.state.imgUrl}` : null}
                  ref={this.imgRef}
                  alt="bird(?)"
                  crossOrigin='anonymous'
                  className="img"
                />
              </div>
              <button onClick={() => this.isPidgeonTest(this.imgRef)}>Test</button>
              {this.state.tested ?
                <div>
                  <div>{this.state.model[0].className === 'partridge' ?
                    <h4>This is a Pidgeon: Pidgeon Confidence: {this.state.model[0].probability}</h4>
                    : <h4>This is not pidgeon</h4>}
                  </div>
                  <form>
                    <input id="birbName" type="text" onChange={e => this.handleChange(e)} placeholder="enter a name to save"/>
                    <input type="button" onClick={this.postToServer} value="save"/>
                  </form>
                  <button onClick={this.handleLoadNew}>Load a new Pidgeon</button>
                </div>
              : null}

            </div>
        : <h3>please load an image!</h3>}
      </div>

      </div >
    );
  }

}

export default IsPidgeon;