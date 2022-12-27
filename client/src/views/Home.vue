<template>
  <Header />
  <HeroComponent :heroParam="moviesHeroParam" />
  <main class="main">
    <MovieListComponent :movie="item" :key="index" v-for="(item, index) in listInfo" />

  </main>


</template>

<script setup>
import HeroComponent from "../components/Hero.vue"
import MovieListComponent from "../components/MovieList.vue"
import Header from "../components/Header.vue"
let listInfo = [
  { type: "movie", title: "Trending Now", genreId: 28 },
  { type: "tv", title: "Watch It Again", genreId: 10759 },
  { type: "movie", title: "Recently Added", genreId: 10751 },
  { type: "tv", title: "Popular Tv Shows", genreId: 16 },
  { type: "movie", title: "Crime & Thrillers", genreId: 80 },
  { type: "tv", title: "Top Rated", genreId: 35 },
];
let moviesHeroParam = "movie/popular";


</script>