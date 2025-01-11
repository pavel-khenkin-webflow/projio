import { gsap, ScrollTrigger, SplitText } from 'gsap/all'

// function animateHeading(selector, duration) {
// 	const headingSplit = new SplitText(selector, {
// 		type: 'words, chars',
// 	})
// 	return gsap.from(headingSplit.chars, {
// 		alpha: 0,
// 		y: '50%',
// 		duration: duration || 0.3,
// 		stagger: 0.015,
// 	})
// }
function animateHeading(selectorOrElement, duration) {
	const element =
		typeof selectorOrElement === 'string'
			? document.querySelector(selectorOrElement)
			: selectorOrElement

	if (!element) {
		console.error(`Элемент с селектором "${selectorOrElement}" не найден.`)
		return
	}
	element.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'

	return gsap.to(element, {
		clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
		duration: duration || 1.5,
		ease: 'power2.out',
	})
}

function animateHeadingWords(selector, duration) {
	const headingSplit = new SplitText(selector, {
		type: 'words',
	})
	return gsap.from(headingSplit.words, {
		alpha: 0,
		duration: duration || 2,
		stagger: 0.1,
		ease: 'power2.out',
	})
}

export function animateText(selector) {
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

function animateImage(selector) {
	const element = document.querySelector(selector)
	const mask = element.querySelector('.image-mask')
	return gsap.from(mask, {
		y: 0,
		duration: 1,
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

function animateBorder(selector) {
	return gsap.from(selector, {
		borderColor: 'rgba(255, 255, 255, 0',
		duration: 1,
	})
}

function animatePreloaderCircles(selector) {
	const element = document.querySelector(selector)
	const elementFirst = element.firstChild
	const elementLast = element.lastChild

	const tl = gsap.timeline({})
	gsap.set(elementLast, {
		opacity: 0,
		x: '-100%',
	})
	tl.to(elementLast, {
		opacity: 1,
		x: '-20%',
		duration: 0.4,
	})
	tl.from(
		elementFirst,
		{
			opacity: 0,
			x: '-100%',
			duration: 0.4,
		},
		'<'
	)
	tl.to(elementFirst, {
		x: '-50%',
		duration: 0.4,
	})
	tl.to(elementFirst, {
		x: '0%',
		duration: 0.2,
		ease: 'circ.in',
	})
	tl.to(
		elementLast,
		{
			x: '0%',
			duration: 0.4,
			ease: 'circ.in',
		},
		'<'
	)

	return tl
}

function animatePreloaderCirclesVertical(selector) {
	const element = document.querySelector(selector)
	const elementFirst = element.firstChild
	const elementLast = element.lastChild

	const tl = gsap.timeline({})
	gsap.set(elementLast, {
		opacity: 0,
		y: '-100%',
	})
	tl.to(elementLast, {
		opacity: 1,
		y: '-20%',
		duration: 0.4,
	})
	tl.from(
		elementFirst,
		{
			opacity: 0,
			y: '-100%',
			duration: 0.4,
		},
		'<'
	)
	tl.to(elementFirst, {
		y: '-50%',
		duration: 0.4,
	})
	tl.to(elementFirst, {
		y: '0%',
		duration: 0.2,
		ease: 'circ.in',
	})
	tl.to(
		elementLast,
		{
			y: '0%',
			duration: 0.4,
			ease: 'circ.in',
		},
		'<'
	)

	return tl
}

function accentCircleAnimate(selector) {
	const element = document.querySelector(selector)
	const elementCircle = element.querySelector('img')

	const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 })
	tl.to(elementCircle, {
		rotation: 360,
		duration: 20,
		ease: 'none',
	})
	tl.to(elementCircle, {
		rotation: 0,
		duration: 0,
		ease: 'none',
	})
}

function animateCircle(selector) {
	const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 })
	tl.to(selector, {
		rotation: 360,
		duration: 20,
		ease: 'none',
	})
	tl.to(selector, {
		rotation: 0,
		duration: 0,
		ease: 'none',
	})

	return tl
}

