const fs = require("fs");

function getAllUsers () {
    return JSON.parse(fs.readFileSync('./providers/users.json', {
        encoding: 'utf8'
    }))
}

function getUser(username){
    const users= getAllUsers();
    let user2 = users.find(users => users.username === username);
    return user2;
}

function getUserbyId(id){
    const users= getAllUsers();
    return users.find(users => users.id === id);
}


function removeUser(username){
    const users= getAllUsers();
    let user2 = users.filter(users => users.username !== username);
    saveUser(user2);
    return user2;
}


function updateUser(id, username, name, surname, age){
    let users = getAllUsers();
    const index = users.findIndex(el => el.id === parseInt(id));

    if (index !== -1) {
        users[index] = {
            "id": parseInt(id, 10),
            "username": username ? username : users[index].username,
            "name": name ? name : users[index].name,
            "surname": surname ? surname : users[index].surname,
            "age": age ? age : users[index].age
        };
}

    saveUser(users);
    return users[index];
}

function saveUser(users){
    fs.writeFileSync('./providers/users.json', JSON.stringify(users, null, 2), 'utf8');
}

function addUser(id,username, name, surname, age){
    const users = getAllUsers();
    if(getUser(username) == undefined){
        let user = {"id": id, "username": username, "name": name, "surname": surname, "age": parseInt(age)};
        users.push(user);
        saveUser(users);
    }
    return users;    
}

module.exports={
    getAllUsers,
    getUser,
    getUserbyId,
    removeUser,
    updateUser,
    addUser
}

