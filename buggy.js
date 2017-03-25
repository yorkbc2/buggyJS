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
		buggyObject.element = element;

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

	getOne(buggyString, element) {,
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
						console.log(element.childNodes[i])
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
 	}

}