function init() {
	gsap.registerPlugin(SplitText, ScrollTrigger)
	const breakpoints = gsap.matchMedia()
	// HERO SECTION
	const heroTl = gsap.timeline({ paused: true })
	heroTl.add(animateHeading('[da="hero-title"]'))
	heroTl.add(animateText('[da="hero-text"]'), '<')
	heroTl.add(animateElementTop('[da="hero-accent"]', 0.4), '<')
	heroTl.add(animateBorder('.hero_bottom'), '<')
	heroTl.add(animatePreloaderCircles('.hero_preloader'), '<')
	heroTl.play()

	// ABOUT SECTION
	const aboutTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_about',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	aboutTl.add(animateHeadingWords('[da="about-title"]'))
	aboutTl.add(animateText('[da="about-text"]'), '<')
	aboutTl.add(animateElementTop('[da="about-accent"]'), '<')

	// SERVICES SECTION
	const servicesTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_services',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	servicesTl.from('.services_card', {
		opacity: 0,
		duration: 0.8,
		stagger: 0.03,
	})
	servicesTl.add(animateHeading('[da="services-title"]'), '<')
	servicesTl.add(animateText('[da="services-text"]'), '<')
	servicesTl.add(animateElementTop('.services_btn'), '<')
	servicesTl.add(animateBg('.services_bg'), '<')
	servicesTl.from('[da="services-line"]', {
		opacity: 0,
		height: '0%',
		duration: 0.7,
	})
	breakpoints.add('(min-width: 768px', () => {
		// SERVICES HOVER EFFECT
		const servicesCards = document.querySelectorAll('.services_card')
		servicesCards.forEach(card => {
			card.addEventListener('mouseenter', () => {
				const indexBg = card.getAttribute('scard')
				const cardBg = document.querySelectorAll(`[sbg="${indexBg}"]`)
				const cardOtherBg = document.querySelectorAll(
					`[sbg]:not([sbg="${indexBg}"])`
				)
				gsap.to(cardBg, {
					opacity: 1,
				})
				gsap.to(cardOtherBg, {
					opacity: 0,
				})
				gsap.to(card.querySelector('.services_card-title'), {
					opacity: 1,
				})
				servicesCards.forEach(otherCard => {
					if (otherCard !== card) {
						gsap.to(otherCard.querySelector('.services_card-title'), {
							opacity: 0.5,
						})
					}
				})
			})

			card.addEventListener('mouseleave', () => {
				const allCardBgs = document.querySelectorAll('[sbg]')
				gsap.to(allCardBgs, {
					opacity: 1,
				})
				servicesCards.forEach(otherCard => {
					gsap.to(otherCard.querySelector('.services_card-title'), {
						opacity: 1,
					})
				})
			})
		})
	})
	// PRODUCT SECTION
	const productTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_product',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	const productWidth = document.querySelector(
		'.product_top-content'
	).offsetWidth
	const productCircleWidth =
		document.querySelector('.product_circle').offsetWidth

	const productX = productWidth - productCircleWidth

	productTl.add(animateHeadingWords('[da="product-title"]'))
	productTl.from(
		'.product_circle',
		{
			x: productX,
			duration: 1.5,
			ease: 'linear',
		},
		'<'
	)
	productTl.add(animateBorder('.product_top-content'), '<')
	productTl.add(animateElementTop('.product_circle'), '<')
	productTl.add(animateText('[da="product-text"]'), '<')
	productTl.add(animateElementTop('.product_btn'))

	// PRODUCT IMAGE SECTION
	const productImageTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.product_image-wrapper',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	productImageTl.add(animateBg('.product_image'))
	productImageTl.add(animateElementTop('[da="product-accent"]'), '<')
	productImageTl.add(animateElementTop('[circle-accent="home"]'))

	accentCircleAnimate('[circle-accent="home"]')

	// PROCESS SECTION
	const processCard = document.querySelectorAll('.process_card')
	const processCardTl = gsap.timeline()
	processCard.forEach((card, index) => {
		const cardTl = gsap.timeline()
		cardTl.from(card, {
			alpha: 0,
			y: '100%',
			duration: 0.6,
		})
		cardTl.add(animateHeading(card.querySelector('[da="process-card-title"]')))
		cardTl.add(animateText(card.querySelector('[da="process-card-text"]')))
		processCardTl.add(cardTl, index * 0.2)
	})
	const processTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_process',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	processTl.add(animateBg('.process_bg'))
	processTl.add(animateElementTop('[da="process-accent"]'), '<')
	processTl.add(animateHeading('[da="process-title"]'), '<')
	processTl.add(processCardTl, '<')

	// MISSION SECTION
	const missionTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_mission',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	missionTl.add(animateHeadingWords('[da="mission-title"]'))
	missionTl.add(animatePreloaderCircles('.mission_preloader'), '<')
	missionTl.add(animateElementTop('.mission_accent', 1), '<')

	// GALLERY SECTION
	const galleryTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_gallery',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	galleryTl.from('.gallery_card', {
		alpha: 0,
		duration: 1,
		stagger: 0.2,
		ease: 'power1.inOut',
	})
	galleryTl.add(animateHeading('[da="gallery-title"]'), '<')
	galleryTl.add(animateElementTop('[da="gallery-accent"]'), '<')
	animateCircle('[da="gallery-accent"]')

	// GALLERY SCROLL SECTION
	const galleryHTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.gallery_trigger',
			start: 'top top',
			end: 'bottom bottom',
			scrub: 1,
		},
	})
	breakpoints.add('(min-width: 480px', () => {
		galleryHTl.to('.gallery_wrapper', {
			x: '-10%',
			duration: 0.2,
		})
	})
	breakpoints.add('(max-width: 479px', () => {
		galleryHTl.to('.gallery_wrapper', {
			x: '-50%',
			duration: 0.2,
		})
	})

	// FOUNDER SECTION
	const founderTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_founder',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	founderTl.add(animateImage('.founder_image'))
	founderTl.add(animateHeadingWords('[da="founder-title"]'), '<')
	founderTl.add(animateText('[da="founder-text"]'), '<')
	founderTl.add(animateElementTop('[da="founder-accent"]'), '<')
	founderTl.add(animatePreloaderCirclesVertical('.founder_preloader'), '<')

	// ARTICLES SECTION
	const articlesTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.articles_wrapper',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	articlesTl.from('.articles_card', {
		alpha: 0,
		y: '100%',
		duration: 0.6,
		stagger: 0.05,
	})

	// ARTICLES H SCROLL
	const articlesWrapper = document.querySelector('.articles_wrapper')
	const articleWidth = articlesWrapper.offsetWidth
	const windowWidth = window.innerWidth // Получаем ширину окна
	const scrollDistance = articleWidth - windowWidth
	const articlesHTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_articles', // Устанавливаем триггер
			start: 'top top', // Начало анимации
			end: 'bottom bottom', // Длина прокрутки
			scrub: 1,
		},
	})
	articlesHTl.to(articlesWrapper, {
		x: -scrollDistance, // Перемещаем влево на рассчитанное значение
		ease: 'none', // Линейное движение
	})

	// REVIEWS SECTION
	const reviewsCard = document.querySelectorAll('.reviews_card')
	const reviewsCardTl = gsap.timeline()
	reviewsCard.forEach((card, index) => {
		const cardTl = gsap.timeline()
		cardTl.from(card, {
			alpha: 0,
			y: '100%',
			duration: 0.6,
		})
		cardTl.add(animateHeading(card.querySelector('[da="reviews-card-title"]')))
		cardTl.add(animateElementTop(card.querySelector('[da="reviews-card-top"]')))
		cardTl.add(animateText(card.querySelector('[da="reviews-card-text"]')), '<')
		reviewsCardTl.add(cardTl, index * 0.2)
	})
	const reviewsTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_reviews',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	reviewsTl.add(animateBg('[da="reviews-bg"]'))
	reviewsTl.add(animateElementTop('[da="reviews-accent"]'), '<')
	reviewsTl.add(animateHeading('[da="reviews-title"]'), '<')
	reviewsTl.add(reviewsCardTl, '<')

	// REVIEWS SECTION
	const reviewsHTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.reviews_trigger',
			start: 'top top',
			end: 'bottom bottom',
			scrub: 2,
		},
	})
	breakpoints.add('(min-width: 480px', () => {
		reviewsHTl.to('.reviews_list', {
			x: '-10%',
			duration: 0.2,
		})
	})
	breakpoints.add('(max-width: 479px', () => {})

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
