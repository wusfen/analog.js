# data.js
全自动 模拟数据 生成器

## 示例

### 自动
```javascript
var userRule = {
  id: 'auto',
  name: 'auto',
  isAdmin: 'auto',
  phone: 'auto',
  departmentId: 'auto',
}

var user = Date(userRule) // {id:1, name:'李xx', isAdmin:true, ...}

var userList = Data([userRule]) // [{}, ...] 长度随机[0-10]，可指定

```

### 指定
```javascript
Data('id') //=> 1

Data('date') // => '2018-8-8 8:8:8'

Data({
  total: 'number(10, 100)'
})
// => {total: 51}

Data({
  list: [
    {id: 'id'}, 3, 15
  ]
})
// => 指定list数组长度[3-15]

```

## 语法
```javascript
Data('type')

Data({
  key: 'type',
  ...
}

Data([{}])

```

## type
* { key: 'auto' } 自动根据 key 推测需要返回的类型
  * key 键名
  
* id(base=1, step=1) 自增整数
  * base id起始值
  * step 自动步长

* number(min=0, max=100, fixed=0) 数字类型
  * min 最小值
  * max 最大值
  * fixed 小数位数

* boolean(rate=0.5) bool类型
  * rate 返回 true 的概率

* date(min=-1y, max=+1y) 日期类型
  * min 最小日期
  * max 最大日期

* string(min=10, max=min) 字符串
  * min 最小长度
  * max 最大长度

* url(min=15, max=35) url地址
  * min 最小长度
  * max 最大长度

* img(width=200, height=100, bg='#eee', text='$width x $height') 图片url
  * width 宽度
  * height 长度
  * bg 背景颜色
  * text 文本

* imgBase64(width=200, height=100, bg='#eee', text='$width x $height') base64图片
  * width 宽度
  * height 长度
  * bg 背景颜色
  * text 文本

* video 视频地址

* color(min=0, max=255) #颜色
  * min rgb最小取值
  * max rgb最大取值

* email 电子邮箱
  
* phone 手机号
  
* name 两三个字的中文姓名
  
* zh(min=25, max=min) 中文字符
  * min 最小长度
  * max 最大长度

* repeat(char, min, max) 重复字符
  * char 字符
  * min 最小次数
  * max 最大次数

* { key: type } 对象类型
  * key 键名
  * type 键值，任意类型，可用类型名称生成数据，如： {userId: 'id'}

* [ type, min=0, max=min?min:10 ] 数组类型，以第一个元素为模板生成指定长度的数组
  * type 任意类型
  * min 最小长度
  * max 最大长度
