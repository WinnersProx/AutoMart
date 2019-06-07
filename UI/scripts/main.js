"use strict";

const togglerButton  = document.querySelector('div.toggler');
const toggleDropdown = document.querySelectorAll('.dropdown-toggle');
const dropdownBody   = document.querySelector('.dropdown-menu');
const fliterControl  = document.querySelector('select#filter')
const searchBarInputs = document.querySelectorAll('div.search-bar input[type="text"]')
const filterBtn = document.querySelector('button.filterBtn')
// control window scrolls

window.addEventListener('scroll', () => {
	(window.pageYOffset * 2 > window.innerHeight)  ? togglerButton.classList.add('show') : togglerButton.classList.remove('show');
});

togglerButton.addEventListener('click', () => {
	// Smooth scroll to the top
	window.scroll({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
});
// Dropdowns implementation
toggleDropdown.forEach((current, index) => {
	current.addEventListener('click', e => {
		let target = e.target.parentNode.children[1];
		if (!target.classList.contains('show')) 
			target.classList.add('show');
		else 
			target.classList.remove('show');
	});
	
});
window.addEventListener('click', e => {
	// ensures that whenever the user clicks outside the dropdown menu => this one get closed
	if(!e.target.matches('.dropdown-toggle')){
		document.querySelectorAll('.dropdown-menu').forEach((current, index) => {
			if (current.classList.contains('show'))
				current.classList.remove('show')	
		})
	}
})

// filter controls
let inputsLength = searchBarInputs.length;
fliterControl.addEventListener('change', e => {
	// for getting the current filter option
	let target = e.target.selectedIndex
	if(target){
		// we should have two input filters as we are dealing with price range (min and max)
		if(target === 1 && inputsLength === 1){
			searchBarInputs[0].classList.remove('no-split')
			searchBarInputs[0].placeholder = 'Min price'
			let newInput = searchBarInputs[0].cloneNode(true)
			searchBarInputs[0].style.marginRight = '2px'
			newInput.placeholder = 'Max price'
			document.querySelector('.search-bar').insertBefore(newInput,searchBarInputs[0].nextSibling)
			inputsLength += 1
		}
		else{
			if(inputsLength > 1) {
				console.log(searchBarInputs)
				searchBarInputs[0].classList.add('no-split')
				// searchBarInputs[0].parentNode.removeChild(searchBarInputs[1])
				// inputsLength -= 1
			}
		}
	}
	
})
