import React from "react";
import { Flex, Heading } from "leek-uikit";
import Hero from "./Hero";
import Map from "./Map/MapBox";

const Billboard = () => {
    return (
        <div>
            <Hero />
            <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
                <Heading size="xl" color="secondary" mt="40px" mb="40px" fontSize="50px">
                    Participate our Billboard Right now!
                </Heading>
            </Flex>
            <Map />
        </div>
    )
}

export default Billboard
