const { spawn } = require("child_process")

const status = {
  phase_1_init: "phase_1_init",
  phase_1_table_1: "phase_1_table_1",
  phase_1_table_2: "phase_1_table_2",
  phase_1_table_3: "phase_1_table_3",
  phase_1_table_4: "phase_1_table_4",
  phase_1_table_5: "phase_1_table_5",
  phase_1_table_6: "phase_1_table_6",
  phase_1_table_7: "phase_1_table_7",
  phase_2: "phase_2",
  phase_3: "phase_3",
  phase_4: "phase_4",
  parse_last_start: "parse_last_start",
}

class Task {
  constructor(params) {
    this.taskList = {}
    this.tmpPathList = params.tmpPathList
    this.lastPathList = params.lastPathList
    this.command = params.command
  }
  startOne() {
    // 是否超6个，已有6个不加入
    if (Object.entries(this.taskList).length > 5) {
      console.log('超6个，已有6个不加入')
      return
    }

    // tmp盘和last盘判断
    let tmpPath = ""
    let lastPath = this.lastPathList[0]

    // 判断 tmpPath
    // init counter
    let counter = {}
    this.tmpPathList.map((tmpPath) => {
      counter[tmpPath] = 0
    })
    Object.entries(this.taskList).map(([process_task_id, process_task]) => {
      counter[process_task.tmpPath]++
    })
    let smallNumber
    // 分配任务给最小任务数的盘
    Object.entries(counter).map(([counter_key, counter_value], index) => {
      if (index === 0) {
        ;(tmpPath = counter_key), (smallNumber = counter_value)
      } else {
        if (counter_value < smallNumber) {
          tmpPath = counter_key
        }
      }
    })

    const process = spawn(this.command, [
      "plots",
      "create",
      "-k",
      "32",
      "-n",
      "1",
      "-r",
      "12",
      "-f",
      "8dcae14aaabdc3c9850a3a1aafbb82e8954fc8a535ed82503494f3f150bdcaab90a6bfd7f9aab38756a33aab99ccc00f",
      "-p",
      "99065da8c92c759e0953ce56cbf219d27b73cf7e841ce2a76e185c732583567ba9d8fe2fd94a790de33b7a49faf3bc75",
      "-t",
      tmpPath,
      "-d",
      lastPath,
    ])
    let processId = Date.now()
    // id 访问提高速度
    this.taskList[processId] = {
      type: "spawn_process",
      // status 对应 phase
      // 枚举值
      status: status.phase_1_init,
      processId,
      process,
      tmpPath,
      lastPath,
    }
    console.log(`processId: ${processId} begin`, Date())
    // console.log(this.taskList[processId])
    // console.log(this.taskList)

    // 监听回调
    process.stdout.on("data", (data) => {
      let outStr = `${data}`
      console.log(`stdout: ${outStr}`)

      // 已被清除
      if(!this.taskList[processId]?.status){
        return
      }
      // 状态流转控制
      if (this.taskList[processId].status === status.phase_1_init) {
        // let plotSize = outStr.match(/Plot size is: (\d+)/)
        // let bufferSize = outStr.match(/Buffer size is: (\d+)MiB/)
        // console.log("plotSize: ",plotSize)
        // console.log("bufferSize: ",bufferSize)
        let phase1 = outStr.match(/Starting phase 1\/4/)
        if (phase1) {
          this.taskList[processId].status = status.phase_1_table_1
          console.log(processId, "phase_1_table_1: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_1_table_1) {
        let table_2_start = outStr.match(/Computing table 2/)
        if (table_2_start) {
          this.taskList[processId].status = status.phase_1_table_2
          console.log(processId, "phase_1_table_2: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_1_table_2) {
        let table_3_start = outStr.match(/Computing table 3/)
        if (table_3_start) {
          this.taskList[processId].status = status.phase_1_table_3
          console.log(processId, "phase_1_table_3: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_1_table_3) {
        let table_4_start = outStr.match(/Computing table 4/)
        if (table_4_start) {
          this.taskList[processId].status = status.phase_1_table_4
          console.log(processId, "phase_1_table_4: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_1_table_4) {
        let table_5_start = outStr.match(/Computing table 5/)
        if (table_5_start) {
          this.taskList[processId].status = status.phase_1_table_5
          console.log(processId, "phase_1_table_5: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_1_table_5) {
        let table_6_start = outStr.match(/Computing table 6/)
        if (table_6_start) {
          this.taskList[processId].status = status.phase_1_table_6
          console.log(processId, "phase_1_table_6: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_1_table_6) {
        let table_7_start = outStr.match(/Computing table 7/)
        if (table_7_start) {
          this.taskList[processId].status = status.phase_1_table_7
          console.log(processId, "phase_1_table_7: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_1_table_7) {
        let parse_2_start = outStr.match(/Time for phase 1 = (.*?) seconds/)
        if (parse_2_start) {
          this.taskList[processId].status = status.phase_2
          console.log(processId, "phase_2: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_2) {
        let parse_3_start = outStr.match(/Time for phase 2 = (.*?) seconds/)
        if (parse_3_start) {
          this.taskList[processId].status = status.phase_3
          console.log(processId, "phase_3: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_3) {
        let parse_4_start = outStr.match(/Time for phase 3 = (.*?) seconds/)
        if (parse_4_start) {
          this.taskList[processId].status = status.phase_4
          console.log(processId, "phase_4: ", Date())
        }
      } else if (this.taskList[processId].status === status.phase_4) {
        let parse_last_start = outStr.match(/Time for phase 4 = (.*?) seconds/)
        if (parse_last_start) {
          this.taskList[processId].status = status.parse_last_start
          console.log(processId, "phase_last: ", Date())
        }
      } else if (this.taskList[processId].status === status.parse_last_start) {
        let parse_end = outStr.match(/Total time = (.*?) seconds/)
        if (parse_end) {
          // 忽略复制,直接认为项目结束, 移除任务
          console.log(processId, ` end 耗时${parse_end[1]} second`, Date())
          delete this.taskList[processId]
        }
      }

      // 判断是否需要新加任务,有phase1就不加
      let has_phase_1_arr = Object.entries(this.taskList).filter(
        ([item_id, item]) => {
          console.log(item.processId,"  ",item.status," ",item.tmpPath)
          // console.log(item.status.indexOf("phase_1"))
          // console.log(item.status.indexOf("phase_1")!==-1)
          return item.status.indexOf("phase_1") !== -1
        }
      )
      console.log('has_phase_1',has_phase_1_arr)
      if (has_phase_1_arr.length) {
        return
      } else {
        // 增加
        console.log('加1')
        this.startOne()
      }
    })
    process.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`)
    })
    process.on("close", (code) => {
      console.log(`child process exited with code ${code}`)
    })
    process.on("error", (error) => {
      console.log(error)
    })
  }
  start() {
    this.startOne()
  }
}

const main = () => {
  let taskInstance = new Task({
    tmpPathList: [String.raw`r:\chia-linshi`, String.raw`s:\chia-linshi`],
    lastPathList: [String.raw`G:\xxx-plot`],
    command: String.raw`C:\Users\xxx\AppData\Local\chia-blockchain\app-1.1.5\resources\app.asar.unpacked\daemon\chia.exe`,
  })
  taskInstance.start()
}

main()
