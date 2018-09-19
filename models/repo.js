async function getRepositories(repoId) {
  return new Promise((resolve, reject) => {
    let query = "SELECT  id,name , repo_url FROM repository where id=?";
    db.query(query, [repoId], function(err, rows) {
      if (err) reject(new Error(" Repository Not Found"));
      resolve(rows);
    });
  });
}

exports.getRepositories = getRepositories;
