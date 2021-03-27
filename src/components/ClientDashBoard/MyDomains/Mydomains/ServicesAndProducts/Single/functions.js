export const about_drop_down_toogle=(id)=>{
    const b = document.querySelectorAll('.about-dropdown');
    for(var i = 0;i<b.length;i++){
        if(i===id) continue;
        if(b[i].classList.contains('about-dropdown-open')){
            b[i].classList.remove('about-dropdown-open');
        }
    }
    const a = b[id];
    if(a.classList.contains('about-dropdown-open')){
        a.classList.remove('about-dropdown-open');
    }
    else a.classList.add('about-dropdown-open');

}


