import React from 'react'
import store from './dataEvent'
import Tab from './Tab'
import Detail from './Detail'

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      tabs: store.tabs,
      tabNames: store.tabNames,
      current: store.current,
      activeTab: store.tabNames[0],
      tabStyle: {}
    }
    this.storeUpdate = this.storeUpdate.bind(this)
  }

  componentDidMount () {
    store.on('update', this.storeUpdate)
    this.firstTab && this.setState({
      tabStyle: this.getTabSlideStyle(this.firstTab)
    })
  }

  componentWillUnmount () {
    store.removeListener('update', this.storeUpdate)
  }

  storeUpdate ({tabs, tabNames, current}) {
    this.setState({tabs, tabNames, current})
  }

  tabClick (e, item) {
    if (item === this.state.activeTab) {
      return
    }

    this.setState({
      activeTab: item,
      tabStyle: this.getTabSlideStyle(e.target)
    })
  }

  getTabSlideStyle (el) {
    return {
      width: el.clientWidth + 'px',
      transform: 'translateX(' + el.offsetLeft + 'px) scaleY(0.75)'
    }
  }

  header () {
    return (
      <header style={{position: 'relative'}}>
        <div className="header-tab">
          {this.state.tabNames.map((item, index) => (
            <div className={"tab-name " + (item === this.state.activeTab ? 'active' : '') } key={index}
              onClick={e => this.tabClick(e, item)}
              ref={el => index === 0 && (this.firstTab = el)}
              >{item.slice(0, 1).toUpperCase() + item.slice(1)}</div>
          ))}
        </div>
        <div className="header-tab-slider" style={this.state.tabStyle}></div>
      </header>
    )
  }

  render () {

    return (
      <div className={'Console2' + (this.state.current ? ' showDetail' : '')}>
        {this.state.tabNames.length > 1 ? this.header() : ''}
        <div className="Content">
          <div className="Tabs">
            <div className="Tools">
              <span className="icon icon-clear" onClick={() => store.clear(this.state.activeTab)}></span>
            </div>
            {this.state.tabNames.map(name => (
              <Tab show={this.state.activeTab === name} list={this.state.tabs[name] || []} key={name}></Tab>
            ))}
          </div>
          <Detail></Detail>
        </div>
      </div>
    )
  }
}

export default App;
