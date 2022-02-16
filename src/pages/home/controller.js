import {globalFunc} from "../../utils/globalFunc";

export function controller(treeRef, tableRef) {
    let {loadFullScreen} = globalFunc()

    function treeCheck() {
        console.log(treeRef.value.getCheckedKeys(true))
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
    }

    function filterSelectChange(value) {
        console.log(value)
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
    }

    function dateSelectChange(date) {
        console.log(date)
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
    }

    function rowClick(row) {
        tableRef.value.toggleRowExpansion(row)
    }

    function userClick() {
        console.log(123)
    }

    function pageCurrentChange(item) {
        console.log(item)
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
    }

    return {treeCheck, filterSelectChange, dateSelectChange, rowClick, userClick, pageCurrentChange}
}