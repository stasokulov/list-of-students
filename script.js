//'use strict';
//Загрузка учеников
class Load {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.body = document.querySelector('body');
        this.wrap = document.querySelector('.wrap');
    }

    start() {
        this.loadStudents();
        this.catchClick();
    }

    loadStudents() {
        this.xhr.open('GET', 'students.json?r=' + Math.random(), true);
        this.xhr.send();
        this.xhr.onreadystatechange = function() {
            if (this.xhr.readyState != 4) return;
            if (this.xhr.status != 200) {
                this.error(); // обработать ошибку
            } else {
                this.result(); // вывести результат
            };
        }.bind(this);
    }

    error() {
        alert('Ошибка ' + this.xhr.status + ': ' + this.xhr.statusText);
    }

    result() {
        butGetStudens.remove();

        let json = JSON.parse(this.xhr.responseText);
        json.forEach(student => {
          let cardWrap = this.createCardWrap();
          let card = this.createEmptyCard();
          let avatarWrap = this.createAvatarWrap();
          let avatar = this.createAvatar();
          let nameHolder = this.crateNameHolder();
          let cardDetails = this.createDetails();
          
          avatar.src = student.avatar;
          avatar.alt = student.name + ' ' + student.surName;
          nameHolder.innerHTML = student.name + ' ' + student.surName;
          avatarWrap.appendChild(avatar);

          student.details.forEach(item => {
              let span = this.createSpan();
              span.innerHTML = item;
              cardDetails.appendChild(span);
          })

          card.insertBefore(nameHolder, card.firstChild);
          card.insertBefore(avatarWrap, card.firstChild);
          card.appendChild(cardDetails);
          cardWrap.appendChild(card);

          this.wrap.appendChild(cardWrap);                     
        });
    }

    createEmptyCard () {
        let emptyCard = this.createDiv();
        let btns = this.createBtns();
        emptyCard.appendChild(btns);
        emptyCard.classList.add('card');
        return emptyCard;
    }

    createCardWrap () {
        let cardWrap = this.createDiv();
        cardWrap.classList.add('card__wrap');
        return cardWrap;
    }

    createAvatar() {
        let avatar = document.createElement('img');
        avatar.classList.add('card__avatar');
        return avatar;
    }

    createAvatarWrap() {
        let avatarWrap = this.createDiv();
        avatarWrap.classList.add('card__avatar-wrap');
        return avatarWrap;
    }

    crateNameHolder() {
        let nameHolder = this.createDiv();
        nameHolder.classList.add('card__name');
        return nameHolder;
    }

    createBtns() {
        let btns = this.createDiv();
        let btnDel = this.createBtnDel();
        let btnOpen = this.createBtnOpen();
        btns.appendChild(btnDel);
        btns.appendChild(btnOpen);
        btns.classList.add('card__btns');
        return btns;
    }

    createBtnDel() {
        let btn = this.createDiv();
        let item1 = this.createSpan();
        item1.classList.add('btn-del__item1');
        let item2 = this.createSpan();
        item2.classList.add('btn-del__item2');
        btn.appendChild(item1);
        btn.appendChild(item2);
        btn.classList.add('btn-del');
        return btn;
    }

    createBtnOpen() {
        let btn = this.createDiv();
        let item1 = this.createSpan();
        item1.classList.add('btn-open__item1');
        let item2 = this.createSpan();
        item2.classList.add('btn-open__item2');
        btn.appendChild(item1);
        btn.appendChild(item2);
        btn.classList.add('btn-open');
        return btn;
    }

    createDetails() {
        let details = this.createDiv();
        details.classList.add('card__details');
        details.classList.add('invis');
        return details;
    }

    createSpan() {
        let span = document.createElement('span');
        return span;
    }

    createDiv() {
        let div = document.createElement('div');
        return div;
    }

    //Ловим клик
    
    catchClick() {
        this.body.addEventListener('click', (e) => {
            //Удаление карточки
            if(e.toElement.className === 'btn-del') {
                let card = e.toElement.parentElement.parentElement;
                let cardWrap = card.parentElement;
                this.delCard(card, cardWrap);
            }
            else if(e.toElement.parentElement.className === 'btn-del') {
                let card = e.toElement.parentElement.parentElement.parentElement;
                let cardWrap = card.parentElement;
                this.delCard(card, cardWrap);
            }

            //Отображение допинформации
            if(e.toElement.className === 'btn-open') {
                console.log('123');
                let card = e.toElement.parentElement.parentElement;
                this.openDetails(card);
            }
            else if(e.toElement.parentElement.className === 'btn-open') {
                let card = e.toElement.parentElement.parentElement.parentElement;
                this.openDetails(card);
            }
            
        })
    }

    //Присваеваем карточке классы анимирующие удаление и удаляем карточку
    delCard(card, cardWrap) {
        let areYouSure = confirm('Это очень способный ученик. Точно удалить?');
        if (areYouSure) {
            card.classList.add('card-remove');
            setTimeout( () => {
                card.remove();
                cardWrap.classList.add('card__wrap-remove');
                setTimeout( () => {
                    cardWrap.remove();
                }, 500 );
            }, 200 );
        }
    };

    //Отображение допинформации
    openDetails(card) {
        console.log('2');
        let details = card.querySelector('.card__details');
        console.log(details);
        details.classList.toggle('flex');
        details.classList.toggle('invis');
    }
};

const butGetStudens = document.querySelector('#butGetStudens');
let load = new Load();
butGetStudens.addEventListener('click', ()=>load.start() );









