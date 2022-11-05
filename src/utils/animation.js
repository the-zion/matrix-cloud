import mojs from "@mojs/core";

export function animationAgree(agreeRef, agreeBounce) {
    let burst = new mojs.Burst({
        radius: {0: 45},
        parent: agreeRef.value,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: 1500,
        delay: 300,
        children: {
            duration: 750,
            radius: {0: "rand(5,25)"},
            shape: ["circle", "rect", "polygon"],
            fill: [
                "#1abc9c",
                "#2ecc71",
                "#00cec9",
                "#3498db",
                "#9b59b6",
                "#fdcb6e",
                "#f1c40f",
                "#e67e22",
                "#e74c3c",
                "#e84393",
            ],
            degreeShift: "rand(-90, 90)",
            delay: "stagger(0, 40)",
        },
        opacity: 0.6,
        count: 10,
    });

    let aperture = new mojs.Transit({
        parent: agreeRef.value,
        duration: 350,
        type: 'circle',
        radius: {0: 20},
        fill: 'transparent',
        stroke: "#00bfff",
        strokeWidth: {20: 0},
        opacity: 0.6,
        isRunless: true,
        easing: mojs.easing.bezier(0, 0.1, 0.5, 1)
    })

    let bounce = new mojs.Tween({
        duration: 500,
        onUpdate: (progress) => {
            if (progress > 0.3) {
                // elastic 弹性的
                agreeBounce.value = mojs.easing.elastic.out(1.43 * progress - 0.43);
            } else {
                agreeBounce.value = 0
            }
        }
    })
    return new mojs.Timeline({speed: 1.5}).add(burst, aperture, bounce)
}

export function animationCollect(collectRef, collectBounce) {
    let RADIUS = 28;
    let circle = new mojs.Shape({
        left: 10, top: 10,
        parent: collectRef.value,
        stroke: '#ffa500',
        strokeWidth: {15: 0},
        fill: 'none',
        scale: {0: 1, easing: 'quad.out'},
        radius: 20,
        duration: 450
    });

    let burst = new mojs.Burst({
        left: 10, top: 10,
        parent: collectRef.value,
        radius: {6: RADIUS - 7},
        angle: 45,
        children: {
            shape: 'line',
            radius: RADIUS / 7.3,
            stroke: '#ffa500',
            strokeDasharray: '100%',
            strokeDashoffset: {'-100%': '100%'},
            degreeShift: 'stagger(0,-5)',
            duration: 700,
            delay: 200,
            easing: 'quad.out',
        }
    });

    let bounce = new mojs.Tween({
        duration: 500,
        onUpdate: (progress) => {
            if (progress > 0.3) {
                // elastic 弹性的
                collectBounce.value = mojs.easing.elastic.out(1.43 * progress - 0.43);
            } else {
                collectBounce.value = 0
            }
        }
    })

    return new mojs.Timeline({speed: 1.5}).add(burst, circle, bounce)
}