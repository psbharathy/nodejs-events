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

exports.createRepo = createRepo;
