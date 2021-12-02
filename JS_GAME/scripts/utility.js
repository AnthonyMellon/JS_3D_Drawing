function degToRad(deg) {
    return deg * Math.PI / 180;
}

function normaliseAngle(angle) {
    return angle % 360;
}

function rotatePoint(point, angleRad)
{
    let newX = 0;
    let newY = 0;

    newX = point[0] * Math.cos(angleRad) - point[1] * Math.sin(angleRad);
    newY = point[1] * Math.cos(angleRad) + point[0] * Math.sin(angleRad);
    
    return[newX, newY];
}