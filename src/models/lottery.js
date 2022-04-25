import mongoose from "mongoose";

const LotterySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    startDate: {
      type: Date,
      required: true,
      trim: true,
    },
    endDate: {
      type: Date,
      required: true,
      trim: true,
    },
    resultDate: {
      type: Date,
      required: true,
      trim: true,
    },
    winningPrice: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    poolSize: {
      type: Number,
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Lottery = mongoose.model("Lottery", LotterySchema);
