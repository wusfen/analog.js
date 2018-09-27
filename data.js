/*! @preserve https://github.com/wusfen/data.js */
!(function () {

  var typeOf = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  }

  var random = {
    id: function (base, step, target) {
      // todo target
      base = base || 1
      step = step || 1
      var i = this.i = this.i || 0
      var value = base + step * i
      this.i += 1
      return value
    },
    number: function (min, max, fixed) {
      min = min || 0
      max = max !== undefined ? max : 100
      fixed = fixed || 0
      var diff = max - min
      var value = Math.random() * diff + min
      value = +value.toFixed(fixed)
      return value
    },
    boolean: function (rate) {
      rate = rate || .5
      return Math.random() < rate ? true : false
    },
    date: function (min, max) {
      min = min || +new Date - 1000 * 60 * 60 * 24 * 365
      max = max || +new Date + 1000 * 60 * 60 * 24 * 365
      var value = random.number(min, max)
      var date = new Date(value)
      date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + ' ' +
        [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
      return date
    },
    string: function (min, max, space) {
      min = min || 10
      max = max || min
      space = space || ' '
      var endCode = 0x007a
      var startCode = 0x0061

      var length = random.number(min, max)
      var str = ''
      for (var i = 0; i < length; i++) {
        var code = random.number(endCode, startCode)
        var char = String.fromCharCode(code)
        // char = Math.random() < .16? space : String.fromCharCode(code)
        str += char
      }
      return str
    },
    zh: function (min, max) {
      min = min || 25
      max = max || min
      var chars = '我人有的和主产不为这工要在地一上是中国经以发了民同'
      var length = random.number(min, max)
      var str = ''
      for (var i = 0; i < length; i++) {
        var index = random.number(0, chars.length - 1)
        var char = chars.charAt(index)
        str += char
      }
      return str
    },
    repeat: function (s, min, max) {
      min = min || 1
      max = max || 10
      var length = random.number(min, max)
      var str = ''
      for (var i = 0; i < length; i++) {
        str += s
      }
      return str
    },
    url: function (min, max) {
      min = min || 5
      max = max || 20
      return 'http://' + random.string(3, 7) + '.com/' + random.string(min, max)
    },
    email: function (min, max) {
      min = min || 5
      max = max || 10
      return random.string(min, max) + '@' + random.string(3, 7) + '.com'
    },
    phone: function () {
      return '1' + random.one([3, 5, 7, 8]) + random.number(100000000, 999999999)
    },
    name: function () {
      var n1 = '赵钱孙李周吴郑王'.split('')[random.number(0, 7)]
      var n2 = '春夏秋冬,'.split(/,|\B/)[random.number(0, 4)]
      var n3 = '梅兰竹菊'.split('')[random.number(0, 3)]
      return n1 + n2 + n3
    },
    imgBase64: function (width, height, bg, text) {
      width = width || 200
      height = height || 100
      bg = bg || '#eee'
      text = text || width + ' x ' + height

      if (typeof document == 'undefined') return
      var canvas = this.canvas = this.canvas || document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      var ctx = canvas.getContext('2d')

      // document.body.appendChild(canvas)
      // window.canvas = canvas
      // window.ctx = ctx

      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      var fontSize = width < 70 ? 10 : 20
      ctx.fillStyle = '#a9a9a9'
      ctx.font = fontSize + 'px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, width / 2, height / 2)

      return canvas.toDataURL()
    },
    color: function (min, max) {
      min = min || 0
      max = max || 255
      return '#' + [
        random.number(min, max).toString(16),
        random.number(min, max).toString(16),
        random.number(min, max).toString(16)
      ].join('')
    },
    img: function (width, height, bg, text) {
      width = width || random.number(50, 300)
      height = height || random.number(50, 300)
      bg = bg || random.color(100, 255).replace('#', '')
      text = text || ''
      return 'http://dummyimage.com/' + width + 'x' + height + '/' + bg + '/fff&text=' + text
    },
    video: function () {
      return random.one([
        'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400',
      ])
    },
    one: function (array) {
      return array[random.number(0, array.length - 1)]
    }
  }

  function Data(rule) {
    if ('string' == typeOf(rule)) {
      var m_a = rule.split('(') // method(100, 5) => ['method', '100, 5)']
      // method
      var method = m_a[0]
      if (method in random) {
        var args = (m_a[1] || '').replace(')', '')
        // args
        args = args.split(',')
        // to number
        for (var i = args.length - 1; i >= 0; i--) {
          var arg = args[i]
          // '"arg"' => 'arg'
          args[i] = arg.replace(/^\s*["']|["']\s*$/g, '')
          if (!isNaN(arg)) {
            args[i] = Number(arg)
          }
        }
        // ()
        return random[method].apply(random, args)
      }
    }
    if ('object' == typeOf(rule)) {
      var obj = {}
      for (var key in rule) {
        var value = rule[key]
        // auto
        if (value == 'auto') {
          if (key.match(/id$/i)) {
            value = 'id'
          }
          else if (key.match(/number|num|count|total|size|length/i)) {
            value = 'number'
          }
          else if (key.match(/^(is|has)/)) {
            value = 'boolean'
          }
          else if (key.match(/date|time/i)) {
            value = 'date'
          }
          else if (key.match(/title/i)) {
            value = 'zh(20, 30)'
          }
          else if (key.match(/content|text/i)) {
            value = 'zh(50, 100)'
          }
          else if (key.match(/img|image|avatar/i)) {
            value = 'img'
          }
          else if (key.match(/video/i)) {
            value = 'video'
          }
          else if (key.match(/url/i)) {
            value = 'url'
          }
          else if (key.match(/email/i)) {
            value = 'email'
          }
          else if (key.match(/name|author/i)) {
            value = 'name'
          }
          else if (key.match(/phone/i)) {
            value = 'phone'
          }
          else {
            value = 'string'
          }
        }
        obj[key] = Data(value)
      }
      return obj
    }
    if ('array' == typeOf(rule)) {
      var arr = []
      var obj = rule[0]
      var min = rule[1] || 0
      var max = min ? min : 10
      var length = obj ? random.number(min, max) : 0
      for (var i = 0; i < length; i++) {
        arr[i] = Data(obj)
      }
      return arr
    }
    return rule
  }

  if (typeof module != 'undefined') {
    module.exports = Data
  } else {
    window.Data = Data
  }
})()
