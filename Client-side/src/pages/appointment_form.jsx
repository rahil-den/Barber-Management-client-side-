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

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    barber_id: "",
    user_id: "",
    appointment_date: "",
    customer_name: "",
    payment: 0.00,
    status: "pending",
  });

  const [barbers, setBarbers] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch barbers and users from the backend
  useEffect(() => {
    // Fetch barbers
    fetch("http://localhost:5000/api/barbers")
      .then((res) => res.json())
      .then((data) => setBarbers(data))
      .catch((err) => console.error("Error fetching barbers:", err));

    // Fetch users
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validation Example: Check for empty fields
    if (
      !formData.barber_id ||
      !formData.user_id ||
      !formData.appointment_date ||
      !formData.customer_name
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Simulate sending data to the backend
    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Appointment created successfully!");
        setFormData({
          barber_id: "",
          user_id: "",
          appointment_date: "",
          customer_name: "",
          payment: 0.00,
          status: "pending",
        });
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMessage("Error connecting to the server.");
    }
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
              <FormControl fullWidth required>
                <InputLabel>User</InputLabel>
                <Select
                  label="User"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                >
                  {users.map((user) => (
                    <MenuItem key={user.user_id} value={user.user_id}>
                      {user.user_name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Choose a user</FormHelperText>
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
                  inputProps: { min: 0 },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="canceled">Canceled</MenuItem>
                </Select>
              </FormControl>
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
