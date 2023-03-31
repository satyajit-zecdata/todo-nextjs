import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    task: {type:String, require:true},
    completed: {type:Boolean, default: false},
});

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
