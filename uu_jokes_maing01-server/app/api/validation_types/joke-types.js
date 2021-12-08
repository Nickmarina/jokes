const jokeCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    text: uu5String(4000).isRequired(),
    categoryIdList: array(id(), 10),
    image: binary()
  })

  const jokeGetDtoInType = shape({
    id: id().isRequired()
  })

  const jokeGetImageDataDtoInType = shape ({
    image: code().isRequired(),
    contentDisposition: oneOf(["inline", "attachment"])
  })

  const listListDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  })

  const jokeUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(255),
    text: uu5String(4000),
    categoryIdList: array(id(), 10),
    image: binary()
  })

  const jokeDeleteDtoInType = shape({
    id: id().isRequired()
  })
  