
// task2.1
// 判断是否是一个数组
function isArray(arr) {
	return object.prototype.toString.call(arr)==="[object Array]";
}

function isArray(arr) {
	return Array.isArray(arr);
}

// 判断是否为函数
function isFunction(fn) {
	return object.prototype.toString.call(fn)==="[object Function"
}

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// task2.2(不行)
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var clone = src;

    // 对于Date,String,Boolean等引用类型的数据，需要考虑调用构造函数重新构造，直接赋值依然会有引用问题（不是真正的clone引用变量）
    // 对于 Date
    if (src instanceof Date) {
        clone = new Date(src.getDate());
        return clone;
    }

    // 对于Object和Array的遍历，可以使用for in，这样可以保证在在Array对象上扩展的属性也可以正确复制
    // 对于 数组
    if (src instanceof Array) {
        clone = [];
        for (var key in src) {
            clone[key] = cloneObject(src[key]);
        }
        return clone;
    }

    // 对于 Object
    if (src instanceof Object) {
        clone = {};
        for (var key in src) {
            if (src.hasOwnProperty(key)) {       // 忽略掉继承属性
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone;
    }

    // 对于 数字 字符串 布尔 null undefined
    return src;
}
}
var srcObj = {
	a:1,
	b:{
		b1:["hello","hi"],
		b2:"JavaScript"
	}
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] ="Hello";


console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// task2.3
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
// 先对数组进行排序，然后从后开始与前一个进行比较，一样就删除
function uniqArray(arr) {
	var c = arr.sort();
	for (var i = c.length-1; i > 0; i--) {
		if (c[i]===c[i-1]) {
			 c.splice(i,1)
		}
	}
	return c;
}

//使用实例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); //[1, 3, 5, 7]

// hash
// 利用对象同名属性只能有一个的特性
function uniqArray2(arr) {
    var obj = {};
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            result.push(arr[i]);
            obj[arr[i]] = true;
        }
    }
    return result;
}

// hash +es5
//速度最快 
function uniqArray3(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj)//??返回参数obj可被枚举的属性
}
// 返回["1","3","5","7"]

// 利用索引indexOf找不到等于-1的特性去掉重复的
function uniqArray3(arr) {
    var new_array = [];
    for (var i = 0, len = arr.length; i< len; i++) {
        if (arr[i] !== "" && new_array.indexOf(arr[i]) < 0 ) {
            new_array.push(arr[i]);
        }
    }
    return new_array
}

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符??
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    function isEmpty(c) {
        return /\s/.test(c);
    }

    var len = str.length;
    for (var i = 0; i < len && isEmpty(str.charAt(i)); i++);
    if (i === len) {
        return '';
    }
    for (var j = len; j && isEmpty(str.charAt(j - 1)); j--);
    return str.substring(i, j);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
/*
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
*/


——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++){
        fn(arr[i],i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
/*
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html*/

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var element = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)){
            element++;
        }
    }
    return element;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// 学习正则表达式，在util.js完成以下代码??
// task 2.4
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // return (/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i).test(emsilStr);
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    phone = phone + '';
    // return (/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/).test(phone);
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// task 3.1??
function hasClass(element, className) {
    var name = element.className.match(/\S+/g) || [];
    if (name.indexOf(className) !== -1) {
        return true;
    }
    return false;

}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className = trim(element.className + ' ' + newClassName);
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        element.className = trim(element.className.replace(oldClassName, ''));
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = 0;
    var y = 0;
    var current = element;

    while (current !== null) {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    }

    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    // element.getBoundingClientRect()

    x -= scrollLeft;
    y -= scrollTop;

    return {
        x: x,
        y: y
    }
}

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// task 3.2??
// 实现一个简单的Query
function $(selector) {
    var ele = document;
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割

    for (var i = 0, len = sele.length; i < len; i++) {

        switch (sele[i][0]) {    // 从子节点中查找
            case '#':
                ele = ele.getElementById(sele[i].substring(1));
                break;
            case '.':
                ele = ele.getElementsByClassName(sele[i].substring(1))[0];
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                var temp = ele.getElementsByTagName('*');
                var tLen = temp.length;
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key] === value) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key]) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                break;
            default :
                ele = ele.getElementsByTagName(sele[i])[0];
                break;
        }
    }

    if (!ele) {
        ele = null;
    }

    return ele;
}
/*
// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
*/

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// 我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的util.js，实现以下函数

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    element.addEventListener(event,listener);
}

// 例如：ge
function clicklistener(event) {
    ...
}
addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implementhangu
    element.removeEventListener(event,Listener)
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    addEvent(element,"keydown",function(e) {
        var event = e || window.event;
        var keyCode = event.which || event.keyCode;
        if (keyCode === 13) {
            listener.call(element,event);
        }
    });
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// task 4.2
// 对一个列表里所有的<li>增加点击事件的监听
function clickListener(event) {
    console.log(event);
}

/*
$.click($("#item1"), clickListener);
$.click($("#item2"), clickListener);
$.click($("#item3"), clickListener);
*/

// 我们通过自己写的函数，取到id为list这个ul里面的所有li，然后通过遍历给他们绑定事件。这样我们就不需要一个一个去绑定了。
function clickListener(event) {
    console.log(event);
}

function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}

function init() {
    /*
    each($("#list").getElementsByTagName('li'), function(item) {
        $.click(item, clickListener);
    });
    */

    $.click($("#btn"), renderList);
}

// 我们增加了一个按钮，当点击按钮时，改变list里面的项目，这个时候你再点击一下li，绑定事件不再生效了。
// 那是不是我们每次改变了DOM结构或者内容后，都需要重新绑定事件呢？当然不会这么笨，接下来学习一下事件代理，然后实现下面新的方法。
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;

        if (target && target.tagName === tag.toUpperCase()) {
            listener.call(target, event);
        }
    });
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
/*
$.delegate($("#list"), "li", "click", clickListener);
*/
