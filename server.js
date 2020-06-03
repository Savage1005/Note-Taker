const express = require("express");
const fs = require("fs");
const path = require("path");

const app= express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname,'./public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api get



//api push




//api delete



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

