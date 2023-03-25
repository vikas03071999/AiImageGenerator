import { surpriseMePrompts } from "../constants/prompts"

export const generateRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt){
        generateRandomPrompt(prompt)
    }

    return randomPrompt;
}