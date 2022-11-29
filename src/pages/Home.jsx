import { CircularProgress, Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React from "react";
import NavBar from "../components/Navbar/index";
import PokemonCard from "../components/PokemonCard";
import toFirstCharUppercase from '../utils/constants'
export const Home = () => {
  const [pokemons, setPokemons] = React.useState([]);
  const [sprites, setSprites] = React.useState([]);

  React.useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    let endpoints = [];
    let sprites = []
    for (let i = 0; i < 150; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i+1}/`);
      sprites.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`)
    }

    const response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));

    setSprites(sprites)
    return response;
  };


  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        {pokemons.length > 0 ? (
          <Grid container spacing={3}>
            {pokemons.map((pokemon, key) => (
              <Grid item xs={3} key={key}>
                <PokemonCard
                  name={toFirstCharUppercase(pokemon.data.name)}
                  sprite={sprites[key]}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </div>
  );
};
