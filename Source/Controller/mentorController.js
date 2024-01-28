import mongodb , { MongoClient } from "mongodb";
import DB from "../Database/db.js";

const client = new MongoClient(DB.DB_URL);
const dbName = DB.DB_NAME;

// Create Mentor
const mentorAdd = async (req, res) => {
  try {
    await client.connect();

    const db = await client.db(dbName);
    const user = await db
      .collection("mentors")
      .findOne({ email: req.body.email });

    if (!user) {
      const createOne = await db.collection("mentors").insertOne(req.body);
      res.status(201).send({
        message: " Created Successfully",
      });
    } else {
      res.status(409).send({
        message: `Already exist`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Invaid Data",
    });
  } finally {
    await client.close();
  }
};

// Read Mentor
const mentorList = async (req, res) => {
  try {
    await client.connect();
    const db = await client.db(dbName);
    const user = await db.collection("mentors").find().toArray();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Invalid",
    });
  } finally {
    await client.close();
  }
};



// Create Student
const studentAdd = async (req, res) => {
  try {
    await client.connect();

    const db = await client.db(dbName);
    const user = await db
      .collection("student")
      .findOne({ email: req.body.email });

    if (!user) {
      const createOne = await db.collection("student").insertOne(req.body);
      res.status(201).send({
        message: " Created Successfully",
      });
    } else {
      res.status(409).send({
        message: `Already exist`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Invaid Data",
    });
  } finally {
    await client.close();
  }
};



const selectStudent = async (req, res) => {
  try {
    await client.connect();

    const db = await client.db(dbName);
    const user = await db
      .collection("mentors")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (user) {
      const updateOne = await db
        .collection("mentors")
        .updateOne(
            { _id: new mongodb.ObjectId(req.params.id)},
          { $set: req.body  }
        );
      res.status(200).send({
        message: " Student assigned to mentor successfully.",
      });
    } else {
      return res.status(400).json({ message: "Student already has a mentor." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Invaid Data",
    });
  } finally {
    await client.close();
  }
};



// select mentor
const selectMentorById = async (req, res) => {
  try {
    await client.connect();

    const db = await client.db(dbName);
    const user = await db
      .collection("mentors")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
      res.status(200).send({
        message: "Mentor Id",
        user
      })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Invaid Data",
    });
  } finally {
    await client.close();
  }
};




// Read Student
const studentList = async (req, res) => {
  try {
    await client.connect();
    const db = await client.db(dbName);
    const user = await db.collection("student").find().toArray();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Invalid",
    });
  } finally {
    await client.close();
  }
};




// Mentor Select
const mentorStudents = async (req, res) => {
    try {
     // Assuming mentorName is provided as a URL parameter
  
      await client.connect();
      const db = await client.db(dbName);
  
      // Find all students with the given mentorName
      
      const students = await db.collection("student").find({ mentorName: req.params.mentorName }).toArray();
  
      res.status(200).send(students);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Invalid",
      });
    } finally {
      await client.close();
    }
  };



const studentAll = async (req, res) => {
    try {
     // Assuming mentorName is provided as a URL parameter
  
      await client.connect();
      const db = await client.db(dbName);
  
      // Find all students with the given mentorName
      
      const students = await db.collection("student").find({ name: req.params.name }).toArray();
  
      res.status(200).send(students);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Invalid",
      });
    } finally {
      await client.close();
    }
  };
  


export default {
  mentorAdd,
  mentorList,
  studentAdd,
  studentList,
  selectStudent,
  selectMentorById,
  mentorStudents,
  studentAll
};
