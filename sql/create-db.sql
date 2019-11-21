CREATE TABLE Category (
  id SERIAL,
  name VARCHAR(300),
  description VARCHAR(1100),
  PRIMARY KEY (id)
);

CREATE TABLE Lift (
  id SERIAL,
  category_id SERIAL REFERENCES Category(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name VARCHAR(300),
  description VARCHAR(1100),
  PRIMARY KEY (id)
);
-------------------------------------------------------
CREATE TABLE Workout (
  id SERIAL,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE Workout_Lift (
  id SERIAL,
  workout_id SERIAL REFERENCES Workout(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name VARCHAR(300),
  description VARCHAR(1100),
  PRIMARY KEY (id)
);

CREATE TABLE Lift_Set (
  id SERIAL,
  workout_lift_id SERIAL REFERENCES Workout_Lift(id) ON DELETE CASCADE ON UPDATE CASCADE,
  weight DOUBLE PRECISION,
  reps INT,
  PRIMARY KEY (id)
);