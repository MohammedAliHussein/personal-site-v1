import anime from "../../node_modules/animejs/lib/anime.es";

export function InitialAnimation(element_name) {
    let animation = anime({
        targets: element_name,
        translateY: [-25, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        delay: anime.stagger(300)
    });

    animation.play();
}

export function InitialAnimationTwo(element_name) {
    let animation = anime({
        targets: element_name,
        translateY: [-15, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 500,
        delay: anime.stagger(300)
    });

    animation.play();
}