import jwt from "jsonwebtoken"

const GenerateToken = (id)=>{
    try {
        const token = jwt.sign({id} , process.env.TOKEN_SECRET );
        if(!token){
            console.log("token Not generate");
        }

        return token;

    } catch (error) {

        console.log("token error", error)
    }
}

export default GenerateToken;
