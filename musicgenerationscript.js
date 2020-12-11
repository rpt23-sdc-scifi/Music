const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv


const lines = argv.lines || 10000000
const filename = argv.output || 'musicdescription.csv'
const writeStream = fs.createWriteStream(filename)



const createPost = (i) => {
  const id = i
  // id can be the position
  const name = faker.lorem.words(2)
  const length= faker.random.number(10)
// we want each line to include an id ,n name, length, image, url, band_id
  return `${id},${name},${length}\n`
}

const startWriting = (writeStream, encoding, done) => {
    writeStream.write(`id,name,length\n`, 'utf-8')
  let i = lines
  function writing(){
    let canWrite = true
    do {
      i--
      let post = createPost(i)
      if(i === 0){
        writeStream.write(post, encoding, done)
      }else{
        writeStream.write(post, encoding)
      }
    } while(i > 0 && canWrite)
    if(i > 0 && !canWrite){
      writeStream.once('drain', writing);
    }
  }
  writing()
}

startWriting(writeStream, 'utf-8', () => {
  writeStream.end()
})


// should initialize stream and with all the above and startwriting
// node musicgenerationscript.js --lines 10000000 --output musicdescription.csv



//terminal import
//psql -U postgres -d 'music' -c "\copy songdescription(id,name,length,url,image,band_id) FROM 'musicdata.csv' delimiter ',' csv header"