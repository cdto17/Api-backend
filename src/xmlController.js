const express = require('express');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const router = express.Router();

// Datos simulados para las canciones
let songs = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975, coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png' },
    { id: 2, title: 'Imagine', artist: 'John Lennon', year: 1971, coverImage: 'https://upload.wikimedia.org/wikipedia/en/6/69/ImagineCover.jpg' },
    { id: 3, title: 'Hotel California', artist: 'Eagles', year: 1976, coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg' },
];

// Obtener todas las canciones
router.get('/songs', (req, res) => {
    const xmlSongs = songs.map(song => ({
        song: {
            id: song.id,
            title: song.title,
            artist: song.artist,
            year: song.year,
            coverImage: song.coverImage
        }
    }));
    const xml = builder.buildObject({ songs: xmlSongs });
    res.type('application/xml');
    res.send(xml);
});

// Obtener una canciones por ID
router.get('/songs/:id', (req, res) => {
    const song = songs.find(m => m.id == req.params.id);
    if (song) {
        const xml = builder.buildObject({ song: { ...song } });
        res.type('application/xml');
        res.send(xml);
    } else {
        res.status(404).send('<error>Song not found</error>');
    }
});

// Agregar una nueva canciones
router.post('/songs', (req, res) => {
    xml2js.parseString(req.body, (err, result) => {
        if (err) {
            res.status(400).send('<error>Invalid XML</error>');
        } else {
            const newSong = {
                id: songs.length + 1,
                title: result.song.title[0],
                artista: result.song.artist[0],
                year: parseInt(result.song.year[0]),
                coverImage: result.song.coverImage[0]
            };
            songs.push(newSong);
            const xml = builder.buildObject({ songs: newSong });
            res.type('application/xml');
            res.send(xml);
        }
    });
});

// Actualizar una canciones por ID
router.put('/songs/:id', (req, res) => {
    xml2js.parseString(req.body, (err, result) => {
        if (err) {
            res.status(400).send('<error>Invalid XML</error>');
        } else {
            const index = songs.findIndex(m => m.id == req.params.id);
            if (index !== -1) {
                songs[index] = { ...songs[index], ...result.song };
                const xml = builder.buildObject({ song: songs[index] });
                res.type('application/xml');
                res.send(xml);
            } else {
                res.status(404).send('<error>Song not found</error>');
            }
        }
    });
});

// Eliminar una canciones por ID
router.delete('/songs/:id', (req, res) => {
    const index = songs.findIndex(m => m.id == req.params.id);
    if (index !== -1) {
        const deletedSong = songs.splice(index, 1);
        const xml = builder.buildObject({ song: deletedSong[0] });
        res.type('application/xml');
        res.send(xml);
    } else {
        res.status(404).send('<error>CSong not found</error>');
    }
});

module.exports = router;
