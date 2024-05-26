const { gql } = require('apollo-server-express');

// Definir el esquema GraphQL
const typeDefs = gql`
type Song {
    id: ID!
    title: String!
    artist: String!
    year: Int!
    coverImage: String
  }
  
  type Query {
    songs: [Song]
    song(id: ID!): Song
  }
  
  type Mutation {
    addSong(title: String!, artist: String!, year: Int!, coverImage: String): Song
    updateSong(id: ID!, title: String!, artist: String!, year: Int!, coverImage: String): Song
    deleteSong(id: ID!): Song
  }
`;

// Datos de canciones(quemado)
let songs = [
    {
        "id": "1",
        "title": "Bohemian Rhapsody",
        "artist": "Queen",
        "year": 1975,
        "coverImage": "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png"
    },
    {
        "id": "2",
        "title": "Imagine",
        "artist": "John Lennon",
        "year": 1971,
        "coverImage": "https://upload.wikimedia.org/wikipedia/en/6/69/ImagineCover.jpg"
    },
    {
        "id": "3",
        "title": "Hotel California",
        "artist": "Eagles",
        "year": 1976,
        "coverImage": "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg"
    }
];

// Resolvers para las consultas y mutaciones
const resolvers = {
    Query: {
        songs: () => songs,
        song: (_, { id }) => songs.find(song => song.id === id),
    },
    Mutation: {
        addSong: (_, { title, artist, year, coverImage }) => {
            const id = String(songs.length + 1);
            const newSong = { id, title, artist, year, coverImage };
            songs.push(newSong);
            return newSong;
        },
        updateSong: (_, { id, title, artist, year, coverImage }) => {
            const index = songs.findIndex(song => song.id === id);
            if (index === -1) {
                throw new Error('Song not found');
            }
            songs[index] = { ...songs[index], title, artist, year, coverImage };
            return songs[index];
        },
        deleteSong: (_, { id }) => {
            const index = songs.findIndex(song => song.id === id);
            if (index === -1) {
                throw new Error('Song not found');
            }
            const [deletedSong] = songs.splice(index, 1);
            return deletedSong;
        }
    }
};

module.exports = { typeDefs, resolvers };
