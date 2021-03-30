import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    _id:{ type: String, unique: true },
    name: { type: String, unique: true },
    permissions: [
      {
        type: String,
        ref: "Permission",
      },
    ],
  },
  { timestamps: true ,_id:false}
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
