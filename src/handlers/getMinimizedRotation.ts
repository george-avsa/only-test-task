export function getMinimizedRotation(initialRotation: number): number {
    const leftRotation = 360 - initialRotation + 30; 
    const rightRotation = 30 - initialRotation;
    let nextRotation: number;
    if (Math.abs(leftRotation) >= Math.abs(rightRotation)) {
        nextRotation = rightRotation
    } else {
        nextRotation = leftRotation
    }
    return nextRotation;
}