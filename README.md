# analog.js
模拟数据


## 用法
```javascript
analog('type(args..)?')
```

## 示例
```javascript
analog({
  number: 'number',
  boolean: 'boolean',
  string: 'string',
  date: 'date',
  img: 'img(300,150)',
  id: 'id',
  name: 'name',
  url: 'url',
  email: 'email',
  zh: 'zh(50, 80)',
  array: [{
    id: 'id',
    name: 'name',
    email: 'email',
  }, 3, 5]
})
```

## 类型
* number(min=0, max=100, fixed=0)
* boolean(rate=0.5)
* string(min=10, max=min)
* date(min=-1y, max=+1y)
* img(width=200, height=100, bg='#eee', text='$width x $height')
* id(base=1, step=1)
* name
* url
* email
* zh(min=25, max=min)
* { ... }
* [ type, min, max=min ]