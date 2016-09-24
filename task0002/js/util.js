
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







// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {

}