const fs = require("fs");

function getAllUsers () {
    return JSON.parse(fs.readFileSync('./providers/users.json', {
        encoding: 'utf8'
    }))
}

function getUser(username){
    const users= getAllUsers();
    return users.find(users => users.username === username);
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
    //const {username, name, surname, age} = user;
    let user = getUserbyId(id);

    user = {
        "id": parseInt(id, 10),
        "username": username ? username : user.username,
        "name": name ? name : user.name,
        "surname": surname ? surname : user.surname,
        "age": age ? age : user.age
    }

    saveUser(user);
    return user;
}

function saveUser(users){
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');
}

function addUser(username, name, surname, age){
    const users = getAllUsers();
    if(getUser(username) == undefined){
        let user = {"username": username, "name": name, "surname": surname, "age": parseInt(age)};
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

