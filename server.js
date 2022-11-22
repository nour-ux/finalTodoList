    const express =require("express")
    const { json } = require("express/lib/response")
    const app= express()
    const db=require("./db")
    const Todo =require("./model")
    const Users =require("./model2")
    const cors=require("cors")
    const bcrypt = require("bcrypt");
    const { Schema , model, mongoose }= require ("mongoose")
    const jwt =require('jsonwebtoken')
    const fs = require('fs')

    // console.log(Todo)


    let secret = fs.readFileSync('secret.key')
    app.use(express.json());
    app.use(cors());

    // app.all('/Users/login', function(req, res, next) {
    //     return res.header("Access-Control-Allow-Origin", "*");
    //     return res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next()
    //   });


app.get('/',(req,res)=>{

        return res.json("index page for first time")
    })


//  UPDETED TO USER ID 🎊🎉🎊🧨🎈
app.get('/tasksUser/:_id', verifytoken ,async (req,res)=>{
         
    jwt.verify(req.token ,secret , (err,data)=>{

        if(err){
                return res.status(403).json("token is not vaild")}
        else{ 

        
        // data: { user1: { password: 'c', email: 'c' }, iat: 1649861264 }
        console.log("req id from /tasksUser/:_id is ",req.params._id,"data",data) 
        const k=req.params._id;
    //    console.log( JSON.stringify({k}))
        
        Users.findById(req.params._id).populate("todo" , "-__v").exec((err,ssers)=>  {
            if (err) {
                 console.log(err);
                 console.log("IN ERORR SEC",ssers);

            }else{

              console.log("req.token:", req.token)

                //  console.log("IN ssers SEC",ssers);

                // res.render('././frontend/src/App.js' , {type:req.params.type  ,question: foundQuestion , community: foundCommunity});
                console.log("lolll",ssers.todo);
               
                return res.status(200).json({message:"get data successfully",title:ssers.todo });

              

          }


//             // else{


//             // const use = Users.todo.map((i, item)=>{
//             //     console.log('The user todos are %s', i.title);
//             // })
//             // res.status(200).json("okay");
// // Users.todo.map((i, item)=>{
// //         console.log( i.title);
//         // return i.title;
//     // });


//     // console.log( Users.todo[0].title);
//     // console.log( res.body);
// //     const i= Users.todo;
// // for (let c=0 ; c<=i.length ;c++){
// //         console.log(i[c].title);
// //         res.status(200).json(i[c].title);

// // };
//     res.status(200).json(Users.todo);
//     console.log(Users.todo[0]);

            //  return  Users.todo; 
           
            // console.log('The user todos are %s', Users.todo[0]); 
            // prints "The author is Ian Fleming"
        // } 
    });}
    })
          
      



        //  JSON.stringify(c)
        //  console.log("\n>> populated Tasks:\n", c.todo._id);
        //  res.status(200).json(c);
         
         
    //    const c =  Users.findOne({ _id: req.params }).populate('todo', 'title');
    //    JSON.stringfiy(c)


    //    .exec( (err, Userss) => {
   
  

    // console.log('The title is %s', Users);
    // // prints "The author is Ian Fleming"

    // console.log('The authors isCompleted is %s', Users);

    // prints "The authors age is null"

            // res.status(201).json(c);
                // console.log('The title is %s', y);




        // console.log("the body of requist is:",req.body);
        

      
        //    const todoUser=  Todo.find({},(err,data)=>{
        
        //         if(err){
        //             console.log('Error:',err)
        //         }else{
        
        //             return res.status(201).json(data);
        //         }
        
        //     });

        // const getTutorialWithPopulate = function(id) {
        //     return Users.findById(id).populate("todo");
        //   };
          
    
        //     // ...
        //     // add this
        //    console.log("\n>> populated Tutorial:\n", tutorial);
        //      tutorial =  getTutorialWithPopulate( req.params);
        //                 res.status(201).json("hello");


            // console.log("\n>> populated Tasks:\n",  req.params);

            // User.findOne({ name: Bob }).populate("Bob", "job email");
        });

// ----------------------------------------------------------------------------------------------



