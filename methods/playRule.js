exports.rule = (a, b) => {
   let res = {}
   if (a == b) {
      res = { win: true, msg: "Winner Winner Chicken Dinner" }
   } else if (a > b) {
      res = { win: false, msg: `GO FORWARD` }
   } else {
      res = { win: false, msg: `GO BACKWARD` }
   }
   return res
}
