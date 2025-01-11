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
	gsap.registerPlugin(SplitText, ScrollTrigger)
	const breakpoints = gsap.matchMedia()
	// HERO SECTION
	const heroTl = gsap.timeline({ paused: true })
	heroTl.add(animateHeading('[da="hero-title"]'))
	heroTl.add(animateText('[da="hero-text"]'), '<')
	heroTl.add(animateElementTop('[da="hero-accent"]', 0.4), '<')
	heroTl.play()

	// DESIGNS SECTION
	document.querySelectorAll('.works_card').forEach(trigger => {
		// Для каждой секции `.works_card` находим карточки внутри неё
		trigger.querySelectorAll('[w-card]').forEach(card => {
			// Устанавливаем параметры на основе атрибута `w-card`
			const cardScale = card.getAttribute('w-card') === '01' ? '0.8' : '0.9'
			const startOffset =
				card.getAttribute('w-card') === '01' ? 'top top' : '15% top'
			const endOffset =
				card.getAttribute('w-card') === '01'
					? 'top+=50% bottom'
					: 'top+=70% bottom'

			gsap.to(card, {
				scale: cardScale,
				scrollTrigger: {
					trigger: trigger,
					start: startOffset,
					end: endOffset,
					scrub: 1,
				},
			})
		})
	})
	// WORKS CARD CONTENT
	const worksCardsContent = document.querySelectorAll('[works-card="content"]')
	worksCardsContent.forEach(card => {
		const cardTitle = card.querySelector('[content-card="title"]')
		const cardText = card.querySelector('[content-card="text"]')
		const cardLink = card.querySelector('[content-card="link"]')
		const cardNum = card.querySelector('[content-card="num"]')
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: card,
				start: 'top top',
				end: 'bottom bottom',
			},
		})
		tl.add(animateElementTop(cardNum))
		tl.add(animateHeading(cardTitle), '<')
		tl.add(animateText(cardText), '<')
		tl.add(animateBg(cardLink), '<')
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
