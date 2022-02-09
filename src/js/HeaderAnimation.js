import anime from "../../node_modules/animejs/lib/anime.es";

export function InitialAnimation() {
    let animation = anime({
        targets: "._stagger",
        translateY: [-25, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        delay: anime.stagger(300)
    });

    animation.play();
}