let Assignment = require('../models/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){

    console.log("Je fais un get")
    Assignment.find((err, assignments) => {
        if(err){
            res.json({msg: "Aucun assignment trouve"})
        }

        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    console.log("Je fais un post")
    assignment.id = req.body.id;
    assignment.name = req.body.name;
    assignment.deadLine = req.body.deadLine;
    assignment.rendered = req.body.rendered;
    assignment.author = req.body.author;
    assignment.course.name = req.body.course.name;
    assignment.course.coursePhoto = req.body.course.coursePhoto;
    assignment.course.teacherPhoto = req.body.course.teacherPhoto;
    assignment.mark = req.body.mark;
    assignment.comment = req.body.comment;


    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.json({msg: "il y a eu erreur lors de l'ajout de l'assignment"});
        }
        res.json({ message: `${assignment.name} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({message: 'updated'})
        }

        // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params._id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.name} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
