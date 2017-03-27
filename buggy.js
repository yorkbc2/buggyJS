/**
	Name: BuggyJS Library
	Author: AlexYorke
	Version: 0.0.1

*/

// DOM Element

let buggyDOM, buggy, error, type, types;

error = function (message) {
	throw new Error(message);
}

type = function (obj) {
	return typeof obj;
}

types = function (arr) {
	let el;
	forEach(el => {
		arr.push(typeof el)
	})

	return el;
}

let regs = {
	forReplace(started, find, replace) {
		return started.replace(new RegExp(find, 'g'), replace)
	}
}

const body = document.body,
	  head = document.head;

// Main function of create element in local DOM
buggyDOM  = function (buggyString) {
	// create new creator for new element
	return buggyDOM.fns.creator(buggyString)
}

// Hello Functions (methods) of default buggy element
buggyDOM.fns = buggyDOM.prototype = {
	// Version (it's important)
	version: "0.0.1",
	// Author of a lib (very bad man)
	author: "Alex Yorke",

	allAttributes: [],

	// first object Creator
	creator(buggyString) {
		// Lib get a element from dom with function (get)
		let element = this.get(buggyString),
			// Returned object
			buggyObject = {}

		// Element = element (DOM element in object)

		if(element[0] == undefined) {

			let buggyProto 		= Object.assign(element.__proto__, this)
			element.__proto__   = buggyProto
			buggyObject.element         = element
		}
		else {
			for(let i = 0 ; i < element.length; i++) {
				let key = i.toString()

				let buggyProto = Object.assign(element[i].__proto__, this)
				element[i].__proto__ =  buggyProto
				buggyObject[key] = element[i]
			}
		}

		// _PPROTO_ prototyping buggy methods
		buggyObject.__proto__ = this;

		// Return this fucking object
		return buggyObject;
	},

	// buggyGetter (get element from dom with document.get...)
	get(buggyString) {

		// Replace ">" -> "," for array :D
 		let replaced = regs.forReplace(buggyString ,'>', ','),
			splited  = replaced.split(',')

		// Array trimmed => whitespaces destroyed
		for(let i = 0 ; i < splited.length ; i++) {
			splited[i] = splited[i].trim()
		}

		// Array checked if <= 1 -> work easy else -> work hard
		if(splited.length <= 1) {
			return this.getOne(splited[0])
		}
		else {
			return this.getMany(splited)
		}
	},

	// Private function for get One ELEMENT FROM DOM 

	getOne(buggyString, element) {
		// it's just symbol, element and empty array at the start
		let symbol = buggyString.slice(0,1),
			domElement = buggyString.slice(1),
			arrayForMany = []
		// Switch on element detect
		if(!element) {
			switch(symbol) {
				case "#" :
					return document.getElementById(domElement)
				case "." :
					return document.getElementsByClassName(domElement)
				case "%" :
					return document.getElementsByName(domElement)
				default :
					return document.getElementsByTagName(buggyString)
			}
		}
		// If element in arguments
		else if (element) {
				// We create array with all method of dom getting
					 arrayForMany[0] = document.getElementById(domElement)
					 arrayForMany[1] = document.getElementsByClassName(domElement)
					 arrayForMany[2] = document.getElementsByName(domElement)
					 arrayForMany[3] = document.getElementsByTagName(buggyString)

			// cycle in cycle
			for(let i = 0; i < element.childNodes.length ; i++) {
				for(let j = 0 ; j < arrayForMany.length ; j++) {
					if(element.childNodes[i] == arrayForMany[j]) {
						return element.childNodes[i];
					}
				}
			}
		}
 	},

 	// Equal previous buy for MANY ELEMENTS
 	getMany(array) {
 		let i = 0,
 			element;

 		while(i < array.length) {
 			let symbol = array[i].slice(0,1),
 				domElement = array[i].slice(1);

 			if(element == null || element == undefined) {
 				element = this.getOne(array[i])
 			}
 			else {
 				element = this.getOne(array[i], element)
 			}

 			i++;
 		}


 		return element;
 	},
 	// Buggy Prototyping inner text
 	text(message) {
 		if(this.element) {
 			this.element.innerHTML = message;
 		}
 		else {
 			this.innerHTML = message
 		}

 		return this;
 	},
 	// Buggy function for BuggyELement detected
 	is() {
 		if(this.element) {
 			return this.element
 		}
 		else {
 			return this;
 		}
 	},
 	// Simple css Method for styling element
 	css(prop, val) {

 		if(val) {
 			let realObj = this.is()

	 		realObj.style[prop.toString()] = val;

	 		return this;
 		}
 		else {
 			let realObj = this.is()

 			let val = realObj.style[prop.toString()];

 			return val;
 		}

 	}

}

