# BACKEND

1. Cloned the repository.
2. Installed PostgreSQL.
3. Setup database connection.
 - Host: localhost
 - Port: 5432
 - Database: evaluator
 - Username: postgres
 - Password: Test123!

4. Run migration
5. Encountered problem using "dotnet run", so I used "dotnet exec bin\Debug\net9.0\task-manager-api.dll" instead.
6. Accessed the api documentation "http://localhost:5001/swagger/index.html".
7. Checked all the apis, encountered error in post method. I commented the "public User User { get; set; } = null!;" line,
thought it's unnecessary because we can get the info of user using UserId.
8. Updated get method query to sort the results based in id.
9. Added Cors to be accessible in our frontend.
10. I added UsersContoller (related to create new task page).