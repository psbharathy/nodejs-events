const mysql = require("mysql2");
const Joi = require("joi");

async function findRepo(repoId) {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT `id`, `name`, `repo_url` FROM `repository` where `id`  =?";
    db.query(query, [repoId], function(err, rows) {
      if (err) reject(new Error(" Repository Not Found"));
      resolve(rows);
    });
  });
}

async function createRepo(repo) {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO `repository` (`id`, `name`, `repo_url`) VALUES  (?,?,?)";
    let records = [repo.id, repo.name, repo.url];
    console.log(records);
    db.execute(sql, records, function(err, result) {
      if (err) reject(new Error(" Unable to create an repository!"));
      console.log(" repository inserted, ID: " + result.insertId);
      resolve(result);
    });
  });
}

async function deleteRepo() {
  return new Promise((resolve, reject) => {
    let repoQuery = "DELETE FROM repository";
    db.execute(repoQuery, function(err, result) {
      if (err) reject(new Error(err));
      // console.log(" Repository Deleted !");
      resolve(result);
    });
  });
}
exports.findRepo = findRepo;
exports.createRepo = createRepo;
exports.deleteRepo = deleteRepo;
