let outStr = `Time for phase 1 = 8809.851 seconds. CPU (239.920%) Tue May 11 05:56:27 2021`
let plotSize = outStr.match(/Plot size is: (\d+)/)
let bufferSize = outStr.match(/Buffer size is: (\d+)MiB/)
console.log(`stdout: ${outStr}`)
console.log(`plotSize:`)
console.log(plotSize)
console.log(bufferSize)


console.log(Date())

