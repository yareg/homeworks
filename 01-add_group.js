'use strict';

const users = [
    {id: 1, name: 'Bob'},
    {id: 2, name: 'Joe'},
    {id: 3, name: 'Don', groupId: 1},
    {id: 4, name: 'Kally'},
    {name: 'Alex'},
    {name: 'John'},
];

const groups = [
    {id: 1, title: 'First Group'},
    {id: 2, title: 'Last Group'},
];

/***
 *
 * @returns {Promise}
 */
function getAllUsers(users) {
    let promiseList = [];
    for (let user of users) {
        promiseList.push(createUser(user));
    }

    return Promise.all(promiseList);
}

/***
 * @param {Array} users
 * @param {Object} group
 * @returns {Promise}
 */
function addSelectedGroupToUsers(users, group) {
    return getAllUsers(users)
        .then(usersData => {
            let promiseList = [];
            for (let user of usersData) {
                if (!user.hasOwnProperty('groupId')) {
                    user.groupId = group.id;
                }
                const promise = new Promise(resolve => {
                    setTimeout(() => {
                        resolve(user);
                    }, getIntValue());
                });
                promiseList.push(promise);
            }

            return Promise.all(promiseList);
        });
}

/***
 * @returns {Promise}
 */
function createUser(user) {
    const promise = new Promise(resolve => {
        if (user.hasOwnProperty('id')) {
            resolve(user);
        }
        else {
            user.id = getIntValue(50, 1000);
            setTimeout(() => {
                resolve(user);
            }, getIntValue());
        }
    });

    return promise;
}

/***
 * @returns {Number}
 */
function getIntValue(min = 500, max = 1000) {
    return Math.floor(Math.random() * (max - min)) + min;
}

addSelectedGroupToUsers(users, groups[1])
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });