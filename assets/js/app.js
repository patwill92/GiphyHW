$(function() {
  var arr = ['dog', 'cat', 'bird', 'raccoon', 'elephant', 'deer', 'bear', 'cheetah', 'lion', 'horse', 'fox',
    'rabbit', 'wolf', 'whale', 'shark', 'dolphin', 'crab'];
  $('.search-gif').on('click', () => {
    let animal = $('#search').val().trim();
    if (animal) {
      if (arr.length % 2 === 0) {
        arr.push(animal);
        let btn = `<button class="btn btn-primary btn-gif" id='${animal}'>${animal}</button>`;
        $('.btns').append(btn);
        $('#search').val('');
      } else {
        arr.push(animal);
        let btn = `<button class="btn btn-default btn-gif" id='${animal}'>${animal}</button>`;
        $('.btns').append(btn);
        $('#search').val('');
      }
    } else {
      $('.md').append(`<div class="modal-backdrop fade in"></div>`);
      $('.modal').css('display', 'block').addClass('in');
      $('.popup').on('click', () => {
        $('.modal').css('display', 'none').removeClass('in');
        $('.modal-backdrop').remove();
      });
    }
  });
  var btn = '';
  arr.forEach((item, index) => {
    if (index % 2 === 0) {
      btn += `<button class="btn btn-primary btn-gif" id='${item}'>${item}</button>`;
    } else {
      btn += `<button class="btn btn-default btn-gif" id='${item}'>${item}</button>`;
    }
    return btn;
  });
  $('.btns').append(btn).on('click', '.btn-gif', (event) => {
    $('.gif-well').css('display', 'block');
    let animal = event.target.id;
    let url = `http://api.giphy.com/v1/gifs/search?q=${animal}&api_key=b259548a429745c7adb20b70762ac62c&limit=30`;
    let el = '';
    $.get(url, (res) => {
      let gifs = res.data;
      gifs.forEach((gif) => {
        let still = gif.images.fixed_width_still;
        let norm = gif.images.fixed_width;
        if (still && norm) {
          still = still.url;
          norm = norm.url;
          el += `<li><img still='${still}' norm='${norm}' current="still" src="${still}"
          alt="git-of-${animal}"></li>`
        }
      });
      $('.grid').html(el);
    })
  });
  $('.grid').on('click', 'img', function(){
    let move = $(this).attr('norm');
    let fixed = $(this).attr('still');
    if($(this).attr('current') === 'still'){
      $(this).attr('src', move);
      $(this).attr('current', 'norm');
    } else {
      $(this).attr('src', fixed);
      $(this).attr('current', 'still');
    }
  });
});
