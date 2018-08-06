(function($) {
  $.fn.numberAnimate = function(setting) {
    var defaults = {
      speed : 1000,//动画速度
      num : "", //初始化值
      iniAnimate : true, //是否要初始化动画效果
      symbol : '',//默认的分割符号，千，万，千万
      dot : 0, //保留几位小数点
      showName: true //是否显示＂产品服务＂
    }
    //如果setting为空，就取default的值
    var setting = $.extend(defaults, setting);
  
    //如果对象有多个，提示出错
    if($(this).length > 1){
      alert("just only one obj!");
      return;
    }
  
    //如果未设置初始化值。提示出错
    if(setting.num == ""){
      alert("must set a num!");
      return;
    }
    var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span num0" num="0">0</span>\
            <span class="mt-number-animate-span num1" num="1">1</span>\
            <span class="mt-number-animate-span num2" num="2">2</span>\
            <span class="mt-number-animate-span num3" num="3">3</span>\
            <span class="mt-number-animate-span num4" num="4">4</span>\
            <span class="mt-number-animate-span num5" num="5">5</span>\
            <span class="mt-number-animate-span num6" num="6">6</span>\
            <span class="mt-number-animate-span num7" num="7">7</span>\
            <span class="mt-number-animate-span num8" num="8">8</span>\
            <span class="mt-number-animate-span num9" num="9">9</span>\
          </div>';
  
    //数字处理
    var numToArr = function(num){
      num = parseFloat(num).toFixed(setting.dot);
      if(typeof(num) == 'number'){
        var arrStr = num.toString().split("");  
      }else{
        var arrStr = num.split("");
      }
      //console.log(arrStr);
      return arrStr;
    }
  
    //设置DOM symbol:分割符号
    var setNumDom = function(arrStr){
      var showNameStr = '';
      if (setting.showName) {
        showNameStr = '<span class="name">产品服务</span>';
      };
      var shtml = '<div class="mt-number-animate">'+showNameStr;
      for(var i=0,len=arrStr.length; i<len; i++){
        if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
          var symbol = 'num-comma';
          if (setting.symbol == ',') {
            symbol = 'num-comma';
          }else{
            symbol = 'num-dot';
          };
          shtml += '<div class="mt-number-animate-dot '+symbol+'">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
        }else{
          shtml += nHtml.replace("{{num}}",arrStr[i]);
        }
      }
      shtml += '</div>';
      return shtml;
    }
  
    //执行动画
    var runAnimate = function($parent){
      $parent.find(".mt-number-animate-dom").each(function() {
        var num = $(this).attr("data-num");
        num = (num=="."?10:num);
        var positionY = 0;
        $(this).children().each(function(i, e){
          var obj = $(e);
          if (obj.text() == num) {
            positionY = i;
            return false;
          };
          
        })
        var spanHei = $(this).height()/10; //10为元素个数
        var thisTop = -positionY*spanHei+"px";
        if(thisTop != $(this).css("top")){
          if(setting.iniAnimate){
            //HTML5不支持
            if(!window.applicationCache){
              $(this).animate({
                top : thisTop
              }, setting.speed);
            }else{
              $(this).css({
                'transform':'translateY('+thisTop+')',
                '-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
                '-moz-transform':'translateY('+thisTop+')',  /* Firefox */
                '-webkit-transform':'translateY('+thisTop+')', /* Safari 和 Chrome */
                '-o-transform':'translateY('+thisTop+')',
                '-ms-transition':setting.speed/1000+'s',
                '-moz-transition':setting.speed/1000+'s',
                '-webkit-transition':setting.speed/1000+'s',
                '-o-transition':setting.speed/1000+'s',
                'transition':setting.speed/1000+'s'
              });
              //在上面的元素一律重新排到最后
              var itemObj = $(this);
              setTimeout(function(){
                reSetNum(itemObj, num);
              },2000);
            }
          }else{
            setting.iniAnimate = true;
            $(this).css({
              top : thisTop
            });
          }
        }
      });
    }

    function reSetNum(itemObj, num){
        itemObj.children().each(function(i, e){
          var obj = $(e);
          if (obj.text() != num) {
            obj.parent().append(e.outerHTML);
            obj.remove();
          }else{
            return false;
          };
          
        })

        itemObj.css({
                'transform':'translateY(0)',
                '-ms-transform':'translateY(0)',   /* IE 9 */
                '-moz-transform':'translateY(0)',  /* Firefox */
                '-webkit-transform':'translateY(0)', /* Safari 和 Chrome */
                '-o-transform':'translateY(0)',
                 '-ms-transition':'0s',
                '-moz-transition':'0s',
                '-webkit-transition':'0s',
                '-o-transition':'0s',
                'transition':'0s'
              });
      }
  
    //初始化
    var init = function($parent){
      //初始化
      $parent.html(setNumDom(numToArr(setting.num)));
      runAnimate($parent);
    };
  
    //重置参数
    this.resetData = function(num){
      var newArr = numToArr(num);
      var $dom = $(this).find(".mt-number-animate-dom");
      if($dom.length < newArr.length){
        $(this).html(setNumDom(numToArr(num)));
      }else{
        $dom.each(function(index, el) {
          $(this).attr("data-num",newArr[index]);
        });
      }
      runAnimate($(this));
    }
    //init
    init($(this));
    return this;
  }
})(jQuery);