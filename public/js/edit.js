const flashcardId = window.location.pathname.split('/').pop();

const getFlashcard = async () => {
  try {
    const res = await $.ajax({
      url: `/flashcards/${flashcardId}`,
      method: 'GET'
    });

    if (res.success) {
      const { frontSide, backSide, category } = res.data;
      $('#frontSide').val(frontSide)
      $('#backSide').val(backSide);
      $('#category').val(category);
    }  
  } catch (err) {
    console.log(err);
  }
}

getFlashcard();

$('#createForm').on('submit', async (e) => {
  e.preventDefault();

  const flashcard = {
    frontSide: $('#frontSide').val(),
    backSide: $('#backSide').val(),
    category: $('#category').val()
  };

  const res = await $.ajax({
    url: '/flashcards/' + flashcardId,
    method: 'PUT',
    data: flashcard
  });

  if (res.success) {
    alert('Update success');
    window.location.href = '/'
  }
})