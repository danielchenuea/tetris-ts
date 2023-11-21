

/**
 * Get the Score Number from the Local Storage.
 * If it does not exist. Just creates it.
 * @param {string} storageString
 * @returns {number}
 */
export function getScoreStorage(storageString: string) : number{
    let temp_score = localStorage.getItem(storageString);
    if(temp_score !== null){
        if (isNaN(parseInt(temp_score))) {
            localStorage.setItem(storageString, "0");
            return 0;  
        } else{
            return parseInt(temp_score);
        } 
    } else {
        localStorage.setItem(storageString, "0");
        return 0;
    }
}

/**
 * Store the score number in the LocalStorage.
 * @param {string} storageString
 * @param {number} score
 * @returns {void}
 */
export function setScoreStorage(storageString: string, score: number) : void{
    localStorage.setItem(storageString, score.toString());
}