#!/bin/bash
 
###################################################
# Bash script to create database and seed 
###################################################

# Variable Definitions
# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Database Variable Definitions
DATABASE="music"
USER="postgres"
DATATABLE="songsdata"
DATAIDS="(id,url,image,band_id)"
DESCRIPTIONTABLE="songdescription"
DESCRIPTIONIDS="(id,name,length,band_id)"
# Output Filename for Faker File
SONGDESCRIPTION="musicdescription.csv"
SONGDATA="musicdata.csv"
FILEPATH1="$DIR/$SONGDESCRIPTION"
FILEPATH2="$DIR/$SONGDATA"
# if parameter 1 is not passed as argument default records to be generated to 10000000
LINES=${1:-1000000}


### Run Our Generator Script ###
node musicgenerationscript.js --output=$FILEPATH1 --lines=$LINES
node datagenerationscript.js --output=$FILEPATH2 --lines=$LINES

### Import Our posts.csv file to seed Database ###
psql -U $USER -d $DATABASE -c "\COPY $DATATABLE$DATAIDS FROM '$FILEPATH2' CSV HEADER";
psql -U $USER -d $DATABASE -c "\COPY $DESCRIPTIONTABLE$DESCRIPTIONIDS FROM '$FILEPATH1' CSV HEADER";
