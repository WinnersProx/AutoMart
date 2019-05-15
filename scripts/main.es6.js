"use strict";
const togglerButton = document.querySelector('div.toggler');
const toggleDropdown = document.querySelectorAll('.dropdown-toggle');
const dropdownBody =document.querySelector('.dropdown-menu');
let body = document.body;
let html = document.documentElement;
let initialize = () => {
    console.log("Loaded");
}
// control window scrolls
const  scrollState = () =>{
	let windowInnerHeightX = window.innerHeight;
	console.log(windowInnerHeightX);
	if(body.scrollTop > 300 || html.scrollTop > 300)
		togglerButton.classList.add('show');
	else
		togglerButton.classList.remove('show');
}
window.scroll(scrollState());



const scrolltoTop = () => {
	let scrollTop = Math.round(body.scrollTop || html.scrollTop);
	window.scrollTop -= scrollTop;
}

togglerButton.addEventListener('click', () => {
	// Scroll to the top
	scrolltoTop();
})

toggleDropdown.forEach((current,index) => {
	current.addEventListener('click', e => {
		let target = e.target.parentNode.children[1];
		if(!target.classList.contains('show'))
			target.classList.add('show');
		else
			target.classList.remove('show');
	})
})

