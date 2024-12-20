import client from '../database/db.js';


const fetchbar = async (req, res) => {
    try {
        console.log('Setting search_path...');
        await client.query("set search_path to 'admin'");
        console.log('Running query...');
        const result = await client.query('SELECT * FROM barber');
        console.log('Query successful:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: err.message });
    }
};

export {fetchbar};