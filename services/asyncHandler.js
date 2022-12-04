// const asyncHandler = () => {}
// const asyncHandler = (fn) => {}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) => async() => {}

// asyncHandler function accepts a fucntion and make a async await call to that function

const asyncHandler = (fn) => async () => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(err.code || 500).json({
      sucess: false,
      message: err.message,
    });
  }
};

module.exports = asyncHandler;

// non arrow based same function 

// function asyncHandler(fn) {
//     return async function(req,res,next){
//         try {

//             await fn(req,res,next);
            
//         } catch (err) {
//             res.status(err.code || 500).json({
//                 sucess: false,
//                 message: err.message,
//               });
//         }
//     }
// }