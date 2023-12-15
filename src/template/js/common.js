var html = document.querySelector('html'),
	body = document.querySelector('body'),
	wrap = document.querySelector('.wrap');

var header = document.querySelector('.header')
var nav = document.querySelector('.nav')
var ham = document.querySelector('.ham')

document.addEventListener('DOMContentLoaded', () => {
	const modal = new Modal()

	ham.addEventListener('click', () => {
		if (modal.current) {
			modal.closeModal()
			return false
		}

		toggleNav()
	})

	let checks = document.querySelectorAll('.check');

	checks?.forEach((check) => {
		new Check(check);
	});

	let selects = document.querySelectorAll('.select')
	selects?.forEach(select => {
		new Select(select)
	})

	let fields = document.querySelectorAll('.field')
	fields?.forEach(field => {
		field._input = field.querySelector('input')
		if (field.classList.contains('--phone')) {
			IMask(field._input, {
				mask: '+{7} (900) 00-00'
			})
		}
	})

	const weMore = document.querySelector('.we-more')
	if (weMore) {
		const weMoreCountCurrent = document.querySelector('.we-more__count-current')
		const weMoreCountTotal = document.querySelector('.we-more__count-total')
		const weMoreControlPrev = document.querySelector('.we-more__control.--prev');
		const weMoreControlNext = document.querySelector('.we-more__control.--next');
		const weMoreSlider = document.querySelector('.we-more__slider');
		const weMoreItems = document.querySelectorAll('.we-more__item')

		weMoreCountTotal.innerText = weMoreItems.length < 10 ? "0" + weMoreItems.length : weMoreItems.length

		const weMoreSwiper = new Swiper(weMoreSlider, {
			loop: true,
			slidesPerView: 'auto',
			spaceBetween: 30,
			slidesOffsetBefore: -100,
			navigation: {
				nextEl: weMoreControlNext,
				prevEl: weMoreControlPrev
			},
		})

		weMoreSwiper.on('slideChange', () => {
			setCountCurrent()
		})

		function setCountCurrent() {
			weMoreCountCurrent.innerText = weMoreSwiper.activeIndex < 10 ? '0' + (weMoreSwiper.activeIndex + 1) : (weMoreSwiper.activeIndex + 1)
		}
	}

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
					centeredSlides: true,
					slidesOffsetBefore: 220,
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

	const actions = document.querySelectorAll('[data-action]')
	actions?.forEach(action => {
		action.addEventListener('click', () => {
			switch (action.dataset.action) {
				case "modalOrder":
					const modalOrder = document.getElementById('modal-order')
					modal.setCurrentModal(modalOrder)
					break;
				case "modalAcademy":
					const modalAcademy = document.getElementById('modal-academy')
					modal.setCurrentModal(modalAcademy)
					break;
				case "modalBiz":
					const modalBiz = document.getElementById('modal-biz')
					modal.setCurrentModal(modalBiz)
					break;
				case "modalServiceSpa":
					const modalServiceSpa = document.getElementById('modal-service-spa')
					modal.setCurrentModal(modalServiceSpa)
					break;
				case "modalServiceHotel":
					const modalServiceHotel = document.getElementById('modal-hotel')
					modal.setCurrentModal(modalServiceHotel)
					break;
				case "scrollInstallment":
					document.location.href = '/#installment'; break;
				case "scrollShop":
					document.location.href = '/#shop'; break;
					break;
				case "scrollPrograms":
					document.location.href = '/#programs'; break;
					break;
				case "scrollAmbassador":
					document.location.href = '/#ambassador'; break;
					break;
				case "scrollOffers":
					document.location.href = '/#offers'; break;
					break;
				case "scrollService":
					document.location.href = '/#service'; break;
			}
		})
	})

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


function disableOverflow() {
	html.classList.remove('overflow-disable')
	body.classList.remove('overflow-disable')
	wrap.classList.remove('overflow-disable')
}

function enableOverflow() {
	html.classList.add('overflow-disable')
	body.classList.add('overflow-disable')
	wrap.classList.add('overflow-disable')
}

function toggleOverflow() {
	if (document.body.classList.contains('overflow-disable')) {
		disableOverflow()
	} else {
		enableOverflow()
	}
}

function toggleNav() {
	if (header.classList.contains('--open')) {
		header.classList.remove('--open')
		nav.classList.remove('--show')
		ham.classList.remove('--x')
		disableOverflow()
	} else {
		header.classList.add('--open')
		nav.classList.add('--show')
		ham.classList.add('--x')
		enableOverflow()
	}
}

class Select {
	element = null
	parse = null
	list = null
	options = null
	value = null
	placeholder = null
	constructor(element) {
		this.element = element
		this.parse = this.element.querySelector('.select__parse')
		this.value = this.element.querySelector('.select__value')
		this.placeholder = this.element.querySelector('.select__placeholder')
		this.list = this.element.querySelector('.select__list')
		this.options = this.element.querySelectorAll('option')

		this.options.forEach((option) => {
			this.createItem(option.innerText, option.value)
		})

		this.element.addEventListener('click', () => {
			this.element.classList.toggle('--open')
		})
	}

	createItem(title, value) {
		if (!title || !value) return false
		var div = document.createElement('div')
		div.className = 'select__item'
		div.innerText = title
		this.list.append(div)
		div.addEventListener('click', () => {
			this.parse.value = value
			this.value.innerText = title
			this.element.classList.add('--filled')
		})
	}
}


class Modal {
	current = null
	openBtns = null
	closeBtns = null
	constructor() {
		this.openBtns = document.querySelectorAll('[data-modal]')
		this.closeBtns = document.querySelectorAll('[data-modal-close]')

		this.openBtns?.forEach(btn => {
			btn.addEventListener('click', () => {
				if (header.classList.contains('--open')) {
					toggleNav()
				}
				const modalName = btn.dataset.modal
				const modal = document.getElementById(modalName)

				this.setCurrentModal(modal)
			})
		})

		this.closeBtns?.forEach(btn => {
			btn.addEventListener('click', () => {
				this.closeModal()
			})
		})
	}

	closeModal() {
		if (this.current) {
			if (this.current.classList.contains('--with-header')) {
				ham.classList.remove('--x')
			}
			this.current.classList.remove('--show')
			this.current = null
			disableOverflow()
		}
	}

	openModal(modal) {
		this.current = modal
		this.current.classList.add('--show')
		if (this.current.classList.contains('--with-header')) {
			ham.classList.add('--x')
		}
	}

	setCurrentModal(modal) {
		this.closeModal()
		this.openModal(modal)
		enableOverflow()
	}
}