# chia-miner


## usage

```
node index.js
```

目前master 仅优化4核，其他更高的核需要把调度策略稍加修改。

## config

index.js

```js
let taskInstance = new Task({
    tmpPathList: [String.raw`r:\chia-linshi`, String.raw`s:\chia-linshi`],
    lastPathList: [String.raw`G:\xxx-plot`],
    command: String.raw`C:\Users\xxx\AppData\Local\chia-blockchain\app-1.1.5\resources\app.asar.unpacked\daemon\chia.exe`,
})
```