//  app.get('/tasks',(req,res)=>{
//             console.log("the body of requist is:",req.body);
            
//                 Todo.find({},(err,data)=>{
            
//                     if(err){
//                         console.log('Error:',err)
//                     }else{
            
//                         return res.status(201).json(data);
            
            
//                     }
            
//                 });
            
//             });



//  UPDETED TO USER ID 🎊🎉🎊🧨🎈

    // فرقي بين البارمس و القيمه الي ناخذها عن طريق الكويري  البارمس ناخذها من الباث اما الكويري تكون ضمن الريكويست
    
app.get('/completed/:_id',verifytoken ,(req,res)=>{
            // console.log("the body of requist is:",req.body);


            
        // Todo.find({isCompleted:req.query.isCompleted},(err,data)=>{
            
        //             if(err){
        //                 console.log('Error:',err)
        //             }else{

        //                 console.log(data)
        //                 return res.status(201).json(data);

            
            
        //             }
            
        //         });


       
        Users.find({_id:req.params._id}).populate({path:'todo' , match:{ isCompleted:req.query.isCompleted }}).exec((err,ssers)=>  {
                    if (err) {
                        return console.log(err);
                    }else{
        
        
                        // res.render('././frontend/src/App.js' , {type:req.params.type  ,question: foundQuestion , community: foundCommunity});
                        console.log("\"Responce from server is\"",ssers);



                       
                       return res.status(200).json({message:"get data successfully",title:ssers[0].todo });
        
                                        }
        
        
                    // else{
        
        
                    // const use = Users.todo.map((i, item)=>{
                    //     console.log('The user todos are %s', i.title);
                    // })
                    // res.status(200).json("okay");
        // Users.todo.map((i, item)=>{
        //         console.log( i.title);
                // return i.title;
            // });
        
        
            // console.log( Users.todo[0].title);
            // console.log( res.body);
        //     const i= Users.todo;
        // for (let c=0 ; c<=i.length ;c++){
        //         console.log(i[c].title);
        //         res.status(200).json(i[c].title);
        
        // };
            res.status(200).json(Users.todo);
            console.log(Users.todo[0]);
            return Users.todo;
        
        
                    //  return  Users.todo; 
                   
                    // console.log('The user todos are %s', Users.todo[0]); 
                    // prints "The author is Ian Fleming"
                // } 
            });
           

                
            });


    
// app.post('/tasks',(req, res)=>{
//                 console.log("the body of requist is:",req.body);
            
//                     Todo.create(req.body,(err,data)=>{
            
//                         if(err){
//                             console.log('Error:',err)
//                         }else{
            
//                             return res.status(201).json(data);
            
            
//                         }
            
//                     });
            
//                 });





// -------------------------------------------------------------------------
//  UPDETED TO USER ID 🎊🎉🎊🧨🎈

//  UPDETED TO USER ID 🎊🎉🎊🧨🎈
// app.post('/tasks/:_id',verifytoken ,async (req, res)=>{ 

app.post('/tasks/:_id' ,verifytoken ,async (req, res)=>{ 
    
    // const { ObjectId } = mongoose.Types;
    // const ObjectId = require("mongodb").ObjectId;
 
    



    
//     jwt.verify(req.token ,secret , (err,data)=>{

//         if(err){
//  res.status(403)
//         }
//         else{

//           res.json({message:"okay", data})  
//         }
//     })
    
    
    
    const c=req.params._id
    const todo = new Todo({
        // _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        isCompleted: req.body.isCompleted
      });
      
      console.log(req.body.title)
     await todo.save();

                 await Users.findByIdAndUpdate(
                   c ,
                  { $push: { todo: todo._id} },
                  { new: true }
                  
                );
                console.log(req.params._id);
                console.log("all thing fine ")
                return res.json("all thing fine")
            // // }   // assign the _id from the person
        //   }); 

    // const createComment = function(tutorialId, comment) {
    // Users.init();  
    // const { title , isCompleted} = req.body
    // const todo1 = new Todo({
    //         title: title  ,
    //         isCompleted: isCompleted    // assign the _id from the person
    //       });
          
    //       todo1.save(function (err) {
    //         if (err) return handleError(err);
            // that's it!
        //   });
          
          
          
         
        // await  Todo.create(req.body,async (err,data) => {
        //     if(err){
        //         console.log('Error:',err);

        //     }else{}

                // console.log("\n>> Created todo:\n", data);
                // if (req.params.match(/^[0-9a-fA-F]{24}$/)){
            //      await Users.findByIdAndUpdate(
            //       {_id:req.params},
            //       { $push: { "todo": data._id} },
            //       { new: true }
                  
            //     );
            // // }

            //     console.log(data._id)
            //     console.log(req.params)
            //     return res.status(201).json("hi");


            
      
        // });
    //   };

    });
