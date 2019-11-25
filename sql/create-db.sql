CREATE TABLE Category (
  id SERIAL,
  name VARCHAR(300),
  description VARCHAR(1100),
  PRIMARY KEY (id)
);

CREATE TABLE Lift (
  id SERIAL,
  categoryID SERIAL REFERENCES Category(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name VARCHAR(300),
  description VARCHAR(1100),
  PRIMARY KEY (id)
);
-------------------------------------------------------
CREATE TABLE Workout (
  id SERIAL,
  startTime TIMESTAMP,
  endTime TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE WorkoutLift (
  id SERIAL,
  workoutID SERIAL REFERENCES Workout(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name VARCHAR(300),
  description VARCHAR(1100),
  PRIMARY KEY (id)
);

CREATE TABLE LiftSet (
  id SERIAL,
  workoutLiftID SERIAL REFERENCES WorkoutLift(id) ON DELETE CASCADE ON UPDATE CASCADE,
  weight DOUBLE PRECISION,
  reps INT,
  PRIMARY KEY (id)
);