// Main object BUGGY
let Buggy = {
	// First method is extends()
	// We can create plugins with this method;
	extends(args) {
		let to = buggyDOM.fns

		for(let i = 0 ; i < args.length ; i++) {
			let name = args[i].name

			to[name.toString()] = args[i]
		}
	},
	// Something like extends, but with one function
	extend(fun) {
		let to = buggyDOM.fns;

		let name = fun.name;

		if(name == 'undefined' || name == null || name == undefined || name == '') {
			throw new Error("Name of function is REQUIRED!")
		}
		else {
			to[name.toString()] = fun 
		}

	},
	// Method for detected object. 
	// If object isn't detected == throw error!
	has(obj, error) {
		if(!obj){
			throw new Error(error)
		}
		else {
			return true;
		}
	},
	// We can create new element DOM and __proto__ buggy.fns
	new(el) {
		if(el) {

			let newEl = document.createElement(el);
			newEl.__proto__ = Object.assign(newEl.__proto__, buggyDOM.fns)

			return newEl;
		}
		else {
			throw new Error("Element is undefined")
		}
	},
	// == window.onload
	onload(callBack) {
		window.onload = callBack;
		return window;
	},
	// == window.onresize
	onresize(callBack) {
		window.onresize = callBack;
		return window;
	},
	//  Give all elements with this tag
	all(tag) {
		return document.querySelectorAll(tag)
	},
	// Prototyping by buggyProto
	buggyProto(element) {
		let proto, buggyProto, result;

		proto = element.__proto__

		buggyProto = buggyDOM.fns;

		result = element.__proto__ = Object.assign(proto, buggyProto)

		return result;
	},
	// Find Attribute in DOM and do event, when this attribute found. Give all elements with this Attribute in argument event()
	findAttr(object) {
		let name, tagName, callBack, all;

		all = this.all;

		name = object.name;
		tagName = object.tag || object.tags;
		callBack = object.event;

		if(!name) {
			error("Name of Attribute is undefined")
		}
		else if (!tagName) {
			error("TagName of Attribute is undefined")
		}
		else if (!callBack) {
			error("CallBack of Attribute is undefined")
		}
		else {
			if(type(tagName) == 'string') {	
				let elements = all(tagName)
				let allBlocks = []
				elements.forEach(el => {
					if(el.getAttribute(name) !== null) {
						Buggy.buggyProto(el)
						allBlocks.push(el)
					}
				})
				return callBack(allBlocks)
			}
			else if(type(tagName) == 'object') {
				let tagElements = [],
					allBlocks   = [];

				for(let i = 0 ; i < tagName ; i++) {
					tagElements.push(tagName[i])
				}

				tagElements.forEach(el => {
					let elems = all(el)
					elems.forEach(another => {
						if(another.getAttribute(name)) {
							Buggy.buggyProto(el)
							allBlocks.push(another)
						}
					})

				})

				return callBack(allBlocks)

			}
			else {
				error("TypeOf tag is undefined")
			}
		}
	}

}

