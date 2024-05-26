const express = require('express');
const router = express.Router();

// Lista de canciones
let songs = [
    {
        "id": 1,
        "title": "Bohemian Rhapsody",
        "artist": "Queen",
        "year": 1975,
        "coverImage": "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png",
        
    },
    {
        "id": 2,
        "title": "Imagine",
        "artist": "John Lennon",
        "year": 1971,
        "coverImage": "https://upload.wikimedia.org/wikipedia/en/6/69/ImagineCover.jpg",
        
    },
    {
        "id": 3,
        "title": "Hotel California",
        "artist": "Eagles",
        "year": 1976,
        "coverImage": "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg",
        
    }
];

// Obtener todas las canciones
router.get('/songs', (req, res) => {
    res.json(songs);
});

// Obtener una sola canción por ID
router.get('/songs/:id', (req, res) => {
    const song = songs.find(m => m.id === parseInt(req.params.id));
    if (!song) return res.status(404).send('La canción no fue encontrada');
    res.json(song);
});

// Crear una nueva canción 
router.post('/songs', (req, res) => {
    const newSong = {
        id: songs.length + 1,
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        coverImage: req.body.coverImage,
        listenLink: req.body.listenLink // Agregar el enlace para escuchar la canción desde el cuerpo de la solicitud
    };
    songs.push(newSong);
    res.status(201).json(newSong);
});

// Actualizar una canción existente
router.put('/songs/:id', (req, res) => {
    const song = songs.find(m => m.id === parseInt(req.params.id));
    if (!song) return res.status(404).send('La canción no fue encontrada');

    song.title = req.body.title;
    song.artist = req.body.artist;
    song.year = req.body.year;
    song.coverImage = req.body.coverImage;
    song.listenLink = req.body.listenLink; // Actualizar el enlace para escuchar la canción si se proporciona
    res.json(song);
});

// Eliminar una canción
router.delete('/songs/:id', (req, res) => {
    const songIndex = songs.findIndex(m => m.id === parseInt(req.params.id));
    if (songIndex === -1) return res.status(404).send('La canción no fue encontrada');

    const deletedSong = songs.splice(songIndex, 1);
    res.json(deletedSong);
});

module.exports = router;