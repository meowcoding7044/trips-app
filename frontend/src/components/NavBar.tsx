import React from "react";
import { VStack, HStack, Text, Box, Input, IconButton } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface NavBarProps {
  title?: string;
  onSubmit: () => void;
  onSearch: (value: string) => void; 
}
const NavBar = ({ title = "เที่ยวไหนดี", onSubmit, onSearch }: NavBarProps) => {
  return (
    <VStack p={4} background={"gray.900"} justifyContent={"center"}>
      <Text textStyle="4xl">{title}</Text>
      <Box w="50%">
        <HStack>
          <Input placeholder="search.." fontSize={"md"} onChange={(e) => onSearch(e.target.value)}/>
          <IconButton aria-label="Search" onClick={onSubmit}>
            <LuSearch />
          </IconButton>
        </HStack>
      </Box>
    </VStack>
  );
};

export default NavBar;
