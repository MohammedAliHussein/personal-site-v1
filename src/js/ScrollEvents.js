import { InitialAnimation } from "./HeaderAnimation";

let first_scroll = false;
let x = false;

export function SetupScrollListener() {
    window.addEventListener('scroll', () => {
        console.log(window.scrollY);
        if (first_scroll === false && window.scrollY > 200) {
            InitialAnimation("._edcation-stagger");
            first_scroll = true;
        }

        if (x === false && window.scrollY > 900) {
            InitialAnimation("._projects-stagger");
            x = true;
        }
    });
}