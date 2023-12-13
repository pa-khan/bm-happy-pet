var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', ()=>{
	let checks = document.querySelectorAll('.check');
	 
	checks?.forEach((check)=>{
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
			spaceBetween: 30,
			navigation: {
				nextEl: galleryControlNext,
                prevEl: galleryControlPrev
			},
			pagination: {
			    el: galleryPagination,
				clickable: true,
			}
		})
	}

	var faqs = document.querySelectorAll('.faq__item');
	faqs?.forEach(function(faq){
		console.log(1);
		faq._toggleButton = faq.querySelector('.faq__toggle');

		faq._toggleButton.addEventListener('click', ()=>{
			faq.classList.toggle('--open');
		})
	} )

	const reviewsSlider = document.querySelector('.reviews__slider');
	if (reviewsSlider) {
		const reviewsControlPrev = document.querySelector('.reviews__control.--prev');
		const reviewsControlNext = document.querySelector('.reviews__control.--next');
		const reviewsPagination = document.querySelector('.reviews__pagination');
		const reviewsItems = document.querySelectorAll('.reviews__item');

		new Swiper(reviewsSlider, {
			slidesPerView: 2,
			spaceBetween: 32,
			navigation: {
				nextEl: reviewsControlNext,
                prevEl: reviewsControlPrev
			},
			pagination: {
			    el: reviewsPagination,
				clickable: true,
			}
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