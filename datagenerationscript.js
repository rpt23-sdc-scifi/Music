const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv


const lines = argv.lines || 10000000
const filename = argv.output || 'musicdata.csv'
const writeStream = fs.createWriteStream(filename)


const createPost = (i) => {
  const id = i
  const url = faker.internet.url()
  const image = faker.image.imageUrl(faker.random.number(100000))
  const band_id =faker.random.number(999999)
  return `${id},${url},${image},${band_id}\n`
}
const startWriting = (writeStream, encoding, done) => {
    writeStream.write(`id,url,image,band_id\n`, 'utf-8')
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


//node datagenerationscript.js --lines 10000000 --output musicdata.csv

//terminal import
//psql -U postgres -d 'music' -c "\copy songsdata(id,url,image,band_id) FROM 'musicdata.csv' delimiter ',' csv header"