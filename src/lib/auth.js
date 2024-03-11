import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({username: credentials.username});

        if(!user){
            throw new Error("Wrong credentials!");
        }

        const isPasswwordCorrect = await bcrypt.compare(
            credentials.password, 
            user.password);

        if (!isPasswwordCorrect){
            throw new Error("Wrong credentails!");
        }

        return user;
        
    }catch(err){
        console.log(err);
        throw new Error("Failed to login!");
    }
};

export const { 
    handlers: {GET, POST}, 
    auth, 
    signIn, 
    signOut 
} = NextAuth({
    ...authConfig, 
    providers: [ 
    GitHub({ 
        clientId: process.env.GITHUB_ID , 
        clientSecret: process.env.GITHUB_SECRET,
     }),
     CredentialsProvider({
        async authorize(credentials) {
            try{
                const user = await login(credentials);
                return user;

            }catch(err){
                return null;
            }
        },
     }),
    ], 
    callbacks:{
        async signIn({user, account,  profile}){
            // console.log(profile);
            if(account.provider === "github"){
                connectToDb();
                try{


                    const user = await User.findOne({ email: profile.email });

                    // if don't have any user
                    if(!user){
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            // password: "password123", // Provide a password here
                            image: profile.avatar_url,

                        });

                        await newUser.save();
                    }

                }catch(err){
                    console.log(err);
                    return false;
                }
            }
            return true;
        },
        ...authConfig.callbacks,
    },
});