import { gsap, ScrollTrigger, SplitText } from 'gsap/all'

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
	const elementCircle = element.querySelector('svg')

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

function init() {
	gsap.registerPlugin(SplitText, ScrollTrigger)
	const breakpoints = gsap.matchMedia()
	// HERO SECTION
	const heroTl = gsap.timeline({ paused: true })
	heroTl.add(animateHeading('[da="hero-title"]'))
	heroTl.add(animateElementTop('[da="hero-accent"]', 0.4), '<')
	heroTl.add(animateBorder('.hero_bottom'), '<')
	heroTl.add(animatePreloaderCircles('.hero_preloader'), '<')
	heroTl.play()

	// TEAM SECTION
	const teamTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_team',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	teamTl.add(animateHeading('[da="team-title"]'))
	teamTl.add(animateBorder('.team_top-content'), '<')
	teamTl.add(animateElementTop('.team_circle'), '<')
	teamTl.add(animateText('[da="team-text"]'), '<')

	// TEAM IMAGES SECTION
	const teamImageTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.team_slider',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	teamImageTl.add(animateBg('.team_image'))

	// TEAM SCROLL SECTION
	const teamHTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.team_trigger',
			start: 'top top',
			end: 'bottom bottom',
			scrub: 1,
		},
	})
	teamHTl.to('.team_image-wrapper', {
		x: '-50%',
		duration: 0.2,
	})

	// FOUNDER SECTION
	const founderTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_founder-reverse',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	founderTl.add(animateBg('.founder_image'))
	founderTl.add(animateHeading('[da="founder-title"]'), '<')
	founderTl.add(animateText('[da="founder-text"]'), '<')
	founderTl.add(animateElementTop('[da="founder-accent"]'), '<')
	founderTl.add(animatePreloaderCirclesVertical('.founder_preloader'), '<')

	// SUPPORT DIVIDER SECTION
	const supportDividerTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_support-divider',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	supportDividerTl.add(animateElementTop('[da="support-d-accent"]'))
	supportDividerTl.add(animateText('[da="support-d-text"]'), '<')
	supportDividerTl.add(animateBg('.support-divider_image-wrapper'), '<')

	accentCircleAnimate('[circle-accent="about"]')

	// SUPPORT SECTION
	const supportTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_support',
			start: 'top center',
			end: 'bottom bottom',
		},
	})
	supportTl.add(animateHeading('[da="support-title"]'))
	supportTl.add(animateElementTop('.support_title', 0.5), '<')
	supportTl.add(animateText('[da="support-text"]'), '<')
	supportTl.add(animateElementTop('.support_btn', 0.5), '<')

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
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init)
} else if (document.readyState === 'complete') {
	init()
}
