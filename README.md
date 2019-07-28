# console2
chrome devtools extensions, console2, you can console some thing to a separate spaces.

### Example
``` javascript
// use function 'console2' in your code

// simple
console2('hah');

// object
console2({
  // list title
  title: 'hah',
  // detail
  data: {
    name: 'name1',
    // json view
    // data: 'string'
    // data: ['array']
    data: {
      a: 1, b: '2', c: [3, '4', '555']
    },
    // json expend level
    expandLevel: 2
  }
})

// object array
console2({
  // list title
  title: 'hah',
  // detail
  datas: [{
    // ...
  }]
})

// update
console2({
  // need the same id
  id: 'xxxx',
  // need type = 'update'
  type: 'update'
})

```