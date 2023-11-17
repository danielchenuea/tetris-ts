export function getScoreStorage(storageString) {
    let temp_score = localStorage.getItem(storageString);
    if (temp_score !== null) {
        if (isNaN(parseInt(temp_score))) {
            localStorage.setItem(storageString, "0");
            return 0;
        }
        else {
            return parseInt(temp_score);
        }
    }
    else {
        localStorage.setItem(storageString, "0");
        return 0;
    }
}
export function setScoreStorage(storageString, score) {
    localStorage.setItem(storageString, score.toString());
}
