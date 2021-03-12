let flashcardId = '';

const getRandomFlashcard = async () => {
  const category =  $("input[name='category']:checked").val();

  try {
    $('#spinner').show();
    const res = await $.ajax({
      url: '/flashcards/random',
      method: 'GET',
      data: { category }
    });

    $('#spinner').hide();
  
    if (res.success) {
      const { frontSide, backSide, isRemember, category, _id } = res.data;
      if (isRemember) {
        $('#isRememberBadge').show();
        $('#rememberBtn').hide();
        $('#notRememberBtn').show();
      } else {
        $('#isRememberBadge').hide();
        $('#rememberBtn').show();
        $('#notRememberBtn').hide();

      }
      $('#cardCategory').text(category);
      $('#cardFrontSide').text(frontSide);
      $('#cardBackSide').text(backSide);
      flashcardId = _id;
    }
  } catch (err) {
    $('#spinner').show();
    console.log(err);
  }
};

getRandomFlashcard();

const updateRemember = async (isRemember) => {
  if (flashcardId) {
    try {
      const res = await $.ajax({
        url: '/flashcards/' + flashcardId,
        method: 'PUT',
        data: { isRemember }
      });
      if (res.success) {
        if (isRemember) {
          $('#isRememberBadge').show();
          $('#rememberBtn').hide();
          $('#notRememberBtn').show();
        } else {
          $('#isRememberBadge').hide();
          $('#rememberBtn').show();
          $('#notRememberBtn').hide();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

$('#flipBtn').on('click', () => {
  $('.flip-box-inner').toggleClass('flipped');
})

$('#nextBtn').on('click', () => {
  getRandomFlashcard();
})

$("input[name='category']").on('input', () => {
  getRandomFlashcard();
})

$('#editBtn').on('click', () => {
  if (flashcardId) {
    window.location.href = '/edit/flashcards/' + flashcardId
  }
})

$('#rememberBtn').on('click', () => {
  updateRemember(true);
})

$('#notRememberBtn').on('click', () => {
  updateRemember(false);
})