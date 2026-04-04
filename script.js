

window.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.hero__slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    effect: 'fade',
    loop: true,
    navigation: {
      nextEl: '.hero__slider-next',
      prevEl: '.hero__slider-prev',
    },
  });

  const initAboutTabs = () => {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    const tabs = Array.from(aboutSection.querySelectorAll('[data-about-tab]'));
    const panels = Array.from(aboutSection.querySelectorAll('[data-about-panel]'));
    if (!tabs.length || !panels.length) return;

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
  };

  initAboutTabs();
})
