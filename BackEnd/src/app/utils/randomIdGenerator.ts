
export const genUserId = () => {
    return Math.random().toPrecision(40).split(".")[1];
}