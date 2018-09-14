export const initialiseRocket = function (rocketSvg) {

    const States = [{
        angle: -5,
        left: -5,
        top: -10
    }, {
        angle: -10,
        left: -10,
        top: -20
    }, {
        angle: -15,
        left: -15,
        top: -30
    }, {
        angle: -20,
        left: -20,
        top: -40
    }, {
        angle: -180,
        left: -50
    }];

    rocketSvg.addEventListener("animation-trigger", () => {
        const initialAngle = -45;
        console.log("animationtrigger");
        const transitionTimeInMs = 500;
        rocketSvg.style.setProperty("--transitiontime", `${transitionTimeInMs}ms`);

        rocketSvg.style.transform = `rotate(${initialAngle}deg)`;
        rocketSvg.style.position = "relative";
        rocketSvg.style.left = 0;
        rocketSvg.style.top = 0;

        setTimeout(() => {
            rocketSvg.querySelectorAll(".no-display").forEach((element) => {
                element.classList.remove("no-display")
            });
            States.forEach((state, index) => {
                setTimeout(() => {
                    rocketSvg.style.transform = `rotate(${initialAngle + state.angle}deg)`;
                    rocketSvg.style.left = state.left;
                    rocketSvg.style.top = state.top;
                }, index * transitionTimeInMs)
            })

        }, transitionTimeInMs);


    })
};