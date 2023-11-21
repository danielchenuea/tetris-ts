
/**
 * This function is the hide routine for the Menu.
 * If you want to change the hide delay, pay attention for the css.
 * @param {string} id Id Used fot the menu.
 * @param {number} hideDelay The delay for hiding the menu.
 * @param {Function} [afterHide] A Function Event that will be executed afther the menu is hidden.
 * @returns {void}
 */
export function hideMenu(id: string, hideDelay: number, afterHide?: Function) : void {
    $(`#${id}`).addClass("hidden");
    setTimeout(() => {
        $(`#${id}`).hide();
        if (afterHide) afterHide()
    }, hideDelay);
}

/**
 * This function is the show routine for the Menu.
 * If you want to change the show delay, pay attention for the css.
 * @param {string} id Id used for the menu.
 * @param {Function} [afterShow] A Function Event that will be executed after the menu is shown.
 * @returns {void}
 */
export function showMenu(id:string, afterShow?: Function) : void {
    $(`#${id}`).show();
    $(`#${id}`).removeClass("hidden");
    if (afterShow) afterShow()
}