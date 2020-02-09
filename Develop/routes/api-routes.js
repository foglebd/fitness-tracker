const Workout = require ("../models/workout");
const router = require ("express").Router();

router.post("/api/workouts", (req, res) => {
  console.log(req)
  var exercise = {
      exercises:
          {
              type: req.type,
              name: req.name,
              duration: req.duration,
              weight: req.weight,
              reps: req.reps,
              sets: req.sets,
              distance: req.distance
          },

  };

  Workout.create(exercise, (err, result) => {
      if (err) {
          console.log(err)
      }
      console.log(result)
  })
      .then(workoutDB => {
          console.log(workoutDB)
          res.json(workoutDB);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

//add the exercise to the current workout
router.put("/api/workouts/:id", (req, res) => {
  var exercise = req.body;
  Workout.findByIdAndUpdate(req.params.id, {
      $push: { exercises: exercise }
  }, { new: true })
      .then(function (workoutDB) {
          res.json(workoutDB);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
      .then(workoutDB => {
          res.json(workoutDB)
      })
      .catch(err => {
          res.status(400).json(err);
      });
});
