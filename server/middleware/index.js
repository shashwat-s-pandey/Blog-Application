import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try{
        const authHeader = req.header('Authorization')

        if(!authHeader) {
            return res.status(401); // unauthorised
        }

        const token = authHeader.split(' ')[1]

        const isCustomAuth = token.length < 500

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'secretKey')

            req.userId = decodedData?.id
        }
        else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub 
        }

        next()
    }
    catch(error) {
        res.status(500).json({mssg: "Something went wrong"})
    }
} 