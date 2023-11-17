export function hideMenu(id, hideDelay, afterHide) {
    $(`#${id}`).addClass("hidden");
    setTimeout(() => {
        $(`#${id}`).hide();
        if (afterHide)
            afterHide();
    }, hideDelay);
}
export function showMenu(id, afterShow) {
    console.log("123");
    $(`#${id}`).show();
    $(`#${id}`).removeClass("hidden");
    if (afterShow)
        afterShow();
}
