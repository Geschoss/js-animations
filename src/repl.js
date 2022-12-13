const t = (n, s, e) => x => (n * (x - s)) / (e - s)


const n_3 = t(3, 10, 20);

n_3(20) /* ? */
n_3(15) /* ? */
n_3(10) /* ? */
n_3(5) /* ? */

let n = 4;
let i = 0
Math.cos((Math.PI * (i + (n/2))) / n) /* ? */
Math.sin((Math.PI * (i + (n/2))) / n) /* ? */