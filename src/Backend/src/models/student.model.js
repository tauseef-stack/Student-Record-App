const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 3 },
    gender: { type: String, required: true, default: 'male' },
    age: { type: Number, required: true },
    city: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true,
});

const Student = mongoose.model('student', studentSchema); //students collections

module.exports = Student;



// const mongoose = require('mongoose')

// const studentSchema = new mongoose.Schema(
//     {
//         name: { type: String, required: true },
//         age: { type: Number, required: true },
//         gender: { type: String, required: true ,default: "Male"},
//         city: { type: String, required: true },
        
//     },
//     {
//         versionKey: false,
//         timestamps: true,
//     }
// );

// module.exports = mongoose.model("student", studentSchema);