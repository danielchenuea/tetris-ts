export function hideMenu(id: string, hideDelay: number, afterHide?: Function){
    $(`#${id}`).addClass("hidden");
    setTimeout(() => {
        $(`#${id}`).hide();
        if (afterHide) afterHide()
    }, hideDelay);
}

export function showMenu(id:string, afterShow?: Function){
    console.log("123")
    $(`#${id}`).show();
    $(`#${id}`).removeClass("hidden");
    if (afterShow) afterShow()
}