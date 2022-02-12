import { InitialAnimation } from "./HeaderAnimation";

let education_scroll = false;
let projects_scroll = false;

export function SetupScrollListener() {
    window.addEventListener('scroll', () => {
        if (education_scroll === false && window.scrollY > 200) {
            InitialAnimation("._edcation-stagger");
            education_scroll = true;
        }

        if (projects_scroll === false && window.scrollY > 880) {
            InitialAnimation("._projects-stagger");
            projects_scroll = true;
        }
    });
}

export function SetupClickListener() {
    document.querySelector('.education-link').addEventListener("click", () => {
        window.scroll(0, 581);
    });

    document.querySelector('.projects-link').addEventListener("click", () => {
        window.scrollTo(0, 1263);
    });

    document.querySelector('.contact-link').addEventListener("click", () => {

    });
}