// -------------------------------------------------------------

app.delete('/tasks/:_id/:idtodo',verifytoken ,(req,res)=>{

const{_id , idtodo} = req.params;
    console.log("the body of requist is:",req.params);
    console.log("todoid",idtodo);
    console.log("_id:",_id);

    // console.log("the body of requist is:",req.params.idtodo);

    
    Users.find({_id:_id}).populate("todo" , "-__v -isCompleted -title").exec((err,ssers)=>  {
        if (err) {
            return console.log(err);
        }else{

            console.log("\"Responce from server is\"",ssers[0].todo);
            console.log("\"todo from server is\"",ssers[0].todo);
            // res.status(201).json(ssers);

            // res.status(200).json(ssers);

            // const todoarray = ssers[0].todo;
            // todoarray.map((elem,i)=>{

            // //    if( elem == req.params.idtodo){

            // //    console.log( "nnnn",elem);
            // //    }

            // console.log( "nnnn",elem);

            // })

            Todo.deleteOne({_id:idtodo},(err,data)=>{
     
                if(err){
                    console.log('Error:',err)
                   return res.status(404).json(err);

                }else{
    
                    console.log(data);

                  return  res.status(201).json(data);

                    // Users.updateOne({_id:req.params._id}, { $set: { todo: [] }}, function(err, affected){
                    //     console.log('affected: ', affected); });

        
                }
        
            });

            

           
        //    return res.status(200).json({message:"get data successfully",title:ssers[0].todo }); 
        }

     

      
    
    }); 


        // console.log("the body of requist is:",req.params);
        
            // Todo.deleteOne(req.params._id,(err,data)=>{
        
            //     if(err){
            //         console.log('Error:',err)
            //     }else{
        
            //         return res.status(201).json(data);
        
        
            //     }
        
            // });
        
        });


app.delete('/notcompleted',verifytoken ,(req,res)=>{
            console.log("the body of requist is:",req.params);
            
                Todo.deleteMany({isCompleted:false},(err,data)=>{
            
                    if(err){
                        console.log('Error:',err)
                    }else{

            
                        return res.status(201).json(data);
            
            
                    }
            
                });
            
            });


app.delete('/Finished/:_id',verifytoken ,(req,res)=>{


                console.log("the body of requist is /Finished :",req.body);
                
                console.log("the _id of requist is /Finished:",req.params._id);
    
                Users.find({_id:req.params._id}).populate("todo" , "-__v -title -_id").exec((err,ssers)=>  {
                    if (err) {
                        return console.log(err);
                    }
                    else{
            
                        console.log("\"Responce from server is\"",ssers);
                        console.log("\"todo from server is\"",ssers[0].todo); 
            
        
                        Todo.deleteMany({"isCompleted":true},(err,data)=>{
                
                            if(err){
                                console.log('Error:',err)} 
                                
                            else{
                
                                console.log('deleted:',ssers[0].todo)
            
                               return res.status(201).json(data);
            
                                // Users.updateMany({_id:req.params._id}, { $set: { todo: [] }}, function(err, affected){
                                //     console.log('affected: ', affected);
                                // });
            
                            }
                    
                        }); 
                    }
            
                        
            
                       
                    //    return res.status(200).json({message:"get data successfully",title:ssers[0].todo }); 
                    

      
                
    
                
});   

});                   
                
    
    




// -------------------------------------------------------------------------

