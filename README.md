try {
  res.status(200).json({
    success: false,
    message: 'Register successfull',
    customData -> use when required
  })
}
catch(error) {
  res.status(500).json({
    success: false,
    message: error,
  })
}