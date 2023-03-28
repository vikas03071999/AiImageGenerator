import { surpriseMePrompts } from "../constants/prompts"
import FileSaver from 'file-saver'

export const generateRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt){
        generateRandomPrompt(prompt)
    }

    return randomPrompt;
}

export const downloadImg = async(_id, photo) => {
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}