addFunc = (totalGripes, totalHugs) => {
    let grandTotal = totalGripes;
    grandTotal += totalHugs;
    perFunc(grandTotal, totalHugs);
};

perFunc = (grandTotal, totalHugs) => {
   let x = totalHugs * 100
   let percentage = x /= grandTotal
   styleFunc(percentage);
};

// Select heart image based on percentage variable value, pass selected image to template

let tenPercent = /*img url*/
let twentyPercent = /*img url*/
let thirtyPercent = /*img url*/
let fortyPercent = /*img url*/
let fittyPercent = /*img url*/
let sixtyPercent = /*img url*/
let seventyPercent = /*img url*/
let eightyPercent = /*img url*/
let ninetyPercent = /*img url*/
let oneHunnitPercent = /*img url*/

styleFunc = (percentage) => {
    if (percentage <= 10) {

    }
    if (percentage <= 20 && percentage > 10) {
        
    }
    if (percentage <= 30 && percentage > 20) {
        
    }
    if (percentage <= 40 && percentage > 30) {
        
    }
    if (percentage <= 50 && percentage > 40) {
        
    }
    if (percentage <= 60 && percentage > 50) {
        
    }
    if (percentage <= 70 && percentage > 60) {
        
    }
    if (percentage <= 80 && percentage > 70) {
        
    }
    if (percentage <= 90 && percentage > 80) {
        
    }
    if (percentage > 90) {
        
    }
}