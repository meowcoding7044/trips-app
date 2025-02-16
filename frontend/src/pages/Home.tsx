import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Box, Container } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import TripBox from "@/features/TripBox";
import { TripDataType } from "@/types/trip";
import { URL_TRIP } from "@/url";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keywordFromURL = queryParams.get("keyword") || "";

  const [search, setSearch] = useState(keywordFromURL);
  const [trips, setTrips] = useState<TripDataType[]>([]);
  //const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchTripApi = async () => {
    try {
      //if (!search) return;

      const { data } = await axios.get(`${URL_TRIP}/api/trips`, {
        params: { keyword: search },
      });
      setTrips(data?.data?.data || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    setSearch(keywordFromURL);
  }, [keywordFromURL]);

  useEffect(() => {
    fetchTripApi();
  }, []);
  
  return (
    <Box>
      <Box
        as="header"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        zIndex="1000"
        bg="white"
        boxShadow="md"
      >
        <NavBar onSearch={setSearch} onSubmit={fetchTripApi} />
      </Box>

      <Container maxW="container.lg" pt="150px">
        <Stack gap={4} alignItems="center">
          {trips.length > 0 ? (
            trips.map((trip) => <TripBox key={trip.eid} data={trip} />)
          ) : (
            <p>No trips available</p>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
