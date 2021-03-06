"use strict";
const togglerButton = document.querySelector('div.toggler');
const toggleDropdown = document.querySelectorAll('.dropdown-toggle');
const dropdownBody =document.querySelector('.dropdown-menu');

// control window scrolls

window.addEventListener('scroll', () =>{
	if((window.pageYOffset * 2) > window.innerHeight)
		togglerButton.classList.add('show');	
	else
		togglerButton.classList.remove('show');
});


togglerButton.addEventListener('click', () => {
	// Smooth scroll to the top
	window.scroll({
	top: 0, 
	left: 0, 
	behavior: 'smooth'
});
})
// Dropdowns implementation
toggleDropdown.forEach((current,index) => {
	current.addEventListener('click', e => {
		let target = e.target.parentNode.children[1];
		if(!target.classList.contains('show'))
			target.classList.add('show');
		else
			target.classList.remove('show');
	})
})

