import React from 'react'
import store from './dataEvent'

class Tab extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      current: store.current
    }
    this.storeUpdate = this.storeUpdate.bind(this)
  }


  componentDidMount () {
    store.on('update', this.storeUpdate)
  }

  componentWillUnmount () {
    store.removeListener('update', this.storeUpdate)
  }

  storeUpdate ({current}) {
    this.setState({current})
  }

  render () {
    return (
      <div className="Tab" style={{display: this.props.show ? 'block' : 'none'}}>
        {this.props.list.map((item, index) => (
          <div className={"data-item " + (this.state.current === item ? 'active' : '')}
            key={index} onClick={() => store.setCurrent(item)}>
            <span title={item.title}>{item.title}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Tab
