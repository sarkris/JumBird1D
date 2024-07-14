//This function turn degress into radians
function degToRad(deg) {
	return deg * (Math.PI / 180);
}

//This function change the value of distance. If the distance is closer to 0 returned value will be closer to 1 and vice versa.
function changeValue(num) {
	return Math.abs(num - 1);
}
