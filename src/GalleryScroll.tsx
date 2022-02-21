import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  motion,
  useElementScroll,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const MotionBox = motion<BoxProps>(Box);
const MotionFlex = motion<FlexProps>(Flex);

const fadeIn: Variants = {
  fadeIn: {
    opacity: 1,
    transition: {
      delay: 1,
    },
  },
  fadeOut: {
    opacity: 0,
  },
};

const GalleryScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useElementScroll(ref);

  // todo: get container height
  const [galContainerHeight, setGalContainerHeight] = useState(0);

  const galHEl = useMotionValue(0);
  // todo: animate the heading base on gallery container height
  const galHScroll = useTransform(galHEl, [0, 100], ["0%", "100%"]);
  useEffect(() => {
    // if()
    const unsubscribeScrollY = scrollY.onChange((v) => console.log(v));
    const unsubscribeScrollYProgress = scrollYProgress.onChange((v) =>
      console.log("progress", v)
    );
    return () => {
      unsubscribeScrollY();
      unsubscribeScrollYProgress();
    };
  }, []);

  // todo: skew and scroll anim
  // todo: scroll reset
  const galleriesEl = galleries.map((gallery) => (
    <MotionFlex
      key={gallery.id}
      h="80vh"
      scrollSnapAlign="center"
      justify="center"
      align="center"
      py={12}
    >
      <Box w="380px" h="full" bgColor="green.300"></Box>
    </MotionFlex>
  ));

  const galleryHeading = galleries.map((gallery) => (
    <Heading key={gallery.id} size="3xl">
      {gallery.title}
    </Heading>
  ));

  return (
    <MotionBox
      ref={ref}
      overflowY="scroll"
      scrollSnapType="y mandatory"
      height="100vh"
      width="full"
      p={0}
      m={0}
      variants={fadeIn}
      initial="fadeOut"
      animate="fadeIn"
      position="relative"
    >
      <Box position="sticky" top={0} w="340px" h="100vh" px={8}>
        <Flex align="center" justify="center" w="full" h="full">
          <Box h="60px" overflow="hidden" w="full">
            {/* todo: animate overflow */}
            <MotionBox>{galleryHeading}</MotionBox>
          </Box>
        </Flex>
      </Box>
      {galleriesEl}
    </MotionBox>
  );
};

export default GalleryScroll;

interface Gallery {
  id: string;
  url: string;
  title: string;
}

const galleries: Gallery[] = [
  {
    id: "1",
    url: "",
    title: "Gallery 1",
  },
  {
    id: "2",
    url: "",
    title: "Gallery 2",
  },
  {
    id: "3",
    url: "",
    title: "Gallery 3",
  },
  {
    id: "4",
    url: "",
    title: "Gallery 4",
  },
];