app.delete('/All',verifytoken ,(req,res)=>{
    console.log("the body of requist is:",req.params);
    
        Todo.deleteMany({},(err,data)=>{
    
            if(err){
                console.log('Error:',err)
            }else{

    
                return res.status(201).json(data);
    
    
            }
    
        });
    
    });

// --------------------------------------------------------------------------------------------
//  UPDETED TO USER ID 🎊🎉🎊🧨🎈
app.delete('/All/:_id',verifytoken ,(req,res)=>{
    console.log("the body of requist is:",req.params._id);
    
    Users.find({_id:req.params._id}).populate("todo" , "-__v -title -isCompleted").exec((err,ssers)=>  {
        if (err) {
            return console.log(err);
        }else{

            console.log("\"Responce from server is\"",ssers);
            console.log("\"todo from server is\"",ssers[0]);


            Todo.deleteMany({_id:{$in: ssers[0].todo}},(err,data)=>{
    
                if(err){
                    console.log('Error:',err)
                }else{
    
                    console.log('deleted:',ssers[0].todo)

                    res.status(201).json(data);

                    Users.updateMany({_id:req.params._id}, { $set: { todo: [] }}, function(err, affected){
                        console.log('affected: ', affected);
                    });

        
                }
        
            });

            

           
        //    return res.status(200).json({message:"get data successfully",title:ssers[0].todo }); 
        }

     

      
    
    }); 
})

// -----------------------------------------------------------------------------------------------


        


app.put('/tasks/:_id/:title',verifytoken ,(req,res)=>{
            console.log("the body of requist is:",req.body);
            
                Todo.updateOne({_id:req.params._id},{title:req.params.title},(err,data)=>{
            
                    if(err){
                        console.log('Error:',err)
                    }else{
            
                        return res.status(200).json(data);
            
            
                    }
            
                });
            
            });

//  UPDETED TO USER ID 🎊🎉🎊🧨🎈
app.put('/updatetasks/:id/:isCompleted',verifytoken ,(req,res)=>{
                console.log("the body of requist is:",req.body);
                console.log("Todo Id of requist is:",req.params.id);

                
                    Todo.updateOne({_id:req.params.id},{isCompleted:req.params.isCompleted},(err,data)=>{
                
                        if(err){
                            console.log('Error:',err)
                        }else{

                            console.log('data:',data);
                            return  res.status(200).json(data);
                
                        }
                
                    });
                
                });







//  UPDETED TO USER ID 🎊🎉🎊🧨🎈
    app.post('/Users/register', verifytoken ,async (req,res)=>{
                    console.log("the email in body of requist is:",req.body.email);
                                    //  console.log("responce is",res.email);
// 
                    // console.log("the body of return res is:",return res.body);
                    // console.log(return res._final);

                    // Users.findOne({email:req.body.email},(err,data)=>{
                    //     // console.log('DataNour',data);

                    //     if(err ){
                    //         console.log('Error:',err);
                    //          res.status(400).json({message:"email entered couldn't registered, its token"});
                    //                         console.log('Error:',err);
                    //     }else{ 
                    //          res.status(201).json({message:"email entered is registered now"});
                
                    //     }
                
                    // });
 // -----------------------------------------------------------------------------------------------------------------------------
                                // const body = req.body;
            
                                // const user =  await new Users(body);
                                
                            //     Users.create(req.body, async (err,data)=>{
                            
                            //         if (err) {
                            //         if (err.name === 'MongoError' && err.code === 11000) {
                            //             // Duplicate username
                            //             return res.status(422).json({ message: 'email already exist!' });
                            //         }else{
                            //         // Some other error
                            //         return res.status(422).send(err);
                            //         }} 
                            //     // generate salt to hash password
                            //     const salt = await bcrypt.genSalt(10);
                            //     // now we set user password to hashed password
                            //     data[0].password =  await bcrypt.hash(data[0].password, salt);
                            //     data[0].save().then((doc) => res.status(201).send(doc));
                        
                            // });

// ---------------------------------------------------------------------------------------------

    const { username, password, email } = req.body;
                            
    pword = await bcrypt.hash(password, 10);
    try {
    const response = await Users.create({
    username: username,
    password: pword,
    email: email,
     });

    console.log("User created successfully: " + response);
    return res.json({ data:response.username, message: "User created successfully." });
  } catch (error) {
    if (error.code === 11000) { // it could be .status, .code etc.. not sure
      return res.json({ status: "error", message: "User already exist." });
    }
    console.log(error);
    return res.json({ status: "error" });
   
  }

// -----------------------------------------------------------------------------------------------------------
                    // const user = new Users(body);
                    // // generate salt to hash password
                    // const salt = await bcrypt.genSalt(10);

                    //  // now we set user password to hashed password
                    //  user.password = await bcrypt.hash(user.password, salt);
                    //  user.save().then((doc) => res.status(201).send(doc));
                    //   });



                    // creating a new mongoose doc from user data
                    // Users.create(req.body,(err,data)=>{
                    
                    //         if(err){
                    //             console.log('Error:',err);
                    //             return res.status(400).json({message:"this email is token"});
                    
                    //         }else{
                    
                    //             res.status(201).json("Create new User Successfully");
                    //                 console.log("responce",data.username);
                    //         }});
                            });



