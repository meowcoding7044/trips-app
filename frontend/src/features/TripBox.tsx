import { Card, Text, Box, VStack, HStack, Image, Wrap } from "@chakra-ui/react";
import EmptyImage from '@/assets/empty.png';
import { TripDataType } from "@/types/trip";

interface TripBoxProps {
  data: TripDataType;
}
const TripBox = ({ data }: TripBoxProps) => {
  const truncateText = (text: string, length: number) =>
    text.length > length ? `${text.substring(0, length)}...` : text;

  return (
    <Box
      w="80%"
      h="450px"
      p="4"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <HStack align="start" gap={6}>
        {/* Main Image */}
        <Box
          w="250px"
          h="400px"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
        >
          <Image
            src={data.photos?.[0] ? data.photos[0] : EmptyImage}
            alt={data.title}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>

        {/* Trip Info */}
        <VStack align="start" gap={3} w="100%" h="100%">
          <Box>
            <a href={data.url} style={{ cursor: "pointer" }}>
              <Text fontSize="xl" fontWeight="bold" color="black">
                {truncateText(data.title, 50)}
              </Text>
            </a>
          </Box>
          <Text fontSize="md" color="gray.600">
            {truncateText(data.description, 200)}
            <a href={data.url} style={{ color: "blue" }}>
              {" "}
              อ่านต่อ
            </a>
          </Text>
          <Wrap>
            <Text fontSize="md" color="gray.600" fontWeight="bold">
              Tags:
            </Text>
            {data.tags.map((tag, index) => (
              <a key={index} href={`${window.location.origin}/?keyword=${tag}`}>
                <Text
                  color="gray.800"
                  textDecoration="underline"
                  _hover={{ color: "blue.500", cursor: "pointer" }}
                >
                  {tag}
                </Text>
              </a>
            ))}
          </Wrap>

          {/* Image Gallery */}
          <HStack w="100%" mt="10px" overflowX="auto" gap={4} p={2}>
            {data.photos.slice(1).map((img, index) => (
              <Image
                key={index}
                src={img || EmptyImage}
                alt={`image-${index}`}
                w="150px"
                h="150px"
                objectFit="cover"
                borderRadius="md"
              />
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TripBox;
