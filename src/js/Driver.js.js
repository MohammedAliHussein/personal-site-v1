import { InitialAnimation } from "./HeaderAnimation";
import { SetupScrollListener, SetupClickListener, hoverListener } from "./Events";

window.onload = function () {
    window.scroll(0, 0);
    InitialAnimation("._stagger");
    SetupScrollListener();
    SetupClickListener();
    hoverListener();    
}