function sum(...args) {
    return args.reduce((acc, value) => acc += value, 0);
}

console.log(sum() === 0);
console.log(sum(0) === 0);
console.log(sum(3) === 3);
console.log(sum(4, 6, 7, 3, 3) === 23);