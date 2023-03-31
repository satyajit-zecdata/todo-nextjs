import Task from '../../../../models/Task';
import dbConnect from '../../../../utils/dbConnect';

export default async(req, res)=>{
    const{method} = req;
    const {id} = req.query;

    //connect to DB
    await dbConnect()

    //Update task by ID
    if(method === "PUT"){
        try {
            const result = await Task.findByIdAndUpdate(id, {$set:req.body}, {new:true});
            req.status(200).json({data:result,message:"Task Updated Successfully"});
        } catch (error) {
            req.status(500).json({message:"Internal Server Erro"});
            console.log(error);
        }
    };

    //Delete task by id
    if(method === "DELETE"){
        try {
            await Task.findByIdAndDelete(id);
            req.status(200).json({message: "Task Deleted Successfully"})
        } catch (error) {
            res.status(500).json({message: "internal Server Error"});
            console.log(error);
            
        }
    }
}