Buggy.extends([
	// Simple AddClass Funciton 
	function addClass(className, timeout) {
		let now = this.is()

		function adding() {
			let started = now.className,
				spaced = started + " ",
				final  = spaced + className,
				replaced = started.replace(' ', ','),
				splited = replaced.split(','),
				hasClass = false

			for(let i = 0 ; i < splited.length ; i++) {
				if(className == splited[i]) {
					hasClass = true;
				}
			}

			if(hasClass) {
				now.className = started
			}
			else {
				now.className = final
			}


		}
		if(timeout) {
			setTimeout(() => {
				adding()
			}, timeout)
		}
		else {
			adding()
		}
		return this;
	},
	// Simple RemoveClass Function
	function removeClass(args, timeout) {
		let now = this.is()

		function removing() {
			let started = now.className;
			let spaced  = args.replace(' ', ',');
			let splited = spaced.split(','),
				final = '';
			for(let i = 0 ; i < splited.length ; i++) {
				started = started.replace(splited[i], '');
			}

			now.className = started.trim()
		}

		if(timeout) {
			setTimeout(() => {
				removing()
			}, timeout)
		}
		else {
			removing()
		}

		return this
	},
	// DOIT
	// function toggleClass (className, timeout) {
	// 	let el = this.is()
	// 	function toggling (arg_timeout, global_element) {
	// 			let started = el.className,
	// 				replaced = started.replace(" ", ","),
	// 				arrayElement   = replaced.split(','),
	// 				arrayArgument  = className.replace(" ", ",").split(',');

	// 			console.log(started, replaced ,arrayElement,arrayArgument)

	// 			for(let i = 0 ; i < arrayElement.length ; i++) {
	// 				for(let j = 0 ; j < arrayArgument.length ; j++) {
	// 					console.log(arrayArgument[j])
	// 					console.log(arrayElement[i])
	// 					if(arrayElement[i] == arrayArgument[j]) {
	// 						console.log("EQUALING")
	// 						started = started.replace(arrayElement[i], '')
	// 					}
	// 					else {
	// 						started = started + " " + arrayArgument[j]
	// 					}
	// 				}
	// 			}

	// 			return started;

	// 	}	

	// 	el.className = toggling(timeout, this)

	// 	return this;
	// }
	// If has class return true (doesn't work)
	function hasClass(className) {
		let element = this.is();

			let startedClassName = element.className;
			console.log(startedClassName)
			let repliced         = startedClassName.replace(' ', ',');
			let splited 		 = repliced.split(',');


		let counter = false

		for(let i = 0 ; i  <splited.length ; i++) {
			if(splited[i] == className) {
				counter = true
				this.hasClass = counter
				return this.hasClass
			}
		}

		this.hasClass = false

		return this.hasClass;
	}
])



Buggy.extends([
	// Simple animation (Hide)
	function hide (timeout) {

		let el = this.is()

		function hiding(timeout) {
			if(timeout == 'slow') {timeout = 1000/100;}
			else if(timeout == 'fast') {timeout = 1000/200}
			else {timeout = 1000/150}

			let op = el.style.opacity = 1
			let int = setInterval(function () {
				el.css('opacity', op)
				op = op - 0.01

				if(op <= 0) {
					clearInterval(int)
				}
			}, timeout)
		}

		hiding(timeout)


		return this

	}

])


Buggy.extends([
	// Like addEventListern('click') but short
	function click (callBack) {
		let thisElement = this.is()
		console.log(callBack)
		thisElement.addEventListener('click', callBack)

		return this;
	},
	// like mouseOver but chort
	function hover (callBack) {
		let thisElement = this.is()

		console.log(callBack)
		thisElement.addEventListener('mouseover', callBack)

		return this;
	},
	// Mouseover but easy
	function mouseover(callBack) {
		let thisElement = this.is()

		console.log(callBack)
		thisElement.addEventListener('mouseover', callBack)

		return this;
	},
	// MouseOut but easy
	function mouseout(callBack) {
		let thisElement = this.is()

		console.log(callBack)
		thisElement.addEventListener('mouseout', callBack)

		return this;
	},
	// Very cool method. It wait some seconds and do callBack when this Seconds is out
	function tickOver(callBack, seconds) {
		let thisElement = this.is()
		console.log(callBack)
		let i = 0 ;
		thisElement.mouseover(() => {
			let interval = setInterval(() => {
				i++;
				console.log(i)
				if(i >= seconds) {
					callBack()
					clearInterval(interval)
				}
			}, 1000)

			thisElement.mouseout(() => {
				i = 0;
				clearInterval(interval)
			})
		})


		return this;
	},
	// Create event from the eventList
	function event(eventName, callBack) {
		let eventList = ['input', 'click', 'mouseover', 'mouseout', 'focus', 'dblclick', 'change', 'keydown'],
			element   = this.is();

		eventList.forEach(el => {
			if(el == eventName) {
				element.addEventListener(eventName, callBack)
			}
		})

		return this;
	}
])


