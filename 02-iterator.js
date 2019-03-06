'use strict';

/***
 * @returns {Object}
 */
let integers = function() {
    let value = 0;
    return {
        next() {
            return {
                done: false,
                value: value++
            }
        }
    }
}

/***
 * @returns {Object}
 */
function take(amount, iterator) {
    let iter = {};

    iter[Symbol.iterator] = function() {
        return {
            next() {
                while (true) {
                    let {value, } = iterator.next();
                    if (value > amount) {
                        break;
                    }

                    return {
                        done: false,
                        value: value
                    }
                }

                return {
                    done: true
                };
            }
        }
    };

    return iter;
}

const iter = integers();

for (let i of take(3, iter)) {
    console.log(i)
};
