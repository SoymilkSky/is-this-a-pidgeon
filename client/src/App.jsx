const mobilenet = require('@tensorflow-models/mobilenet');
import React, {useRef} from 'react';
import '@tensorflow/tfjs-backend-webgl';
import ModelLoadState from './components/ModelLoadState.jsx';
import IsPidgeon from './components/IsPidgeon.jsx';
import BirdList from './components/BirdList.jsx';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      model: null,
      imgUrl: null,
      view: 'test'
    };
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    //This loads the machine learning model.
    mobilenet.load()
      .then(model => {
        this.setState({model});
      })
  }

  pageRouter(){
    switch (this.state.view) {
      case 'show' :
        return <BirdList />
        break;
      case 'test' :
        return <IsPidgeon model = {this.state.model}/>
        break;
    }
  }

  render () {
    return (
      <div>
        <div className="navBar">
          <div className="nav">
          <span className="title">
            <img src="https://i.imgur.com/eXPeS9m.gif" height='100px'/>
            <span className="title-text">
              <h3>Is this a Pidgeon?</h3>
              <ModelLoadState model={this.state.model}/>
            </span>
            <span className="nav-button" onClick={() => this.setState({ view: 'test' })}>
              Pidgeon Tester
            </span>
            <span className="nav-button" onClick = {() => this.setState({ view: 'show' })}>
              Show me my Birds
            </span>
          </span>
          </div>
        </div>
        <div className="content">
          {this.pageRouter()}
        </div>
      </div>

    );
  }
}

export default App;