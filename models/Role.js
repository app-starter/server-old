import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: { type: String, unique: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
