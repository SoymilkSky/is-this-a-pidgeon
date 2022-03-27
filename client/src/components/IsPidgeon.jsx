import React from 'react';

class IsPidgeon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      model: null,
      imgUrl: '',
      show: false,
      loaded: false,
      tested: false,
      pigeonResult: null
    };
    this.imgRef = React.createRef();
    this.isPidgeonTest = this.isPidgeonTest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  isPidgeonTest(image) {
    //This function tests an image to see if it is a pidgeon.
    this.props.model.classify(image.current)
      .then(predictions => {
        this.setState({model: predictions, tested: true})
        // console.log( predictions[0].className === 'partridge' ? 'This is a Pidgeon' : 'This is not a Pidgeon');
        // console.log(predictions[0].className === 'partridge' ? 'Pidgeon Confidence: ' + predictions[0].probability : '');
        // //Yes I know a partridge is not a pidgeon,
        // //but I keep feeding the model Pidgeons and they keep coming out as partridges???
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleLoad() {
    if (this.state.imgUrl !== null || this.state.imgUrl.length !== 0 || this.state.imgUrl !== undefined) {
      this.setState({ loaded: true, show: true })
    }
  }

  handleChange(e) {
    this.setState({ imgUrl: e.target.value })
  }

  render(){
    return (
      <div>
        <form>
          <input type="text" placeholder="please enter a url" onChange={e => this.handleChange(e)}/>
          <input type="button" onClick={this.handleLoad} value="load a pigeon" />
        </form>
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
                <div>{this.state.model[0].className === 'partridge' ?
                <h4>This is a Pidgeon: Pidgeon Confidence: {this.state.model[0].probability}</h4>
                : <h4>This is not pidgeon</h4>}</div>
              : null}

            </div>
        : <h3>please load an image!</h3>}
      </div>

      </div >
    );
  }

}

export default IsPidgeon;