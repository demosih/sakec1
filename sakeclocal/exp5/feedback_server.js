// feedback_server.js
const express=require('express'), bodyParser=require('body-parser');
const app=express(); app.use(bodyParser.json());
app.post('/feedback',(req,res)=>{
  const {name='',email='',message=''}=req.body||{};
  if(!name.trim()||!email.trim()||!message.trim()) return res.json({ok:false,msg:'All fields required'});
  if(/<\s*script/i.test(name)||/<\s*script/i.test(message)) return res.json({ok:false,msg:'No script tags'});
  // (store/send) - for demo just return ok
  console.log('Feedback:', name, email, message);
  res.json({ok:true});
});
app.listen(3000,()=>console.log('open feedback.html via static server and run this on port 3000'));
