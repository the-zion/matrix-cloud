export function controller(treeRef, tableRef) {

    function treeCheck() {
        console.log(treeRef.value.getCheckedKeys(true))
    }

    function rowClick(row) {
        tableRef.value.toggleRowExpansion(row)
    }

    function userClick() {
        console.log(123)
    }

    return {treeCheck, rowClick, userClick}
}