//  UPDETED TO USER ID 🎊🎉🎊🧨🎈
app.post('/Users/login' ,async (req,res)=>{
                        console.log("the body of requist is:",req.body);
                        // console.log(return res._final);
                        // console.log("rewss",res);
        
                        // data:is the return result of the find() function.

                        // const { password , email } = req.body;
const user1={ password: req.body.password ,email:req.body.email };
 const Token=jwt.sign({user1},secret);
 console.log(Token)
 
 
 
//  async(err,token)=>{

// if(err){

//     return res.status(404).json({message:" email or pass is is invalid"});

// }
//  else})


                        try {
                            const user = await Users.findOne({ email: "c" } );
                            console.log(user);
                            if (user) {
                                
                              const cmp = await bcrypt.compare("c", user.password);
                              if (cmp) {
                                //   ..... further code to maintain authentication like jwt or sessions
                                
                              return res.status(200).json({message:"login successfully",username:user.username,_id:user._id , email:user.email,token:Token});
                              } else {
                              return res.status(404).json({message:"password is worng"});
                               }
                               } else{

                                return res.status(404).json({message:" email is not registerd"});

                                
                               }

                              } catch (error) {
                            console.log(error);
                            return res.status(500).send("Internal Server error Occured");
                          }
                          
    // res.json({token})

  

                        
                    //  const pword = await bcrypt.hash(password, 10);
                    
                    //  console.log("the password of requist is:",pword);
 
                        // Users.find({email:email},(err,data)=>{
                        
                        // console.log("User Data",data)
                        // // res.status(404).json({message:"email entered is not registered"});

                        //         if(err){
                        //             console.log('Error:',err);
                        //             res.status(404).json({message:"email entered is not registered"});}
                               
                                    
                        //             if(data.length === 1){
                        //                 // console.log("data from login in server is",data[0].password)

                        //                 if(pword === data.password){
                        //                     console.log("data from login in server is",data[0].password)

                        //                     return res.status(200).json({message:"login successfully",username:data.username,_id:data._id});


                        //                 }else{
                        //                     // console.log(data)
                        //                     // console.log(req.body.password)
                        //                     // console.log(data[0].password)


                        //                     return res.status(404).json({message:"password is worng",collPass:data[0].password , prowserpass:pword});

                        //                 }
                        //             }
                        //             return res.status(201).json({message:"email entered is not registered"});
                        //                 // console.log(data);
                        
                                
                        
                        //     });



                        
                        
                        
                        });                

        

function  verifytoken(req,res,next){
       //format of token=> authorization:bearer <token>
       const bearedHeader = req.headers['authorization']
       const bearer=bearedHeader.split(' ');

    //    get token from array
    const token = bearer[1]
 
    // jwt.verify(token ,secret , (err,token)=>{

    //     if(err){
    //               return res.status(403).json("token is not vaild")
    //     }
        // else{

        // //   res.json({message:"okay", data}) 
          
        //   req.token=token
        //   next();

        // }
    //  console.log("token:",token)
    req.token=token
          next();

        // })
   }


    app.listen(5000,()=>{

        console.log("Server is working on port 5000")})

