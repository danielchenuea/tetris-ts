export function hideMenu(id: string, hideDelay: number, afterHide?: Function){
    $(`#${id}`).addClass("hidden");
    setTimeout(() => {
        $(`#${id}`).hide();
        if (afterHide) afterHide()
    }, hideDelay);
}

export function showMenu(id:string, afterShow?: Function){
    $(`#${id}`).show();
    $(`#${id}`).removeClass("hidden");
    if (afterShow) afterShow()
}