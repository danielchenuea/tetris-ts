
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

export function setScoreStorage(storageString: string, score: number) : void{
    localStorage.setItem(storageString, score.toString());
}