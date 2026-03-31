export function Accordions() {
  const accordion = document.querySelector('.accordion');
  if (accordion) {
    new Accordion(".accordion");
  }

  const accordionCard = document.querySelectorAll(".cardTable__accordion");
  if (accordionCard) {
    new Accordion(Array.from(accordionCard), {});
  }

  const faqAccordions = document.querySelectorAll('.faq__accordion');
  if (faqAccordions.length) {

    new Accordion(Array.from(faqAccordions), {
      elementClass: 'accordion__item',
      triggerClass: 'accordion__header',
      panelClass: 'accordion__body',
      activeClass: 'is-active',
      duration: 300,
      showMultiple: true,
      collapse: true
    });
  }

  const uniqueAccardions = document.querySelectorAll('.unique__accordion');
  if (uniqueAccardions.length) {

    new Accordion(Array.from(uniqueAccardions), {
      elementClass: 'accordion__item',
      triggerClass: 'accordion__header',
      panelClass: 'accordion__body',
      activeClass: 'is-active',
      duration: 300,
      showMultiple: true,
      collapse: true
    });
  }

  const bookAccordions = document.querySelectorAll('.virtual-exhibitions__accordion');
  if (bookAccordions.length) {
    new Accordion(Array.from(bookAccordions), {
      elementClass: 'accordion__item',
      triggerClass: 'accordion__header',
      panelClass: 'accordion__body',
      activeClass: 'is-active',
      duration: 300,
      showMultiple: true,
      collapse: true,
    });
  }

  const bookshelfAccordions = document.querySelectorAll('.bookshelf__accordion');
  if (bookshelfAccordions.length) {
    const bookshelfInstances = new Accordion(Array.from(bookshelfAccordions), {
      elementClass: 'accordion__item',
      triggerClass: 'accordion__header',
      panelClass: 'accordion__body',
      activeClass: 'is-active',
      duration: 300,
      showMultiple: true,
      collapse: true,
    });

    [].concat(bookshelfInstances).forEach(instance => instance.openAll());
  }

  const archiveAccordions = document.querySelectorAll('.archive__accordion');
  if (archiveAccordions.length) {
    new Accordion(Array.from(archiveAccordions), {
      elementClass: 'accordion__item',
      triggerClass: 'accordion__header',
      panelClass: 'accordion__body',
      activeClass: 'is-active',
      duration: 300,
      showMultiple: true,
      collapse: true,
    });
  }

  const opisiAccordions = document.querySelectorAll('[data-fund-accordion]');

  if (opisiAccordions.length) {
    opisiAccordions.forEach((opisi) => {
      const btn = opisi.querySelector('.accordion-toggle');

      if (!btn) return;

      btn.addEventListener('click', () => {
        opisi.classList.toggle('open');

        btn.setAttribute('aria-expanded', String(opisi.classList.contains('open')));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded — init accordion now');
    const asideAccordions = document.querySelectorAll('.aside-menu__nav');
    console.log('found containers:', asideAccordions.length);

    if (asideAccordions.length) {
      new Accordion(Array.from(asideAccordions), {
        elementClass: 'accordion__item',
        triggerClass: 'accordion__header',
        panelClass: 'accordion__body',
        activeClass: 'is-active',
        duration: 300,
        showMultiple: true,
        collapse: true
      });
    }
  });

  const questionAccordions = document.querySelectorAll('.archive-faq-accordion');
  if (questionAccordions.length) {

    new Accordion(Array.from(questionAccordions), {
      elementClass: 'accordion__item',
      triggerClass: 'accordion__header',
      panelClass: 'accordion__body',
      activeClass: 'is-active',
      duration: 300,
      showMultiple: true,
      collapse: true
    });
  }
}
