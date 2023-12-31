import fs from 'fs'
import { filePath } from '../utilis/dataFilePath.js'




const readUsersFromFile = () => {
    try {
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));      
        
        return fileData
    } catch (error) {
        throw new Error("Error reading from bank file")
    }
}

const writeUsersToFile = (user) => {
    try {
        fs.writeFileSync(filePath,JSON.stringify(user), 'utf-8')
    } catch (error) {
        throw new Error("Error writing to the bank file")
    }
}

export {readUsersFromFile, writeUsersToFile}