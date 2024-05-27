import bcrypt from 'bcrypt';

async function hashpassword(password){
    const salt = bcrypt.genSaltSync(10);
    let hashed = await bcrypt.hash(password, salt);
    return password = hashed;
}

async function loginHash(hashed, password){
    return await bcrypt.compare(password, hashed);
}

//create user. login, update user