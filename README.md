# Clock In API

## How to run

1 - Clone the repository\
2 - Run `npm install`\
3 - Copy the `.env.example` file to `.env`\
4 - Run `npm run make:db` to create the database file\
5 - Run `node ace migration:fresh` to create the tables\
6 - Run `node ace db:seed` to populate the database with some data\
7 - Run `npm run dev` to start the server

## Password Recovery Flow

For sending the password recovery email, you need to run the container with the following command:

`docker-compose up -d`

After that, you can access the mailhog interface at `http://localhost:8025` to see the emails sent by the application.
