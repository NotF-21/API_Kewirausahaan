const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);

const users= [
    { id: 1, first_name: "Dudi", last_name: "Test", email: "duditest@gmail.com", password: "123" },
    { id: 2, first_name: "Toni", last_name: "Benny", email: "tonb@gmail.com", password: "123" },
];

const stories= [
    { 
        id: 1, 
        title: "Judul Story 1", 
        authorId: 1,
        image: "https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        characters: [
            {
                id: 1,
                nama: "Pak Albert",
                peran: "Main Character",
                umur: 40,
                sifat: "Baik, Dermawan, Kaya",
                backstory: "Seorang pengusaha sukses yang dermawan sekaligus sebagai ayah dari Hansen",
            },
            {   
                id: 2,
                nama: "Hansen",
                peran: "Main Character",
                umur: 20,
                sifat: "Pemberani, Suka Menolong",
                backstory: "Anak dari pengusaha sukses yang terkenal",
            },
        ],

    },
    { 
        id: 2, 
        title: "Judul Story 2", 
        authorId: 1,
        image: "https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg",
        characters: [
            {
                id: 1,
                nama: "Pak Albert",
                peran: "Main Character",
                umur: 40,
                sifat: "Baik, Dermawan, Kaya",
                backstory: "Seorang pengusaha sukses yang dermawan sekaligus sebagai ayah dari Hansen",
            },
            {
                id: 2,
                nama: "Hansen",
                peran: "Main Character",
                umur: 20,
                sifat: "Pemberani, Suka Menolong",
                backstory: "Anak dari pengusaha sukses yang terkenal",
            },
        ],

    },
    { 
        id: 3, 
        title: "Judul Story 3", 
        authorId: 1,
        image: "https://cdn.pixabay.com/photo/2017/01/28/17/43/fish-2016013_1280.jpg",
        characters: [
            {
                id: 1,
                nama: "Rudi",
                peran: "Main Character",
                umur: 30,
                sifat: "Baik, Rajin dan Sabar",
                backstory: "Seorang laki-laki yang suka melihat pemandangan pantai",
            },
            {
                id: 2,
                nama: "Doni",
                peran: "Side Character",
                umur: 20,
                sifat: "Pemberani, Suka Menolong, Humoris",
                backstory: "Anak dari pengusaha sukses yang memiliki pabrik gula di jawa timur",
            },
        ],

    },
    { 
        id: 4, 
        title: "Cerita Taman Bunga", 
        authorId: 2,
        image: "https://cdn.pixabay.com/photo/2016/03/08/20/03/flag-1244649_1280.jpg",
        characters: [
            {
                id: 1,
                nama: "Rudi",
                peran: "Main Character",
                umur: 30,
                sifat: "Baik, Rajin dan Sabar",
                backstory: "Seorang laki-laki yang suka melihat pemandangan pantai",
            },
            {
                id: 2,
                nama: "Doni",
                peran: "Side Character",
                umur: 20,
                sifat: "Pemberani, Suka Menolong, Humoris",
                backstory: "Anak dari pengusaha sukses yang memiliki pabrik gula di jawa timur",
            },
        ],

    },
];


//Endpoint Users

app.get("/api/users", function(req, res){
    return res.status(200).send(users);
});

app.post("/api/users", function (req, res) {
    let {firstName, lastName, email, password} = req.body;

    let newId = 1;
    if(users.length > 0){
        newId = users[users.length-1].id+1;
    }else{
        newId = 1;
    }

    let newUser = {
        id: newId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
    };
    users.push(newUser);
    return res.status(201).send(newUser);
});

app.get("/api/users/:id", function(req, res){
    let id = req.params.id;
    const idx = users.findIndex((u) => u.id == id);
    if (idx == -1) {
      return res.status(404).send({ message: "Not Found" });
    } else {
      return res.status(200).send(users[idx]);
    }
    
});

app.put("/api/users/:id", function (req, res) {
    let {firstName, lastName, email, password} = req.body;
    let id = req.params.id;
    const idx = users.findIndex((u) => u.id == id);

    users[idx].first_name = firstName;
    users[idx].last_name = lastName;
    users[idx].email = email;
    users[idx].password = password;

    return res.status(200).send(users[idx]);
});



