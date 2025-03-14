export const updateObjectInArray = (items: any, itemID: any, objPropName: any, newProps: any) => {
    return items.map((item: any) => {
        if (item[objPropName] === itemID) {
            return {...item, ...newProps}
        }
        return item
    })
}
