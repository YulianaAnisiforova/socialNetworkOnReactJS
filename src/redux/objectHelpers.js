export const updateObjectInArray = (items, itemID, objPropName, newProps) => {
    return items.map((item) => {
        if (item[objPropName] === itemID) {
            return {...item, ...newProps}
        }
        return item
    })
}
