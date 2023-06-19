import React, { useState, useEffect } from 'react';
import './App.css';
import { OneCard } from './components/OneCard';
import { Header } from './components/Header';
import { Geo } from './components/Geo';
import { ChakraProvider, SimpleGrid, Text, Box, Stack } from "@chakra-ui/react";
import { constellation } from "./components/types";

function App() {
  const [constellationData, setConstellationData] = useState<constellation[]>([]);
  const [position, setPosition] = useState<string[]>(["139.577088", "35.706628"]);
  const [printDate, setPrintDate] = useState<string>("");

  useEffect(() => {
    // 設定項目
    const dateObject = new Date();
    const date = `${dateObject.getFullYear()}-${('0' + (dateObject.getMonth() + 1).toString()).slice(-2)}-${('0' + (dateObject.getDate()).toString()).slice(-2)}`;
    const hour = dateObject.getHours().toString();
    const minute = dateObject.getMinutes().toString();
    setPrintDate(`${date} ${hour}:${minute}`);

    // API用
    const params = {
      lat: position[0],
      lng: position[1],
      date: date,
      hour: hour,
      min: minute,
      disp: "off",
    };

    const query = new URLSearchParams(params).toString();
    const url = `https://livlog.xyz/hoshimiru/constellation?${query}`;

    // APIを叩く 「星を見る人」
    (async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const tmpArrayForAdd: constellation[] = [];
        data["result"].forEach((element: any, index: number) => {
          const one: constellation = {
            id: index,
            name: element["jpName"],
            altitude: element["altitude"],
            content: element["content"],
            direction: element["direction"],
            origin: element["origin"],
            starIcon: element["starIcon"],
            starImage: element["starImage"],
            directionNum: element["directionNum"],
            enName: element["enName"],
            altitudeNum: element["altitudeNum"]
          };
          if (one["altitudeNum"] >= 30) {
            tmpArrayForAdd.push(one);
          }
        });
        // 配列を方角順に並べ替える
        for (let i = 0; i < tmpArrayForAdd.length - 1; i++){
          for (let j = 0; j < tmpArrayForAdd.length - 1; j++){
            if (tmpArrayForAdd[j]["directionNum"] > tmpArrayForAdd[j + 1]["directionNum"]) {
              const tmp = tmpArrayForAdd[j];
              tmpArrayForAdd[j] = tmpArrayForAdd[j + 1];
              tmpArrayForAdd[j + 1] = tmp;
            }
          }
        }
        setConstellationData(tmpArrayForAdd);
      } catch (error) {
        console.log("ERROR!: ", error);
      }
    })();
  }, [position]);

  return (
    <ChakraProvider>
      <Header />
      <Box maxW="950px" m="30px auto">
        <Stack spacing={2} mb="30px">
          <Text>取得時間: {printDate}</Text>
          <Text>取得位置: 経度={position[0]} 緯度={position[1]}</Text>
          <Geo setPosition={setPosition} position={position} />
        </Stack>
        {(() => {
          if (constellationData.length === 0) {
            return (<Text>NOW LOADING</Text>)
          }
        })()}
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {constellationData.map((constellation) => {
            return (
              <OneCard constellationData={constellation} key={constellation["id"].toString()} />
            );
          })}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
