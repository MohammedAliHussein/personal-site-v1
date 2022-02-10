import { InitialAnimation } from "./HeaderAnimation";
import { SetupScrollListener } from "./ScrollEvents";

window.onload = function () {
    InitialAnimation("._stagger");
    SetupScrollListener();
}