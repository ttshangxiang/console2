
import EventEmitter from 'eventemitter3'
import groupBy from 'lodash/groupBy'

class Store extends EventEmitter {
  constructor () {
    super()
    this.list = []
    this.tabs = {
      main: []
    }
    this.tabNames = Object.keys(this.tabs)
    this.current = null
  }

  add (list) {
    [].concat(list).forEach(o => {
      if (o.tab && !this.tabNames.includes(o.tab)) {
        this.tabNames.push(o.tab)
      }
      if (o.type === 'update') {
        const i = this.list.findIndex(oo => o.id === oo.id)
        i > -1 && (this.list[i] = Object.assign({}, this.list[i], o))
      } else {
        this.list.push(o)
      }
    })
    this.tabs = groupBy(this.list, 'tab')
    this.tabs.main = this.tabs[undefined]
    delete this.tabs[undefined]
    this.emit('update', this)
  }

  clear (tab = 'main') {
    this.tabs[tab] = []
    this.list = this.list.filter(o => {
      o.tab = o.tab || 'main'
      return o.tab !== tab
    })
    this.emit('update', this)
  }

  setCurrent (item) {
    this.current = item
    this.emit('update', this)
  }

}

const store = new Store()

// 接收数据
window.sendConsole2 = function (list) {
  store.add(list)
}

export default store
