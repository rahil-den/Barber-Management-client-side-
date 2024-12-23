import client from "../database/db.js";

const addUser = async (req, res) => {
  try {
    // Set the search path to the 'admin' schema
    await client.query("SET search_path TO 'admin'");

    // Log the request body to check the incoming data
    console.log(req.body);
    
    // Destructure values from the request body
    let { user_name, user_password, user_email, user_phone } = req.body;

    // Parse user_phone to ensure it's a valid number
    user_phone = parseInt(user_phone);

    // Validate user_phone (if needed, for example, check if it's a valid phone number format)
    if (isNaN(user_phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    // Insert the user into the database
    const result = await client.query(
      `INSERT INTO "user"("user_name", "user_password", "user_email", "user_phone") 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_name, user_password, user_email, user_phone]
    );

    // Log that the user was inserted
    console.log("User inserted");

    // Send a success response with the inserted user
    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0]  // Return the first row (the inserted user)
    });
  } catch (err) {
    // Log the error and send a failure response
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const addAppointment = async (req, res) => {
  
  console.log(req.body);
  //add appointment into database with some validation
  try {
    // Set the search path to the 'admin' schema
    await client.query("SET search_path TO 'admin'");

    // Destructure values from the request body
    let { barber_id, appointment_date, customer_name, payment } = req.body;

    // Validate the appointment_date (if needed, for example, check if it's a valid date format)
    if (!appointment_date) {
      return res.status(400).json({ error: "Invalid appointment date" });
    }

    // Insert the appointment into the database
    const result = await client.query(
      `INSERT INTO "appointment"("barber_id", "appointment_date", "customer_name", "payment") 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [barber_id, appointment_date, customer_name, payment]
    );

    // Log that the appointment was inserted
    console.log("Appointment inserted");

    // Send a success response with the inserted appointment
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: result.rows[0]  // Return the first row (the inserted appointment)
    });
  } catch (err) {
    // Log the error and send a failure response
    console.error("Error inserting appointment:", err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
}

export { addUser, addAppointment };

