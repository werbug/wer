document.addEventListener('deviceready',function () {
  var styles = [
    '/static/libs/css/swiper.min.css',
    '/static/css/app.87fc02da8263e0dbdd575844c93f1220.css'
  ]
  var scripts = [
    '/static/libs/js/xheditor/jquery/jquery-1.11.2.min.js',
    '/static/libs/js/xheditor/xheditor-1.2.2.min.js',
    '/static/libs/js/xheditor/xheditor_lang/zh-cn.js',
    '/static/libs/js/swiper.js',
    '/static/libs/js/iscroll-probe.js',
    '/static/js/manifest.14cc223a468b4801753f.js',
    '/static/js/vendor.4b5982c979e31238d060.js',
    '/static/js/app.cc58d79a21c2655bbc13.js'
  ]
  for (var i = 0; i < scripts.length; i++) {
    var script = document.createElement('script')
    script.src = scripts[i]
    document.body.appendChild(script)
  }
  for (var i = 0; i < styles.length; i++) {
    var link = document.createElement('link')
    link.href = styles[i]
    link.rel = 'stylesheet'
    document.getElementsByTagName('head')[0].appendChild(link)
  }
}, false)