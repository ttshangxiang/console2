import React from 'react'
import store from './dataEvent'
import { ObjectRootLabel, ObjectLabel, ObjectInspector } from 'react-inspector'

const defaultNodeRenderer = ({ depth, name, data, isNonenumerable, expanded }) =>
  depth === 0
    ? <ObjectRootLabel name={name} data={data} />
    : <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />

class Detail extends React.Component {

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
    const obj = this.state.current
    let list = []
    if (obj) {
      obj.data && list.push(obj.data)
      obj.datas && (list = list.concat(obj.datas))
    }
    return (
      <div className="Detail">
        <div className="Tools">
          <div className="icon icon-close" onClick={() => store.setCurrent(null)}></div>
        </div>
        <div className="Detail-body">
          {list.map((item, index) => (
            <React.Fragment key={index}>
              <div className="data-title">{item.name ? (item.name + '：') : ''}</div>
              <ObjectInspector data={item.data} nodeRenderer={defaultNodeRenderer} expandLevel={item.expandLevel || 1}/>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Detail
