import {Accordions} from './accordion.js';
import {Tabs} from './tabs.js';
import {ArchiveTabs} from './archive-tabs.js';
import {UniversalTabs} from './universal-tabs.js';
import {Select} from './select.js';
import {initSearch} from './search/index.js';
import {initArchiveNumbersSwiper, initCaseDetailSwiper, initDetailSwiper, initOpisiDetailSwiper, initStandaloneImageGalleries, Sliders} from './sliders.js';
import {ServicesFilter} from './services-filter.js';
import initServicesAccordion from './services-accordion.js';

import orderAccordion from './order-accordion.js';
import {initHeaderScroll} from './header-scroll.js';
import {MenuDropdowns} from './menu-dropdowns.js';
import {PersonalTabs} from './personal-tabs.js';

import {initModals} from './modals/init-modals.js';

import {initBvi} from './bvi-init.js';
import {Histogram} from './histogram.js';
import {Filter} from './filter.js';
import {CommentsForms} from './form.js';
import {ReplaceIconRight} from './replace.js';
import {initFileInputs} from './file-input.js';

import {initConditionalFields} from './conditional-fields.js';
import {initGroupCopy} from './group-copy.js';
import {initForms} from './form-validate/index.js';
import {initAsideMenu} from './aside-menu.js';
import {initExhibitionsTabs} from './exhibitions-tabs.js';
import {Map} from './map.js';
import {Comparison} from './comparison.js';
import {MapBig} from './mapBig.js';
import {initDatepickers} from './datepicker-init.js';
import {initPhoneMasks} from './phone-mask.js';
import {MasonryJs} from './masonryJs.js';
import {InitFancybox} from './fancybox.js';
import {initViewer} from './viewer.js';
import {initGallerySwitcher, initToggleGallery} from './gallery-switch.js';
import {initCounters} from './counter.js';
import {formatAllNumberAttributes} from './number-format.js';
import {YandexMap} from './yandexMap.js';
import {projectsGalleryAnimation} from './projects-gallery.js';
import {AverageColor} from './average-color.js';
import {initGalleryVideoHover} from './project-gallery-video.js';
import {initPersonalDropdown} from './personal-dropdown.js';
import {requestsMap} from './requestsMap.js';
import {SearchWords} from './search-words.js';

window.addEventListener('DOMContentLoaded', () => {
  initBvi();
  initDatepickers();
  initGalleryVideoHover();

  window.addEventListener('load', () => {
    Accordions();
    Tabs();
    ArchiveTabs();
    UniversalTabs();
    Select();
    initSearch();
    Sliders();
    ServicesFilter();
    initServicesAccordion();
    // Pagination(); // пагинация инициализируется на бекенде в компонентах и на страницах
    // initPersonalInfoEdit(); // редактирование личных данных запрещено. Редактирование иных данных в ЛК планируется, но не реализовано
    initModals();
    orderAccordion();

    initHeaderScroll();
    initDetailSwiper();
    Histogram();
    initArchiveNumbersSwiper();
    Filter();
    Map();
    MapBig()
    Comparison();
    initOpisiDetailSwiper();
    CommentsForms();
    new MenuDropdowns();
    ReplaceIconRight();
    initFileInputs();
    initCaseDetailSwiper();
    initStandaloneImageGalleries();
    new PersonalTabs();
    initConditionalFields();
    initGroupCopy();
    initAsideMenu();
    initDatepickers();
    initPhoneMasks();
    MasonryJs();
    InitFancybox();
    initViewer();
    initGallerySwitcher();
    initToggleGallery();
    initCounters();
    // initConditionalGroupFieldsAsync();
    YandexMap();
    AverageColor();
    // Инициализация валидации с задержкой для полной загрузки DOM
    setTimeout(() => {
      initForms();
    }, 200);
    formatAllNumberAttributes();
    projectsGalleryAnimation();
    initExhibitionsTabs();
    initPersonalDropdown();
    requestsMap();
    SearchWords();
  });
});
