$('#createForm').on('submit', async (e) => {
  e.preventDefault();

  const flashcard = {
    frontSide: $('#frontSide').val(),
    backSide: $('#backSide').val(),
    category: $('#category').val()
  };

  const res = await $.ajax({
    url: '/flashcards',
    method: 'POST',
    data: flashcard
  });

  if (res.success) {
    alert('Create success');
    $('#frontSide').val('')
    $('#backSide').val(''),
    $('#category').val('other')
  }
})
