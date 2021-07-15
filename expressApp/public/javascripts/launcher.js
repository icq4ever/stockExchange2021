// Optimization: Turn off animated spinner after its hiding animation is done.
window.onload = function(){
	const spinner = document.querySelector('.mdl-js-spinner');
	document.body.classList.add('loaded');
	spinner.classList.remove('is-active');
	document.querySelector('.loading .message').style.display = 'none';
}