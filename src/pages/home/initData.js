import {ref} from 'vue'
import {globalFunc} from "../../utils/globalFunc"

export function initData() {
    const {item, getClassList} = globalFunc()
    console.log(item)
    let treeRef = ref()
    let order = ref("id")
    let date = ref()
    let tableRef = ref()
    let expandRowKeys = ref(["1"])
    let currentPage = ref(1)
    let tableList = ref([{
        key: "title",
        label: "标题",
        width: "2"
    }, {
        key: "introduction",
        label: "简介",
        width: "3"
    }, {
        key: "tag",
        label: "标签",
        width: "2"
    }, {
        key: "date",
        label: "发布时间",
        width: "1"
    }, {
        key: "name",
        label: "作者",
        width: "1"
    }, {
        key: "operate",
        label: "操作",
        width: "2"
    }])
    let orderOptions = ref([
        {
            value: 'id',
            label: '默认排序',
        },
        {
            value: 'love',
            label: '点赞最多',
        },
        {
            value: 'collect',
            label: '收藏最多',
        },
        {
            value: 'week',
            label: '一周热榜',
        }
    ])
    let classList = ref([{
        "value": "All",
        "label": "全部",
        "children": [{
            "value": "all",
            "label": "不限",
        }],
    }].concat(getClassList()))

    return {
        treeRef, order, date, tableRef, expandRowKeys, classList, tableList, orderOptions, currentPage
    }

}