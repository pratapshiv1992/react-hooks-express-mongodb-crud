import express from 'express';
const app = express();
app.get('/test',(req,res)=>{
    res.send("hello");
});

app.listen(3002,()=>{
    console.log('app running on port 3002');
})
