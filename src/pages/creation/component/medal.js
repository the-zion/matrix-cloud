export function GetMedalMap() {
    return {
        "creation1": "新人报道",
        "creation2": "初学乍练",
        "creation3": "挑战自我",
        "creation4": "持之以恒",
        "creation5": "博闻强识",
        "creation6": "炉火纯青",
        "creation7": "一代宗师",
        "agree1": "赞无不胜",
        "agree2": "身经百赞",
        "agree3": "斗赞圣佛",
        "agree4": "初见码名",
        "agree5": "颇有名气",
        "agree6": "远近闻名",
        "view1": "崭露头角",
        "view2": "锋芒毕露",
        "view3": "一眼万年",
        "comment1": "评易近人",
        "comment2": "评步青云",
        "comment3": "天下太评",
        "collect1": "收藏入门",
        "collect2": "大收藏家",
        "collect3": "藏之有道",
    }
}

export function GetMedalIntroduce() {
    return {
        "creation1": "累计发文达1篇",
        "creation2": "累计发文达10篇",
        "creation3": "累计发文达30篇",
        "creation4": "累计发文达50篇",
        "creation5": "累计发文达100篇",
        "creation6": "累计发文达300篇",
        "creation7": "累计发文达1k篇",
        "agree1": "累计点赞达30次",
        "agree2": "累计点赞达100次",
        "agree3": "累计点赞达300次",
        "agree4": "文章累计获赞达50次",
        "agree5": "文章累计获赞达300次",
        "agree6": "文章累计获赞达1k次",
        "view1": "所有文章被阅读达1w",
        "view2": "所有文章被阅读达5w",
        "view3": "所有文章被阅读达10w",
        "comment1": "累计评论达10条",
        "comment2": "累计评论达50条",
        "comment3": "累计评论达100条",
        "collect1": "收藏他人文章达30篇",
        "collect2": "收藏他人文章达100篇",
        "collect3": "收藏他人文章达500篇",
    }
}

export function GetMedalMeta() {
    let medalMap = GetMedalMap()
    let medalIntroduce = GetMedalIntroduce()
    return [{
        label: "创作勋章",
        key: "creation",
        children: [{
            key: "creation1",
            label: medalMap.creation1,
            introduce: medalIntroduce.creation1,
            total: 1
        }, {
            key: "creation2",
            label: medalMap.creation2,
            introduce: medalIntroduce.creation2,
            total: 10
        }, {
            key: "creation3",
            label: medalMap.creation3,
            introduce: medalIntroduce.creation3,
            total: 30
        }, {
            key: "creation4",
            label: medalMap.creation4,
            introduce: medalIntroduce.creation4,
            total: 50
        }, {
            key: "creation5",
            label: medalMap.creation5,
            introduce: medalIntroduce.creation5,
            total: 100
        }, {
            key: "creation6",
            label: medalMap.creation6,
            introduce: medalIntroduce.creation6,
            total: 300
        }, {
            key: "creation7",
            label: medalMap.creation7,
            introduce: medalIntroduce.creation7,
            total: 1000
        }]
    }, {
        label: "点赞勋章",
        key: "activeAgree",
        children: [{
            key: "agree1",
            label: medalMap.agree1,
            introduce: medalIntroduce.agree1,
            total: 30
        }, {
            key: "agree2",
            label: medalMap.agree2,
            introduce: medalIntroduce.agree2,
            total: 100
        }, {
            key: "agree3",
            label: medalMap.agree3,
            introduce: medalIntroduce.agree3,
            total: 300
        }]
    }, {
        label: "获赞勋章",
        key: "agree",
        children: [{
            key: "agree4",
            label: medalMap.agree4,
            introduce: medalIntroduce.agree4,
            total: 50
        }, {
            key: "agree5",
            label: medalMap.agree5,
            introduce: medalIntroduce.agree5,
            total: 300
        }, {
            key: "agree6",
            label: medalMap.agree6,
            introduce: medalIntroduce.agree6,
            total: 1000
        }]
    }, {
        label: "阅读勋章",
        key: "view",
        children: [{
            key: "view1",
            label: medalMap.view1,
            introduce: medalIntroduce.view1,
            total: 10000
        }, {
            key: "view2",
            label: medalMap.view2,
            introduce: medalIntroduce.view2,
            total: 50000
        }, {
            key: "view3",
            label: medalMap.view3,
            introduce: medalIntroduce.view3,
            total: 100000
        }]
    }, {
        label: "评论勋章",
        key: "comment",
        children: [{
            key: "comment1",
            label: medalMap.comment1,
            introduce: medalIntroduce.comment1,
            total: 10
        }, {
            key: "comment2",
            label: medalMap.comment2,
            introduce: medalIntroduce.comment2,
            total: 50
        }, {
            key: "comment3",
            label: medalMap.comment3,
            introduce: medalIntroduce.comment3,
            total: 100
        }]
    }, {
        label: "收藏勋章",
        key: "collect",
        children: [{
            key: "collect1",
            label: medalMap.collect1,
            introduce: medalIntroduce.collect1,
            total: 30
        }, {
            key: "collect2",
            label: medalMap.collect2,
            introduce: medalIntroduce.collect2,
            total: 100
        }, {
            key: "collect3",
            label: medalMap.collect3,
            introduce: medalIntroduce.collect3,
            total: 500
        }]
    }]
}