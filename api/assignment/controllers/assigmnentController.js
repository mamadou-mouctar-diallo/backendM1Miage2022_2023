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
            res.json({err: "il y a eu erreur lors de l'ajout de l'assignment"});
        }
        res.json({ msg: `Le devoir ${assignment.name} a été ajouté`})
    })
}

function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body)
    Assignment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, obj) => {
        if (err) {
            console.log(err);
         return  res.json({err: 'impossible de mettre à jour ce devoir'})
        }
        res.json({msg: `le devoir ${req.body.name} a été mis à jour`})
    });

}

function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({msg: `le devoir ${assignment.name} a été supprimé`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
