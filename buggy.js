/**
	Name: BuggyJS Library
	Author: AlexYorke
	Version: 0.0.1

*/

// DOM Element

let buggyDOM, buggy;

let regs = {
	forReplace(started, find, replace) {
		return started.replace(new RegExp(find, 'g'), replace)
	}
}

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

 	html(message) {
 		if(this.element) {
 			this.element.innerHTML = message;
 		}
 		else {
 			this.innerHTML = message
 		}

 		return this;
 	},

 	is() {
 		if(this.element) {
 			return this.element
 		}
 		else {
 			return this;
 		}
 	},

 	css(prop, val) {

 		let realObj = this.is()

 		realObj.style[prop.toString()] = val;

 		return this;

 	}

}

let Buggy = {
	forBuggy(args) {
		let to = buggyDOM.fns

		for(let i = 0 ; i < args.length ; i++) {
			let name = args[i].name

			to[name.toString()] = args[i]
		}
	}
}

Buggy.forBuggy([
	function addClass(className, timeout) {
		let now = this.is()

		function adding() {
			let started = now.className,
				spaced = started + " ",
				final  = spaced + className;

			now.className = final

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



Buggy.forBuggy([
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


Buggy.forBuggy([
	function click (callBack) {
		let thisElement = this.is()
		console.log(callBack)
		thisElement.addEventListener('click', callBack)

		return this;
	}
])