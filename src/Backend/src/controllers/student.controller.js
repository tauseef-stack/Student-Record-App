const express = require('express');
const Student = require('../models/student.model');

const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    }
    catch (err) {
        res.status(500).json('not able to post student internally');
    }
   
})

router.get('/', async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page - 1) * size;
        const query =  null;
        
        const students = await Student.find(query).skip(offset).limit(size).lean().exec();

        const totalDoc = await Student.find(query).countDocuments();

        const noPages = Math.ceil(totalDoc / size)
           //console.log(totalDoc,noPages)
        res.status(200).json({ students, totalDoc, noPages });
    }
    catch (err) {
        res.status(500).json('not able to get students internally');
    }
})

router.patch('/:id/update', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();

        res.status(201).json(student);
     }
    catch (err) {
        res.status(500).json('not able to update student data internally') 
    }
  
})

router.delete('/:id/delete', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec();

        res.status(201).json(student);
     }
    catch (err) {
       res.status(500).json('not able to Delete student data internally') 
    }
  
})

//filter by age

router.get('/age', async (req, res) => {
    try {

        const query = +req.query.age;
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page - 1) * size;
        
       
        const student = await Student.find({ age: { $eq: query } }).skip(offset).limit(size).lean().exec();

        const totalDoc = await Student.find(query).countDocuments();

        const noPages = Math.ceil(totalDoc / size)

        res.status(200).json({ student, totalDoc, noPages })
    } catch (err) {
        res.status(200).json('not able to find by age filter internally')
    }
  
});

router.get('/city', async (req, res) => {
    try {
        const query = req.query.city;
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page - 1) * size;
        
        //console.log(query)
        const students = await Student.find({ city: query }).skip(offset).limit(size).lean().exec();
       // console.log(student)
        const totalDoc = await Student.find({ city: query }).countDocuments();

        const noPages = Math.ceil(totalDoc / size)

        res.status(200).json({ students, totalDoc, noPages });
    } catch (err) {
        res.status(500).json('not able to find by city filter internally',)
    }
  
});

router.get('/gender', async (req, res) => {
    try {
        const query = req.query.gender;
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page - 1) * size;

        const students = await Student.find({ gender: query }).skip(offset).limit(size).lean().exec();
        const totalDoc = await Student.find({ gender: query }).countDocuments();

        const noPages = Math.ceil(totalDoc / size)

        res.status(200).json({students, totalDoc, noPages })
    } catch (err) {
        res.status(200).json('not able to find by gender filter internally')
    }
  
});

router.get('/age/sort/ascending', async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.body.size || 10;
        const offset = (page - 1) * 10;
        const query = null;
        

        const students = await Student.find(query).sort({age:1}).skip(offset).limit(size).lean().exec();
        const totalDoc = await Student.find(query).countDocuments();
        const noPages = Math.ceil(totalDoc / size);
        res.status(200).json({ students, totalDoc, noPages });
    } catch (err) {
        res.status(200).json('not able  sort in Ascending order internally')
    }
  
});

router.get('/age/sort/decending', async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.body.size || 10;
        const offset = (page - 1) * 10;
        const query = null;
        

        const students = await Student.find(query).sort({age:-1}).skip(offset).limit(size).lean().exec();
        const totalDoc = await Student.find(query).countDocuments();
        const noPages = Math.ceil(totalDoc / size);
        res.status(200).json({ students, totalDoc, noPages });
    } catch (err) {
        res.status(200).json('not able  sort in Decending order internally')
    }
  
});




module.exports = router;


// const express = require("express")

// const Student = require("../Models/student.model")

// const router = express.Router();

// router.post('', async (req, res) => {
//     const student = await Student.create(req.body);
//     return res.status(201).json({ student })
// })

// // router.get('', async (req, res) => {
// //     const students = await Student.find().lean().exec();
// //     return res.status(200).json({ students })
// // })

// router.get('/ascending', async (req, res) => {
//     // const ascending = req.query.ascending || false;
    
//         const students = await Student.find().sort({'age': 1}).limit(10).lean().exec();
//         return res.status(200).json({ students })
    
// })

// router.get('/decending', async (req, res) => {
//     const students = await Student.find().sort({'age': -1}).limit(10).lean().exec();
//     return res.status(200).json({ students })
// })

// router.get('/', async (req, res) => {
//     const page = +req.query.page || 1;
//     const size = +req.query.size || 10;

//     const offset = (page-1) * size;

//     const students = await Student.find().skip(offset).limit(size).lean().exec();

//     const totalDocuments = await Student.find().skip(offset).limit(size).countDocuments();
//     const totalPages = Math.ceil(totalDocuments / size);

//     return res.status(200).json({ students, totalPages })
// })

// // router.get('/:id', async (req, res) => {
// //     const student = await Student.findById(req.params.id).lean().exec();
// //     return res.status(200).json({ student })
// // })
// router.patch('/:id', async (req, res) => {
//     const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
//     return res.status(200).json({ student })
// })
// router.delete('/:id', async (req, res) => {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     return res.status(200).json({ student })
// })

// module.exports = router;