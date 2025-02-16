import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TRIPS_URL = process.env.TRIPS_URL;

export const trips = async (req, res) => {
    try {
        const query = req.query.keyword || "";
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 4;
        const startIndex = (page - 1) * limit;

        console.log(`[${TRIPS_URL}] Request: keyword=${query}, page=${page}, limit=${limit}`);

        const { data: trips = [] } = await axios.get(`${TRIPS_URL}/trips`);

        const filteredTrips = query
            ? trips.filter(trip =>
                trip.title.includes(query) ||
                trip.description.includes(query) ||
                trip.tags.includes(query)
            )
            : trips;

        const paginatedTrips = filteredTrips.slice(startIndex, startIndex + limit);

        res.status(200).json({
            success: true,
            data: {
                page,
                limit,
                total: filteredTrips.length,
                data: paginatedTrips
            }
        });
    } catch (error) {
        console.error("trips Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const trip = async (req, res) => {
    try {
        const eid = req.query.eid;
        if (!eid) {
            return res.status(400).json({ success: false, message: "Missing 'eid' parameter" });
        }

        const { data: tripData } = await axios.get(`${TRIPS_URL}/trips?eid=${eid}`);
        res.status(200).json({ success: true, data: tripData });
    } catch (error) {
        console.error("trip Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
