const Deal_Model = require("../models/Deal_Model");

// const getWonDeals = async ({ pipelineId, stageId }) => {
//   try {
//     const wonDeals = await Deal_Model.find({
//       pipelineId,
//       currentStage: stageId,
//       status: "won"
//     });
//     return wonDeals;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
