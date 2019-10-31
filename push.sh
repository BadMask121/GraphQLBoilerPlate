#!/bin/bash
echo where dir to add
read dir
git add $dir

if [ -z "$dir" ]
then 
        echo "git add cannot be empty"
else
        echo enter commit message
        read message
        git commit -am "$message"
        git push -u origin symmetry
fi
echo "Push has completed"