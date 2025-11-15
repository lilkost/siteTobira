import { useDynamicAdapt } from './components/dynamicDa.js'
import { createSlider } from "./components/slider.js";
import { scrollingPage } from "./components/scrollingPage.js";
import { mainSlider } from "./components/slider.js";
import { filterCatalog } from "./components/filterCatalog.js";
import {detailFilter} from './components/detailFilter.js';
import { createModal } from "./components/modal.js";
import { phoneMask } from "./components/phoneMask.js";
import { validateForm } from "./components/modal.js";
import { mobileMenu } from './components/menuMobile.js';
import { filterDetail } from './components/filterDetail.js';

useDynamicAdapt();
scrollingPage();
createSlider();
mainSlider();
filterCatalog();
detailFilter();
createModal();
phoneMask();
validateForm();
mobileMenu();
filterDetail();