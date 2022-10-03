#!/bin/zsh

#this only works when the root user does not have a password set

echo "Creating sample_db MySQL database..."
mysql -uroot -e "CREATE DATABASE IF NOT EXISTS sample_db /*\!40100 DEFAULT CHARACTER SET utf8 */;"
echo "Database successfully created!"

echo "Creating new user..."
mysql -uroot -e "CREATE USER IF NOT EXISTS user@localhost IDENTIFIED BY 'password';"
echo "User successfully created!"
echo "..."

echo "Granting ALL privileges on sample_db to user..."
mysql -uroot -e "GRANT ALL PRIVILEGES ON sample_db.* TO 'user'@'localhost';"
mysql -uroot -e "FLUSH PRIVILEGES;"
echo "..."

echo "Showing existing databases..."
mysql -uroot -e "show databases;"

echo "You are now good to test MyJDBC.java against the sample_db :)"
exit
