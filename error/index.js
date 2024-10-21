export function errorHandler(err, req, res, next){
    if(err){
        console.error(err)
        res.status(err.code ?? 500).json({'message': err.message ?? "unknow error"});
    }else{
        // next();
    }
}