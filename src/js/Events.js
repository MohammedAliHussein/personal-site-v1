import { InitialAnimation, InitialAnimationTwo } from "./HeaderAnimation";

let education_scroll = false;
let projects_scroll = false;
let technology_scroll = false;

export function SetupScrollListener() {
    window.addEventListener('scroll', () => {
        console.log(window.scrollY);

        if (education_scroll === false && window.scrollY > 200) {
            InitialAnimation("._edcation-stagger");
            education_scroll = true;
        }

        if (projects_scroll === false && window.scrollY > 880) {
            InitialAnimation("._projects-stagger");
            projects_scroll = true;
        }

        if(technology_scroll === false && window.scrollY > 1675) {
            InitialAnimationTwo("._technology-stagger");
            technology_scroll = true;
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

export function hoverListener() {
    document.querySelector("#personal-site-project-list-item").addEventListener("hover", () => {
        document.querySelector("#personal-site-going-to-github").style.opacity = 1;
    });
    document.querySelector("#maze-game-project-list-item").addEventListener("hover", () => {
        document.querySelector("#maze-game-going-to-github").style.opacity = 1;
    });
}
