let outStr = `Starting plotting progress into temporary dirs: r:\chia-linshi and r:\chia-linshi
ID: 284da1c4fa91749af1075e56f6003796d8c974cff298f339ec8730353345a67f
Plot size is: 32
Buffer size is: 3389MiB
Using 128 buckets`
let plotSize = outStr.match(/Plot size is: (\d+)/)
let bufferSize = outStr.match(/Buffer size is: (\d+)MiB/)
console.log(`stdout: ${outStr}`)
console.log(`plotSize:`)
console.log(plotSize)
console.log(bufferSize)


console.log(Date())

