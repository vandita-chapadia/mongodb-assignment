import schedule from "node-schedule";
import moment from "moment";
import { Lottery } from "../models/lottery.js";

const resultJob = schedule.scheduleJob("0 * * * *", async () => {
  const curTime = moment(new Date()).format("DD/MM/YYYY hh:mm:ss a");
  // console.log(date);
  const lotteries = await Lottery.find({});
  // found lotteries that hits the result time
  for (let lottery of lotteries) {
    const resTime = moment(lottery.resultDate).format("DD/MM/YYYY hh:mm:ss a");
    if (curTime === resTime) {
      let { buyers } = lottery;
      // select random buyers that is winner
      lottery.winner = buyers[Math.floor(Math.random() * buyers.length)];
      await lottery.save();
      //console.log(lottery.winner);
    }
    // console.log(resDate);
  }
});
