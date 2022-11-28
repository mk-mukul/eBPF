const express = require('express')
const app = express()
const port = 3000

const ips = [];
let time = 0;

setInterval(() => {
    for (let i = 0; i < ips.length; i++) {
        ips[i].reqTotal++;
    }
    console.log(ips);
    time++;
  }, 100);

const getResponse = (ip) => {
    const timeT = new Date();
    const min = timeT.getMinutes();
    for (let i = 0; i < ips.length; i++) {
        const ele = ips[i];
        if (ele.ip == ip ) {
            ips[i].reqNo++;
            if ( ele.reqTotal - ele.reqUsed <= 0) {
                return time+"\tNOK\t"+ ele.reqTotal+"\t"+ele.reqUsed+"\t"+ele.reqNo;
            }
            ips[i].lastReqTime = min;
            ips[i].reqUsed++;
            return time+"\tOK\t"+ ele.reqTotal+"\t"+ele.reqUsed+"\t"+ele.reqNo;
        }
    }
    const data = {
        ip: ip,
        lastReqTime: min,
        reqTotal: 30,
        reqUsed: 1,
        reqNo: 1
    }
    ips.push(data);
    console.log(ips);
    return time+"\tOK\t"+ data.reqTotal+"\t"+data.reqUsed+"\t"+data.reqNo;
}

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(getResponse(ip));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

