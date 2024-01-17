const mongoose = require("mongoose");

const FundRequestSchema = new mongoose.Schema(
  {
    requestfundid: {
      type: String,
      required: false,
      unique: true,
    },
    requestedby: String,
    department: String,
    items: Array,
    total: String,
    remarks: String,
    checkedby: String,
    approval: String,
    date: {
      type: Date,
      default: Date.now(),
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook to generate requestfundid
FundRequestSchema.pre("save", async function (next) {
    console.log("Pre-save hook triggered!");

    try {
        if (this.isNew) {
          
            const lastRequest = await this.constructor
            .findOne({}, { requestfundid: 1 })
            .sort({ requestfundid: -1 })
            .exec();
            let counter = 1;
            console.log("Last Request:", lastRequest);

            if (lastRequest) {
                const lastNumber = parseInt(lastRequest.requestfundid.split("-")[1]);
                if (!isNaN(lastNumber)) {
                    counter = lastNumber + 1;
                }
            }

            console.log("Counter before update:", counter);
            this.requestfundid = `FD-${counter.toString().padStart(2, "0")}`;
            console.log("Updated requestfundid:", this.requestfundid);
        }

        return next();
    } catch (err) {
        console.error("Error in pre-save hook:", err);
        return next(err);
    }
});




  
  






  

module.exports = mongoose.model("FundRequest", FundRequestSchema);
