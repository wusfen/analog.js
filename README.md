# data.js
数据生成器


## 用法
```javascript
Data('type(args..)?')
```

## 示例
```javascript
Data({
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
* number(min=0, max=100, fixed=0) 数字类型
  * min 最小值
  * max 最大值
  * fixed 小数位数
* boolean(rate=0.5) bool类型
  * rate 返回 true 的概率
* string(min=10, max=min) 字符串
  * min 最小长度
  * max 最大长度
* date(min=-1y, max=+1y) 日期类型
  * min 最小日期
  * max 最大日期
* img(width=200, height=100, bg='#eee', text='$width x $height') base64的图片
  * width 宽度
  * height 长度
  * bg 背景颜色
  * text 文本
* id(base=1, step=1) 自增整数
  * base id起始值
  * step 自动步长
* name 两三个字的中文姓名
* url http地址
* email 电子邮箱
* zh(min=25, max=min) 中文字符
  * min 最小长度
  * max 最大长度
* { key: type, ... } 对象类型
* [ type, min=1, max=min ] 数组类型，以第一个元素为模板生成指定长度的数组
  * type 任意类型
  * min 最小长度
  * max 最大长度
