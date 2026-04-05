

const burger = document.querySelector('.site-header__burger');
const menu = document.querySelector('.site-header');
const links = document.querySelectorAll('.site-header__link');

burger.addEventListener('click', () => {
  if (menu.classList.contains('site-header--active')) {
      menu.classList.remove('site-header--open');
      setTimeout(()=>{
        menu.classList.remove('site-header--active');
      }, 380)
  } else {
    menu.classList.add('site-header--active');
    setTimeout(()=>{
      menu.classList.add('site-header--open');
    }, 0)
  }
})
links.forEach(link => {
  link.addEventListener('click', () => {
    if (menu.classList.contains('site-header--active')) {
      menu.classList.remove('site-header--open');
      setTimeout(()=>{
        menu.classList.remove('site-header--active');
      }, 380)
    }
  })
})

document.addEventListener('click', (e) => {
  if (
      !menu.contains(e.target) &&
      !burger.contains(e.target)
  ) {
    menu.classList.remove('site-header--open');
    setTimeout(()=>{
      menu.classList.remove('site-header--active');
    }, 380)
  }
});

const logoHeader = document.querySelector('.site-header__logo');
const logo = document.querySelector('.hero__glass');
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.scrollY > (hero.scrollHeight-50)) {
    logo.classList.add('hero__glass--active');
    logoHeader.classList.add('site-header__logo--active');
  } else {
    logo.classList.remove('hero__glass--active');
    logoHeader.classList.remove('site-header__logo--active');
  }
});

