import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    _id: { type: String, unique: true },
    name: { type: String, unique: true },
  },
  { timestamps: true ,_id:false}
);

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
