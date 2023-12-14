var html = document.querySelector('html'),
	body = document.querySelector('body'),
	wrap = document.querySelector('.wrap');

var header = document.querySelector('.header')
var nav = document.querySelector('.nav')
var ham = document.querySelector('.ham')

document.addEventListener('DOMContentLoaded', () => {

	ham.addEventListener('click', () => {
		toggleNav()
		toggleOverflow()
	})

	let checks = document.querySelectorAll('.check');

	checks?.forEach((check) => {
		new Check(check);
	});

	const sharesSlider = document.querySelector('.shares__slider');
	if (sharesSlider) {
		const sharesControlPrev = document.querySelector('.shares__control.--prev');
		const sharesControlNext = document.querySelector('.shares__control.--next');
		const sharesPagination = document.querySelector('.shares__pagination');

		new Swiper(sharesSlider, {
			navigation: {
				nextEl: sharesControlNext,
				prevEl: sharesControlPrev
			},
			pagination: {
				el: sharesPagination,
				clickable: true,
			}
		})
	}

	const gallerySlider = document.querySelector('.gallery__slider');
	if (gallerySlider) {
		const galleryControlPrev = document.querySelector('.gallery__control.--prev');
		const galleryControlNext = document.querySelector('.gallery__control.--next');
		const galleryPagination = document.querySelector('.gallery__pagination');
		const galleryItems = document.querySelectorAll('.gallery__item');

		new Swiper(gallerySlider, {
			loop: true,
			initialSlide: Math.floor(galleryItems.length / 2),
			slidesPerView: 'auto',
			spaceBetween: 16,
			navigation: {
				nextEl: galleryControlNext,
				prevEl: galleryControlPrev
			},
			pagination: {
				el: galleryPagination,
				clickable: true,
			},
			breakpoints: {
				1025: {
					spaceBetween: 30,
				},
			},
		})
	}

	var faqs = document.querySelectorAll('.faq__item');
	faqs?.forEach(function (faq) {
		faq._toggleButton = faq.querySelector('.faq__toggle');

		faq._toggleButton.addEventListener('click', () => {
			faq.classList.toggle('--open');
		})
	})

	const reviewsSlider = document.querySelector('.reviews__slider');
	if (reviewsSlider) {
		const reviewsControlPrev = document.querySelector('.reviews__control.--prev');
		const reviewsControlNext = document.querySelector('.reviews__control.--next');
		const reviewsPagination = document.querySelector('.reviews__pagination');

		new Swiper(reviewsSlider, {
			slidesPerView: 1,
			spaceBetween: 16,
			navigation: {
				nextEl: reviewsControlNext,
				prevEl: reviewsControlPrev
			},
			pagination: {
				el: reviewsPagination,
				clickable: true,
			},
			breakpoints: {
				1025: {
					slidesPerView: 1.5,
					spaceBetween: 32,
				},
				1281: {
					slidesPerView: 2,
					spaceBetween: 32,
				},
			},
		})
	}

	const map = document.getElementById('map')

	if (map) {
		const position = map.dataset.position.split(', ').map(coord => Number(coord))

		ymaps.ready(function () {
			const ya = new ymaps.Map('map', {
				center: position,
				zoom: 15,
				controls: []
			});

			const placemark = new ymaps.Placemark(
				position,
				{},
				{
					iconLayout: 'default#image',
					iconImageHref: 'uploads/map-placemark.svg',
					iconImageSize: [51, 69],
					iconImageOffset: [-25, -35]
				}
			);

			ya.behaviors.disable('scrollZoom')
			ya.geoObjects.add(placemark)
		})
	}

	const academyInfoslider = document.querySelector('.academy-info__slider');
	if (academyInfoslider) {
		const academyInfoControlPrev = document.querySelector('.academy-info__control.--prev');
		const academyInfoControlNext = document.querySelector('.academy-info__control.--next');
		const academyInfoPagination = document.querySelector('.academy-info__pagination');

		new Swiper(academyInfoslider, {
			loop: true,

			slidesPerView: 'auto',
			spaceBetween: 16,
			navigation: {
				nextEl: academyInfoControlNext,
				prevEl: academyInfoControlPrev
			},
			pagination: {
				el: academyInfoPagination,
				clickable: true,
			},
			breakpoints: {
				1025: {
					spaceBetween: 32,
					slidesOffsetBefore: 220,
					initialSlide: 1,
					centeredSlides: true,
				},
			},
		})
	}

	const whyEduSlider = document.querySelector('.why-edu__slider');
	if (whyEduSlider) {
		const whyEduControlPrev = document.querySelector('.why-edu__control.--prev');
		const whyEduControlNext = document.querySelector('.why-edu__control.--next');
		const whyEduPagination = document.querySelector('.why-edu__pagination');

		new Swiper(whyEduSlider, {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 12,
			grid: {
				rows: 2,
			},
			navigation: {
				nextEl: whyEduControlNext,
				prevEl: whyEduControlPrev
			},
			pagination: {
				el: whyEduPagination,
				clickable: true,
			},
			breakpoints: {
				1281: {
					slidesPerView: 2,
				},
			},
		})
	}

});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Check {
	static addError(element, message) {
		element.classList.add('--error');

		if (message) {
			element.querySelector('.check__message').innerText = message;
		}
	}

	constructor(element) {
		this.element = element;
		this.input = this.element.querySelector('.check__input');
		this.type = this.input.type;
		this.checkChecked();
		this.doToggle();
		this.onClick();
	}

	onClick() {
		this.element.addEventListener('click', () => {
			this.element.classList.remove('--error');

			if (this.type == 'checkbox') {
				this.element.classList.toggle(Check.classChecked);
				this.checked = this.input.getAttribute('checked');

				if (this.checked) {
					this.input.removeAttribute('checked');
				} else {
					this.input.setAttribute('checked', 'checked');
				}

				this.doToggle();
			} else if (this.type == 'radio') {
				if (this.element.closest(Check.classChecked)) {
					return false;
				}

				this.name = this.input.name;
				let parent = this.element.closest('.checks') ? this.element.closest('.checks') : this.element.closest('form') ? this.element.closest('form') : document.body;
				let radios = parent.querySelectorAll('.check input[type="radio"][name="' + this.name + '"]');
				radios.forEach(radio => {
					radio.removeAttribute('checked');
					radio.closest('.check').classList.remove(Check.classChecked);
				});
				this.element.classList.add(Check.classChecked);
				this.input.setAttribute('checked', 'checked');
			}
		});
	}

	doToggle() {
		if (this.element.classList.contains('--toggle')) {
			let dataTextTrue = this.element.getAttribute('data-true'),
				dataTextFalse = this.element.getAttribute('data-false');

			if (dataTextTrue && dataTextFalse) {
				this.checkValue = this.element.querySelector('.check__value');

				if (this.element.classList.contains(Check.classChecked)) {
					this.checkValue.innerText = dataTextTrue;
				} else {
					this.checkValue.innerText = dataTextFalse;
				}
			}
		}
	}

	checkChecked() {
		if (this.input.getAttribute('checked')) {
			this.element.classList.add(Check.classChecked);
		}
	}

}

_defineProperty(Check, "classChecked", '--checked');

_defineProperty(Check, "classError", '--error');


function toggleOverflow() {
	if (document.body.classList.contains('overflow-disable')) {
		html.classList.remove('overflow-disable')
		body.classList.remove('overflow-disable')
		wrap.classList.remove('overflow-disable')
	} else {
		html.classList.add('overflow-disable')
		body.classList.add('overflow-disable')
		wrap.classList.add('overflow-disable')
	}
}

function toggleNav() {
	if (header.classList.contains('--open')) {
		header.classList.remove('--open')
		nav.classList.remove('--show')
		ham.classList.remove('--x')
	} else {
		header.classList.add('--open')
		nav.classList.add('--show')
		ham.classList.add('--x')
	}
}