// New object BuggyBOM (For BOM manipulation)
let buggyBOM = {
	__proto__: Buggy,

	width() {
		return window.innerWidth
	},
	height() {
		return window.innerHeight
	},
	resolution() {
		return {
			width: this.width,
			height: this.height
		}
	},
	scrollTop(value) {
		
		return value;
	}
}


// Short object Helper
let Helper = {
	__proto__: Buggy,
	float(value) {
		return parseFloat(value)
	},
	integer(value) {
		return parseInt(value)
	}
}


Buggy.extends([
	// Simple Animation (show)
	function show (timeout) {
		let times = timeout.toString()

		let thisis = this.is()

		function showing(timeout) {
			if(times == 'slow') {
				timeout = 1500/100
			}
			else if(times == 'fast') {
				timeout = 1000/100
			}
			else {
				timeout = 1250/100
			}

			let op = thisis.css('opacity') = 0
			let int = setInterval(function () {
				thisis.css('opacity', op)
				op = op + 0.01

				if(op <= 0) {
					clearInterval(int)
				}
			}, timeout)
		}

		showing(timeout)

		return this;
	},
	function toggle (timeout) {

		
	},
	// Simple append
	function append(child) {
		let el = this.is()

		el.appendChild(child)
		return el;
	}

])

Buggy.extends([
	// Set some attribute
	function setAttr (name, val) {
		let element, oldattribute, newattribute;

		element = this.is()

		oldattribute = element.getAttribute(name);

		if(oldattribute) {
			element.allAttributes.push(oldattribute)
			element.setAttribute(name, val)
		}
		else {
			element.setAttribute(name, val)
		}

		return this;
	},
	// Get some attribute
	function getAttr (name) {
		let element, attr ;

		element = this.is()

		attr = element.getAttribute(name)

		return attr;
	}
])
// First slider by BuggyDOM
Buggy.extend(function slider(object) {
	let theme, images, dots, interval, autoSlide, arrowColor, parts, thisis, counter;

	dots = object.dots || true;
	interval = object.interval || 3000;
	arrowColor = object.arrow || '#fff';
	theme = object.theme || 'parts';
	parts = object.parts || 5;
	autoSlide = object.auto || true;
	thisis = this.is();
	counter = object.current || 0;

	Buggy.has(object.images, "Images is undefined!")
	images = object.images;

	function slide(images) {
		thisis.addClass('buggy-slider-parts')
		counter++;
		let part, sliders, partList, sliderList;
		let width = thisis.clientWidth;
		partList = [];
		sliderList = [];
		let partPositionLength = []

		width = parseInt(width);
		console.log(width)
		let partWidth = width / parts,
		partPosition  = 0;

		for(let i = 0; i < images.length ; i++) {
			sliders = Buggy.new('div')
			console.log(sliders)
			for(let j = 0; j < parts; j++) {
				part = Buggy.new('div')
				part.css('backroundImage', `url(${images[i]})`)
				part.css('width', `${partWidth}px`)
				part.css('backgroundPosition', `${partPosition}px 0`)
				part.addClass('slidePart')

				partPosition = partPosition - partWidth;
				partPositionLength.push(partPosition)
				if(partPositionLength.length >= parts) {
					partPosition = 0;
					partPositionLength = []
				}

				if(partPosition )
				console.log(partPosition)

				sliders.append(part)
				partList.push(part)
			}
			sliderList.push(sliders)
		}




	}

	Buggy.onload(() => {
		slide(images)
	})

	return this;
})