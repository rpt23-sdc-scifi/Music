const fs = require('fs')
const faker = require('faker')
const argv = require('yargs').argv


const lines = argv.lines || 10000000
const filename = argv.output || 'banddata.csv'
const writeStream = fs.createWriteStream(filename)



const createPost = (i) => {
  const band_id = i
  // id can be the position
  const name = faker.lorem.words(1)
// we want each line to include an id ,n name, length, image, url, band_id
  return `${band_id},${name}\n`
}

const startWriting = (writeStream, encoding, done) => {
    writeStream.write(`band_id,name\n`, 'utf-8')
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

//node bandgenerationscript.js --lines 10000000 --output banddata.csv