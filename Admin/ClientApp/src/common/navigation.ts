import { History } from "history";
import { animateScroll as scroll } from "react-scroll";

export const previous = (history: History): void => {
  history.goBack();
};

export const navigate = (history: History, route: string): void => {
  history.push(route);
  scroll.scrollToTop();
};
