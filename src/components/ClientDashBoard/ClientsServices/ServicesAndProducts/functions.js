
export const dropdown = () =>{
    const select = document.querySelector('.drop-down-menues');
    if(select.classList.contains('close-menues')) select.classList.remove('close-menues');
    else select.classList.add('close-menues')
}


export const removeactivefromlist = () =>{
    const all = document.querySelectorAll('.drop-down-menue-list');
    for(var i = 0;i<all.length;i++){
        if(all[i].classList.contains('menulistactive')){
            all[i].classList.remove('menulistactive');
        }
    }
}

