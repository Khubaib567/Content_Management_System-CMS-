
module.exports.runQuery = function(user, users,project) {
    return assign_key(user, users,project)
}

function assign_key(user, users,project) {
    user = users.filter(obj => obj.user_name == project.project_created)
    return user
}