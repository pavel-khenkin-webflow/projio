import { gsap, Observer, ScrollTrigger, SplitText } from 'gsap/all'
import { default as Swiper } from 'swiper'
import { Controller } from 'swiper/modules'

function animateHeading(selector, duration) {
	const headingSplit = new SplitText(selector, {
		type: 'words, chars',
	})
	return gsap.from(headingSplit.chars, {
		alpha: 0,
		y: '50%',
		duration: duration || 0.3,
		stagger: 0.015,
	})
}

function animateText(selector) {
	const elements = gsap.utils.toArray(selector)
	const tl = gsap.timeline()
	elements.forEach(el => {
		const textSplit = new SplitText(el, {
			type: 'words',
		})
		tl.from(
			textSplit.words,
			{
				opacity: 0,
				duration: 0.5,
				stagger: 0.02,
			},
			0
		)
	})

	return tl
}

function animateBg(selector, duration) {
	return gsap.from(selector, {
		alpha: 0,
		duration: duration || 0.8,
		ease: 'power1.inOut',
	})
}

function animateElementTop(selector, duration) {
	return gsap.from(selector, {
		opacity: 0,
		y: '50%',
		duration: duration || 0.4,
		ease: 'power1.inOut',
	})
}

function animateElementsTop(selector, duration, stagger) {
	return gsap.from(selector, {
		opacity: 0,
		y: '50%',
		duration: duration || 0.4,
		ease: 'power1.inOut',
		stagger: stagger || 0.02,
	})
}

function init() {
	Swiper.use([Controller])
	gsap.registerPlugin(SplitText, ScrollTrigger, Observer)
	const breakpoints = gsap.matchMedia()
	// HERO SECTION
	const heroTl = gsap.timeline({ paused: true })
	heroTl.add(animateHeading('[da="hero-title"]'))
	heroTl.add(animateText('[da="hero-text"]'), '<')
	heroTl.add(animateElementTop('[da="hero-accent"]', 0.4), '<')
	heroTl.play()

	// SWIPER
	const swiperGallery = new Swiper('.design_gallery-slider', {
		slidesPerView: 2,
		effect: 'slide',
		speed: 1000,
		on: {
			slideChange: function () {
				const slideActiveIndex = this.activeIndex
				this.slides.forEach((slide, index) => {
					const activeElement = slide.querySelector('.galery-active')
					if (activeElement) {
						if (index === slideActiveIndex) {
							activeElement.style.backgroundColor = 'var(--bg--primary)'
						} else {
							activeElement.style.backgroundColor = ''
						}
					}
				})
			},
		},
	})

	// Слайдер для основного контента
	const swiperBig = new Swiper('.design_slider', {
		slidesPerView: 1,
		effect: 'fade',
		speed: 1000,
		loop: true,
	})

	swiperBig.controller.control = swiperGallery

	// GSAP Observer для прокрутки слайдеров колесом мыши
	gsap.registerPlugin(Observer)

	Observer.create({
		target: document.querySelector('.section-design'),
		type: 'wheel',
		onUp: () => {
			swiperBig.slidePrev()
			swiperGallery.slideTo(swiperBig.activeIndex) // Синхронизация слайдов
		},
		onDown: () => {
			swiperBig.slideNext()
			swiperGallery.slideTo(swiperBig.activeIndex) // Синхронизация слайдов
		},
		preventDefault: true,
	})
	// CTA SECTION
	const ctaTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_cta',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	ctaTl.from('.section_cta', {
		backgroundColor: 'transparent',
		duration: 0.7,
	})
	ctaTl.add(animateHeading('[da="cta-title"]'), '<')
	ctaTl.add(animateText('[da="cta-text"]'), '<')
	ctaTl.add(animateElementsTop('.input_wrapper', 0.6, 0.1), '<')
	ctaTl.add(animateBg('.form_btn-wrapper'))
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init)
} else if (document.readyState === 'complete') {
	init()
}
