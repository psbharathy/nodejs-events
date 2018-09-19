const createRepo = async function createRepo(repo) {
  console.log(repo);
  var sql =
    "INSERT INTO repository (name, repo_url, created_at) VALUES (?,?,?) ";
  let records = [repo.name, repo.repo_url, Date.now()];
  db.execute(sql, records, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
};

async function getRepositories(repoId) {
  return new Promise((resolve, reject) => {
    let query = "SELECT  id,name , repo_url FROM repository where id=?";
    db.query(query, [repoId], function(err, rows) {
      if (err) reject(new Error(" Repository Not Found"));
      resolve(rows);
    });
  });
}

function repoTransformers(repoData) {
  const actors = [];
  for (let e in repoData) {
    let eArray = {
      id: repoData[e].id,
      name: repoData[e].login,
      avatar_url: repoData[e].avatar_url
    };
    actors.push(eArray);
  }
  return actors;
}

exports.createRepo = createRepo;
exports.getRepositories = getRepositories;
