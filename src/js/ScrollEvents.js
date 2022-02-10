import { InitialAnimation } from "./HeaderAnimation";

let first_scroll = false;

export function SetupScrollListener() {
    window.addEventListener('scroll', () => {
        if (first_scroll === false && window.scrollY > 200) {
            InitialAnimation("._edcation-stagger");
            first_scroll = true;
        }
    });
}