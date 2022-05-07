import {ref} from 'vue'

export function variable() {

    let username = ref("刘小圆sama")
    let introduce = ref("海纳百川，有容乃大")
    let tags = ref([
        {
            "key": 1,
            "label": "go"
        },
        {
            "key": 2,
            "label": "IT互联网"
        }
    ])

    let cartoonOptions = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: 'HELLO WORLD',
                        fontSize: 60,
                        fontWeight: 'bold',
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#000',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 3000,
                        loop: true,
                        keyframes: [
                            {
                                percent: 0.7,
                                style: {
                                    fill: 'transparent',
                                    lineDashOffset: 200,
                                    lineDash: [200, 0]
                                }
                            },
                            {
                                percent: 0.8,
                                style: {
                                    fill: 'transparent'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }

    return {
        username, introduce, tags, cartoonOptions
    }

}