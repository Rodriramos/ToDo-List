# ToDo-List

2. Crear una rama feature desde develop

    git switch develop
    git switch -c feature/create-endpoint-user

3. Cuando terminas la feature haces commit

    git add .
    git commit -m "Add user endpoint"

4. Mergear a develop

    git switch develop
    git merge feature/create-endpoint-user

5. Y normalmente borras la rama:

    git branch -d feature/create-endpoint-user

6. Cuando develop ya está estable lo pasas a main:

git switch main
git merge develop