function menuShow(){  
    const $iconeMenuMobile = document.querySelector('.icone-menu-mobile');  
    const $menuMobile = document.querySelector('#mobile-menu');

    if ($menuMobile.classList.contains('open')) {
        $menuMobile.classList.remove('open');
        $iconeMenuMobile.src = "assets/images/menu-mobile/button_mobile.svg";
    } else {
        $menuMobile.classList.add('open');
        $iconeMenuMobile.src = "assets/images/menu-mobile/close_mobile.svg";
    }
}