//Endpoint Stories

//Add Story
app.post("/api/stories", function(req, res){
    let {title, authorId, image} = req.body;

    let newId = 1;
    if(stories.length > 0){
        newId = stories[stories.length-1].id+1;
    }else{
        newId = 1;
    }

    let newStory = {
        id: newId,
        title: title,
        authorId: authorId,
        image: image,
        characters: []
    };
    stories.push(newStory);
    return res.status(201).send(newStory);
});

//Get All Stories
app.get("/api/stories/:authorId", function(req, res){
    let userStories = stories.filter((s)=> s.authorId == req.params.authorId);
    return res.status(200).send(userStories);
});

//Get Specific Stories
app.get("/api/stories/:stories_id/overview", function(req, res){
    let id = req.params.stories_id;
    const index = stories.findIndex((s)=>s.id == id);
    if(index != -1){
        return res.status(200).send(stories[index]);
    }else{
        return res.status(404).send({message: "Story Not Found"});
    }
});

//Delete Story
app.delete("/api/stories/:stories_id", function(req, res){
    let id = req.params.stories_id;
    const index = stories.findIndex((s)=>s.id == id);
    if(index != -1){
        let deletedStory = stories.splice(index, 1);
        return res.status(200).send(deletedStory);
    }else{
        return res.status(404).send({message: "Story Not Found"});
    }
});


//edit overview (gambar + title only)
app.put("/api/stories/:stories_id/overview", function(req, res){
    let {urlGambar, title} = req.body;
    const index = stories.findIndex((s)=>s.id == req.params.stories_id);
    if(index != -1){
        stories[index].title = title;
        stories[index].image = urlGambar;
        return res.status(200).send(stories[index]);
    }else{
        return res.status(404).send({message: "Story Not Found"});
    }
})

//Delete Character in Story
app.delete("/api/stories/:stories_id/characters/:character_id", function(req, res){
    let id = req.params.stories_id;
    let idCharacter = req.params.character_id;
    const index = stories.findIndex((s)=>s.id == id);
    if(index != -1){
        let characters = stories[index].characters;
        const idx = characters.findIndex((c)=>c.id == idCharacter);
        if(idx != -1){
            let deletedCharacter = stories[index].characters.splice(idx, 1);
            return res.status(200).send(deletedCharacter);
        }else{
            return res.status(404).send({message: "Character Not Found"});
        }
        
    }else{
        return res.status(404).send({message: "Story Not Found"});
    }
});

app.put("/api/stories/:stories_id/characters/:character_id", function(req, res){
    let {nama, peran, umur, sifat, backstory} = req.body;
    let id = req.params.stories_id;
    let idCharacter = req.params.character_id;
    const index = stories.findIndex((s)=>s.id == id);
    if(index != -1){
        let characters = stories[index].characters;
        const idx = characters.findIndex((c)=>c.id == idCharacter);
        if(idx != -1){
            stories[index].characters[idx].nama = nama;
            stories[index].characters[idx].peran = peran;
            stories[index].characters[idx].umur = umur;
            stories[index].characters[idx].sifat = sifat;
            stories[index].characters[idx].backstory = backstory;
            return res.status(200).send(stories[index].characters[idx].umur);
        }else{
            return res.status(404).send({message: "Character Not Found"});
        }
        
    }else{
        return res.status(404).send({message: "Story Not Found"});
    }
});

app.post("/api/stories/:stories_id/characters", function(req, res){
    let {nama, peran, umur, sifat, backstory} = req.body;
    let id = req.params.stories_id;
    const index = stories.findIndex((s)=>s.id == id);
    if(index != -1){
        let newId = 1;
        if(stories[index].characters.length > 0){
            newId = stories[index].characters[stories[index].characters.length-1].id+1;
        }else{
            newId = 1;
        }
        
        let newCharacter = {
            id: newId,
            nama: nama,
            peran: peran,
            sifat: sifat,
            umur: umur,
            backstory: backstory,
        }
        stories[index].characters.push(newCharacter);
        return res.status(201).send(newCharacter);
       
        
    }else{
        return res.status(404).send({message: "Story Not Found"});
    }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}...`);
});