const initAboutTabs = () => {
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    const tabs = Array.from(aboutSection.querySelectorAll('[data-about-tab]'));
    const panels = Array.from(aboutSection.querySelectorAll('[data-about-panel]'));

    if (tabs.length && panels.length) {
      const panelByKey = new Map(panels.map((panel) => [panel.dataset.aboutPanel, panel]));
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const canAnimate = panels.every((panel) => typeof panel.animate === 'function');
      const fadeDuration = 150;
      let transitionToken = 0;

      let activeKey =
        tabs.find((tab) => tab.classList.contains('about__tab--active'))?.dataset.aboutTab ??
        panels[0].dataset.aboutPanel;

      if (!panelByKey.has(activeKey)) {
        activeKey = panels[0].dataset.aboutPanel;
      }

      const setActiveTabState = (tabKey) => {
        tabs.forEach((tab) => {
          const isActive = tab.dataset.aboutTab === tabKey;
          tab.classList.toggle('about__tab--active', isActive);
          tab.setAttribute('aria-selected', String(isActive));
        });
      };

      const setPanelState = (panel, isActive) => {
        panel.classList.toggle('about__card--hidden', !isActive);
        panel.classList.toggle('about__card--active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
      };

      const showOnlyPanel = (tabKey) => {
        panels.forEach((panel) => {
          setPanelState(panel, panel.dataset.aboutPanel === tabKey);
          panel.style.opacity = '';
        });
      };

      const cancelRunningAnimations = () => {
        panels.forEach((panel) => {
          if (typeof panel.getAnimations === 'function') {
            panel.getAnimations().forEach((animation) => animation.cancel());
          }
          panel.style.opacity = '';
        });
      };

      const switchTab = async (nextKey, useFade = true) => {
        console.log('nextKey', nextKey);
        const arrowAnimate = document.querySelector('.about__mission-quote');
        if (nextKey !== 'mission') {
          arrowAnimate.classList.remove('about__mission-quote--open');
        }
        setTimeout(() => {
          if (nextKey === 'mission') {
            arrowAnimate.classList.add('about__mission-quote--open');
          }
        }, 180)

        if (!panelByKey.has(nextKey) || nextKey === activeKey) return;

        setActiveTabState(nextKey);

        const currentPanel = panelByKey.get(activeKey);
        const nextPanel = panelByKey.get(nextKey);

        if (!useFade || prefersReducedMotion || !canAnimate || !currentPanel || currentPanel === nextPanel) {
          cancelRunningAnimations();
          activeKey = nextKey;
          showOnlyPanel(activeKey);
          return;
        }

        const token = ++transitionToken;
        cancelRunningAnimations();

        setPanelState(currentPanel, true);
        const fadeOut = currentPanel.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: fadeDuration, easing: 'ease', fill: 'forwards' },
        );
        await fadeOut.finished.catch(() => {});
        if (token !== transitionToken) return;

        setPanelState(currentPanel, false);
        panels.forEach((panel) => {
          if (panel !== nextPanel) setPanelState(panel, false);
        });
        setPanelState(nextPanel, true);

        const fadeIn = nextPanel.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: fadeDuration, easing: 'ease', fill: 'forwards' },
        );
        await fadeIn.finished.catch(() => {});
        if (token !== transitionToken) return;

        nextPanel.style.opacity = '';
        activeKey = nextKey;
      };

      setActiveTabState(activeKey);
      showOnlyPanel(activeKey);

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          void switchTab(tab.dataset.aboutTab, true);
        });
      });
    }
  }

  const productsSection = document.querySelector('.products');
  if (!productsSection) return;

  const productTabs = Array.from(productsSection.querySelectorAll('.products__tab'));
  const productPanels = Array.from(productsSection.querySelectorAll('.products__layout'));
  if (!productTabs.length || !productPanels.length) return;

  const tabPanelPairs = productTabs
    .map((tab, index) => ({ tab, panel: productPanels[index], index }))
    .filter((pair) => Boolean(pair.panel));
  if (!tabPanelPairs.length) return;

  tabPanelPairs.forEach(({ tab, panel, index }) => {
    if (!tab.dataset.productsTab) {
      tab.dataset.productsTab = `product-${index}`;
    }
    if (!panel.dataset.productsPanel) {
      panel.dataset.productsPanel = tab.dataset.productsTab;
    }
  });

  const tabs = tabPanelPairs.map((pair) => pair.tab);
  const panels = tabPanelPairs.map((pair) => pair.panel);
  const panelByKey = new Map(panels.map((panel) => [panel.dataset.productsPanel, panel]));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = panels.every((panel) => typeof panel.animate === 'function');
  const fadeDuration = 120;
  let transitionToken = 0;

  let activeKey =
    tabs.find((tab) => tab.classList.contains('products__tab--active'))?.dataset.productsTab ??
    panels[0].dataset.productsPanel;

  if (!panelByKey.has(activeKey)) {
    activeKey = panels[0].dataset.productsPanel;
  }

  const setActiveTabState = (tabKey) => {
    productTabs.forEach((tab) => {
      const isActive = tab.dataset.productsTab === tabKey;
      tab.classList.toggle('products__tab--active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  };

  const setPanelState = (panel, isActive) => {
    panel.classList.toggle('products__layout--active', isActive);
    panel.classList.toggle('products__layout--hidden', !isActive);
    panel.setAttribute('aria-hidden', String(!isActive));
  };

  const showOnlyPanel = (tabKey) => {
    panels.forEach((panel) => {
      setPanelState(panel, panel.dataset.productsPanel === tabKey);
    });
  };

  const cancelRunningAnimations = () => {
    panels.forEach((panel) => {
      if (typeof panel.getAnimations === 'function') {
        panel.getAnimations().forEach((animation) => animation.cancel());
      }
    });
  };

  const switchTab = async (nextKey, useFade = true) => {
    if (!panelByKey.has(nextKey) || nextKey === activeKey) return;

    setActiveTabState(nextKey);

    const currentPanel = panelByKey.get(activeKey);
    const nextPanel = panelByKey.get(nextKey);

    if (!useFade || prefersReducedMotion || !canAnimate || !currentPanel || currentPanel === nextPanel) {
      cancelRunningAnimations();
      activeKey = nextKey;
      showOnlyPanel(activeKey);
      return;
    }

    const token = ++transitionToken;
    cancelRunningAnimations();

    setPanelState(currentPanel, true);
    setPanelState(nextPanel, true);

    const fadeOut = currentPanel.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: fadeDuration, easing: 'ease', fill: 'forwards' },
    );
    await fadeOut.finished.catch(() => {});
    if (token !== transitionToken) return;

    setPanelState(currentPanel, false);

    const fadeIn = nextPanel.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: fadeDuration, easing: 'ease', fill: 'forwards' },
    );
    await fadeIn.finished.catch(() => {});
    if (token !== transitionToken) return;

    activeKey = nextKey;
    showOnlyPanel(activeKey);
  };

  setActiveTabState(activeKey);
  showOnlyPanel(activeKey);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      void switchTab(tab.dataset.productsTab, true);
    });
  });
};


window.addEventListener('DOMContentLoaded', () => {
  new Swiper('.hero__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    effect: 'fade',
    loop: true,
    autoplay: {
      delay: 7000,
    },
    navigation: {
      nextEl: '.hero__slider-next',
      prevEl: '.hero__slider-prev',
    },
  });

  initAboutTabs();
});