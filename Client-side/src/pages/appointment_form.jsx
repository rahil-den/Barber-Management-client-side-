import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Alert,
} from "@mui/material";
import { addappointment } from "../service/api.js";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    barber_id: "",
    appointment_date: "",
    customer_name: "",
    payment: 50.00, // Fixed payment amount
  });

  const [barbers, setBarbers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch barbers from the API
  useEffect(() => {
    fetch("http://localhost:3000/allBarber")
      .then((res) => res.json())
      .then((data) => setBarbers(data))
      .catch((err) => console.error("Error fetching barbers:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    setSuccessMessage(""); // Clear previous success messages

    // Validation: Check for empty fields
    if (!formData.barber_id || !formData.appointment_date || !formData.customer_name) {
      setErrorMessage("All fields are required.");
      return; // Stop submission if fields are empty
    }

    // If all fields are valid, show success message
    setSuccessMessage("Appointment created successfully!");

    // Call the API to add the appointment
    try {
      const response = await addappointment(formData);
      console.log("Appointment Response:", response);
    } catch (error) {
      console.error("Error adding appointment:", error);
      setErrorMessage("There was an error creating the appointment.");
    }

    // Reset form data (keeping fixed payment)
    setFormData({
      barber_id: "",
      appointment_date: "",
      customer_name: "",
      payment: 50.00, // Fixed payment amount
    });

    setTimeout(() => {
      setSuccessMessage(""); // Hide success message after 3 seconds
    }, 3000);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Create Appointment
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Barber</InputLabel>
                <Select
                  label="Barber"
                  name="barber_id"
                  value={formData.barber_id}
                  onChange={handleChange}
                >
                  {barbers.map((barber) => (
                    <MenuItem key={barber.barber_id} value={barber.barber_id}>
                      {barber.barber_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Choose a barber</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Appointment Date"
                name="appointment_date"
                type="datetime-local"
                value={formData.appointment_date}
                onChange={handleChange}
                variant="outlined"
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Customer Name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Payment is to be made of 50 rupees for booking your appointment
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="Payment"
                name="payment"
                type="number"
                value={formData.payment}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{
                  inputProps: { min: 50, readOnly: true }, // Making the input readonly
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AppointmentForm;
